import { z } from "zod";

export const photoFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "El título es obligatorio").max(255),
  caption: z.string().max(1000).optional().nullable(),
  url: z.url("URL de imagen no válida"),
  isPublic: z.boolean(),
});

export type photoFormSchema = z.infer<typeof photoFormSchema>;
