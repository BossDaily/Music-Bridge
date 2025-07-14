import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  // For API routes, just pass through
  if (context.url.pathname.startsWith('/api/')) {
    return next();
  }

  try {
    // Check if user is authenticated by making a request to our auth API
    const response = await fetch(`${context.url.origin}/api/auth/get-session`, {
      headers: {
        'Cookie': context.request.headers.get('cookie') || '',
      },
    });

    if (response.ok) {
      const sessionData = await response.json();
      if (sessionData && sessionData.user && sessionData.session) {
        context.locals.user = sessionData.user;
        context.locals.session = sessionData.session;
      } else {
        context.locals.user = null;
        context.locals.session = null;
      }
    } else {
      context.locals.user = null;
      context.locals.session = null;
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    context.locals.user = null;
    context.locals.session = null;
  }

  return next();
});
