import { Footer } from "@/components/public/footer";
import { Header } from "@/components/public/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unidad Educativa Pedro Luis Cedeño",
  description:
    "Sistema de Gestión Extracurricular Escolar de la Unidad Educativa Pedro Luis Cedeño.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
