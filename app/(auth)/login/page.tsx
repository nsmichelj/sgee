"use client";

import { LoginForm } from "@/components/auth/form/login-form";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-background overflow-hidden bg-linear-to-b from-primary/80 to-primary/20">
      <div className="relative flex w-full flex-col justify-center px-6 py-12 lg:px-24 xl:px-32">
        <Card className="mx-auto w-full max-w-110 relative z-10">
          <CardContent>
            <div className="mb-8 flex flex-col items-center">
              <Image
                src="/institutional_logo.png"
                width={70}
                height={70}
                alt="Logo Institucional"
                className="mb-6 drop-shadow-lg"
              />
              <div className="inline-flex items-center rounded-full border border-border bg-muted text-muted-foreground px-3 py-1 text-xs font-medium">
                <span className="flex h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                SGEE Pedro Luis Cedeño
              </div>
            </div>

            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-3">
                Bienvenido de vuelta
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">
                Ingresa tus credenciales para acceder a tu panel de
                administración escolar.
              </p>
            </div>

            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
