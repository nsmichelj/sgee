import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";

export function DeleteUser({ userId }: { userId: string }) {
  const { data } = authClient.useSession();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const { error } = await authClient.admin.removeUser({
        userId,
      });

      return error ? { success: false } : { success: true };
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const deleteAuthority = async () => {
    await deleteMutation.mutateAsync();
  };

  return (
    <Button
      variant="destructive"
      onClick={() => deleteAuthority()}
      disabled={data?.user.id === userId}
    >
      <Trash2 />
    </Button>
  );
}
