import React, { createContext, useState, useContext, ReactNode } from "react";

interface ThemeContextType {
  lightMode: boolean;
  toggleLightMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [lightMode, setLightMode] = useState<boolean>(false);

  const toggleLightMode = () => {
    setLightMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ lightMode, toggleLightMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
