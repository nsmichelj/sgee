import { deleteSchoolNewsAction } from "@/actions/school_news";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";

export function DeleteSchoolNews({ schoolNewsId }: { schoolNewsId: string }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await deleteSchoolNewsAction(schoolNewsId);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["school_news"] });
    },
  });

  const deleteSchoolNews = async () => {
    await deleteMutation.mutateAsync();
  };

  return (
    <Button variant="destructive" onClick={() => deleteSchoolNews()}>
      <Trash2 />
    </Button>
  );
}
