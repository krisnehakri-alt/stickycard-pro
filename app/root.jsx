import { Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from "react-router";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error("Root ErrorBoundary caught an error:", error);
  
  let errorMessage = "Unknown error";
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "object" && error !== null && "data" in error) {
    errorMessage = JSON.stringify(error.data);
  } else {
    errorMessage = String(error);
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Application Error</title>
      </head>
      <body style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '8px' }}>
          <h1>Fatal Application Error</h1>
          <p>This is the root error boundary. The application crashed during server-side rendering.</p>
          <pre style={{ overflowX: 'auto', background: 'rgba(0,0,0,0.05)', padding: '1rem', marginTop: '1rem' }}>
            {errorMessage}
          </pre>
          {error instanceof Error && error.stack && (
            <pre style={{ overflowX: 'auto', background: 'rgba(0,0,0,0.05)', padding: '1rem', marginTop: '1rem', fontSize: '12px' }}>
              {error.stack}
            </pre>
          )}
        </div>
        <Scripts />
      </body>
    </html>
  );
}
