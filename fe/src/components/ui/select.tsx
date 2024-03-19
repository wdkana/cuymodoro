import * as React from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            "inline-flex w-full cursor-pointer appearance-none items-center rounded-lg border-0 border-b-2 border-gray-300 bg-gray-700/80 px-2.5 pb-1.5 pt-4 text-sm text-gray-300 focus:border-purple-500 focus:bg-gray-700 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
          ref={ref}
        />
        <div className="absolute right-3 top-3 rotate-90">{">"}</div>
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
