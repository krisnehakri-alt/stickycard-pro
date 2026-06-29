import { useLoaderData, useNavigate } from "react-router";
import { authenticate } from "../shopify.server";
import { 
  Page, 
  Layout, 
  Card, 
  Text, 
  BlockStack, 
  Button, 
  FormLayout,
  TextField,
  Select
} from "@shopify/polaris";
import { useState } from "react";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  
  return {
    shopDomain: "demo-shop.myshopify.com",
    settings: {
      globalStatus: "ACTIVE",
      defaultLanguage: "en"
    }
  };
};

export default function Settings() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [status, setStatus] = useState(data.settings.globalStatus);

  return (
    <Page 
      title="Global Settings" 
      backAction={{content: 'Dashboard', onAction: () => navigate('/app')}}
    >
      <Layout>
        <Layout.AnnotatedSection
          title="App Status"
          description="Enable or disable Sticky Cards across your entire store."
        >
          <Card>
            <BlockStack gap="400">
              <Select
                label="Global App Status"
                options={[
                  {label: 'Active', value: 'ACTIVE'},
                  {label: 'Disabled', value: 'DISABLED'},
                ]}
                onChange={setStatus}
                value={status}
              />
              <Text variant="bodyMd" tone="subdued">
                When disabled, no sticky cards will appear on your storefront regardless of individual card settings.
              </Text>
            </BlockStack>
          </Card>
        </Layout.AnnotatedSection>

        <Layout.AnnotatedSection
          title="Advanced Settings"
          description="Manage theme integration and other advanced options."
        >
          <Card>
            <FormLayout>
              <TextField
                label="Custom CSS (Optional)"
                multiline={4}
                autoComplete="off"
                placeholder="/* Add custom styles here */"
              />
              <Button submit variant="primary">Save Settings</Button>
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}
