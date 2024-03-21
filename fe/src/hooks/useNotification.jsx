import { useEffect, useState } from "react";
import { useActionData } from "react-router-dom";

export default function useNotification() {
  const actionData = useActionData();
  const [notify, setNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");

  useEffect(() => {
    if (actionData?.data) {
      setNotify(true);
      setNotifyMessage(actionData?.data?.message);
    }
  }, [actionData]);

  return { notify, notifyMessage };
}
