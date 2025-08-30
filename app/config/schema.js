import { integer, pgTable, varchar, boolean, json, text } from "drizzle-orm/pg-core";

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
  cid: varchar({ length: 255 }).notNull().unique(),   // FIXED unique
  name: varchar({ length: 255 }),
  description: text(),   // fixed lowercase for consistency
  noOfChapters: integer().notNull(),
  includeVideo: boolean().default(false),
  level: varchar({ length: 255 }).notNull(),
  category: varchar({ length: 255 }),
  courseJson: json(),
  bannerImageUrl: text().default(""),
  courseContent: json().default(JSON.stringify([])),   // FIXED
  userEmail: varchar({ length: 255 })
    .notNull()
    .references(() => usersTable.email),
});

// ✅ ENROLL COURSE TABLE
export const enrollCourseTable = pgTable("enrollCourse", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar({ length: 255 })
    .notNull()
    .references(() => coursesTable.cid),   // FIXED
  userEmail: varchar({ length: 255 })
    .notNull()
    .references(() => usersTable.email),
  completedChapters: json(),
});
