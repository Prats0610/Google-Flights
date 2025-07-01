import Home from "./pages/Home";

function App({
  toggleTheme,
  darkMode,
}: {
  toggleTheme: () => void;
  darkMode: boolean;
}) {
  return <Home toggleTheme={toggleTheme} darkMode={darkMode} />;
}

export default App;
