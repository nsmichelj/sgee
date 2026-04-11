"use client";

import { getPersonal } from "@/actions/personal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Suspense } from "react";
import { personalColumns } from "./columns";
import { PersonalDataTable } from "./data-table";

export function ListPersonal() {
  const {
    data: personalRecords,
    isError,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["personal"],
    queryFn: async () => {
      const resp = await getPersonal();
      if (!resp.success) throw new Error(resp.error);
      return resp.data;
    },
  });

  if (isError) {
    return (
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error al cargar datos</AlertTitle>
          <AlertDescription>
            No logramos obtener la lista del personal. Por favor, intente de
            nuevo.
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
      <PersonalDataTable
        loading={isPending}
        data={
          personalRecords?.map((p) => ({
            ...p,
            email: p.email ?? "",
            phone: p.phone ?? "",
            photoUrl: p.photoUrl ?? "",
          })) ?? []
        }
        columns={personalColumns}
      />
    </Suspense>
  );
}
