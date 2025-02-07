import { getResponseStatus, setResponseStatus } from "h3";

export default (error: any, event: any) => {
  console.error("Production Error:", error);
  const status = getResponseStatus(event) || error.statusCode || 500;
  setResponseStatus(event, status);

  // Return a JSON response for API routes
  if (event.path.startsWith("/api/")) {
    return {
      statusCode: status,
      message: "Internal Server Error",
    };
  }

  // Return HTML response for other routes
  return `<!DOCTYPE html>
    <html>
      <head>
        <title>Error - ${status}</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            padding: 1rem;
            margin: 0;
            background: #f5f5f5;
          }
          .error {
            max-width: 600px;
            margin: 100px auto;
            padding: 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .title {
            font-size: 1.5rem;
            margin: 0 0 1rem;
            color: #333;
          }
          .description {
            color: #666;
            margin: 1rem 0;
          }
          .button {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background: #00DC82;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            transition: background 0.2s;
          }
          .button:hover {
            background: #00b368;
          }
        </style>
      </head>
      <body>
        <div class="error">
          <h1 class="title">Something went wrong</h1>
          <p class="description">We're sorry, but we couldn't process your request.</p>
          <a href="/" class="button">Go back home</a>
        </div>
      </body>
    </html>`;
};
