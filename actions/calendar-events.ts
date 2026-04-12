"use server";

import db from "@/lib/db";
import { calendarEvents } from "@/lib/db/schema";
import type { calendarEventSchema } from "@/lib/validations/calendar-events";
import { eq } from "drizzle-orm";

/** Validate that event dates fall within the active school period */
async function validateWithinActivePeriod(
  startDate: Date,
  endDate: Date,
): Promise<string | null> {
  const activePeriod = await db.query.schoolPeriods.findFirst({
    where: (t, { eq }) => eq(t.isActive, true),
  });

  if (!activePeriod) {
    return "No hay un periodo escolar activo. Cree uno antes de agregar eventos.";
  }

  const periodStart = new Date(activePeriod.startDate);
  const periodEnd = new Date(activePeriod.endDate);

  if (startDate < periodStart || endDate > periodEnd) {
    return `Las fechas del evento deben estar dentro del periodo escolar activo (${activePeriod.academicYear}).`;
  }

  return null;
}

export async function getCalendarEvents() {
  const events = await db.query.calendarEvents.findMany({
    orderBy: (calendarEvents, { asc }) => [asc(calendarEvents.startDate)],
  });

  return events;
}

export async function createCalendarEvent(data: calendarEventSchema) {
  try {
    const validationError = await validateWithinActivePeriod(
      data.startDate,
      data.endDate,
    );
    if (validationError) {
      return { success: false, error: validationError };
    }

    await db.insert(calendarEvents).values({
      title: data.title,
      description: data.description || null,
      startDate: data.startDate,
      endDate: data.endDate,
      type: data.type,
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating calendar event:", error);
    return { success: false, error: "No se pudo crear el evento." };
  }
}

export async function updateCalendarEvent(
  id: string,
  data: calendarEventSchema,
) {
  try {
    const validationError = await validateWithinActivePeriod(
      data.startDate,
      data.endDate,
    );
    if (validationError) {
      return { success: false, error: validationError };
    }

    await db
      .update(calendarEvents)
      .set({
        title: data.title,
        description: data.description || null,
        startDate: data.startDate,
        endDate: data.endDate,
        type: data.type,
      })
      .where(eq(calendarEvents.id, id));

    return { success: true };
  } catch (error) {
    console.error("Error updating calendar event:", error);
    return { success: false, error: "No se pudo actualizar el evento." };
  }
}

export async function deleteCalendarEvent(id: string) {
  try {
    await db.delete(calendarEvents).where(eq(calendarEvents.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting calendar event:", error);
    return { success: false, error: "No se pudo eliminar el evento." };
  }
}
