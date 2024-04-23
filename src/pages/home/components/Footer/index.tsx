import ideaPng from "@/assets/glass.png";
import styles from "./index.module.scss";
import React from "react";
const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles["content-wrapper-context"]}>
        <h3 className={styles["img-content"]}>LTP Assignment</h3>
        <div className={styles["content-text"]}>
          According to the requirements, no other libraries were used, with only
          some ESLint extensions and Sass dependencies added for easier CSS
          writing.
        </div>
      </div>
      <img className={styles["content-wrapper-img"]} src={ideaPng} alt="" />
    </div>
  );
};

export default Footer;
