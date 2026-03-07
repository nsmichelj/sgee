import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface News {
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  createdAt: Date;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function SchoolNewsCard({
  title,
  excerpt,
  coverImageUrl,
  createdAt,
}: News) {
  return (
    <Card className="pt-0! pb-6 overflow-hidden h-full">
      <div className="relative h-48 w-full">
        <Image
          src={coverImageUrl ?? ""}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <Badge className="absolute top-2 left-2">{formatDate(createdAt)}</Badge>
      </div>

      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {excerpt && (
          <p className="text-muted-foreground line-clamp-5">{excerpt}</p>
        )}
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className="cursor-pointer">Leer Más</Button>
      </CardFooter>
    </Card>
  );
}
