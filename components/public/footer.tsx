import Image from "next/image";
import Link from "next/link";
import { Container } from "../container";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <Container className="py-8">
        <div className="flex items-center justify-center w-full">
          <Link href="/" className="flex flex-col space-x-3">
            <Image
              src="/institutional_logo.png"
              width={150}
              height={150}
              alt="Logo Insitucional Unidad Educativa Pedro Luis Cedeño"
            />
          </Link>
        </div>
        <hr className="my-6 border-default sm:mx-auto lg:my-8" />
        <span className="block text-md text-muted-foreground text-center">
          © 2026 <Link href="/">Unidad Educativa Pedro Luis Cedeño</Link>.
        </span>
      </Container>
    </footer>
  );
}
