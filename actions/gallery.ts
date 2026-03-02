"use server";

import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { photos } from "@/lib/db/schema";
import { type photoFormSchema as PhotoForm } from "@/lib/validations/gallery";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function createPhotoAction(formData: PhotoForm) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const [created] = await db.insert(photos).values(formData).returning();

    revalidatePath("/");

    return { success: true, data: created };
  } catch {
    return { success: false, error: "Unable to create photo" };
  }
}

export async function getPhotos() {
  try {
    const session = await getSession();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const _photos = await db
      .select()
      .from(photos)
      .orderBy(desc(photos.createdAt));

    return { success: true, data: _photos };
  } catch {
    return { success: false, error: "Unable to fetch photos" };
  }
}

export async function updatePhotoAction(formData: Partial<PhotoForm>) {
  const session = await getSession();
  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  if (!formData.id) {
    return { success: false, error: "Bad Request" };
  }

  try {
    await db.update(photos).set(formData).where(eq(photos.id, formData.id));
    revalidatePath("/");
    return { success: true };
  } catch {
    return { success: false, error: "Unable to update photo" };
  }
}

export async function deletePhotoAction(id: string) {
  const session = await getSession();
  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await db.delete(photos).where(eq(photos.id, id));
    revalidatePath("/");
    return { success: true };
  } catch {
    return { success: false, error: "Unable to delete photo" };
  }
}
