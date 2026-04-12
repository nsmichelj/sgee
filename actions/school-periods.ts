"use server";

import db from "@/lib/db";
import { pedagogicalMoments, schoolPeriods } from "@/lib/db/schema";
import { schoolPeriodSchema } from "@/lib/validations/school-period";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getSchoolPeriods() {
  const periods = await db.query.schoolPeriods.findMany({
    orderBy: (schoolPeriods, { desc }) => [desc(schoolPeriods.academicYear)],
    with: {
      pedagogicalMoments: {
        columns: {
          id: true,
          type: true,
          startDate: true,
          endDate: true,
        },
        orderBy: (t, { asc }) => [asc(t.startDate)],
      },
    },
  });

  return periods;
}

export async function getActiveSchoolPeriod() {
  const period = await db.query.schoolPeriods.findFirst({
    where: (t, { eq }) => eq(t.isActive, true),
    with: {
      pedagogicalMoments: {
        columns: {
          id: true,
          type: true,
          startDate: true,
          endDate: true,
        },
        orderBy: (t, { asc }) => [asc(t.startDate)],
      },
    },
  });

  return period ?? null;
}

export async function createSchoolPeriodAction(data: schoolPeriodSchema) {
  try {
    await db.transaction(async (tx) => {
      if (data.isActive) {
        await tx
          .update(schoolPeriods)
          .set({ isActive: false })
          .where(eq(schoolPeriods.isActive, true));
      }

      const [newPeriod] = await tx
        .insert(schoolPeriods)
        .values({
          academicYear: data.academicYear,
          startDate: data.startDate,
          endDate: data.endDate,
          isActive: data.isActive,
        })
        .returning();

      if (data.moments && data.moments.length > 0) {
        await tx.insert(pedagogicalMoments).values(
          data.moments.map((moment) => ({
            ...moment,
            schoolPeriodId: newPeriod.id,
            startDate: moment.startDate,
            endDate: moment.endDate,
            type: moment.type,
          })),
        );
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating school period:", error);
    return { success: false, error: "No se pudo crear el periodo escolar." };
  }
}

export async function deleteSchoolPeriod(id: string) {
  try {
    await db.delete(schoolPeriods).where(eq(schoolPeriods.id, id));
    revalidatePath("/dashboard/school-periods");
    return { success: true };
  } catch (error) {
    console.error("Error deleting school period:", error);
    return { success: false, error: "No se pudo eliminar el periodo escolar." };
  }
}
