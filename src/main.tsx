import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "@/Pages/Main";
import Train from "@/Pages/Train";
import Layout from "@/Components/General/Layout";
import { Toaster } from "sonner";

import "./index.css";
import "@fontsource/public-sans";
import { CssVarsProvider } from "@mui/joy";
import Chart from "./Pages/Chart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "train",
        element: <Train />,
      },
      {
        path: "chart",
        element: <Chart />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssVarsProvider defaultMode="system">
      <Toaster duration={1500} closeButton richColors position="top-left" />
      <RouterProvider router={router} />
    </CssVarsProvider>
  </React.StrictMode>
);
