import { integer, pgTable, varchar,boolean ,json,text } from "drizzle-orm/pg-core";
// import { boolean } from "drizzle-orm/gel-core";
// import { json } from "drizzle-orm/pg-core"; // Correct this import too

// ✅ USERS TABLE
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  subscriptionId: varchar({ length: 255 }),
});

// ✅ COURSES TABLE
export const coursesTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }),
  Description: text(),
  noOfChapters: integer().notNull(),
  includeVideo: boolean().default(false),
  level: varchar({ length: 255 }).notNull(),
  category: varchar({ length: 255 }),
  courseJson: json(),
  bannerImageUrl: text().default(""),
  userEmail: varchar({ length: 255 }).notNull().references(() => usersTable.email),
});
