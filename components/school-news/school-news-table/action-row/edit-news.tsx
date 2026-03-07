import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";

export default function EditSchoolNews({
  schoolNewsId,
}: {
  schoolNewsId: string;
}) {
  return (
    <Button asChild>
      <Link href={`/dashboard/school_news/edit/${schoolNewsId}`}>
        <Edit />
      </Link>
    </Button>
  );
}
