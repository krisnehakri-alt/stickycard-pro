import prisma from "../db.server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const shopDomain = url.searchParams.get("shop");
  
  if (!shopDomain) {
    return Response.json({ error: "Missing shop parameter" }, { 
      status: 400,
      headers: { 
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
      }
    });
  }

  try {
    const shop = await prisma.shop.findUnique({
      where: { shopDomain },
      include: {
        stickyCards: {
          where: { isActive: true },
          include: { items: true },
          take: 1
        }
      }
    });

    if (!shop || !shop.stickyCards || shop.stickyCards.length === 0) {
      return Response.json({ activeCard: null }, { 
        headers: { 
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
        } 
      });
    }

    const activeCard = shop.stickyCards[0];
    const item = activeCard.items?.[0] || {};
    const heading = item.heading || "Special Offer";
    const description = item.description || "";
    const buttonText = item.buttonText || "Shop Now";
    const couponCode = item.couponCode || "";
    const templateId = activeCard.templateId || "template_1";

    const defaultCoupon = couponCode || '';
    let html = '';
    
    switch(templateId) {
      case 'template_1':
        html = `
          <div style="background: white; padding: 24px; border-radius: 12px; width: 100%; max-width: 280px; text-align: center; box-shadow: 0 8px 24px rgba(0,0,0,0.05); box-sizing: border-box; display: block;">
             <h4 data-sc-heading style="font-size: 20px; font-weight: 700; margin: 0; color: #202223; line-height: 1.2;">${heading}</h4>
             <div data-sc-description style="margin-top: 8px; font-size: 14px; color: #6d7175; line-height: 1.4;">${description}</div>
             <div style="margin-top: 16px; font-size: 12px; color: #666; line-height: 1.2;">Use Code: <strong data-sc-coupon>${defaultCoupon}</strong></div>
             <div data-sc-button style="margin-top: 16px; background: #111; color: #fff; padding: 10px; border-radius: 6px; font-weight: bold; cursor: pointer; text-align: center; font-size: 14px;">${buttonText}</div>
          </div>
        `;
        break;
      case 'template_2':
        html = `
          <div style="position: relative; overflow: hidden; border-radius: 16px; padding: 24px; width: 100%; max-width: 280px; text-align: center; background: rgba(255,255,255,0.8); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.5); box-shadow: 0 8px 32px rgba(31,38,135,0.15); z-index: 1; box-sizing: border-box;">
             <h5 style="font-size: 14px; margin: 0; color: #333; line-height: 1.2;">Special Offer!</h5>
             <div data-sc-heading style="font-size: 22px; font-weight: bold; color: #111; margin-top: 4px; line-height: 1.2;">${heading}</div>
             <div data-sc-description style="margin-top: 4px; font-size: 14px; color: #555; line-height: 1.4;">${description}</div>
             <div style="margin-top: 12px; font-size: 12px; color: #333; line-height: 1.2;">Use Code: <strong data-sc-coupon>${defaultCoupon}</strong></div>
             <div data-sc-button style="margin-top: 16px; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: #fff; padding: 10px; border-radius: 8px; font-weight: bold; cursor: pointer; text-align: center; font-size: 14px;">${buttonText}</div>
          </div>
        `;
        break;
      case 'template_3':
        html = `
          <div style="border: 2px solid #ff007f; padding: 24px; border-radius: 12px; width: 100%; max-width: 280px; text-align: center; box-shadow: 0 0 15px rgba(255,0,127,0.3), inset 0 0 15px rgba(255,0,127,0.1); background: #0a0a0a; box-sizing: border-box;">
             <div style="color: #ff007f; text-shadow: 0 0 8px rgba(255,0,127,0.6); font-size: 14px; font-weight: bold; line-height: 1.2;">BIG SALE</div>
             <div data-sc-heading style="color: #fff; font-size: 26px; font-weight: 900; margin-top: 4px; line-height: 1.2;">${heading}</div>
             <div data-sc-description style="margin-top: 4px; color: #ddd; font-size: 13px; line-height: 1.4;">${description}</div>
             <div style="margin-top: 12px; font-size: 11px; color: #aaa; line-height: 1.2;">Use Code: <span data-sc-coupon style="color: #ff007f;">${defaultCoupon}</span></div>
             <div data-sc-button style="margin-top: 16px; background: #ff007f; color: #fff; padding: 10px; border-radius: 6px; font-weight: bold; box-shadow: 0 0 10px rgba(255,0,127,0.4); cursor: pointer; text-align: center; font-size: 14px;">${buttonText}</div>
          </div>
        `;
        break;
      case 'template_4':
        html = `
          <div style="background: #1a1a1a; border: 1px solid #d4af37; padding: 24px; border-radius: 4px; width: 100%; max-width: 280px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 1; box-sizing: border-box;">
             <div style="color: #d4af37; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; line-height: 1.2;">Exclusive Offer</div>
             <div data-sc-heading style="color: #fff; font-size: 26px; font-weight: 300; margin-top: 8px; font-family: serif; line-height: 1.2;">${heading}</div>
             <div data-sc-description style="margin-top: 4px; color: #aaa; font-size: 12px; line-height: 1.4;">${description}</div>
             <div style="margin-top: 12px; font-size: 11px; color: #888; line-height: 1.2;">Use Code: <span data-sc-coupon style="color: #d4af37;">${defaultCoupon}</span></div>
             <div data-sc-button style="margin-top: 16px; background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7); color: #000; padding: 10px; border-radius: 2px; font-weight: bold; cursor: pointer; text-align: center; font-size: 14px;">${buttonText}</div>
          </div>
        `;
        break;
      case 'template_5':
        html = `
          <div style="background: white; padding: 24px; border-radius: 16px; width: 100%; max-width: 280px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.08); position: relative; box-sizing: border-box;">
             <div style="position: absolute; top: -10px; left: -10px; background: #ff4757; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">New</div>
             <div style="color: #333; font-size: 13px; font-weight: bold; line-height: 1.2;">New Arrival</div>
             <div data-sc-heading style="color: #2f3542; font-size: 18px; font-weight: 800; margin-top: 2px; line-height: 1.2;">${heading}</div>
             <div data-sc-description style="color: #ff4757; font-size: 14px; font-weight: 600; margin-top: 4px; line-height: 1.4;">${description}</div>
             <div style="margin-top: 12px; font-size: 11px; color: #747d8c; line-height: 1.2;">Use Code: <span data-sc-coupon style="color: #333; font-weight: bold;">${defaultCoupon}</span></div>
             <div data-sc-button style="margin-top: 16px; background: linear-gradient(135deg, #ff6b81 0%, #ff4757 100%); color: #fff; padding: 10px; border-radius: 24px; font-weight: bold; box-shadow: 0 4px 15px rgba(255,71,87,0.3); cursor: pointer; text-align: center; font-size: 14px;">${buttonText}</div>
          </div>
        `;
        break;
      case 'template_6':
        html = `
          <div style="background: #0a0a0a; border: 1px solid #333; padding: 24px; border-radius: 8px; width: 100%; max-width: 280px; text-align: center; box-shadow: 0 15px 35px rgba(0,0,0,0.6); box-sizing: border-box;">
             <div style="color: #ffd700; font-size: 14px; font-weight: bold; letter-spacing: 1px; line-height: 1.2;">VIP ACCESS</div>
             <div data-sc-heading style="color: #fff; font-size: 26px; font-weight: 900; margin-top: 8px; line-height: 1.2;">${heading}</div>
             <div data-sc-description style="margin-top: 4px; color: #aaa; font-size: 12px; line-height: 1.4;">${description}</div>
             <div style="margin-top: 12px; font-size: 11px; color: #777; line-height: 1.2;">Use Code: <span data-sc-coupon style="color: #fff;">${defaultCoupon}</span></div>
             <div data-sc-button style="margin-top: 16px; background: #ffd700; color: #000; padding: 10px; border-radius: 4px; font-weight: 800; cursor: pointer; text-align: center; font-size: 14px;">${buttonText}</div>
          </div>
        `;
        break;
      case 'template_7':
        html = `
          <div style="background: rgba(0,0,0,0.4); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.1); padding: 24px; border-radius: 12px; width: 100%; max-width: 280px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.5); box-sizing: border-box;">
             <div style="color: #fff; font-size: 16px; font-weight: 600; letter-spacing: 1px; line-height: 1.2;">MEGA OFFER</div>
             <div data-sc-heading style="color: #4facfe; font-size: 28px; font-weight: 900; margin-top: 4px; line-height: 1.2;">${heading}</div>
             <div data-sc-description style="margin-top: 4px; color: #ccc; font-size: 12px; line-height: 1.4;">${description}</div>
             <div style="margin-top: 12px; font-size: 11px; color: #999; line-height: 1.2;">Use Code: <span data-sc-coupon style="color: #fff;">${defaultCoupon}</span></div>
             <div data-sc-button style="margin-top: 16px; background: #0062ff; color: #fff; padding: 10px; border-radius: 6px; font-weight: bold; cursor: pointer; text-align: center; font-size: 14px;">${buttonText}</div>
          </div>
        `;
        break;
      default:
        html = '';
    }

    const payload = {
      ...activeCard,
      html
    };

    return Response.json({ activeCard: payload }, { 
      headers: { 
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
      } 
    });
  } catch (error) {
    console.error("Error in api.storefront.cards:", error);
    return Response.json({ error: "Internal Server Error" }, { 
      status: 500,
      headers: { 
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
      }
    });
  }
};
