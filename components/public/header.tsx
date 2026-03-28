import Image from "next/image";
import Link from "next/link";
import { Container } from "../container";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="sticky top-0 left-0 z-50">
      <div className="mx-auto bg-background">
        <Container className="flex justify-between items-center py-4 w-full">
          <Link href="/" className="flex gap-4 items-center">
            <Image
              src="/institutional_logo.png"
              width={100}
              height={109}
              alt="Logo Insitucional Unidad Educativa Pedro Luis Cedeño"
              className="max-w-15 h-auto mx-auto"
            />
            <span className="text-xl md:text-2xl font-semibold">
              Unidad Educativa Pedro Luis Cedeño
            </span>
          </Link>
          <Image
            src="/institutional_banner.jpg"
            width={500}
            height={200}
            alt="Logo Insitucional Unidad Educativa Pedro Luis Cedeño"
            className="max-w-52 h-auto ms-auto"
          />
        </Container>
      </div>
      <nav className="relative bg-primary w-full z-20 border-b border-primary">
        <Container className="flex justify-between items-center py-2 w-full">
          <div className="w-full">
            <ul className="flex gap-4">
              <li>
                <Button
                  variant="link"
                  className="text-md text-white p-0 uppercase"
                  asChild
                >
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
