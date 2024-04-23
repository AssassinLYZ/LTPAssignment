import Home from "@/pages/home";
import { ThemeProvider } from "@/lib/provider/themeProvider";
import React from "react";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
};

export default App;
