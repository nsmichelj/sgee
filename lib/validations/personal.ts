import z from "zod";
import {
  educationalLevelEnum,
  educationalRolesEnum,
} from "../db/schema";

export const personalFormSchema = z.object({
  id: z.string().optional(),
  firstName: z
    .string()
    .min(2, "El nombre es demasiado corto")
    .max(100, "El nombre es demasiado largo"),
  lastName: z
    .string()
    .min(2, "El apellido es demasiado corto")
    .max(100, "El apellido es demasiado largo"),
  cedula: z
    .string()
    .min(5, "La cédula es obligatoria")
    .max(100, "La cédula es demasiado larga"),
  email: z.email("Email no válido").optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z
    .string()
    .min(5, "La dirección es obligatoria")
    .max(255, "La dirección es demasiado larga"),
  role: z.enum(educationalRolesEnum.enumValues, "El cargo es obligatorio"),
  educationalLevel: z.enum(
    educationalLevelEnum.enumValues,
    "El nivel educativo es obligatorio",
  ),
  photoUrl: z.string().optional().or(z.literal("")),
  order: z.number().int(),
});

export type personalFormSchema = z.infer<typeof personalFormSchema>;
