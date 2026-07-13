import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  const { shop, payload, topic } = await authenticate.webhook(request);
  console.log(`Received ${topic} webhook for ${shop}`);
  // Payload has the customer redact data
  return new Response();
};
