import { CircleLoading } from "./CircleLoading";
import { Button } from "./ui/button";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  variant: "default" | "done";
}

const LoadingButton = ({
  children,
  variant,
  loading,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button {...props} disabled={props.disabled || loading} variant={variant}>
      {loading && <CircleLoading />}
      {children}
    </Button>
  );
};

export default LoadingButton;
