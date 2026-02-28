import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function Container({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full px-4 md:px-6 max-w-5xl relative mx-auto",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
