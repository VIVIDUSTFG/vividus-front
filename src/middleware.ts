import { db, lucia, userTable } from '@/auth';
import { api } from '@/lib/data';
import { defineMiddleware } from 'astro:middleware';

interface refreshData {
  access_token: string;
  refresh_token: string;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null;

  const isServerRequest = context.request.headers.get('X-Internal-Request') === 'true';
  const isHTMXLongRequest = context.request.headers.get('HX-Long-Request') === 'true';
  if (isServerRequest) {
    return next();
  }

  if (context.request.url.includes('/accounts/login') || context.request.url.includes('/accounts/register')) {
    if (sessionId) {
      const { session } = await lucia.validateSession(sessionId);
      if (session) {
        return context.redirect('/');
      }
    }
    return next();
  }

  if (!sessionId) {
    context.locals.user = null;
    context.locals.session = null;
    return context.redirect('/accounts/login');
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    try {
      const sessionCookie = lucia.createSessionCookie(session.id);

      const refreshResponse = await fetch(api('/auth/refresh'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user.refresh_token),
      });

      if (refreshResponse.ok) {
        const response = (await refreshResponse.json()) as refreshData;
        db.insert(userTable)
          .values({
            id: user.id,
            username: user.username,
            role: user.role,
            access_token: response.access_token,
            refresh_token: response.refresh_token,
          })
          .onConflictDoUpdate({
            target: userTable.id,
            set: {
              access_token: response.access_token,
              refresh_token: response.refresh_token,
            },
          })
          .run();
      }

      context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    } catch (error) {
      const sessionCookie = lucia.createBlankSessionCookie();
      context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      context.locals.session = null;
      context.locals.user = null;
      return context.redirect('/accounts/login');
    }
  }
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    context.locals.session = null;
    context.locals.user = null;
  }
  context.locals.session = session;
  context.locals.user = user;
  return next();
});
