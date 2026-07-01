import { useLoaderData, useNavigate } from "react-router";
import { authenticate } from "../shopify.server";
import { useState } from "react";
import { 
  Page, 
  Layout, 
  Card, 
  Text, 
  BlockStack, 
  InlineStack, 
  Button, 
  Badge,
  Box,
  Divider,
  Icon,
  Modal
} from "@shopify/polaris";
import { ViewIcon, LockIcon } from '@shopify/polaris-icons';

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  
  return {
    shopDomain: "demo-shop.myshopify.com",
    activeSubscription: "FREE", // Mock
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

const renderPreview = (templateId, isModal = false) => {
  const containerHeight = isModal ? '400px' : (templateId === 'premium_banner' ? '100%' : '240px');
  const innerScale = isModal ? 'scale(1.2)' : 'scale(1)';

  switch(templateId) {
    case 'template_1':
      return (
        <div style={{ background: '#f8f9fa', height: containerHeight, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ transform: innerScale, background: 'white', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '280px', textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
             <Text variant="headingLg" as="h4">Get 20% OFF</Text>
             <div style={{ marginTop: '8px' }}><Text variant="bodyMd">On your first order</Text></div>
             <div style={{ marginTop: '16px', fontSize: '12px', color: '#666' }}>Use Code: <strong>WELCOME20</strong></div>
             <div style={{ marginTop: '16px', background: '#111', color: '#fff', padding: '10px', borderRadius: '6px', fontWeight: 'bold' }}>Shop Now</div>
          </div>
        </div>
      );
    case 'template_2':
      return (
        <div style={{ background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', height: containerHeight, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', width: '100px', height: '100px', background: '#ff9a9e', borderRadius: '50%', filter: 'blur(30px)', top: '-20px', left: '-20px' }}></div>
          <div style={{ position: 'absolute', width: '120px', height: '120px', background: '#fecfef', borderRadius: '50%', filter: 'blur(30px)', bottom: '-20px', right: '-20px' }}></div>
          <div style={{ transform: innerScale, background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.5)', padding: '24px', borderRadius: '16px', width: '100%', maxWidth: '280px', textAlign: 'center', boxShadow: '0 8px 32px rgba(31,38,135,0.15)', zIndex: 1 }}>
             <Text variant="headingSm" as="h5">Special Offer!</Text>
             <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#111', marginTop: '4px' }}>Get 25% OFF!</div>
             <div style={{ marginTop: '4px' }}><Text variant="bodyMd">On all products</Text></div>
             <div style={{ marginTop: '12px', fontSize: '12px', color: '#333' }}>Use Code: <strong>SAVE25</strong></div>
             <div style={{ marginTop: '16px', background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', color: '#fff', padding: '10px', borderRadius: '8px', fontWeight: 'bold' }}>Shop Now</div>
          </div>
        </div>
      );
    case 'template_3':
      return (
        <div style={{ background: '#0a0a0a', height: containerHeight, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ transform: innerScale, border: '2px solid #ff007f', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '280px', textAlign: 'center', boxShadow: '0 0 15px rgba(255,0,127,0.3), inset 0 0 15px rgba(255,0,127,0.1)' }}>
             <div style={{ color: '#ff007f', textShadow: '0 0 8px rgba(255,0,127,0.6)', fontSize: '14px', fontWeight: 'bold' }}>BIG SALE</div>
             <div style={{ color: '#fff', fontSize: '26px', fontWeight: '900', marginTop: '4px' }}>30% OFF!</div>
             <div style={{ marginTop: '4px', color: '#ddd', fontSize: '13px' }}>On your entire order</div>
             <div style={{ marginTop: '12px', fontSize: '11px', color: '#aaa' }}>Use Code: <span style={{ color: '#ff007f' }}>NEON30</span></div>
             <div style={{ marginTop: '16px', background: '#ff007f', color: '#fff', padding: '10px', borderRadius: '6px', fontWeight: 'bold', boxShadow: '0 0 10px rgba(255,0,127,0.4)' }}>Shop Now</div>
          </div>
        </div>
      );
    case 'template_4':
      return (
        <div style={{ background: '#111', height: containerHeight, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, #2a2a2a 0%, #111 100%)' }}></div>
          <div style={{ transform: innerScale, background: '#1a1a1a', border: '1px solid #d4af37', padding: '24px', borderRadius: '4px', width: '100%', maxWidth: '280px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 1 }}>
             <div style={{ color: '#d4af37', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>Exclusive Offer</div>
             <div style={{ color: '#fff', fontSize: '26px', fontWeight: '300', marginTop: '8px', fontFamily: 'serif' }}>40% OFF</div>
             <div style={{ marginTop: '4px', color: '#aaa', fontSize: '12px' }}>For a limited time</div>
             <div style={{ marginTop: '12px', fontSize: '11px', color: '#888' }}>Use Code: <span style={{ color: '#d4af37' }}>LUXURY40</span></div>
             <div style={{ marginTop: '16px', background: 'linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7)', color: '#000', padding: '10px', borderRadius: '2px', fontWeight: 'bold' }}>Shop Now</div>
          </div>
        </div>
      );
    case 'template_5':
      return (
        <div style={{ background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)', height: containerHeight, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ transform: innerScale, background: 'white', padding: '24px', borderRadius: '16px', width: '100%', maxWidth: '280px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', position: 'relative' }}>
             <div style={{ position: 'absolute', top: '-10px', left: '-10px', background: '#ff4757', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>New</div>
             <div style={{ color: '#333', fontSize: '13px', fontWeight: 'bold' }}>New Arrival</div>
             <div style={{ color: '#2f3542', fontSize: '18px', fontWeight: '800', marginTop: '2px' }}>Launching Offer</div>
             <div style={{ color: '#ff4757', fontSize: '24px', fontWeight: '900', marginTop: '4px' }}>35% OFF</div>
             <div style={{ marginTop: '12px', fontSize: '11px', color: '#747d8c' }}>Use Code: <span style={{ color: '#333', fontWeight: 'bold' }}>LAUNCH35</span></div>
             <div style={{ marginTop: '16px', background: 'linear-gradient(135deg, #ff6b81 0%, #ff4757 100%)', color: '#fff', padding: '10px', borderRadius: '24px', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(255,71,87,0.3)' }}>Shop Now</div>
          </div>
        </div>
      );
    case 'template_6':
      return (
        <div style={{ background: '#000', height: containerHeight, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ transform: innerScale, background: '#0a0a0a', border: '1px solid #333', padding: '24px', borderRadius: '8px', width: '100%', maxWidth: '280px', textAlign: 'center', boxShadow: '0 15px 35px rgba(0,0,0,0.6)' }}>
             <div style={{ color: '#ffd700', fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px' }}>VIP ACCESS</div>
             <div style={{ color: '#fff', fontSize: '30px', fontWeight: '900', marginTop: '8px' }}>50% OFF</div>
             <div style={{ marginTop: '4px', color: '#aaa', fontSize: '12px' }}>For VIP Customers</div>
             <div style={{ marginTop: '12px', fontSize: '11px', color: '#777' }}>Use Code: <span style={{ color: '#fff' }}>VIP50</span></div>
             <div style={{ marginTop: '16px', background: '#ffd700', color: '#000', padding: '10px', borderRadius: '4px', fontWeight: '800' }}>Shop Now</div>
          </div>
        </div>
      );
    case 'template_7':
    case 'premium_banner':
      return (
        <div style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', height: templateId === 'premium_banner' && !isModal ? '100%' : containerHeight, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ transform: innerScale, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: templateId === 'premium_banner' && !isModal ? '320px' : '280px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
             <div style={{ color: '#fff', fontSize: '16px', fontWeight: '600', letterSpacing: '1px' }}>MEGA OFFER</div>
             <div style={{ color: '#4facfe', fontSize: '32px', fontWeight: '900', marginTop: '4px' }}>60% OFF</div>
             <div style={{ marginTop: '4px', color: '#ccc', fontSize: '12px' }}>Limited Time Only</div>
             <div style={{ marginTop: '12px', fontSize: '11px', color: '#999' }}>Use Code: <span style={{ color: '#fff' }}>MEGA60</span></div>
             <div style={{ marginTop: '16px', background: '#0062ff', color: '#fff', padding: '10px', borderRadius: '6px', fontWeight: 'bold' }}>Shop Now</div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default function Templates() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [previewTemplateId, setPreviewTemplateId] = useState(null);

  const planOrder = { "FREE": 1, "STARTER": 2, "GROWTH": 3, "PREMIUM": 4 };
  const currentPlanValue = planOrder[data.activeSubscription];

  const getPlanPrice = (plan) => {
    switch(plan) {
      case 'FREE': return '$0/month';
      case 'STARTER': return '$39/month';
      case 'GROWTH': return '$59/month';
      case 'PREMIUM': return '$99/month';
      default: return '$0/month';
    }
  };

  const getPlanBadgeTone = (plan) => {
    switch(plan) {
      case 'FREE': return 'info';
      case 'STARTER': return 'success';
      case 'GROWTH': return 'magic'; 
      case 'PREMIUM': return 'warning'; 
      default: return 'info';
    }
  };
  
  const getBadgeColor = (plan) => {
    switch(plan) {
      case 'FREE': return { bg: '#e4f0f6', text: '#005b82' }; 
      case 'STARTER': return { bg: '#e3f1df', text: '#2e6b28' }; 
      case 'GROWTH': return { bg: '#f1e5f8', text: '#5c2b8c' }; 
      case 'PREMIUM': return { bg: '#fcf1cd', text: '#7d6000' }; 
      default: return { bg: '#e4f0f6', text: '#005b82' };
    }
  };

  const selectedTemplate = data.templates.find(t => t.id === previewTemplateId);

  return (
    <Page 
      fullWidth 
      title="Templates"
      subtitle="Choose a beautiful template for your sticky cards"
    >
      <style>{`
        .template-card-wrapper {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 8px;
          height: 100%;
          background: white;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          border: 1px solid #e5e5e5;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .template-card-wrapper:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.1) !important;
        }
        .template-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }
        .premium-banner {
          background: #2a2a3e;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          margin-top: 40px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        .premium-banner-content {
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          flex: 1;
        }
        .premium-banner-preview {
          flex: 1;
          min-width: 300px;
        }
        @media (max-width: 768px) {
          .premium-banner {
            flex-direction: column;
          }
        }
      `}</style>
      
      <Layout>
        {/* Left Sidebar */}
        <Layout.Section variant="oneThird">
          <BlockStack gap="400">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">Plan Details</Text>
                
                <InlineStack align="space-between" blockAlign="center">
                  <Text variant="bodyMd" tone="subdued">Current Plan</Text>
                  <Badge tone={getPlanBadgeTone(data.activeSubscription)}>{data.activeSubscription}</Badge>
                </InlineStack>

                <Divider />
                
                <InlineStack align="space-between" blockAlign="center">
                  <Text variant="bodyMd" tone="subdued">Monthly Price</Text>
                  <Text variant="bodyMd" fontWeight="bold">{getPlanPrice(data.activeSubscription)}</Text>
                </InlineStack>

                <Divider />

                <InlineStack align="space-between" blockAlign="center">
                  <Text variant="bodyMd" tone="subdued">Next Billing Date</Text>
                  <Text variant="bodyMd" fontWeight="bold">Aug 1, 2026</Text>
                </InlineStack>
                
                <Box paddingBlockStart="200">
                  <Button fullWidth onClick={() => navigate('/app/billing')}>Manage Plan</Button>
                </Box>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">Need Help?</Text>
                <Text variant="bodyMd" tone="subdued">
                  Our support team is available 24/7 to help you with any questions.
                </Text>
                <Button fullWidth variant="plain">Contact Support</Button>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>

        {/* Main Grid */}
        <Layout.Section>
          <div className="template-grid">
            {data.templates.map(template => {
              const reqPlanValue = planOrder[template.plan];
              const isLocked = reqPlanValue > currentPlanValue;
              const badgeStyle = getBadgeColor(template.plan);
              
              return (
                <div className="template-card-wrapper" key={template.id}>
                  {/* Preview Area */}
                  <div style={{ position: 'relative', borderBottom: '1px solid #e5e5e5' }}>
                    {renderPreview(template.id)}
                  </div>
                  
                  {/* Content Area */}
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <InlineStack align="space-between" blockAlign="center" wrap={false}>
                      <Text variant="headingMd" as="h3">{template.name}</Text>
                      <span style={{ 
                        background: badgeStyle.bg, 
                        color: badgeStyle.text, 
                        padding: '4px 8px', 
                        borderRadius: '12px', 
                        fontSize: '11px', 
                        fontWeight: 'bold' 
                      }}>
                        {template.plan}
                      </span>
                    </InlineStack>
                    
                    <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                      <InlineStack gap="300" wrap={false}>
                        <div style={{ flex: 1 }}>
                          <Button fullWidth icon={ViewIcon} onClick={() => setPreviewTemplateId(template.id)}>Preview</Button>
                        </div>
                        <div style={{ flex: 1 }}>
                          <Button 
                            fullWidth 
                            variant={isLocked ? "secondary" : "primary"}
                            icon={isLocked ? LockIcon : undefined}
                            onClick={() => isLocked ? navigate('/app/billing') : navigate(`/app/card/new?template=${template.id}`)}
                          >
                            Use Template
                          </Button>
                        </div>
                      </InlineStack>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom Premium Showcase */}
          <div className="premium-banner">
            <div className="premium-banner-preview">
               {renderPreview('premium_banner')}
            </div>
            <div className="premium-banner-content">
               <InlineStack gap="200" blockAlign="center">
                 <div style={{ color: 'white' }}><Icon source={LockIcon} tone="base" /></div>
                 <h2 style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Enterprise Ultimate</h2>
                 <span style={{ 
                    background: '#fcf1cd', 
                    color: '#7d6000', 
                    padding: '4px 8px', 
                    borderRadius: '12px', 
                    fontSize: '11px', 
                    fontWeight: 'bold',
                  }}>
                    PREMIUM
                  </span>
               </InlineStack>
               <div style={{ marginTop: '16px', marginBottom: '24px', color: '#e5e5e5', fontSize: '16px' }}>
                 Unlock this premium template and take your offers to the next level.
               </div>
               <Button size="large" onClick={() => navigate('/app/billing')}>Upgrade to Premium</Button>
            </div>
          </div>
        </Layout.Section>
      </Layout>

      <Modal
        open={!!previewTemplateId}
        onClose={() => setPreviewTemplateId(null)}
        title={selectedTemplate ? `Preview: ${selectedTemplate.name}` : "Template Preview"}
        large
      >
        <Modal.Section flush>
          {previewTemplateId && renderPreview(previewTemplateId, true)}
        </Modal.Section>
      </Modal>

    </Page>
  );
}
