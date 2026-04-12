import { z } from "zod";
import { calendarEventTypeEnum } from "../db/schema";

export const calendarEventSchema = z
  .object({
    id: z.string().uuid().optional(),
    title: z
      .string()
      .min(3, "El título debe tener al menos 3 caracteres")
      .max(200, "El título no puede exceder 200 caracteres"),
    description: z
      .string()
      .max(1000, "La descripción no puede exceder 1000 caracteres")
      .optional()
      .or(z.literal("")),
    startDate: z.date({
      error: (issue) =>
        issue.input === undefined
          ? "La fecha de inicio es requerida"
          : "Fecha de inicio inválida",
    }),
    endDate: z.date({
      error: (issue) =>
        issue.input === undefined
          ? "La fecha de fin es requerida"
          : "Fecha de fin inválida",
    }),
    type: z.enum(calendarEventTypeEnum.enumValues, {
      error: "Seleccione un tipo de evento",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.endDate < data.startDate) {
      ctx.addIssue({
        code: "custom",
        message:
          "La fecha de fin debe ser igual o posterior a la fecha de inicio",
        path: ["endDate"],
      });
    }
  });

export type calendarEventSchema = z.infer<typeof calendarEventSchema>;
