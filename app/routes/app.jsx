import { Outlet, useLoaderData, useRouteError } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  try {
    await authenticate.admin(request);
    // eslint-disable-next-line no-undef
    return { apiKey: process.env.SHOPIFY_API_KEY || "" };
  } catch (error) {
    if (error instanceof Response) {
      throw error; // Let Shopify App Bridge / OAuth redirects pass through
    }
    console.error("[app.jsx] Critical loader error:", error);
    throw error;
  }
};

import { AppProvider as PolarisAppProvider } from "@shopify/polaris";
import polarisTranslations from "@shopify/polaris/locales/en.json";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export default function App() {
  const { apiKey } = useLoaderData();

  return (
    <AppProvider embedded apiKey={apiKey}>
      <PolarisAppProvider i18n={polarisTranslations}>
        <s-app-nav>
          <s-link href="/app">Dashboard</s-link>
          <s-link href="/app/templates">Templates</s-link>
          <s-link href="/app/billing">Billing</s-link>
        </s-app-nav>
        <Outlet />
      </PolarisAppProvider>
    </AppProvider>
  );
}

import { isRouteErrorResponse } from "react-router";

// Shopify needs React Router to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  const error = useRouteError();
  
  // FIX for Vercel/Production minification bug:
  // Shopify's `boundary.error` relies on `error.constructor.name === 'ErrorResponse'`
  // which breaks when Vite minifies class names in production!
  if (isRouteErrorResponse(error)) {
    // 1. Handle HTML snippet response from document requests
    if (typeof error.data === 'string' && error.data.includes('app-bridge.js')) {
      return <div dangerouslySetInnerHTML={{ __html: error.data }} />;
    }
    
    // 2. Handle 401 Reauthorize response from XHR requests (App Bridge v4)
    if (error.status === 401 && error.headers && error.headers.has('X-Shopify-API-Request-Failure-Reauthorize-Url')) {
      const reauthorizeUrl = error.headers.get('X-Shopify-API-Request-Failure-Reauthorize-Url');
      if (typeof window !== 'undefined') {
        window.open(reauthorizeUrl, '_top');
      }
      return null;
    }
  }

  try {
    return boundary.error(error);
  } catch (e) {
    // Let it bubble up to root error boundary if it's a real crash
    throw error;
  }
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
