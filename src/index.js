import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import CacheProvider from "contexts/cache/Provider";
import Router from "pages";

import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <CacheProvider>
      <Router />
    </CacheProvider>
  </StrictMode>
);
