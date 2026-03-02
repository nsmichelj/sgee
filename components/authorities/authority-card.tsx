"use client";

import {
  deleteAuthorityAction,
  updateAuthorityAction,
} from "@/actions/authorities";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { authorityFormSchema } from "@/lib/validations/authorities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AuthorityForm } from "./authority-form";

interface AuthorityCardProps {
  fullName: string;
  role: string;
  order: number;
  id: string;
  photoUrl?: string | null | undefined;
}

export default function AuthorityCard({
  fullName,
  role,
  order,
  id,
  photoUrl,
}: AuthorityCardProps) {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateAuthorityAction,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["authorities"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAuthorityAction,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["authorities"] });
    },
  });

  const updateAuthority = async (formData: authorityFormSchema) => {
    const { success } = await updateMutation.mutateAsync(formData);
    return {
      success: success,
    };
  };

  const deleteAuthority = async () => {
    const { success } = await deleteMutation.mutateAsync(id);
    return {
      success: success,
    };
  };

  return (
    <Card>
      <CardContent className="flex text-center flex-col justify-center gap-2">
        <Avatar className="size-32 mx-auto mb-4">
          <AvatarImage src={photoUrl || ""} alt={fullName} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            <User className="size-10" />
          </AvatarFallback>
        </Avatar>

        <CardTitle>{fullName}</CardTitle>
        <CardDescription>{role}</CardDescription>
      </CardContent>
      <CardFooter className="gap-4 justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Pencil /> Editar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Subir Nueva Foto</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <AuthorityForm
              initialData={{
                fullName,
                role,
                order,
                id,
                photoUrl,
              }}
              onSubmit={updateAuthority}
            />
          </DialogContent>
        </Dialog>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            deleteAuthority();
          }}
        >
          <Trash />
        </Button>
      </CardFooter>
    </Card>
  );
}
