"use client";

import { authClient } from "@/lib/auth/client";
import { userFormSchema } from "@/lib/validations/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { UserForm } from "./user-form";

export function CreateUserModal() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: userFormSchema) => {
      const { error } = await authClient.admin.createUser({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: formData.rol,
        data: { username: formData.username },
      });
      return error ? { success: false } : { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const createUser = async (formData: userFormSchema) => {
    const { success } = await mutation.mutateAsync(formData);
    return { success };
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <UserPlus /> Nuevo Usuario
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Usuario</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <UserForm onSubmit={createUser} resetAfterSubmit />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateUserModal;
