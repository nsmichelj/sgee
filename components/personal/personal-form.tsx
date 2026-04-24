"use client";

import { checkPersonalCedulaAction } from "@/actions/personal";
import {
  educationalLevelEnum,
  educationalRolesEnum,
} from "@/lib/db/schema";
import { personalFormSchema } from "@/lib/validations/personal";
import { useForm } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";
import { AvatarUpload } from "../avatar-upload";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type EducationalRoleType = (typeof educationalRolesEnum.enumValues)[number];

export const educationalRolesLabels: Record<EducationalRoleType, string> = {
  preschool_teacher: "Docente de Aula (Educación Inicial)",
  primary_school_teacher: "Docente de Aula (Educación Primaria)",
  specialist_teacher:
    "Docente de Especialidad (Matemática, Castellano, Biología)",
  physical_education_teacher: "Docente de Educación Física",
  integrated_classroom_teacher: "Docente de Aula Integrada",
  learning_resource_librarian:
    "Docente de Recurso para el Aprendizaje (Biblioteca)",
  culture_teacher: "Docente de Cultura",
  school_garden_teacher: "Docente de Manos a la Siembra",
  teacher_coordinator: "Docente con Función de Coordinación",
  it_teacher: "Docente de Informática",
};

type EducationalLevelType = (typeof educationalLevelEnum.enumValues)[number];

export const educationalLevelsLabels: Record<EducationalLevelType, string> = {
  associate_degree: "Técnico Superior Universitario (TSU)",
  bachelor_degree: "Licenciatura",
  master_degree: "Maestría",
  doctorate_degree: "Doctorado",
  postgraduate_diploma: "Postgrado",
  other: "Otro",
};


interface PersonalFormProps {
  initialData?: Partial<personalFormSchema>;
  onSubmit?: (values: personalFormSchema) => Promise<{ success: boolean }>;
  resetAfterSubmit?: boolean;
}

export function PersonalForm({
  initialData,
  onSubmit,
  resetAfterSubmit = false,
}: PersonalFormProps) {
  const form = useForm({
    defaultValues: {
      id: initialData?.id,
      firstName: initialData?.firstName ?? "",
      lastName: initialData?.lastName ?? "",
      cedula: initialData?.cedula ?? "",
      email: initialData?.email ?? "",
      phone: initialData?.phone ?? "",
      address: initialData?.address ?? "",
      role: initialData?.role ?? "primary_school_teacher",
      educationalLevel: initialData?.educationalLevel ?? "bachelor_degree",
      photoUrl: initialData?.photoUrl ?? "",
      order: initialData?.order ?? 0,
    } as personalFormSchema,
    validators: {
      onSubmit: personalFormSchema,
    },
    onSubmit: async ({ value }) => {
      const result = await onSubmit?.(value);

      if (resetAfterSubmit && result?.success) {
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
        <form.Field name="photoUrl">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <AvatarUpload
                  title="Foto de perfil"
                  initialImage={field.state.value || undefined}
                  onFileChange={(file) => field.handleChange(file || "")}
                />
                {isInvalid && (
                  <FieldError
                    className="text-center"
                    errors={field.state.meta.errors}
                  />
                )}
              </Field>
            );
          }}
        </form.Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field name="firstName">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Nombre</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="lastName">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Apellido</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field
            name="cedula"
            asyncDebounceMs={500}
            validators={{
              onChangeAsync: async ({ value }) => {
                if (!value || value.length < 5) return undefined;
                const { error } = await checkPersonalCedulaAction(
                  value,
                  form.state.values.id,
                );
                return error ? { message: error } : undefined;
              },
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field className="max-w-sm">
                  <FieldLabel htmlFor={field.name}>Cédula</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />
                    {field.state.meta.isValidating && (
                      <InputGroupAddon align="inline-end">
                        <Loader2 className="animate-spin" />
                      </InputGroupAddon>
                    )}
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Correo Electrónico
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field name="phone">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Teléfono</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="role">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Cargo / Rol</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) =>
                      field.handleChange(value as EducationalRoleType)
                    }
                  >
                    <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                      <SelectValue placeholder="Seleccione un cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationalRolesEnum.enumValues.map((role) => (
                        <SelectItem key={role} value={role}>
                          {educationalRolesLabels[role]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field name="educationalLevel">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid} className="max-w-sm">
                  <FieldLabel htmlFor={field.name}>Nivel Educativo</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) =>
                      field.handleChange(value as EducationalLevelType)
                    }
                  >
                    <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                      <SelectValue placeholder="Seleccione un nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationalLevelEnum.enumValues.map((level) => (
                        <SelectItem key={level} value={level}>
                          {educationalLevelsLabels[level]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>

        <form.Field name="address">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Dirección</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <Field orientation="horizontal" className="justify-end gap-2">
          <Button
            variant="secondary"
            type="button"
            onClick={() => form.reset()}
          >
            Resetear
          </Button>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>{initialData ? "Guardar Cambios" : "Registrar Personal"}</>
                )}
              </Button>
            )}
          </form.Subscribe>
        </Field>
      </FieldGroup>
    </form>
  );
}
