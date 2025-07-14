import type { APIRoute } from "astro";

export const ALL: APIRoute = async (ctx) => {
  // Forward the request to the backend auth handler
  const backendUrl = "http://localhost:8000";
  const path = ctx.url.pathname.replace("/api/auth", "/api/auth");
  const fullUrl = `${backendUrl}${path}${ctx.url.search}`;
  
  try {
    const response = await fetch(fullUrl, {
      method: ctx.request.method,
      headers: {
        ...Object.fromEntries(ctx.request.headers.entries()),
        // Forward the client's IP address for rate limiting
        'x-forwarded-for': ctx.clientAddress,
      },
      body: ctx.request.method !== 'GET' && ctx.request.method !== 'HEAD' 
        ? await ctx.request.arrayBuffer()
        : undefined,
    });

    // Create a new response with the same status, headers, and body
    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
      responseHeaders.set(key, value);
    });

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Auth proxy error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
