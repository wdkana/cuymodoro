import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center gap-2 justify-center rounded-lg w-full text-sm uppercase font-semibold disabled:opacity-70 disabled:cursor-not-allowed tracking-wide",
  {
    variants: {
      variant: {
        default: "text-white bg-purple-600 hover:bg-purple-700",
        done: "text-white bg-gray-700/80 hover:bg-gray-700",
      },
      size: {
        default: "h-10 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
