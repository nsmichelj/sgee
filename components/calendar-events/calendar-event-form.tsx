"use client";

import { calendarEventTypeEnum } from "@/lib/db/schema";
import { calendarEventSchema } from "@/lib/validations/calendar-events";
import { useForm } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

type EventType = (typeof calendarEventTypeEnum.enumValues)[number];

const eventTypeLabels: Record<EventType, { label: string; emoji: string }> = {
  pedagogical: { label: "Pedagógico", emoji: "📚" },
  administrative: { label: "Administrativo", emoji: "📋" },
  didactic: { label: "Didáctico", emoji: "🎓" },
  efemeride: { label: "Efeméride", emoji: "📅" },
  holiday: { label: "Asueto", emoji: "🏖️" },
  other: { label: "Otro", emoji: "📌" },
};

function getFieldDateValue(value: Date | string) {
  if (value instanceof Date && !isNaN(value.getTime())) {
    return value.toISOString().split("T")[0];
  }
  return value;
}

interface CalendarEventFormProps {
  initialData?: Partial<calendarEventSchema>;
  dateRange?: { start: Date; end: Date };
  onSubmit?: (values: calendarEventSchema) => Promise<{ success: boolean }>;
  onCancel?: () => void;
  submitLabel?: string;
}

export function CalendarEventForm({
  initialData,
  dateRange,
  onSubmit,
  onCancel,
  submitLabel = "Guardar Evento",
}: CalendarEventFormProps) {
  const minDate = dateRange
    ? dateRange.start.toISOString().split("T")[0]
    : undefined;
  const maxDate = dateRange
    ? dateRange.end.toISOString().split("T")[0]
    : undefined;

  const form = useForm({
    defaultValues: {
      id: initialData?.id,
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      startDate: initialData?.startDate ?? new Date(),
      endDate: initialData?.endDate ?? new Date(),
      type: initialData?.type ?? ("pedagogical" as EventType),
    } as calendarEventSchema,
    validators: {
      onSubmit: calendarEventSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit?.(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      autoComplete="off"
    >
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <form.Field name="title">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Título del Evento
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="Ej: Feria de Ciencias"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="type">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Tipo de Evento</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={(v) => field.handleChange(v as EventType)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {calendarEventTypeEnum.enumValues.map((type) => (
                          <SelectItem key={type} value={type}>
                            <span className="flex items-center gap-2">
                              <span>{eventTypeLabels[type].emoji}</span>
                              <span>{eventTypeLabels[type].label}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <div className="grid sm:grid-cols-2 gap-4">
              <form.Field name="startDate">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  const value = getFieldDateValue(field.state.value);
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Fecha de Inicio
                      </FieldLabel>
                      <Input
                        type="date"
                        id={field.name}
                        name={field.name}
                        value={value.toString()}
                        min={minDate}
                        max={maxDate}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(new Date(e.target.value) as any)
                        }
                        aria-invalid={isInvalid}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="endDate">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  const value = getFieldDateValue(field.state.value);
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Fecha de Fin</FieldLabel>
                      <Input
                        type="date"
                        id={field.name}
                        name={field.name}
                        value={value.toString()}
                        min={minDate}
                        max={maxDate}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(new Date(e.target.value) as any)
                        }
                        aria-invalid={isInvalid}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </div>

            <form.Field name="description">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Descripción</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      placeholder="Descripción opcional del evento..."
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      rows={3}
                    />
                    <FieldDescription>Opcional</FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border/40">
        {onCancel && (
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancelar
          </Button>
        )}

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? (
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
              ) : null}
              {submitLabel}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
