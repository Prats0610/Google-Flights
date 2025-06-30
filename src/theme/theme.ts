import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#1976d2",
      },
      background: {
        default: mode === "light" ? "#fff" : "#121212",
        paper: mode === "light" ? "#fff" : "#1e1e1e",
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: "1rem",
            boxShadow: mode === "light" ? "0 1px 6px #ccc" : "0 1px 6px #000",
          },
        },
      },
    },
  });
