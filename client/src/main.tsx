import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { LanguageProvider } from "./context/LanguageContext";
import { SubscriptionProvider } from "./context/SubscriptionContext";

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <SubscriptionProvider>
      <App />
    </SubscriptionProvider>
  </LanguageProvider>
);
