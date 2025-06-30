import { ThemeProvider, CssBaseline } from "@mui/material";
import { useMemo, useState } from "react";
import Home from "./pages/Home";
import { getTheme } from "./theme/theme";

function App({ toggleTheme }: { toggleTheme: () => void }) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = useMemo(() => getTheme(mode), [mode]);

  const handleToggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
    toggleTheme(); // if you're passing this down, or remove if not used
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home toggleTheme={handleToggleTheme} />
    </ThemeProvider>
  );
}

export default App;
