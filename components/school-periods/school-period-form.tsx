"use client";

import { pedagogicalMomentEnum } from "@/lib/db/schema";
import { schoolPeriodSchema } from "@/lib/validations/school-period";
import { useForm } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";

function getFieldDateValue(value: Date | string) {
  if (value instanceof Date && !isNaN(value.getTime())) {
    return value.toISOString().split("T")[0];
  }
  return value;
}

type momentPeriodType = (typeof pedagogicalMomentEnum.enumValues)[number];

const momentTypes: Record<momentPeriodType, string> = {
  FIRST: "Primer Momento Pedagógico",
  SECOND: "Segundo Momento Pedagógico",
  THIRD: "Tercer Momento Pedagógico",
};

interface SchoolPeriodFormProps {
  initialData?: Partial<schoolPeriodSchema>;
  onSubmit?: (values: schoolPeriodSchema) => Promise<{ success: boolean }>;
  resetAfterSubmit?: boolean;
}

export function SchoolPeriodForm({
  initialData,
  onSubmit,
  resetAfterSubmit,
}: SchoolPeriodFormProps) {
  const form = useForm({
    defaultValues: {
      id: initialData?.id,
      academicYear: initialData?.academicYear ?? "",
      startDate: initialData?.startDate ?? new Date(),
      endDate: initialData?.endDate ?? new Date(),
      isActive: initialData?.isActive ?? true,
      moments: initialData?.moments ?? [
        {
          type: "FIRST",
          startDate: initialData?.moments?.[0]?.startDate ?? new Date(),
          endDate: initialData?.moments?.[0]?.endDate ?? new Date(),
        },
        {
          type: "SECOND",
          startDate: initialData?.moments?.[1]?.startDate ?? new Date(),
          endDate: initialData?.moments?.[1]?.endDate ?? new Date(),
        },
        {
          type: "THIRD",
          startDate: initialData?.moments?.[2]?.startDate ?? new Date(),
          endDate: initialData?.moments?.[2]?.endDate ?? new Date(),
        },
      ],
    } as schoolPeriodSchema,
    validators: {
      onSubmit: schoolPeriodSchema,
    },
    onSubmit: async ({ value }) => {
      const result = await onSubmit?.(value);
      if (result?.success && resetAfterSubmit) {
        form.reset();
      }
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
          <FieldLegend>Periodo Escolar</FieldLegend>
          <FieldDescription>
            Información general del periodo escolar
          </FieldDescription>
          <FieldGroup>
            <form.Field name="academicYear">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Año Escolar</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="YYYY-YYYY"
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
          </FieldGroup>
        </FieldSet>

        <FieldSeparator />

        <FieldSet>
          <FieldLegend>Momentos Pedagógicos</FieldLegend>
          <FieldDescription>
            Información general de los momentos pedagógicos
          </FieldDescription>
          <FieldGroup>
            {pedagogicalMomentEnum.enumValues.map((type, index) => {
              return (
                <Card key={type} className="shadow-none bg-muted">
                  <CardHeader>
                    <CardTitle>{momentTypes[type]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <form.Field name={`moments[${index}].startDate`}>
                        {(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          const value = getFieldDateValue(field.state.value);
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>
                                Inicio
                              </FieldLabel>
                              <Input
                                type="date"
                                id={field.name}
                                name={field.name}
                                value={value.toString()}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(
                                    new Date(e.target.value) as any,
                                  )
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

                      <form.Field name={`moments[${index}].endDate`}>
                        {(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          const value = getFieldDateValue(field.state.value);
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>
                                Cierre
                              </FieldLabel>
                              <Input
                                type="date"
                                id={field.name}
                                name={field.name}
                                value={value.toString()}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(
                                    new Date(e.target.value) as any,
                                  )
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
                  </CardContent>
                </Card>
              );
            })}
          </FieldGroup>
        </FieldSet>
      </FieldGroup>

      <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-border/40">
        <Button variant="outline" type="button" onClick={() => form.reset()}>
          Descartar
        </Button>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? (
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
              ) : null}
              Guardar Periodo Escolar
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
