import { useEffect, useState } from "react";
import LoadingButton from "./LoadingButton";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  status: string | undefined;
}

function FeatureSubmitButton({ status, ...props }: ButtonProps) {
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    switch (status) {
      case "ongoing":
        setButtonText("Take a Break");
        break;
      case "break":
        setButtonText("Continue");
        break;
      default:
        setButtonText("Start");
        break;
    }
  }, [status]);

  return (
    <LoadingButton
      {...props}
      loading={props.disabled as boolean}
      type="submit"
      variant="default"
    >
      {buttonText}
    </LoadingButton>
  );
}

export default FeatureSubmitButton;
