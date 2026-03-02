import z from "zod";

export const authorityFormSchema = z.object({
  id: z.string().optional(),
  fullName: z
    .string()
    .min(3, "El nombre es demasiado corto")
    .max(100, "El nombre es demasiado largo"),
  role: z
    .string()
    .min(2, "El cargo es obligatorio")
    .max(100, "El cargo es demasiado largo"),
  photoUrl: z.url("URL de imagen no válida").optional().nullable(),
  order: z.number().int(),
});

export type authorityFormSchema = z.infer<typeof authorityFormSchema>;
