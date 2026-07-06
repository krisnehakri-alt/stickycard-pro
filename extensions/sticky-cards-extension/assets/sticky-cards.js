(function() {
  const config = window.StickyCardsConfig || {};
  const shopDomain = config.shopDomain;
  // App Proxy URL
  const API_URL = `/apps/stickycards/cards?shop=${shopDomain}`;

  function init() {
    console.log("Sticky Cards Initializing for:", shopDomain);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        if (data && data.activeCard) {
          renderCard(data.activeCard);
        } else {
          console.log("No active sticky card found.");
        }
      })
      .catch(err => console.error("Error fetching Sticky Card:", err));
  }

  function shouldDisplayOnPage(displayPages) {
    const path = window.location.pathname;
    
    if (displayPages === 'HOMEPAGE') {
      return path === '/' || path === '';
    }
    if (displayPages === 'PRODUCT') {
      return path.includes('/products/');
    }
    
    // Default to ALL
    return true;
  }

  function renderCard(data) {
    if (!data.isActive) return;
    
    if (!shouldDisplayOnPage(data.displayPages)) {
      return;
    }
    
    const root = document.getElementById("sticky-cards-root");
    if (!root) return;

    // Apply positioning
    const positionClass = data.desktopPosition ? `sc-pos-${data.desktopPosition.toLowerCase()}` : 'sc-pos-bottom_right';
    root.className = positionClass;

    const items = data.items || [];
    if (items.length === 0) return;
    const item = items[0];

    const templateId = data.templateId || 'template_1';
    
    const card = document.createElement("div");
    card.className = `sticky-card-container sc-animate-slide ${templateId}`;

    card.innerHTML = getTemplateHTML(templateId, item.heading, item.description, item.buttonText, item.couponCode);
    
    root.appendChild(card);
  }

  function getTemplateHTML(templateId, heading, description, buttonText, couponCode) {
    const defaultCoupon = couponCode || '';
    
    switch(templateId) {
      case 'template_1':
        return `
          <div style="background: white; padding: 24px; border-radius: 12px; width: 100%; max-width: 280px; text-align: center; box-shadow: 0 8px 24px rgba(0,0,0,0.05); box-sizing: border-box; display: block;">
             <h4 style="font-size: 20px; font-weight: 700; margin: 0; color: #202223; line-height: 1.2;">${heading}</h4>
             <div style="margin-top: 8px; font-size: 14px; color: #6d7175; line-height: 1.4;">${description}</div>
             <div style="margin-top: 16px; font-size: 12px; color: #666; line-height: 1.2;">Use Code: <strong>${defaultCoupon}</strong></div>
             <div style="margin-top: 16px; background: #111; color: #fff; padding: 10px; border-radius: 6px; font-weight: bold; cursor: pointer; text-align: center; font-size: 14px;">${buttonText}</div>
          </div>
        `;
      case 'template_2':
        return `
          <div style="position: relative; overflow: hidden; border-radius: 16px; padding: 24px; width: 100%; max-width: 280px; text-align: center; background: rgba(255,255,255,0.8); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.5); box-shadow: 0 8px 32px rgba(31,38,135,0.15); z-index: 1; box-sizing: border-box;">
             <h5 style="font-size: 14px; margin: 0; color: #333; line-height: 1.2;">Special Offer!</h5>
             <div style="font-size: 22px; font-weight: bold; color: #111; margin-top: 4px; line-height: 1.2;">${heading}</div>
             <div style="margin-top: 4px; font-size: 14px; color: #555; line-height: 1.4;">${description}</div>
             <div style="margin-top: 12px; font-size: 12px; color: #333; line-height: 1.2;">Use Code: <strong>${defaultCoupon}</strong></div>
             <div style="margin-top: 16px; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: #fff; padding: 10px; border-radius: 8px; font-weight: bold; cursor: pointer; text-align: center; font-size: 14px;">${buttonText}</div>
          </div>
        `;
      case 'template_3':
        return `
          <div style="border: 2px solid #ff007f; padding: 24px; border-radius: 12px; width: 100%; max-width: 280px; text-align: center; box-shadow: 0 0 15px rgba(255,0,127,0.3), inset 0 0 15px rgba(255,0,127,0.1); background: #0a0a0a; box-sizing: border-box;">
             <div style="color: #ff007f; text-shadow: 0 0 8px rgba(255,0,127,0.6); font-size: 14px; font-weight: bold; line-height: 1.2;">BIG SALE</div>
             <div style="color: #fff; font-size: 26px; font-weight: 900; margin-top: 4px; line-height: 1.2;">${heading}</div>
             <div style="margin-top: 4px; color: #ddd; font-size: 13px; line-height: 1.4;">${description}</div>
             <div style="margin-top: 12px; font-size: 11px; color: #aaa; line-height: 1.2;">Use Code: <span style="color: #ff007f;">${defaultCoupon}</span></div>
             <div style="margin-top: 16px; background: #ff007f; color: #fff; padding: 10px; border-radius: 6px; font-weight: bold; box-shadow: 0 0 10px rgba(255,0,127,0.4); cursor: pointer; text-align: center; font-size: 14px;">${buttonText}</div>
          </div>
        `;
      case 'template_4':
        return `
          <div style="background: #1a1a1a; border: 1px solid #d4af37; padding: 24px; border-radius: 4px; width: 100%; max-width: 280px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 1; box-sizing: border-box;">
             <div style="color: #d4af37; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; line-height: 1.2;">Exclusive Offer</div>
             <div style="color: #fff; font-size: 26px; font-weight: 300; margin-top: 8px; font-family: serif; line-height: 1.2;">${heading}</div>
             <div style="margin-top: 4px; color: #aaa; font-size: 12px; line-height: 1.4;">${description}</div>
             <div style="margin-top: 12px; font-size: 11px; color: #888; line-height: 1.2;">Use Code: <span style="color: #d4af37;">${defaultCoupon}</span></div>
             <div style="margin-top: 16px; background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7); color: #000; padding: 10px; border-radius: 2px; font-weight: bold; cursor: pointer; text-align: center; font-size: 14px;">${buttonText}</div>
          </div>
        `;
      case 'template_5':
        return `
          <div style="background: white; padding: 24px; border-radius: 16px; width: 100%; max-width: 280px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.08); position: relative; box-sizing: border-box;">
             <div style="position: absolute; top: -10px; left: -10px; background: #ff4757; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">New</div>
             <div style="color: #333; font-size: 13px; font-weight: bold; line-height: 1.2;">New Arrival</div>
             <div style="color: #2f3542; font-size: 18px; font-weight: 800; margin-top: 2px; line-height: 1.2;">${heading}</div>
             <div style="color: #ff4757; font-size: 14px; font-weight: 600; margin-top: 4px; line-height: 1.4;">${description}</div>
             <div style="margin-top: 12px; font-size: 11px; color: #747d8c; line-height: 1.2;">Use Code: <span style="color: #333; font-weight: bold;">${defaultCoupon}</span></div>
             <div style="margin-top: 16px; background: linear-gradient(135deg, #ff6b81 0%, #ff4757 100%); color: #fff; padding: 10px; border-radius: 24px; font-weight: bold; box-shadow: 0 4px 15px rgba(255,71,87,0.3); cursor: pointer; text-align: center; font-size: 14px;">${buttonText}</div>
          </div>
        `;
      case 'template_6':
        return `
          <div style="background: #0a0a0a; border: 1px solid #333; padding: 24px; border-radius: 8px; width: 100%; max-width: 280px; text-align: center; box-shadow: 0 15px 35px rgba(0,0,0,0.6); box-sizing: border-box;">
             <div style="color: #ffd700; font-size: 14px; font-weight: bold; letter-spacing: 1px; line-height: 1.2;">VIP ACCESS</div>
             <div style="color: #fff; font-size: 26px; font-weight: 900; margin-top: 8px; line-height: 1.2;">${heading}</div>
             <div style="margin-top: 4px; color: #aaa; font-size: 12px; line-height: 1.4;">${description}</div>
             <div style="margin-top: 12px; font-size: 11px; color: #777; line-height: 1.2;">Use Code: <span style="color: #fff;">${defaultCoupon}</span></div>
             <div style="margin-top: 16px; background: #ffd700; color: #000; padding: 10px; border-radius: 4px; font-weight: 800; cursor: pointer; text-align: center; font-size: 14px;">${buttonText}</div>
          </div>
        `;
      case 'template_7':
        return `
          <div style="background: rgba(0,0,0,0.4); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.1); padding: 24px; border-radius: 12px; width: 100%; max-width: 280px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.5); box-sizing: border-box;">
             <div style="color: #fff; font-size: 16px; font-weight: 600; letter-spacing: 1px; line-height: 1.2;">MEGA OFFER</div>
             <div style="color: #4facfe; font-size: 28px; font-weight: 900; margin-top: 4px; line-height: 1.2;">${heading}</div>
             <div style="margin-top: 4px; color: #ccc; font-size: 12px; line-height: 1.4;">${description}</div>
             <div style="margin-top: 12px; font-size: 11px; color: #999; line-height: 1.2;">Use Code: <span style="color: #fff;">${defaultCoupon}</span></div>
             <div style="margin-top: 16px; background: #0062ff; color: #fff; padding: 10px; border-radius: 6px; font-weight: bold; cursor: pointer; text-align: center; font-size: 14px;">${buttonText}</div>
          </div>
        `;
      default:
        return '';
    }
  }

  // Execute initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
