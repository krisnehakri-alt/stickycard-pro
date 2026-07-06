import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { authenticate } from "../shopify.server";
import { 
  Page, 
  Layout, 
  Card, 
  Text, 
  BlockStack, 
  InlineStack, 
  Button, 
  Badge, 
  Icon,
  IndexTable,
  Box
} from "@shopify/polaris";
import { 
  BookOpenIcon,
  ButtonPressIcon,
  AppsIcon,
  BankIcon
} from "@shopify/polaris-icons";

export const loader = async ({ request }) => {
  try {
    const { billing } = await authenticate.admin(request);
    
    // Check active subscription
    const billingCheck = await billing.check({
      plans: ["STARTER", "GROWTH", "PREMIUM"],
      isTest: true,
    });
  
    const activeSubscription = billingCheck.hasActivePayment 
      ? billingCheck.appSubscriptions[0].name 
      : "FREE";
    
    // In a real app, you would fetch these from the Prisma database based on the shop
    // const shop = await prisma.shop.findUnique({ ... })
    
    return {
      shopDomain: "demo-shop.myshopify.com",
      activeSubscription,
      activeCardsCount: 2,
      totalViews: 12450,
      totalClicks: 840,
      ctr: "6.7%",
      mostUsedTemplate: "Floating Glass",
      estimatedRevenue: "$1,240.50",
      recentActivity: [
        { id: "1", action: "Created new card", card: "Summer Sale", date: "2 hours ago" },
        { id: "2", action: "Updated template", card: "Welcome Offer", date: "1 day ago" },
        { id: "3", action: "Upgraded plan", card: "Starter", date: "3 days ago" },
      ]
    };
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    console.error("[app._index.jsx] Critical loader error:", error);
    throw error;
  }
};

export default function Dashboard() {
  const data = useLoaderData();
  const navigate = useNavigate();

  // Premium CSS for the Glassmorphism and gradients
  const premiumStyles = `
    .premium-card {
      background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.18);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05);
      border-radius: 12px;
      overflow: hidden;
      transition: transform 0.3s ease;
    }
    .premium-card:hover {
      transform: translateY(-5px);
    }
    .metric-value {
      font-size: 2rem;
      font-weight: 700;
      background: -webkit-linear-gradient(45deg, #000000, #434343);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .gradient-header {
      background: linear-gradient(90deg, #1a1a1a, #333333);
      color: white;
      padding: 24px;
      border-radius: 12px;
      margin-bottom: 24px;
    }
  `;

  return (
    <Page fullWidth>
      <style>{premiumStyles}</style>
      
      <div className="gradient-header">
        <InlineStack align="space-between" blockAlign="center">
          <BlockStack gap="200">
            <Text variant="heading3xl" as="h1" tone="textInverse">
              Welcome back to Stickycards Pro
            </Text>
            <Text variant="bodyLg" as="p" tone="textInverse">
              Your store is currently on the <Badge tone="success">{data.activeSubscription} PLAN</Badge>
            </Text>
          </BlockStack>
          <Button variant="primary" onClick={() => navigate("/app/templates")} size="large">
            Create Sticky Card
          </Button>
        </InlineStack>
      </div>

      <Layout>
        <Layout.Section>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <Card>
              <BlockStack gap="200">
                <Text variant="headingSm" as="h6" tone="subdued">Total Views</Text>
                <InlineStack align="space-between" blockAlign="center">
                  <span className="metric-value">{data.totalViews.toLocaleString()}</span>
                  <Icon source={BookOpenIcon} tone="base" />
                </InlineStack>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="200">
                <Text variant="headingSm" as="h6" tone="subdued">Total Clicks</Text>
                <InlineStack align="space-between" blockAlign="center">
                  <span className="metric-value">{data.totalClicks.toLocaleString()}</span>
                  <Icon source={ButtonPressIcon} tone="base" />
                </InlineStack>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="200">
                <Text variant="headingSm" as="h6" tone="subdued">Avg. CTR</Text>
                <InlineStack align="space-between" blockAlign="center">
                  <span className="metric-value">{data.ctr}</span>
                  <Icon source={AppsIcon} tone="base" />
                </InlineStack>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="200">
                <Text variant="headingSm" as="h6" tone="subdued">Est. Revenue</Text>
                <InlineStack align="space-between" blockAlign="center">
                  <span className="metric-value">{data.estimatedRevenue}</span>
                  <Icon source={BankIcon} tone="base" />
                </InlineStack>
              </BlockStack>
            </Card>
          </div>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">App Status</Text>
              <InlineStack align="space-between">
                <Text variant="bodyMd" as="span">Active Cards</Text>
                <Text variant="bodyMd" as="span" fontWeight="bold">{data.activeCardsCount} / 5</Text>
              </InlineStack>
              <InlineStack align="space-between">
                <Text variant="bodyMd" as="span">Top Template</Text>
                <Text variant="bodyMd" as="span" fontWeight="bold">{data.mostUsedTemplate}</Text>
              </InlineStack>
              <Button variant="plain" onClick={() => navigate("/app/billing")}>Manage Subscription</Button>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section variant="twoThirds">
          <Card padding="0">
            <Box padding="400">
              <Text variant="headingMd" as="h2">Recent Activity</Text>
            </Box>
            <IndexTable
              resourceName={{ singular: 'activity', plural: 'activities' }}
              itemCount={data.recentActivity.length}
              headings={[
                { title: 'Action' },
                { title: 'Item' },
                { title: 'Date' },
              ]}
              selectable={false}
            >
              {data.recentActivity.map((activity, index) => (
                <IndexTable.Row id={activity.id} key={activity.id} position={index}>
                  <IndexTable.Cell><Text variant="bodyMd" fontWeight="bold">{activity.action}</Text></IndexTable.Cell>
                  <IndexTable.Cell>{activity.card}</IndexTable.Cell>
                  <IndexTable.Cell><Text tone="subdued">{activity.date}</Text></IndexTable.Cell>
                </IndexTable.Row>
              ))}
            </IndexTable>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
