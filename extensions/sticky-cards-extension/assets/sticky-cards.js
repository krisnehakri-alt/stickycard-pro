(function() {
  const config = window.StickyCardsConfig || {};
  const shopDomain = config.shopDomain;
  // In production, we'd fetch from an app proxy or public API
  // const API_URL = `${config.appUrl}/api/storefront/sticky-cards?shop=${shopDomain}`;
  
  // Mock data for development
  const mockData = {
    isActive: true,
    displayPages: "ALL",
    triggerRule: "IMMEDIATE",
    desktopPosition: "BOTTOM_RIGHT",
    items: [
      {
        id: "1",
        heading: "Special Offer",
        description: "Get 20% off your first order!",
        discountText: "20% OFF",
        buttonText: "Shop Now",
        templateId: "sc-template-1"
      }
    ]
  };

  function init() {
    console.log("Sticky Cards Initialized for:", shopDomain);
    renderCards(mockData);
  }

  function renderCards(data) {
    if (!data.isActive) return;
    
    const root = document.getElementById("sticky-cards-root");
    if (!root) return;

    // Apply positioning
    root.className = `sc-pos-${data.desktopPosition.toLowerCase()}`;

    data.items.forEach(item => {
      const card = document.createElement("div");
      card.className = `sticky-card-container sc-animate-slide ${item.templateId || 'sc-template-1'}`;
      
      card.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 8px;">${item.heading}</div>
        <div style="margin-bottom: 8px;">${item.description}</div>
        <button style="background: black; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
          ${item.buttonText}
        </button>
      `;
      
      root.appendChild(card);
    });
  }

  // Handle trigger rules
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
