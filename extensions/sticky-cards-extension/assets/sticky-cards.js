(function() {
  const config = window.StickyCardsConfig || {};
  const shopDomain = config.shopDomain;
  // App Proxy URL
  // Shopify App Proxy automatically appends shop, path_prefix, etc.
  const API_URL = `/apps/stickycards/cards`;

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
    // Always display in Shopify Theme Editor so merchants can see it
    if (window.Shopify && window.Shopify.designMode) {
      return true;
    }

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
    card.className = `sticky-card-container sc-animate-slide ${data.templateId || 'template_1'}`;

    card.innerHTML = data.html || '';
    
    root.appendChild(card);
  }

  // Execute initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
