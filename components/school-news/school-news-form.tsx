"use client";

import { schoolNewsFormSchema } from "@/lib/validations/school_news";
import { useForm } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";
import { CoverUpload } from "../cover-upload";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface SchoolNewsFormProps {
  initialData?: Partial<schoolNewsFormSchema>;
  onSubmit?: (values: schoolNewsFormSchema) => Promise<{ success: boolean }>;
  resetAfterSubmit?: boolean;
}

export function SchoolNewsForm({
  initialData,
  onSubmit,
  resetAfterSubmit = false,
}: SchoolNewsFormProps) {
  const form = useForm({
    defaultValues: {
      id: initialData?.id,
      title: initialData?.title ?? "",
      slug: initialData?.slug ?? "",
      coverImageUrl: initialData?.coverImageUrl ?? "",
      excerpt: initialData?.excerpt ?? "",
      content: initialData?.content ?? "",
    } as schoolNewsFormSchema,
    validators: {
      onSubmit: schoolNewsFormSchema,
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
        <form.Field name="title">
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

        <form.Field name="excerpt">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Contenido de la Noticia
                </FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value || ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  className="h-26"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="coverImageUrl">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <CoverUpload
                  title="Foto de la noticia"
                  initialImage={field.state.value}
                  onFileChange={(file) => field.handleChange(file || "")}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="content">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Contenido de la Noticia
                </FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value || ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  className="h-50"
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
