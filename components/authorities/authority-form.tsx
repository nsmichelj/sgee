"use client";

import { authorityFormSchema } from "@/lib/validations/authorities";
import { useForm } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";
import { AvatarUpload } from "../avatar-upload";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface AuthorityFormProps {
  initialData?: Partial<authorityFormSchema>;
  onSubmit?: (values: authorityFormSchema) => Promise<{ success: boolean }>;
  resetAfterSubmit?: boolean;
}

export function AuthorityForm({
  initialData,
  onSubmit,
  resetAfterSubmit = false,
}: AuthorityFormProps) {
  const form = useForm({
    defaultValues: {
      id: initialData?.id,
      fullName: initialData?.fullName ?? "",
      role: initialData?.role ?? "",
      photoUrl: initialData?.photoUrl ?? "",
      order: 0,
    } as authorityFormSchema,
    validators: {
      onSubmit: authorityFormSchema,
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
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="fullName">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Titulo</FieldLabel>
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
                <FieldLabel htmlFor={field.name}>Rol</FieldLabel>
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

        <Field orientation="horizontal" className="justify-end">
          <Button
            variant="secondary"
            type="button"
            onClick={() => form.reset()}
          >
            Cancelar
          </Button>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>{initialData ? "Actualizar" : "Agregar"}</>
                )}
              </Button>
            )}
          </form.Subscribe>
        </Field>
      </FieldGroup>
    </form>
  );
}
