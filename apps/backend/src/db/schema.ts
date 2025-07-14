import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
  serial,
  integer,
  boolean,
  jsonb,
  bigserial,
  primaryKey,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Define ENUMs to be used in the tables
export const userRole = pgEnum('user_role', ['user', 'admin']);
export const syncStatus = pgEnum('sync_status', ['pending', 'in_progress', 'success', 'failed']);

// --- TABLE DEFINITIONS ---

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  image: text('image'),
  role: userRole('role').notNull().default('user'),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
});

// Better Auth tables
export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
});

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at', { withTimezone: true, mode: 'date' }),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at', { withTimezone: true, mode: 'date' }),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
});

export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  apiBaseUrl: text('api_base_url'),
  colorCode: text('color_code').notNull().default('#FFFFFF'),
  status: text('status').notNull().default('online'),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
});

export const connectedAccounts = pgTable('connected_accounts', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    serviceId: integer('service_id').notNull().references(() => services.id, { onDelete: 'cascade' }),
    accountUsername: text('account_username'),
    accessToken: text('access_token').notNull(), // Should be encrypted in a real app
    refreshToken: text('refresh_token'), // Should be encrypted
    tokenExpiresAt: timestamp('token_expires_at', { withTimezone: true, mode: 'date' }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
  }, (table) => {
    return {
      // Composite unique constraint
      user_service_username_unique: uniqueIndex('user_service_username_unique_idx').on(table.userId, table.serviceId, table.accountUsername),
    };
});

export const globalPlaylists = pgTable('global_playlists', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  isSyncEnabled: boolean('is_sync_enabled').notNull().default(true),
  syncIntervalMinutes: integer('sync_interval_minutes'),
  lastSyncStatus: syncStatus('last_sync_status'),
  lastSyncAttemptedAt: timestamp('last_sync_attempted_at', { withTimezone: true, mode: 'date' }),
  nextSyncScheduledFor: timestamp('next_sync_scheduled_for', { withTimezone: true, mode: 'date' }),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
});

export const playlists = pgTable('playlists', {
    id: uuid('id').defaultRandom().primaryKey(),
    globalPlaylistId: uuid('global_playlist_id').references(() => globalPlaylists.id, { onDelete: 'set null' }),
    connectedAccountId: uuid('connected_account_id').notNull().references(() => connectedAccounts.id, { onDelete: 'cascade' }),
    servicePlaylistId: text('service_playlist_id').notNull(),
    name: text('name').notNull(),
    description: text('description'),
    lastSyncedAt: timestamp('last_synced_at', { withTimezone: true, mode: 'date' }),
    lastSyncError: text('last_sync_error'),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
  }, (table) => {
    return {
      // Composite unique constraint
      account_service_playlist_unique: uniqueIndex('account_service_playlist_unique_idx').on(table.connectedAccountId, table.servicePlaylistId),
    };
});

export const tracks = pgTable('tracks', {
    id: uuid('id').defaultRandom().primaryKey(),
    serviceTrackId: text('service_track_id').notNull(),
    serviceId: integer('service_id').notNull().references(() => services.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    artist: text('artist'),
    album: text('album'),
    durationMs: integer('duration_ms'),
    isrc: text('isrc'), // International Standard Recording Code
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
  }, (table) => {
    return {
      // Composite unique constraint
      service_track_id_unique: uniqueIndex('service_track_id_unique_idx').on(table.serviceId, table.serviceTrackId),
    };
});

export const playlistTracks = pgTable('playlist_tracks', {
    playlistId: uuid('playlist_id').notNull().references(() => playlists.id, { onDelete: 'cascade' }),
    trackId: uuid('track_id').notNull().references(() => tracks.id, { onDelete: 'cascade' }),
    addedAt: timestamp('added_at', { withTimezone: true, mode: 'date' }),
  }, (table) => {
    // Composite primary key
    return {
      pk: primaryKey({ columns: [table.playlistId, table.trackId] }),
    };
});

export const syncLogs = pgTable('sync_logs', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  globalPlaylistId: uuid('global_playlist_id').notNull().references(() => globalPlaylists.id, { onDelete: 'cascade' }),
  status: syncStatus('status').notNull(),
  details: jsonb('details'),
  startedAt: timestamp('started_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
  finishedAt: timestamp('finished_at', { withTimezone: true, mode: 'date' }),
});


// --- RELATIONS DEFINITIONS ---

export const usersRelations = relations(users, ({ one, many }) => ({
  connectedAccounts: many(connectedAccounts),
  globalPlaylists: many(globalPlaylists),
  sessions: many(sessions),
  accounts: many(accounts),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const servicesRelations = relations(services, ({ many }) => ({
  connectedAccounts: many(connectedAccounts),
  tracks: many(tracks),
}));

export const connectedAccountsRelations = relations(connectedAccounts, ({ one, many }) => ({
  user: one(users, {
    fields: [connectedAccounts.userId],
    references: [users.id],
  }),
  service: one(services, {
    fields: [connectedAccounts.serviceId],
    references: [services.id],
  }),
  playlists: many(playlists),
}));

export const globalPlaylistsRelations = relations(globalPlaylists, ({ one, many }) => ({
  user: one(users, {
    fields: [globalPlaylists.userId],
    references: [users.id],
  }),
  playlists: many(playlists),
  syncLogs: many(syncLogs),
}));

export const playlistsRelations = relations(playlists, ({ one, many }) => ({
  globalPlaylist: one(globalPlaylists, {
    fields: [playlists.globalPlaylistId],
    references: [globalPlaylists.id],
  }),
  connectedAccount: one(connectedAccounts, {
    fields: [playlists.connectedAccountId],
    references: [connectedAccounts.id],
  }),
  playlistTracks: many(playlistTracks),
}));

export const tracksRelations = relations(tracks, ({ one, many }) => ({
  service: one(services, {
    fields: [tracks.serviceId],
    references: [services.id],
  }),
  playlistTracks: many(playlistTracks),
}));

export const playlistTracksRelations = relations(playlistTracks, ({ one }) => ({
  playlist: one(playlists, {
    fields: [playlistTracks.playlistId],
    references: [playlists.id],
  }),
  track: one(tracks, {
    fields: [playlistTracks.trackId],
    references: [tracks.id],
  }),
}));