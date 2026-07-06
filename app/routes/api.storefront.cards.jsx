import prisma from "../db.server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const shopDomain = url.searchParams.get("shop");
  
  if (!shopDomain) {
    return Response.json({ error: "Missing shop parameter" }, { 
      status: 400,
      headers: { "Access-Control-Allow-Origin": "*" }
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
        headers: { "Access-Control-Allow-Origin": "*" } 
      });
    }

    return Response.json({ activeCard: shop.stickyCards[0] }, { 
      headers: { "Access-Control-Allow-Origin": "*" } 
    });
  } catch (error) {
    console.error("Error in api.storefront.cards:", error);
    return Response.json({ error: "Internal Server Error" }, { 
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  }
};
