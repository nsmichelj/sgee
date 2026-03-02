"use client";

import { getAutorities } from "@/actions/authorities";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { AuthorityEmptyState } from "./authorities-empty-state";
import AuthorityCard from "./authority-card";

export function AuthorityList() {
  const {
    data: authorities,
    isError,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["authorities"],

    queryFn: async () => {
      return getAutorities();
    },
  });

  if (isError) {
    return (
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Algo no salió como esperábamos</AlertTitle>
          <AlertDescription>
            No logramos cargar los datos de las autoridades...
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

  if (isPending) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
      </div>
    );
  }

  const isEmpty = !isPending && authorities.data?.length === 0;

  if (isEmpty) return <AuthorityEmptyState />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {authorities.data?.map((authority) => (
        <AuthorityCard key={authority.id} {...authority} />
      ))}
    </div>
  );
}
