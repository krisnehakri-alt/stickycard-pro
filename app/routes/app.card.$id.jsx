import { useLoaderData, useNavigate, useSubmit, useNavigation, useActionData } from "react-router";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";
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
import { useState, useEffect } from "react";

export const action = async ({ request, params }) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  
  const heading = formData.get("heading");
  const description = formData.get("description");
  const buttonText = formData.get("buttonText");
  const displayPages = formData.get("displayPages");
  const couponCode = formData.get("couponCode");
  const templateId = formData.get("templateId") || "template_1";
  
  if (!heading || !description || !buttonText) {
    return { error: "Please fill in all required fields." };
  }

  try {
    let shop = await prisma.shop.findUnique({ where: { shopDomain: session.shop } });
    if (!shop) {
      shop = await prisma.shop.create({ data: { shopDomain: session.shop } });
    }

    const cardId = params.id;

    if (cardId !== "new") {
      // Deactivate all other cards
      await prisma.stickyCard.updateMany({
        where: { shopId: shop.id, id: { not: cardId } },
        data: { isActive: false }
      });

      await prisma.stickyCard.update({
        where: { id: cardId },
        data: {
          displayPages,
          isActive: true, // Ensure it's active
          items: {
            deleteMany: {},
            create: [{ heading, description, buttonText, couponCode }]
          }
        }
      });
    } else {
      // Deactivate all existing cards
      await prisma.stickyCard.updateMany({
        where: { shopId: shop.id },
        data: { isActive: false }
      });

      await prisma.stickyCard.create({
        data: {
          shopId: shop.id,
          name: "My Campaign",
          templateId,
          displayPages,
          isActive: true,
          items: {
            create: [{ heading, description, buttonText, couponCode }]
          }
        }
      });
    }
    return { success: true };
  } catch (error) {
    console.error("Save error:", error);
    return { error: "Failed to save template. Please try again." };
  }
};

export const loader = async ({ request, params }) => {
  const { session } = await authenticate.admin(request);
  const cardId = params.id;
  const templateId = new URL(request.url).searchParams.get("template") || "template_1";

  const defaultCoupons = {
    'template_1': 'WELCOME20',
    'template_2': 'SAVE25',
    'template_3': 'NEON30',
    'template_4': 'LUXURY40',
    'template_5': 'LAUNCH35',
    'template_6': 'VIP50',
    'template_7': 'MEGA60'
  };
  const defaultCouponCode = defaultCoupons[templateId] || 'WELCOME20';

  let card = {
    name: "My New Campaign",
    isActive: true,
    displayPages: "ALL",
    desktopPosition: "BOTTOM_RIGHT",
    items: [
      {
        heading: "Special Offer",
        description: "Get 20% off your first order!",
        buttonText: "Shop Now",
        couponCode: defaultCouponCode
      }
    ]
  };

  if (cardId !== "new") {
    const dbCard = await prisma.stickyCard.findUnique({
      where: { id: cardId },
      include: { items: true }
    });
    if (dbCard) {
      card = {
        ...dbCard,
        items: dbCard.items.length > 0 ? dbCard.items : card.items
      };
    }
  }
  
  return {
    shopDomain: session.shop,
    cardId,
    templateId,
    card
  };
};

const renderPreview = (templateId, heading, description, buttonText, couponCode) => {
  const containerHeight = '280px';
  const innerScale = 'scale(1)';

  switch(templateId) {
    case 'template_1':
      return (
        <div style={{ background: '#f8f9fa', height: containerHeight, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ transform: innerScale, background: 'white', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '280px', textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
             <Text variant="headingLg" as="h4">{heading}</Text>
             <div style={{ marginTop: '8px' }}><Text variant="bodyMd">{description}</Text></div>
             <div style={{ marginTop: '16px', fontSize: '12px', color: '#666' }}>Use Code: <strong>{couponCode}</strong></div>
             <div style={{ marginTop: '16px', background: '#111', color: '#fff', padding: '10px', borderRadius: '6px', fontWeight: 'bold' }}>{buttonText}</div>
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
             <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#111', marginTop: '4px' }}>{heading}</div>
             <div style={{ marginTop: '4px' }}><Text variant="bodyMd">{description}</Text></div>
             <div style={{ marginTop: '12px', fontSize: '12px', color: '#333' }}>Use Code: <strong>{couponCode}</strong></div>
             <div style={{ marginTop: '16px', background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', color: '#fff', padding: '10px', borderRadius: '8px', fontWeight: 'bold' }}>{buttonText}</div>
          </div>
        </div>
      );
    case 'template_3':
      return (
        <div style={{ background: '#0a0a0a', height: containerHeight, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ transform: innerScale, border: '2px solid #ff007f', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '280px', textAlign: 'center', boxShadow: '0 0 15px rgba(255,0,127,0.3), inset 0 0 15px rgba(255,0,127,0.1)' }}>
             <div style={{ color: '#ff007f', textShadow: '0 0 8px rgba(255,0,127,0.6)', fontSize: '14px', fontWeight: 'bold' }}>BIG SALE</div>
             <div style={{ color: '#fff', fontSize: '26px', fontWeight: '900', marginTop: '4px' }}>{heading}</div>
             <div style={{ marginTop: '4px', color: '#ddd', fontSize: '13px' }}>{description}</div>
             <div style={{ marginTop: '12px', fontSize: '11px', color: '#aaa' }}>Use Code: <span style={{ color: '#ff007f' }}>{couponCode}</span></div>
             <div style={{ marginTop: '16px', background: '#ff007f', color: '#fff', padding: '10px', borderRadius: '6px', fontWeight: 'bold', boxShadow: '0 0 10px rgba(255,0,127,0.4)' }}>{buttonText}</div>
          </div>
        </div>
      );
    case 'template_4':
      return (
        <div style={{ background: '#111', height: containerHeight, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, #2a2a2a 0%, #111 100%)' }}></div>
          <div style={{ transform: innerScale, background: '#1a1a1a', border: '1px solid #d4af37', padding: '24px', borderRadius: '4px', width: '100%', maxWidth: '280px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 1 }}>
             <div style={{ color: '#d4af37', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>Exclusive Offer</div>
             <div style={{ color: '#fff', fontSize: '26px', fontWeight: '300', marginTop: '8px', fontFamily: 'serif' }}>{heading}</div>
             <div style={{ marginTop: '4px', color: '#aaa', fontSize: '12px' }}>{description}</div>
             <div style={{ marginTop: '12px', fontSize: '11px', color: '#888' }}>Use Code: <span style={{ color: '#d4af37' }}>{couponCode}</span></div>
             <div style={{ marginTop: '16px', background: 'linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7)', color: '#000', padding: '10px', borderRadius: '2px', fontWeight: 'bold' }}>{buttonText}</div>
          </div>
        </div>
      );
    case 'template_5':
      return (
        <div style={{ background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)', height: containerHeight, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ transform: innerScale, background: 'white', padding: '24px', borderRadius: '16px', width: '100%', maxWidth: '280px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', position: 'relative' }}>
             <div style={{ position: 'absolute', top: '-10px', left: '-10px', background: '#ff4757', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>New</div>
             <div style={{ color: '#333', fontSize: '13px', fontWeight: 'bold' }}>New Arrival</div>
             <div style={{ color: '#2f3542', fontSize: '18px', fontWeight: '800', marginTop: '2px' }}>{heading}</div>
             <div style={{ color: '#ff4757', fontSize: '14px', fontWeight: '600', marginTop: '4px' }}>{description}</div>
             <div style={{ marginTop: '12px', fontSize: '11px', color: '#747d8c' }}>Use Code: <span style={{ color: '#333', fontWeight: 'bold' }}>{couponCode}</span></div>
             <div style={{ marginTop: '16px', background: 'linear-gradient(135deg, #ff6b81 0%, #ff4757 100%)', color: '#fff', padding: '10px', borderRadius: '24px', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(255,71,87,0.3)' }}>{buttonText}</div>
          </div>
        </div>
      );
    case 'template_6':
      return (
        <div style={{ background: '#000', height: containerHeight, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ transform: innerScale, background: '#0a0a0a', border: '1px solid #333', padding: '24px', borderRadius: '8px', width: '100%', maxWidth: '280px', textAlign: 'center', boxShadow: '0 15px 35px rgba(0,0,0,0.6)' }}>
             <div style={{ color: '#ffd700', fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px' }}>VIP ACCESS</div>
             <div style={{ color: '#fff', fontSize: '26px', fontWeight: '900', marginTop: '8px' }}>{heading}</div>
             <div style={{ marginTop: '4px', color: '#aaa', fontSize: '12px' }}>{description}</div>
             <div style={{ marginTop: '12px', fontSize: '11px', color: '#777' }}>Use Code: <span style={{ color: '#fff' }}>{couponCode}</span></div>
             <div style={{ marginTop: '16px', background: '#ffd700', color: '#000', padding: '10px', borderRadius: '4px', fontWeight: '800' }}>{buttonText}</div>
          </div>
        </div>
      );
    case 'template_7':
      return (
        <div style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', height: containerHeight, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ transform: innerScale, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '280px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
             <div style={{ color: '#fff', fontSize: '16px', fontWeight: '600', letterSpacing: '1px' }}>MEGA OFFER</div>
             <div style={{ color: '#4facfe', fontSize: '28px', fontWeight: '900', marginTop: '4px' }}>{heading}</div>
             <div style={{ marginTop: '4px', color: '#ccc', fontSize: '12px' }}>{description}</div>
             <div style={{ marginTop: '12px', fontSize: '11px', color: '#999' }}>Use Code: <span style={{ color: '#fff' }}>{couponCode}</span></div>
             <div style={{ marginTop: '16px', background: '#0062ff', color: '#fff', padding: '10px', borderRadius: '6px', fontWeight: 'bold' }}>{buttonText}</div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default function CardEditor() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData();
  
  const [heading, setHeading] = useState(data.card.items[0].heading);
  const [description, setDescription] = useState(data.card.items[0].description);
  const [buttonText, setButtonText] = useState(data.card.items[0].buttonText);
  const [displayPages, setDisplayPages] = useState(data.card.displayPages);
  const [couponCode, setCouponCode] = useState(data.card.items[0].couponCode || "");

  const isSaving = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.error) {
      shopify.toast.show(actionData.error, { isError: true });
    } else if (actionData?.success) {
      shopify.toast.show("Template saved successfully.");
      setTimeout(() => {
        navigate("/app/templates");
      }, 1000);
    }
  }, [actionData, navigate]);

  const handleSave = () => {
    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("description", description);
    formData.append("buttonText", buttonText);
    formData.append("displayPages", displayPages);
    formData.append("couponCode", couponCode);
    formData.append("templateId", data.templateId);
    
    submit(formData, { method: "post" });
  };

  return (
    <Page 
      title="Edit Sticky Card" 
      backAction={{content: 'Templates', onAction: () => navigate('/app/templates')}}
      primaryAction={{
        content: 'Save', 
        onAction: handleSave,
        loading: isSaving,
        disabled: isSaving
      }}
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
                  <TextField 
                    label="Coupon Code (Use Code)" 
                    value={couponCode} 
                    onChange={setCouponCode} 
                    autoComplete="off" 
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
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
                {renderPreview(data.templateId, heading, description, buttonText, couponCode)}
              </div>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
