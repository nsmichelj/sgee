import z from "zod";

const passwordBaseSchema = z
  .string("La contraseña es obligatoria")
  .min(8, "La contraseña es muy corta")
  .max(50, "La contraseña es demasiado larga");

export const userFormSchema = z
  .object({
    name: z
      .string()
      .min(3, "Proporcione un nombre valido")
      .max(50, "El nombre es demasiado largo")
      .trim(),
    username: z
      .string()
      .min(6, "El nombre de usuario debe tener al menos 6 caracteres")
      .max(20, "El nombre de usuario no puede exceder los 20 caracteres")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "El nombre de usuario no debe contener caracteres especiales",
      ),
    email: z.email("Introduce un correo electrónico válido"),
    rol: z.enum(["admin", "user"]),
    password: passwordBaseSchema
      .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
      .regex(/[0-9]/, "Debe contener al menos un número")
      .regex(/[^a-zA-Z0-9]/, "Debe contener al menos un carácter especial"),
    confirmPassword: z.string().min(1, "Debes confirmar tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type userFormSchema = z.infer<typeof userFormSchema>;
