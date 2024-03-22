import { useEffect, useState } from "react";
import { useActionData } from "react-router-dom";

export default function useNotification() {
  const action = useActionData();
  const [notify, setNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");

  useEffect(() => {
    if (action?.data) {
      setNotify(true);
      setNotifyMessage(action?.data?.message);
      setTimeout(() => {
        setNotify(false);
      }, 3000);
    }
  }, [action]);

  return { notify, notifyMessage };
}
