import { useDispatch, useSelector } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import type { AppDispatch, RootState } from "../../redux/store.ts";
import { removeNotification } from "../../redux/notification/notificationSlice.ts";
import type { Notification as NotificationType } from "../../redux/notification/notificationTypes.ts";

export const Notification = () => {
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useSelector((state: RootState) => state.notification.notifications);

  const handleClose = (id: string) => {
    dispatch(removeNotification(id));
  };

  return (
    <>
      {notifications.map((notification: NotificationType) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={notification.autoHideDuration || 4000}
          onClose={() => handleClose(notification.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert
            onClose={() => handleClose(notification.id)}
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};
