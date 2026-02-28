"use client";

import { LoginForm } from "@/components/auth/form/login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function LoginPage() {
  // useEffect(() => {
  //   const a = async () => {
  //     const b = await authClient.signUp.email({
  //       email: "nunezsalmeronm@gmail.com",
  //       password: "12345678",
  //       name: "Michel",
  //       username: "nsmichelj",
  //     });

  //     console.log(b);
  //   };

  //   a();
  // });
  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/institutional_logo.png"
            width={70}
            height={70}
            alt="Logo Insitucional Unidad Educativa Pedro Luis Cedeño"
            className="mx-auto"
          />
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Pedro Luis Cedeño
          </h1>
          <p className="text-muted-foreground">Unidad Educativa</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Iniciar Sesión</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
