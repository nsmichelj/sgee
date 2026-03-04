"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { userColumns, UserDataTable } from "@/components/users/users-table";
import { authClient } from "@/lib/auth/client";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Suspense } from "react";

export function ListUsers() {
  const {
    data: users,
    isError,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["users"],

    queryFn: async () => {
      const { data: users } = await authClient.admin.listUsers({
        query: {},
      });
      return users;
    },
  });

  if (isError) {
    return (
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Algo no salió como esperábamos</AlertTitle>
          <AlertDescription>
            No logramos cargar los usuarios del sistema...
          </AlertDescription>
        </Alert>
        <div className="flex justify-center">
          <Button onClick={() => refetch()}>
            Intentar de nuevo <RefreshCcw className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Suspense>
      <UserDataTable
        loading={isPending}
        data={users?.users ?? []}
        columns={userColumns}
      />
    </Suspense>
  );
}
