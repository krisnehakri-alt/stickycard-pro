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
  List,
  Box
} from "@shopify/polaris";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  
  return {
    activeSubscription: "FREE", // Mock
  };
};

export const action = async ({ request }) => {
  const { admin, billing } = await authenticate.admin(request);
  // Real implementation will call billing.request() here
  return null;
};

export default function Billing() {
  const data = useLoaderData();
  const navigate = useNavigate();

  const plans = [
    {
      name: "FREE",
      price: "$0",
      description: "Basic features to get started",
      features: ["1 Active Card", "Clean Modern Template", "Basic Analytics"],
      isCurrent: data.activeSubscription === "FREE"
    },
    {
      name: "STARTER",
      price: "$39/mo",
      description: "Grow your conversions",
      features: ["3 Active Cards", "Floating Glass & Neon Templates", "Advanced Analytics"],
      isCurrent: data.activeSubscription === "STARTER"
    },
    {
      name: "GROWTH",
      price: "$59/mo",
      description: "For growing stores",
      features: ["5 Active Cards", "Luxury Dark & Motion Templates", "Priority Support"],
      isCurrent: data.activeSubscription === "GROWTH"
    },
    {
      name: "PREMIUM",
      price: "$99/mo",
      description: "Enterprise level features",
      features: ["Unlimited Cards", "VIP & Enterprise Templates", "Dedicated Success Manager"],
      isCurrent: data.activeSubscription === "PREMIUM"
    }
  ];

  return (
    <Page 
      fullWidth 
      title="Subscription Plans" 
      backAction={{content: 'Dashboard', onAction: () => navigate('/app')}}
    >
      <Layout>
        {plans.map(plan => (
          <Layout.Section variant="oneThird" key={plan.name}>
            <Card background={plan.isCurrent ? "bg-surface-success" : "bg-surface"}>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">{plan.name}</Text>
                <Text variant="heading2xl" as="p" fontWeight="bold">{plan.price}</Text>
                <Text variant="bodyMd" tone="subdued">{plan.description}</Text>
                
                <Box paddingBlockStart="400" paddingBlockEnd="400">
                  <List>
                    {plan.features.map(feature => (
                      <List.Item key={feature}>{feature}</List.Item>
                    ))}
                  </List>
                </Box>
                
                <form method="POST">
                  <input type="hidden" name="plan" value={plan.name} />
                  <Button 
                    fullWidth 
                    variant={plan.name === "PREMIUM" ? "primary" : "secondary"}
                    disabled={plan.isCurrent}
                    submit
                  >
                    {plan.isCurrent ? "Current Plan" : "Upgrade"}
                  </Button>
                </form>
              </BlockStack>
            </Card>
          </Layout.Section>
        ))}
      </Layout>
    </Page>
  );
}
