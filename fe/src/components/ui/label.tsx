import * as React from "react";
import { cn } from "@/lib/utils";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "absolute start-2.5 top-2.5 origin-[0] -translate-y-3 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4",
        className,
      )}
      {...props}
    />
  ),
);
Label.displayName = "Label";

export { Label };
