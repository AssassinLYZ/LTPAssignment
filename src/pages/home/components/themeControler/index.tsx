import React from "react";
import { useTheme } from "@/lib/provider/themeProvider";
import styles from "./index.module.scss";
const ThemeControler: React.FC = () => {
  const handleMode = () => {
    toggleLightMode();
  };

  const { toggleLightMode } = useTheme();

  return (
    <div className={styles["dark-light"]} onClick={handleMode}>
      <svg
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      >
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    </div>
  );
};

export default ThemeControler;
