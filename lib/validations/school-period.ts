import { z } from "zod";
import { pedagogicalMomentEnum } from "../db/schema";

export const pedagogicalMomentSchema = z.object({
  id: z.string().optional(),
  type: z.enum(pedagogicalMomentEnum.enumValues),
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
});

export const schoolPeriodSchema = z
  .object({
    id: z.string().optional(),
    academicYear: z
      .string()
      .min(9, "Debe tener 9 caracteres")
      .max(9, "Debe tener 9 caracteres")
      .regex(/^\d{4}-\d{4}$/, "El formato debe ser YYYY-YYYY (ej: 2024-2025)"),
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
    isActive: z.boolean(),
    moments: z
      .array(pedagogicalMomentSchema)
      .length(3, "Debe contener exactamente 3 momentos pedagógicos"),
  })
  .superRefine((data, ctx) => {
    if (data.endDate <= data.startDate) {
      ctx.addIssue({
        code: "custom",
        message: "La fecha de fin debe ser posterior a la fecha de inicio",
        path: ["endDate"],
      });
    }

    const [startYear, endYear] = data.academicYear.split("-").map(Number);
    if (endYear !== startYear + 1) {
      ctx.addIssue({
        code: "custom",
        message:
          "El año de fin debe ser consecutivo al de inicio (ej: 2024-2025)",
        path: ["academicYear"],
      });
    }

    // Check each moment
    const sortedMoments = [...data.moments].sort(
      (a, b) => a.startDate.getTime() - b.startDate.getTime(),
    );

    for (let i = 0; i < sortedMoments.length; i++) {
      const moment = sortedMoments[i];
      const originalIndex = data.moments.findIndex((m) => m === moment);

      if (moment.startDate < data.startDate || moment.endDate > data.endDate) {
        ctx.addIssue({
          code: "custom",
          message: "Debe estar dentro del periodo escolar",
          path: ["moments", originalIndex, "startDate"],
        });
      }

      if (moment.endDate <= moment.startDate) {
        ctx.addIssue({
          code: "custom",
          message: "Fecha de fin inválida",
          path: ["moments", originalIndex, "endDate"],
        });
      }

      if (i < sortedMoments.length - 1) {
        const nextMoment = sortedMoments[i + 1];
        const nextOriginalIndex = data.moments.findIndex(
          (m) => m === nextMoment,
        );
        if (moment.endDate >= nextMoment.startDate) {
          ctx.addIssue({
            code: "custom",
            message: "Los lapsos no pueden solaparse",
            path: ["moments", nextOriginalIndex, "startDate"],
          });
        }
      }
    }

    const types = data.moments.map((m) => m.type);
    if (
      !types.includes("FIRST") ||
      !types.includes("SECOND") ||
      !types.includes("THIRD")
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Se requiere 1er, 2do y 3er lapso",
        path: ["moments"],
      });
    }
  });

export type schoolPeriodSchema = z.infer<typeof schoolPeriodSchema>;
export type pedagogicalMomentSchema = z.infer<typeof pedagogicalMomentSchema>;
