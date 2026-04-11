"use server";

import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { students } from "@/lib/db/schema";
import { studentFormSchema } from "@/lib/validations/students";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function getStudents() {
  try {
    const session = await getSession();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const data = await db
      .select()
      .from(students)
      .orderBy(desc(students.createdAt));

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching students:", error);
    return {
      success: false,
      error: "Error al obtener la lista de estudiantes",
    };
  }
}

export async function createStudentAction(formData: studentFormSchema) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const [created] = await db
      .insert(students)
      .values({
        ...formData,
        email: formData.email || "",
        phone: formData.phone || "",
      })
      .returning();

    revalidatePath("/dashboard/students");
    return { success: true, data: created };
  } catch (error) {
    console.error("Error creating student:", error);
    return { success: false, error: "Error al registrar el estudiante" };
  }
}

export async function updateStudentAction(
  formData: Partial<studentFormSchema>,
) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    if (!formData.id) {
      return { success: false, error: "ID de estudiante no proporcionado" };
    }

    const { id, ...dataToUpdate } = formData;

    const [updated] = await db
      .update(students)
      .set({
        ...dataToUpdate,
        updatedAt: new Date(),
      })
      .where(eq(students.id, id))
      .returning();

    revalidatePath("/dashboard/students");
    return { success: true, data: updated };
  } catch (error) {
    console.error("Error updating student:", error);
    return { success: false, error: "Error al actualizar el estudiante" };
  }
}

export async function deleteStudentAction(id: string) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    await db.delete(students).where(eq(students.id, id));

    revalidatePath("/dashboard/students");
    return { success: true };
  } catch (error) {
    console.error("Error deleting student:", error);
    return { success: false, error: "Error al eliminar el estudiante" };
  }
}

export async function checkStudentCedulaAction(
  cedula: string,
  currentStudentId?: string,
) {
  if (!cedula) return { success: false, error: "Cédula no proporcionada" };

  try {
    const existing = await db.query.students.findFirst({
      where: eq(students.cedulaStudent, cedula.trim()),
    });

    if (!existing) {
      return { success: true, status: "not_found" };
    }

    if (existing.id !== currentStudentId) {
      return { success: false, error: "La cédula escolar ya está registrada" };
    }

    return { success: true, data: existing };
  } catch (error) {
    console.error("Error checking student cedula:", error);
    return { success: false, error: "Error al verificar la cédula escolar" };
  }
}
