import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "./theme/theme";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";

const Main = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App
          toggleTheme={() => setMode(mode === "light" ? "dark" : "light")}
          darkMode={mode === "dark"}
        />
      </ThemeProvider>
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
