"use client";

import { photoFormSchema } from "@/lib/validations/gallery";
import { useForm } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";
import { CoverUpload } from "../cover-upload";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";

interface PhotoFormProps {
  initialData?: Partial<photoFormSchema>;
  onSubmit?: (values: photoFormSchema) => Promise<{ success: boolean }>;
  resetAfterSubmit?: boolean;
}

export function PhotoForm({
  initialData,
  onSubmit,
  resetAfterSubmit = false,
}: PhotoFormProps) {
  const form = useForm({
    defaultValues: {
      id: initialData?.id,
      title: initialData?.title ?? "",
      caption: initialData?.caption,
      isPublic: initialData?.isPublic ?? true,
      url: initialData?.url,
    } as photoFormSchema,
    validators: {
      onSubmit: photoFormSchema,
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
        <form.Field name="url">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <CoverUpload
                  title="Foto Escolar"
                  initialImage={field.state.value}
                  onFileChange={(file) => field.handleChange(file || "")}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

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

        <form.Field name="caption">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Leyenda</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value || ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <FieldSet className="w-full max-w-xs">
          <FieldLegend variant="label">Visivilidad</FieldLegend>

          <form.Field name="isPublic">
            {(field) => {
              return (
                <RadioGroup
                  defaultValue={field.state.value ? "public" : "private"}
                  className="w-fit"
                  onValueChange={(value) =>
                    field.handleChange(value === "public" ? true : false)
                  }
                >
                  <Field orientation="horizontal">
                    <RadioGroupItem value="public" id="public" />
                    <FieldLabel htmlFor="public">Publico</FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <RadioGroupItem value="private" id="private" />
                    <FieldLabel htmlFor="private">Privada</FieldLabel>
                  </Field>
                </RadioGroup>
              );
            }}
          </form.Field>
        </FieldSet>

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
