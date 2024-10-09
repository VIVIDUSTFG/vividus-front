import { lucia } from '@/auth/auth';
import type { APIContext } from 'astro';

export const POST = async (context: APIContext) => {
  if (!context.locals.session) {
    return new Response(null, {
      status: 401,
    });
  }

  await lucia.invalidateSession(context.locals.session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  context.locals.session = null;
  context.locals.user = null;

  return context.redirect('/accounts/login');
};
