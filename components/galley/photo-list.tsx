"use client";

import { getPhotos } from "@/actions/gallery";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import PhotoCard from "./photo-card";
import { PhotoEmptyState } from "./photo-empty-state";

export function PhotoList() {
  const {
    data: photos,
    isError,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["photos"],

    queryFn: async () => {
      return getPhotos();
    },
  });

  if (isError) {
    return (
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Algo no salió como esperábamos</AlertTitle>
          <AlertDescription>
            No logramos cargar los datos de la galería...
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

  const isEmpty = !isPending && photos.data?.length === 0;

  if (isEmpty) return <PhotoEmptyState />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {photos.data?.map((photo) => (
        <PhotoCard key={photo.id} {...photo} />
      ))}
    </div>
  );
}
