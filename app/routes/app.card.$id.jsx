import { useLoaderData, useNavigate } from "react-router";
import { authenticate } from "../shopify.server";
import { 
  Page, 
  Layout, 
  Card, 
  Text, 
  BlockStack, 
  FormLayout,
  TextField,
  Select,
  Button,
  InlineStack
} from "@shopify/polaris";
import { useState } from "react";

export const loader = async ({ request, params }) => {
  await authenticate.admin(request);
  
  return {
    shopDomain: "demo-shop.myshopify.com",
    cardId: params.id,
    templateId: new URL(request.url).searchParams.get("template") || "template_1",
    card: {
      name: "My New Campaign",
      isActive: true,
      displayPages: "ALL",
      triggerRule: "IMMEDIATE",
      desktopPosition: "BOTTOM_RIGHT",
      items: [
        {
          heading: "Special Offer",
          description: "Get 20% off your first order!",
          buttonText: "Shop Now",
        }
      ]
    }
  };
};

export default function CardEditor() {
  const data = useLoaderData();
  const navigate = useNavigate();
  
  const [heading, setHeading] = useState(data.card.items[0].heading);
  const [description, setDescription] = useState(data.card.items[0].description);
  const [buttonText, setButtonText] = useState(data.card.items[0].buttonText);
  const [displayPages, setDisplayPages] = useState(data.card.displayPages);
  const [triggerRule, setTriggerRule] = useState(data.card.triggerRule);

  return (
    <Page 
      title="Edit Sticky Card" 
      backAction={{content: 'Templates', onAction: () => navigate('/app/templates')}}
      primaryAction={{content: 'Save', onAction: () => console.log('saved')}}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">Card Content</Text>
              <FormLayout>
                <TextField label="Heading" value={heading} onChange={setHeading} autoComplete="off" />
                <TextField label="Description" value={description} onChange={setDescription} multiline={3} autoComplete="off" />
                <TextField label="Button Text" value={buttonText} onChange={setButtonText} autoComplete="off" />
              </FormLayout>
            </BlockStack>
          </Card>
          
          <div style={{ marginTop: '16px' }}>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">Display Rules</Text>
                <FormLayout>
                  <Select
                    label="Show on Pages"
                    options={[
                      {label: 'All Pages', value: 'ALL'},
                      {label: 'Homepage Only', value: 'HOMEPAGE'},
                      {label: 'Product Pages', value: 'PRODUCT'},
                    ]}
                    value={displayPages}
                    onChange={setDisplayPages}
                  />
                  <Select
                    label="Trigger Condition"
                    options={[
                      {label: 'Immediately', value: 'IMMEDIATE'},
                      {label: 'After 5 seconds', value: 'DELAY_5'},
                      {label: 'On Exit Intent', value: 'EXIT_INTENT'},
                      {label: 'Scroll to 25%', value: 'SCROLL_25'},
                    ]}
                    value={triggerRule}
                    onChange={setTriggerRule}
                  />
                </FormLayout>
              </BlockStack>
            </Card>
          </div>
        </Layout.Section>
        
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">Live Preview</Text>
              <div style={{ 
                padding: '20px', 
                border: '1px solid #e5e5e5', 
                borderRadius: '8px',
                background: '#f4f6f8'
              }}>
                <div style={{
                  background: 'white',
                  padding: '16px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  <Text variant="headingSm" as="h3">{heading}</Text>
                  <div style={{ marginTop: '8px', marginBottom: '12px' }}>
                    <Text variant="bodySm">{description}</Text>
                  </div>
                  <Button variant="primary" fullWidth>{buttonText}</Button>
                </div>
              </div>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
