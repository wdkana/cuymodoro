import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        {...props}
        className={cn(
          "peer block w-full appearance-none rounded-lg border-0 border-b-2 border-gray-300 px-2.5 pb-1.5 pt-4 text-sm focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        type={type}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
