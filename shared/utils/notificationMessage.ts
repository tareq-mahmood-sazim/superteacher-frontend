import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "../constants/app.constants";

export function NotificationMessage(type: string, message: string) {
  const messageType = (type: string): string => {
    switch (type) {
      case "Error":
        return "red";
      case "Success":
        return "green";
      case "Warning":
        return "yellow";
      default:
        return "blue";
    }
  };
  return {
    title: type,
    message,
    autoClose: NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
    color: messageType(type),
  };
}
