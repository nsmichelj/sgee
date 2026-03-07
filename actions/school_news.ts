"use server";

import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { schoolNews } from "@/lib/db/schema";
import { slugify } from "@/lib/slugify";
import { schoolNewsFormSchema } from "@/lib/validations/school_news";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function getSchoolNews() {
  try {
    const news = await db.query.schoolNews.findMany({
      orderBy: desc(schoolNews.createdAt),
      with: {
        createdBy: {
          columns: {
            name: true,
          },
        },
      },
    });

    return { success: true, data: news };
  } catch (error) {
    console.error("Error fetching school news:", error);
    return { success: false, error: "Unable to fetch school news" };
  }
}

export async function getSchoolNewsById(id: string) {
  try {
    const newsItem = await db.query.schoolNews.findFirst({
      orderBy: desc(schoolNews.createdAt),
      with: {
        createdBy: {
          columns: {
            name: true,
          },
        },
      },
      where: eq(schoolNews.id, id),
    });

    if (!newsItem) {
      return { success: false, error: "School news not found" };
    }

    return { success: true, data: newsItem };
  } catch (error) {
    console.error("Error fetching school news:", error);
    return { success: false, error: "Unable to fetch school news" };
  }
}

export async function getSchoolNewsBySlug(slug: string) {
  try {
    const newsItem = await db.query.schoolNews.findFirst({
      orderBy: desc(schoolNews.createdAt),
      with: {
        createdBy: {
          columns: {
            name: true,
          },
        },
      },
      where: eq(schoolNews.slug, slug),
    });

    if (!newsItem) {
      return { success: false, error: "School news not found" };
    }

    return { success: true, data: newsItem };
  } catch (error) {
    console.error("Error fetching school news:", error);
    return { success: false, error: "Unable to fetch school news" };
  }
}

export async function createSchoolNewsAction(formData: schoolNewsFormSchema) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const slug = slugify(formData.title, true);

    const [created] = await db
      .insert(schoolNews)
      .values({
        ...formData,
        slug: slug,
        createdBy: session.user.id,
      })
      .returning();

    revalidatePath("/");
    revalidatePath("/school_news");
    revalidatePath(`/school_news/${slug}`);

    return { success: true, data: created };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Unable to create school news" };
  }
}

export async function updateSchoolNewsAction(formData: schoolNewsFormSchema) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    if (!formData.id) {
      return { success: false, error: "Bad Request" };
    }

    const [updated] = await db
      .update(schoolNews)
      .set({
        ...formData,
      })
      .where(eq(schoolNews.id, formData.id))
      .returning();

    if (!updated) {
      return { success: false, error: "School news not found" };
    }

    revalidatePath("/");
    revalidatePath("/school_news");
    revalidatePath(`/school_news/${updated.slug}`);

    return { success: true, data: updated };
  } catch (error) {
    console.error("Error updating school news:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Unable to update school news" };
  }
}

export async function deleteSchoolNewsAction(id: string) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const [deleted] = await db
      .delete(schoolNews)
      .where(eq(schoolNews.id, id))
      .returning();

    if (!deleted) {
      return { success: false, error: "School news not found" };
    }

    revalidatePath("/");
    revalidatePath("/school_news");
    revalidatePath(`/school_news/${deleted.slug}`);

    return { success: true, data: deleted };
  } catch (error) {
    console.error("Error deleting school news:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Unable to delete school news" };
  }
}

export async function approveSchoolNewsAction(id: string) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const [approved] = await db
      .update(schoolNews)
      .set({
        approvedBy: session.user.id,
        updatedAt: new Date(),
      })
      .where(eq(schoolNews.id, id))
      .returning();

    if (!approved) {
      return { success: false, error: "School news not found" };
    }

    revalidatePath("/");
    revalidatePath("/dashboard/school_news");
    return { success: true, data: approved };
  } catch (error) {
    console.error("Error approving school news:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Unable to approve school news" };
  }
}
