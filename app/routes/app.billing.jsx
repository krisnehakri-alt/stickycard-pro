import { useLoaderData, useNavigate, Form, redirect } from "react-router";
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
  const { billing } = await authenticate.admin(request);
  
  // Check active subscription
  const billingCheck = await billing.check({
    plans: ["STARTER", "GROWTH", "PREMIUM"],
    isTest: true,
  });

  const activeSubscription = billingCheck.hasActivePayment 
    ? billingCheck.appSubscriptions[0].name 
    : "FREE";

  return { activeSubscription };
};

export const action = async ({ request }) => {
  const { billing, session } = await authenticate.admin(request);
  const formData = await request.formData();
  const plan = formData.get("plan");

  if (plan === "FREE") {
    // Handle cancel/downgrade to FREE
    const billingCheck = await billing.check({
      plans: ["STARTER", "GROWTH", "PREMIUM"],
      isTest: true,
    });
    
    if (billingCheck.hasActivePayment) {
      await billing.cancel({
        subscriptionId: billingCheck.appSubscriptions[0].id,
        isTest: true,
        prorate: true,
      });
    }
    return redirect("/app/billing");
  }

  try {
    // Request new plan and redirect to Shopify approval page
    const response = await billing.request({
      plan,
      isTest: true,
      returnUrl: `https://admin.shopify.com/store/${session.shop.split('.')[0]}/apps/${process.env.SHOPIFY_API_KEY}/app`,
    });
    
    // If Shopify returned a Response, we can throw it so React Router handles the redirect
    throw response;
  } catch (error) {
    if (error instanceof Response) throw error;
    // Catch real errors and throw a Response so it doesn't get masked as 'Unexpected Server Error' in production
    console.error("Billing action failed:", error);
    throw new Response(error.stack || error.message || String(error), { status: 500 });
  }
};

export default function Billing() {
  const data = useLoaderData();
  const navigate = useNavigate();

  const plans = [
    {
      name: "FREE",
      price: "$0",
      description: "Basic features to get started",
      features: ["1 Active Card", "Clean Modern Template", "Basic customization"],
      isCurrent: data.activeSubscription === "FREE"
    },
    {
      name: "STARTER",
      price: "$39/mo",
      description: "Grow your conversions",
      features: ["Everything in Free", "Unlock design 2 (modern cards)", "Unlock design 3 (Icon focus)", "Floating Glass & Neon Templates"],
      isCurrent: data.activeSubscription === "STARTER"
    },
    {
      name: "GROWTH",
      price: "$59/mo",
      description: "For growing stores",
      features: ["Everything in Starter", "Unlock design 2 (Luxury Dark)", "Unlock design 5 (Icon focus)", "Priority Support"],
      isCurrent: data.activeSubscription === "GROWTH"
    },
    {
      name: "PREMIUM",
      price: "$99/mo",
      description: "Enterprise level features",
      features: ["Everything in Growth", "Unlock design 2 (Premium Animated)", "Unlock design 7 (Icon focus)", "VIP & Enterprise Templates"],
      isCurrent: data.activeSubscription === "PREMIUM"
    }
  ];

  return (
    <Page
      fullWidth
      title="Subscription Plans"
      backAction={{ content: 'Dashboard', onAction: () => navigate('/app') }}
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

                <Form method="POST" reloadDocument>
                  <input type="hidden" name="plan" value={plan.name} />
                  <Button
                    fullWidth
                    variant={plan.name === "PREMIUM" ? "primary" : "secondary"}
                    disabled={plan.isCurrent}
                    submit
                  >
                    {plan.isCurrent ? "Current Plan" : "Upgrade"}
                  </Button>
                </Form>
              </BlockStack>
            </Card>
          </Layout.Section>
        ))}
      </Layout>
    </Page>
  );
}
