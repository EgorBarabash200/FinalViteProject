import "antd/dist/reset.css";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const rootBlock = document.getElementById("root");

if (rootBlock) {
  createRoot(rootBlock).render(<App />);
}
