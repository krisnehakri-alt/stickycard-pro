import "@shopify/shopify-app-react-router/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  shopifyApp,
} from "@shopify/shopify-app-react-router/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import prisma from "./db.server";

import { BillingInterval } from "@shopify/shopify-app-react-router/server";

export const MONTHLY_PLAN_STARTER = 'STARTER';
export const MONTHLY_PLAN_GROWTH = 'GROWTH';
export const MONTHLY_PLAN_PREMIUM = 'PREMIUM';

// Validate environment variables on server boot to prevent silent 500 errors in Vercel
const requiredEnvVars = ['SHOPIFY_API_KEY', 'SHOPIFY_API_SECRET', 'SCOPES', 'SHOPIFY_APP_URL', 'DATABASE_URL'];
const missingEnvs = requiredEnvVars.filter(key => !process.env[key]);
if (missingEnvs.length > 0) {
  console.error(`\n[CRITICAL ERROR] The following required Vercel Environment Variables are missing: ${missingEnvs.join(', ')}\n`);
}

let appUrl = process.env.SHOPIFY_APP_URL || "";
if (appUrl && !appUrl.startsWith("http://") && !appUrl.startsWith("https://")) {
  appUrl = "https://" + appUrl;
}

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.October25,
  scopes: process.env.SCOPES?.split(","),
  appUrl,
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  billing: {
    [MONTHLY_PLAN_STARTER]: {
      lineItems: [{
        amount: 39,
        currencyCode: 'USD',
        interval: BillingInterval.Every30Days,
      }],
    },
    [MONTHLY_PLAN_GROWTH]: {
      lineItems: [{
        amount: 59,
        currencyCode: 'USD',
        interval: BillingInterval.Every30Days,
      }],
    },
    [MONTHLY_PLAN_PREMIUM]: {
      lineItems: [{
        amount: 99,
        currencyCode: 'USD',
        interval: BillingInterval.Every30Days,
      }],
    },
  },
  future: {
    expiringOfflineAccessTokens: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export default shopify;
export const apiVersion = ApiVersion.October25;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
