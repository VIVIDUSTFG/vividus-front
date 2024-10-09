import { Lucia, TimeSpan } from 'lucia';
import { adapter } from './db';

const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(30, 'm'),
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: import.meta.env.PROD,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      id: attributes.id,
      username: attributes.username,
      role: attributes.role,
      access_token: attributes.access_token,
      refresh_token: attributes.refresh_token,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  username: string;
  role: string;
  access_token: string;
  refresh_token: string;
}

export { lucia };

// https://lucia-auth.com/tutorials/username-and-password/astro
// https://github.com/larryhudson/astro-sqlite-drizzle-lucia-auth/blob/main/src/db/schema.ts
