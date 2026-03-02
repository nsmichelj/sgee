"use client";

import { createPresignedUploadUrl } from "@/actions/r2";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { uploadFile } from "@/lib/r2/client";
import { cn } from "@/lib/utils";
import { CloudUpload, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

const MAX_FILE_SIZE_MB = 0.5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

interface Props {
  initialImage?: string;
  onFileChange?: (imageUrl?: string) => void;
  title?: string;
}

export function AvatarUpload({ initialImage, onFileChange, title }: Props) {
  const [image, setImage] = useState<string | undefined>(initialImage);
  const [isUploading, setIsUploading] = useState(false);

  const cleanupPreview = (url?: string) => {
    if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const previewUrl = URL.createObjectURL(file);
      setIsUploading(true);
      setImage(previewUrl);

      try {
        const { data, error } = await createPresignedUploadUrl({
          filename: file.name,
          contentType: file.type,
          ACL: "public-read",
        });

        if (error) throw new Error(error);

        if (data) {
          await uploadFile({
            file: file,
            presignedUrl: data.signedUrl,
          });

          onFileChange?.(data.publicFileUrl ?? "");
        }
      } catch {
        toast.error("No se pudo subir la imagen. Inténtalo de nuevo.");
        setImage(initialImage);
      } finally {
        setIsUploading(false);
        cleanupPreview(previewUrl);
      }
    },
    [onFileChange, initialImage],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: { "image/*": [] },
      multiple: false,
      maxSize: MAX_FILE_SIZE_BYTES,
      onDrop,
      disabled: isUploading,
    });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    cleanupPreview(image);
    setImage(undefined);
    onFileChange?.("");
  };

  useEffect(() => {
    setImage(initialImage);
  }, [initialImage]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-fit">
      <div className="relative">
        <div
          {...getRootProps()}
          className={cn(
            "size-32 lg:size-36 border-dashed border-border rounded-md transition-colors cursor-pointer",
            "hover:bg-muted/50 flex flex-col items-center justify-center overflow-hidden",
            isDragActive && "border-primary bg-primary/5",
            isDragReject && "border-destructive",
            image ? "border-none" : "border-2",
          )}
        >
          <input {...getInputProps()} className="sr-only" />

          <div className="relative w-full h-full flex items-center justify-center">
            {image ? (
              <Image
                src={image}
                fill
                sizes="160px"
                alt="Logo preview"
                className={cn(
                  "object-cover transition-opacity",
                  isUploading ? "opacity-40" : "opacity-100",
                )}
              />
            ) : (
              <div className="bg-muted text-foreground p-3 rounded-full">
                <CloudUpload className="size-6" />
              </div>
            )}

            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/20">
                <Loader2 className="size-8 animate-spin text-primary" />
              </div>
            )}
          </div>
        </div>

        {image && !isUploading && (
          <Button
            className="absolute -top-1 -right-1 rounded-full size-5 shadow-sm"
            variant="destructive"
            size="icon"
            type="button"
            onClick={handleRemove}
          >
            <X className="size-4" />
          </Button>
        )}
      </div>

      <div className="space-y-1 flex items-center justify-center flex-col">
        <Label className="text-sm font-medium">{title}</Label>
        <span className="text-xs text-muted-foreground">
          PNG, JPG o WEBP • Máx {MAX_FILE_SIZE_MB} MB
        </span>
      </div>
    </div>
  );
}
