import { z } from "zod";

export const schoolNewsFormSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(1, "El título es obligatorio")
    .max(200, "El título no puede exceder 200 caracteres"),
  slug: z.string().optional(),
  excerpt: z
    .string()
    .max(500, "El extracto no puede exceder 500 caracteres")
    .optional()
    .nullable(),
  content: z.string().min(1, "El contenido es obligatorio"),
  coverImageUrl: z.url("URL de imagen no válida").optional(),
});

export type schoolNewsFormSchema = z.infer<typeof schoolNewsFormSchema>;
