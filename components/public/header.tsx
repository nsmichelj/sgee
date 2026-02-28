import Link from "next/link";
import { Container } from "../container";

export function Header() {
  return (
    <header className="sticky top-0 left-0 z-50">
      <nav className="relative bg-background w-full z-20 border-b border-border">
        <Container className="flex flex-wrap items-center justify-between py-4">
          <Link href="/">
            <span className="text-xl font-semibold">
              Unidad Educativa Pedro Luis Cedeño
            </span>
          </Link>
        </Container>
      </nav>
    </header>
  );
}
