import React from "react";
import video from "@/assets/bg.mp4";
import styles from "./index.module.scss";
import { useTheme } from "@/lib/provider/themeProvider";

const Background: React.FC = () => {
  const { lightMode } = useTheme();
  return (
    <div
      className={`${styles["video-bg"]}  ${
        lightMode ? styles["light-mode"] : ""
      }`}
    >
      <video width="320" height="240" autoPlay loop muted>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Background;
