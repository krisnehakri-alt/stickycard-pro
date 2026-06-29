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
  Box
} from "@shopify/polaris";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  
  return {
    shopDomain: "demo-shop.myshopify.com",
    activeSubscription: "STARTER", // Mock
    templates: [
      { id: "template_1", name: "Clean Modern", plan: "FREE", color: "#f4f6f8" },
      { id: "template_2", name: "Floating Glass", plan: "STARTER", color: "rgba(255,255,255,0.7)" },
      { id: "template_3", name: "Neon Sale", plan: "STARTER", color: "#2c003e" },
      { id: "template_4", name: "Luxury Dark", plan: "GROWTH", color: "#1a1a1a" },
      { id: "template_5", name: "Product Launch Motion", plan: "GROWTH", color: "linear-gradient(45deg, #ff6b6b, #feca57)" },
      { id: "template_6", name: "Black & Gold VIP", plan: "PREMIUM", color: "#000000" },
      { id: "template_7", name: "Enterprise Ultra", plan: "PREMIUM", color: "#0a2540" }
    ]
  };
};

export default function Templates() {
  const data = useLoaderData();
  const navigate = useNavigate();

  const planOrder = { "FREE": 1, "STARTER": 2, "GROWTH": 3, "PREMIUM": 4 };
  const currentPlanValue = planOrder[data.activeSubscription];

  return (
    <Page 
      fullWidth 
      title="Sticky Card Templates" 
      backAction={{content: 'Dashboard', onAction: () => navigate('/app')}}
    >
      <Layout>
        {data.templates.map(template => {
          const reqPlanValue = planOrder[template.plan];
          const isLocked = reqPlanValue > currentPlanValue;
          
          return (
            <Layout.Section variant="oneThird" key={template.id}>
              <Card padding="0">
                <div style={{
                  height: '200px',
                  background: template.color,
                  borderBottom: '1px solid #e5e5e5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  {isLocked && (
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      background: 'rgba(255,255,255,0.8)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10
                    }}>
                      <Text variant="headingMd" as="h3">Locked</Text>
                      <Button variant="primary" onClick={() => navigate('/app/billing')} tone="success">
                        Upgrade to {template.plan}
                      </Button>
                    </div>
                  )}
                  {/* Miniature preview mock */}
                  {!isLocked && (
                    <div style={{ padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
                       <Text variant="bodyMd" fontWeight="bold">Sample Offer</Text>
                       <Text variant="bodySm">20% OFF</Text>
                    </div>
                  )}
                </div>
                
                <Box padding="400">
                  <BlockStack gap="400">
                    <InlineStack align="space-between" blockAlign="center">
                      <Text variant="headingMd" as="h3">{template.name}</Text>
                      <Badge tone={template.plan === "FREE" ? "info" : template.plan === "PREMIUM" ? "critical" : "success"}>
                        {template.plan}
                      </Badge>
                    </InlineStack>
                    <Button 
                      fullWidth 
                      variant="primary" 
                      disabled={isLocked}
                      onClick={() => navigate(`/app/card/new?template=${template.id}`)}
                    >
                      Use Template
                    </Button>
                  </BlockStack>
                </Box>
              </Card>
            </Layout.Section>
          )
        })}
      </Layout>
    </Page>
  );
}
