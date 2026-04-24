import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  time,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const activityStatusEnum = pgEnum("activity_status", [
  "draft",
  "planned",
  "approved",
  "completed",
  "cancelled",
  "postponed",
]);

export const pedagogicalMomentEnum = pgEnum("pedagogical_moment", [
  "FIRST",
  "SECOND",
  "THIRD",
]);

export const calendarEventTypeEnum = pgEnum("calendar_event_type", [
  "pedagogical", // pedagogico
  "administrative", // administrativo
  "didactic", // didactico
  "efemeride", // efemeride
  "holiday", // asueto
  "other", // otro
]);

export const educationalRolesEnum = pgEnum("educational_roles", [
  "preschool_teacher", // Docente de Aula (Educación Inicial)
  "primary_school_teacher", // Docente de Aula (Educación Primaria)
  "specialist_teacher", // Docente de Especialidad
  "physical_education_teacher", // Docente de Educación Física
  "integrated_classroom_teacher", // Docente de Aula Integrada
  "learning_resource_librarian", // Docente de Recurso para el Aprendizaje (Biblioteca)
  "culture_teacher", // Docente de Cultura
  "school_garden_teacher", // Docente de Manos a la Siembra
  "teacher_coordinator", // Docente con Función de Coordinación
  "it_teacher", // Docente de Informática
  // "principal", // Director(a)
  // "administrative_vice_principal", // Subdirector(a) Administrativo
  // "academic_vice_principal", // Subdirector(a) Pedagógico
]);

export const educationalLevelEnum = pgEnum("educational_level", [
  "associate_degree", // TSU (Técnico Superior Universitario)
  "bachelor_degree", // Licenciatura
  "master_degree", // Maestría
  "doctorate_degree", // Doctorado
  "postgraduate_diploma", // Postgrado
]);

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  username: text("username").unique(),
  displayUsername: text("display_username"),
  role: text("role"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});

export const session = pgTable(
  "session",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    impersonatedBy: text("impersonated_by"),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const authorities = pgTable("authorities", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: varchar("full_name", { length: 100 }).notNull(),
  role: varchar("role", { length: 100 }).notNull(),
  photoUrl: text("photo_url"),
  order: integer("order").notNull().default(0),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const photos = pgTable("photos", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),
  caption: text("caption"),

  url: text("url").notNull(),

  isPublic: boolean("is_public").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export const schoolNews = pgTable("school_news", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 250 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  coverImageUrl: text("cover_image_url"),
  createdBy: uuid("created_by").references(() => user.id, {
    onDelete: "set null",
  }),
  approvedBy: uuid("approved_by").references(() => user.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export const personal = pgTable("personal", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  cedula: varchar("cedula", { length: 100 }).notNull().unique(),
  email: varchar("email", { length: 100 }),
  phone: varchar("phone", { length: 100 }),
  address: varchar("address", { length: 255 }).notNull(),
  role: educationalRolesEnum("role").notNull(),
  photoUrl: text("photo_url"),
  order: integer("order").notNull().default(0),
  educationalLevel: educationalLevelEnum("educational_level").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const students = pgTable("students", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  cedulaStudent: varchar("cedula_student", { length: 100 }).notNull().unique(),
  address: varchar("address", { length: 255 }).notNull(),
  birthDate: date("birth_date", { mode: "date" }).notNull(),
  email: varchar("email", { length: 100 }),
  phone: varchar("phone", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const schoolPeriods = pgTable("school_periods", {
  id: uuid("id").defaultRandom().primaryKey(),
  academicYear: varchar("academic_year", { length: 9 }).notNull().unique(),
  startDate: date("start_date", { mode: "date" }).notNull(),
  endDate: date("end_date", { mode: "date" }).notNull(),
  isActive: boolean("is_active").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const pedagogicalMoments = pgTable(
  "pedagogical_moments",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    schoolPeriodId: uuid("school_period_id")
      .references(() => schoolPeriods.id, {
        onDelete: "cascade",
      })
      .notNull(),

    type: pedagogicalMomentEnum("type").notNull(),

    startDate: date("start_date", { mode: "date" }).notNull(),
    endDate: date("end_date", { mode: "date" }).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex("unique_moment_per_school_period").on(t.schoolPeriodId, t.type),
  ],
);

export const calendarEvents = pgTable("calendar_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  startDate: date("start_date", { mode: "date" }).notNull(),
  endDate: date("end_date", { mode: "date" }).notNull(),
  type: calendarEventTypeEnum("type").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const calendarEventsRelations = relations(
  calendarEvents,
  ({ many }) => ({
    activities: many(calendarActivities),
  }),
);

export const calendarActivities = pgTable("calendar_activities", {
  id: uuid("id").defaultRandom().primaryKey(),
  schoolPeriodId: uuid("school_period_id")
    .references(() => schoolPeriods.id, {
      onDelete: "cascade",
    })
    .notNull(),
  pedagogicalMomentId: uuid("pedagogical_moment_id").references(
    () => pedagogicalMoments.id,
    {
      onDelete: "set null",
    },
  ),
  calendarEventId: uuid("calendar_event_id").references(
    () => calendarEvents.id,
    {
      onDelete: "set null",
    },
  ),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  startDate: date("start_date", { mode: "date" }).notNull(),
  startTime: time("start_time").notNull(),
  endDate: date("end_date", { mode: "date" }).notNull(),
  endTime: time("end_time").notNull(),
  type: calendarEventTypeEnum("type").notNull(),
  status: activityStatusEnum("status").notNull().default("planned"),
  results: text("results"),
  observations: text("observations"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const calendarActivitiesStudents = pgTable(
  "calendar_activities_students",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    calendarActivityId: uuid("calendar_activity_id")
      .references(() => calendarActivities.id, {
        onDelete: "cascade",
      })
      .notNull(),
    studentId: uuid("student_id")
      .references(() => students.id, {
        onDelete: "cascade",
      })
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [
    uniqueIndex("unique_activity_student").on(
      t.calendarActivityId,
      t.studentId,
    ),
  ],
);

export const calendarActivitiesPersonal = pgTable(
  "calendar_activities_personal",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    calendarActivityId: uuid("calendar_activity_id")
      .references(() => calendarActivities.id, {
        onDelete: "cascade",
      })
      .notNull(),
    personalId: uuid("personal_id")
      .references(() => personal.id, {
        onDelete: "cascade",
      })
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [
    uniqueIndex("unique_activity_personal").on(
      t.calendarActivityId,
      t.personalId,
    ),
  ],
);

export const calendarActivitiesRelations = relations(
  calendarActivities,
  ({ one, many }) => ({
    schoolPeriod: one(schoolPeriods, {
      fields: [calendarActivities.schoolPeriodId],
      references: [schoolPeriods.id],
    }),
    pedagogicalMoment: one(pedagogicalMoments, {
      fields: [calendarActivities.pedagogicalMomentId],
      references: [pedagogicalMoments.id],
    }),
    calendarEvent: one(calendarEvents, {
      fields: [calendarActivities.calendarEventId],
      references: [calendarEvents.id],
    }),
    evidence: many(calendarActivitiesEvidence),
    personal: many(calendarActivitiesPersonal),
    students: many(calendarActivitiesStudents),
  }),
);

export const calendarActivitiesEvidence = pgTable(
  "calendar_activities_evidence",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    calendarActivityId: uuid("calendar_activity_id")
      .references(() => calendarActivities.id, {
        onDelete: "cascade",
      })
      .notNull(),
    url: text("evidence_url").notNull(),
    size: integer("size").notNull(),
    type: varchar("type", { length: 100 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
);

export const calendarActivitiesStudentsRelations = relations(
  calendarActivitiesStudents,
  ({ one }) => ({
    calendarActivity: one(calendarActivities, {
      fields: [calendarActivitiesStudents.calendarActivityId],
      references: [calendarActivities.id],
    }),
    student: one(students, {
      fields: [calendarActivitiesStudents.studentId],
      references: [students.id],
    }),
  }),
);

export const studentsRelations = relations(students, ({ many }) => ({
  activities: many(calendarActivitiesStudents),
}));

export const calendarActivitiesPersonalRelations = relations(
  calendarActivitiesPersonal,
  ({ one }) => ({
    calendarActivity: one(calendarActivities, {
      fields: [calendarActivitiesPersonal.calendarActivityId],
      references: [calendarActivities.id],
    }),
    personal: one(personal, {
      fields: [calendarActivitiesPersonal.personalId],
      references: [personal.id],
    }),
  }),
);

export const personalRelations = relations(personal, ({ many }) => ({
  activities: many(calendarActivitiesPersonal),
}));

export const calendarActivitiesEvidenceRelations = relations(
  calendarActivitiesEvidence,
  ({ one }) => ({
    calendarActivity: one(calendarActivities, {
      fields: [calendarActivitiesEvidence.calendarActivityId],
      references: [calendarActivities.id],
    }),
  }),
);

export const schoolPeriodsRelations = relations(schoolPeriods, ({ many }) => ({
  pedagogicalMoments: many(pedagogicalMoments),
}));

export const pedagogicalMomentsRelations = relations(
  pedagogicalMoments,
  ({ one, many }) => ({
    schoolPeriod: one(schoolPeriods, {
      fields: [pedagogicalMoments.schoolPeriodId],
      references: [schoolPeriods.id],
    }),
    activities: many(calendarActivities),
  }),
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  createdNews: many(schoolNews),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const schoolNewsRelations = relations(schoolNews, ({ one }) => ({
  createdBy: one(user, {
    fields: [schoolNews.createdBy],
    references: [user.id],
  }),
  approvedBy: one(user, {
    fields: [schoolNews.approvedBy],
    references: [user.id],
  }),
}));
