import * as React from "react";
import { cn } from "@/lib/utils";

interface CircleLoadingProps extends React.HTMLAttributes<HTMLDivElement> {}

const CircleLoading = React.forwardRef<HTMLDivElement, CircleLoadingProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative h-5 w-5 animate-spin rounded-full border-b-2 border-white",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

CircleLoading.displayName = "CircleLoading";

export { CircleLoading };
