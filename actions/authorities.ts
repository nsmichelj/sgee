"use server";

import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { authorities } from "@/lib/db/schema";
import { authorityFormSchema } from "@/lib/validations/authorities";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function getAutorities() {
  try {
    const session = await getSession();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const _photos = await db
      .select()
      .from(authorities)
      .orderBy(desc(authorities.createdAt));

    return { success: true, data: _photos };
  } catch {
    return { success: false, error: "Unable to fetch photos" };
  }
}

export async function createAuthorityAction(formData: authorityFormSchema) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const [created] = await db.insert(authorities).values(formData).returning();

    revalidatePath("/");
    return { success: true, data: created };
  } catch {
    return { success: false, error: "Unable to create authority" };
  }
}

export async function updateAuthorityAction(
  formData: Partial<authorityFormSchema>,
) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    if (!formData.id) {
      return { success: false, error: "Bad Request" };
    }

    const [updated] = await db
      .update(authorities)
      .set({ ...formData })
      .where(eq(authorities.id, formData.id))
      .returning();

    revalidatePath("/");
    return { success: true, data: updated };
  } catch {
    return { success: false, error: "Error al actualizar" };
  }
}

export async function deleteAuthorityAction(id: string) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    await db.delete(authorities).where(eq(authorities.id, id));

    revalidatePath("/");
    return { success: true };
  } catch {
    return { success: false, error: "Error al eliminar" };
  }
}
