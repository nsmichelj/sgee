import z from "zod";

export const studentFormSchema = z.object({
  id: z.string().optional(),
  firstName: z
    .string()
    .min(2, "El nombre es demasiado corto")
    .max(100, "El nombre es demasiado largo"),
  lastName: z
    .string()
    .min(2, "El apellido es demasiado corto")
    .max(100, "El apellido es demasiado largo"),
  cedulaStudent: z
    .string()
    .min(5, "La cédula escolar es obligatoria")
    .regex(/^\d+$/, "La cédula escolar debe contener solo números")
    .max(100, "La cédula es demasiado larga"),
  email: z.email("Email no válido").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  address: z
    .string()
    .min(5, "La dirección es obligatoria")
    .max(255, "La dirección es demasiado larga"),
});

export type studentFormSchema = z.infer<typeof studentFormSchema>;
