import { useEffect } from "react";
import { Alert, AlertTitle } from "@mui/material";

import styles from "./NotificationAlert.module.css";
import useAppContext from "../../../hooks/useAppContext";

function NotificationAlert() {
  const appCTX = useAppContext();
  const notify = appCTX.notify;

  useEffect(() => {
    const timer = setTimeout(() => {
      appCTX.removeNotify();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [appCTX]);

  if (!appCTX.notify.title) {
    return null;
  }
  return (
    <div className={styles.notification}>
      <Alert severity={appCTX.notify.type} onClose={appCTX.removeNotify}>
        <AlertTitle>{appCTX.notify.title}</AlertTitle>
        {appCTX.notify.message}
      </Alert>
    </div>
  );
}

export default NotificationAlert;
