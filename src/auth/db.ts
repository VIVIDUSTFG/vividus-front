import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import sqlite from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const sqliteDB = sqlite(':memory:');
const db = drizzle(sqliteDB);

const userTable = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  username: text('username').notNull(),
  role: text('role').notNull(),
  access_token: text('access_token').notNull(),
  refresh_token: text('refresh_token').notNull(),
});

const sessionTable = sqliteTable('session', {
  id: text('id').notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer('expires_at').notNull(),
});

sqliteDB.exec(`
    CREATE TABLE IF NOT EXISTS user (
        id TEXT PRIMARY KEY NOT NULL,
        username TEXT NOT NULL,
        role TEXT NOT NULL,
        access_token TEXT NOT NULL,
        refresh_token TEXT NOT NULL
    )
`);

sqliteDB.exec(`
CREATE TABLE IF NOT EXISTS session (
        id TEXT PRIMARY KEY NOT NULL,
        user_id TEXT NOT NULL,
        expires_at INTEGER NOT NULL,
        FOREIGN KEY(user_id) REFERENCES user(id)
    )
`);

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export { db, userTable, adapter };
