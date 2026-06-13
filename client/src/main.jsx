import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { FeedbackProvider } from "./context/FeedbackProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <FeedbackProvider>
        <App />
      </FeedbackProvider>
    </Provider>
  </StrictMode>,
);
