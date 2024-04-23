/* eslint-disable react/react-in-jsx-scope */
import { ReactElement, ReactNode } from "react";
import styles from "./index.module.scss";

interface TableProps {
  children: ReactNode;
}

const SearchResult = ({ children }: TableProps) => {
  return <div className={styles["content-wrapper"]}>{children}</div>;
};

SearchResult.Skeleton = function CoverSkeleton({
  children,
}: {
  children: ReactNode | ReactElement;
}) {
  return <div className={styles.skeleton}>{children}</div>;
};
export default SearchResult;
