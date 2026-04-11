"use server";

import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { personal } from "@/lib/db/schema";
import { personalFormSchema } from "@/lib/validations/personal";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function getPersonal() {
  try {
    const session = await getSession();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const data = await db
      .select()
      .from(personal)
      .orderBy(desc(personal.createdAt));

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching personal:", error);
    return { success: false, error: "Unable to fetch personal" };
  }
}

export async function createPersonalAction(formData: personalFormSchema) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    // Ensure numeric order
    const values = {
      ...formData,
      order: Number(formData.order) || 0,
    };

    const [created] = await db
      .insert(personal)
      .values({
        ...values,
        email: values.email || "",
        phone: values.phone || "",
        address: values.address || "",
        photoUrl: values.photoUrl || "",
      })
      .returning();

    revalidatePath("/dashboard/personal");
    return { success: true, data: created };
  } catch (error) {
    console.error("Error creating personal:", error);
    return { success: false, error: "Unable to create personal record" };
  }
}

export async function updatePersonalAction(
  formData: Partial<personalFormSchema>,
) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    if (!formData.id) {
      return { success: false, error: "Bad Request: ID required" };
    }

    const { id, ...dataToUpdate } = formData;

    const [updated] = await db
      .update(personal)
      .set({
        ...dataToUpdate,
        updatedAt: new Date(),
      })
      .where(eq(personal.id, id))
      .returning();

    revalidatePath("/dashboard/personal");
    return { success: true, data: updated };
  } catch (error) {
    console.error("Error updating personal:", error);
    return {
      success: false,
      error: "Error al actualizar el registro de personal",
    };
  }
}

export async function deletePersonalAction(id: string) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    await db.delete(personal).where(eq(personal.id, id));

    revalidatePath("/dashboard/personal");
    return { success: true };
  } catch (error) {
    console.error("Error deleting personal:", error);
    return {
      success: false,
      error: "Error al eliminar el registro de personal",
    };
  }
}

export async function checkPersonalCedulaAction(
  cedula: string,
  currentPersonalId?: string,
) {
  if (!cedula) return { success: false, error: "Cédula no proporcionada." };

  try {
    const _personal = await db.query.personal.findFirst({
      where: eq(personal.cedula, cedula.trim()),
    });

    if (!_personal) {
      return { success: true, status: "not_found" };
    }

    if (_personal.id !== currentPersonalId) {
      return { success: false, error: "Cédula ya registrada." };
    }

    return {
      success: true,
      data: _personal,
    };
  } catch (error) {
    console.error("Error checking personal cedula:", error);
    return { success: false, error: "Error al verificar la cédula." };
  }
}
