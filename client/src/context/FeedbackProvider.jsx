import { FeedbackContext } from "./createContext";
import { toast, ToastContainer } from "react-toastify";

export const FeedbackProvider = ({ children }) => {
  const config = { position: "top-right", pauseOnHover: true, theme: "light" };

  const showSuccessFeedback = (message) => {
    toast.success(message, config);
  };

  const showErrorFeedback = (message) => {
    toast.error(message, config);
  };

  return (
    <FeedbackContext.Provider
      value={{ showSuccessFeedback, showErrorFeedback }}
    >
      {children}
      <ToastContainer />
    </FeedbackContext.Provider>
  );
};