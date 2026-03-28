import Link from "next/link";
import { Container } from "../container";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <Container className="py-8">
        <span className="block text-md text-muted-foreground text-center">
          © 2026 <Link href="/">Unidad Educativa Pedro Luis Cedeño</Link>.
        </span>
      </Container>
    </footer>
  );
}
