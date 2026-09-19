import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationToasty = ({ message, type = "info" }) => {
  useEffect(() => {
    if (!message) return;

    // Prevent duplicate toast
    if (toast.isActive("notification-toast")) return;

    const toastOptions = {
      toastId: "notification-toast",
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    };

    switch (type) {
      case "success":
        toast.success(message, toastOptions);
        break;

      case "error":
        toast.error(message, toastOptions);
        break;

      case "warning":
        toast.warning(message, toastOptions);
        break;

      case "info":
      default:
        toast.info(message, toastOptions);
        break;
    }
  }, [message, type]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={3500}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      limit={3}
      toastStyle={{
        borderRadius: "14px",
        fontSize: "14px",
        fontWeight: "500",
        boxShadow: "0 10px 35px rgba(0, 0, 0, 0.12)",
      }}
    />
  );
};

export default NotificationToasty;