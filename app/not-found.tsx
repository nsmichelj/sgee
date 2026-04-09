"use client";

import { Button } from "@/components/ui/button";
import { Home, MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), transparent",
        }}
      />

      <main className="relative z-10 flex flex-col items-center text-center px-6">
        <div className="mb-8">
          <div className="relative size-24 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <Image
              src="/institutional_logo.png"
              alt="Logo Institucional"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="relative">
          <h1 className="text-[12rem] md:text-[18rem] font-bold leading-none tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-foreground/20 to-foreground/5 select-none">
            404
          </h1>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground/90">
              Ruta No Encontrada
            </h2>
          </div>
        </div>

        <p className="mt-6 text-muted-foreground max-w-110 text-lg leading-relaxed">
          Lo sentimos, la página que buscas parece haberse extraviado en los
          pasillos de la institución. Verifica la URL o vuelve al panel
          principal.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            size="lg"
            variant="default"
            className="h-12 px-8 rounded-full font-medium transition-all hover:scale-105 active:scale-95"
          >
            <Link href="/dashboard">
              <Home />
              Ir al Dashboard
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 rounded-full font-medium transition-all hover:scale-105 active:scale-95"
            onClick={() => router.back()}
          >
            <MoveLeft />
            Regresar
          </Button>
        </div>
      </main>

      <div className="absolute bottom-8 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 font-medium">
        Unidad Educativa Pedro Luis Cedeño
      </div>
    </div>
  );
}
