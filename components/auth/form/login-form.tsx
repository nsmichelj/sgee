"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { authClient } from "@/lib/auth/client";
import { loginFormSchema } from "@/lib/validations/auth";
import { useForm } from "@tanstack/react-form";
import { Loader2, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as loginFormSchema,
    validators: {
      onSubmit: loginFormSchema,
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onError: (ctx) => {
            if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
              toast.error("Usuario o Contraseña incorrectos");
            } else {
              toast.error("Ha ocurrido un error durante el registro");
              console.log(ctx.error);
            }
          },
          onSuccess() {
            form.reset();
            router.push("/dashboard");
          },
        },
      );
    },
  });

  return (
    <form
      id="signin-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      autoComplete="off"
    >
      <FieldGroup>
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="email"
                  />
                  <InputGroupAddon align="inline-start">
                    <Mail className="text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Contraseña</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="password"
                  />
                  <InputGroupAddon align="inline-start">
                    <Lock className="text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Field>
              <Button
                type="submit"
                form="signin-form"
                className="w-full"
                disabled={!canSubmit}
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Iniciar Sección"
                )}
              </Button>
            </Field>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
}
