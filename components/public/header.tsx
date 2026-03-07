import Link from "next/link";
import { Container } from "../container";
import { Button } from "../ui/button";

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
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
              <li>
                <Button variant="link" className="text-lg" asChild>
                  <Link href="/school_news">Noticias</Link>
                </Button>
              </li>
            </ul>
          </div>
        </Container>
      </nav>
    </header>
  );
}
