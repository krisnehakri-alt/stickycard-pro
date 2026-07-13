import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  const { shop, payload, topic } = await authenticate.webhook(request);
  console.log(`Received ${topic} webhook for ${shop}`);
  // Webhook requests can trigger multiple times and after an app has already been uninstalled.
  // Payload has the customer request data
  return new Response();
};
