import React, { useState, useEffect, useMemo } from "react";
import styles from "./index.module.scss";
import Background from "./components/background";
import { fetchCapacities } from "@/lib/apis/capacities";
import Nav from "./components/nav";
import Footer from "./components/Footer";
import SearchResult from "./components/SearchResult";
import ThemeControler from "./components/themeControler";

import { type Capacity } from "@/types/type";
import { SelectOption } from "@/components/select";

import { SummaryOptions } from "@/types/emus";
import { useTheme } from "@/lib/provider/themeProvider";
const Home: React.FC = () => {
  const [capacities, setCapacities] = useState<Capacity[]>([]);

  const [particpant, setParticpant] = useState<SelectOption | undefined>();
  const [competency, setCompetency] = useState<SelectOption | undefined>();
  const [summary, setSummary] = useState<SelectOption | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  const { lightMode } = useTheme();

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetchCapacities();
      const capacities: Capacity[] = response;
      console.log(capacities);
      setCapacities(capacities);
      setIsLoading(false);
    } catch (error: unknown) {
      setError(error);
      setIsLoading(false);
    }
  };

  const result = useMemo(() => {
    if (particpant && competency) {
      const content: Capacity = capacities.filter(
        (item) => item.Participant == particpant.value
      )[0];
      const res = content[String(competency.value)];
      return res ? (
        <p>
          {particpant.value + " scored "} <span>{res}</span>{" "}
          {" on " + competency.value}
        </p>
      ) : (
        <i>{particpant.value + "has no score for " + competency.value}</i>
      );
    }

    if (competency && summary) {
      // min
      if (summary.value == SummaryOptions[0]) {
        const key = competency.value;
        const array = capacities.filter(
          (item) => item[key] !== null && item[key] !== undefined
        );
        const initialValue: Capacity = array[0] || {};
        const res = array.reduce((prev, curr) => {
          return prev[key]! < curr[key]! ? prev : curr;
        }, initialValue);
        return res[key] ? (
          <p>
            The lowest score for {key} is{" "}
            <span>
              {" "}
              {!isNaN(Number(res[key]))
                ? Number(res[key]).toFixed(1)
                : res[key]}
            </span>
          </p>
        ) : (
          <p>No Lowest score for this field</p>
        );
      }

      // max
      if (summary.value == SummaryOptions[1]) {
        const key = competency.value;
        const array = capacities.filter(
          (item) => item[key] !== null && item[key] !== undefined
        );
        const initialValue: Capacity = array[0] || {};
        const res = array.reduce((prev, curr) => {
          return prev[key]! > curr[key]! ? prev : curr;
        }, initialValue);
        return res[key] ? (
          <p>
            The Highest score for {key} is{" "}
            <span>
              {!isNaN(Number(res[key]))
                ? Number(res[key]).toFixed(1)
                : res[key]}
            </span>
          </p>
        ) : (
          <p>No Highest score for this field</p>
        );
      }

      // average
      if (summary.value == SummaryOptions[2]) {
        const key = competency.value;
        const array = capacities.filter(
          (item) => item[key] !== null && item[key] !== undefined
        );
        if (array.length == 0) return <i>{key} has No Average</i>;
        if (array.length && isNaN(Number(array[0][key]))) {
          return <i>{key} with level Date has No Average</i>;
        }
        let sum = 0;
        for (const item of array) {
          if (item && !isNaN(Number(item[key]))) {
            sum += item[key] as number;
          }
        }
        return (
          <p>
            The average score for {key} is{" "}
            <span>{(sum / array.length).toFixed(1)}</span>{" "}
          </p>
        );
      }

      // type
      if (summary.value == SummaryOptions[3]) {
        const key = competency.value;
        const item = capacities.find(
          (item) => item[key] !== null && item[key] !== undefined
        );
        if (item) {
          return (
            <p>
              The type of {key} is{" "}
              {isNaN(Number(item[key])) ? "‘level’" : "‘socre’"}
            </p>
          );
        } else {
          return <p>No Data to identify the type</p>;
        }
      }
    }
    return null;
  }, [competency, summary, particpant]);

  return (
    <div className={lightMode ? "light-mode" : ""}>
      <Background />
      <ThemeControler />
      <div className={styles.app}>
        <Nav
          capacities={capacities}
          Particpant={particpant}
          setCompetency={setCompetency}
          Competency={competency}
          setParticpant={setParticpant}
          Summary={summary}
          setSummary={setSummary}
        />
        <div className={styles.wrapper}>
          <div className={styles["main-container"]}>
            {!isLoading && !!result && <SearchResult>{result}</SearchResult>}
            {isLoading && (
              <SearchResult.Skeleton>
                <p className={styles.loading}>Loading Data...</p>
              </SearchResult.Skeleton>
            )}
            {!!error && (
              <SearchResult.Skeleton>
                <p className={styles.error}> Data Fetch Error...</p>
              </SearchResult.Skeleton>
            )}
            {!isLoading && !result && (
              <SearchResult.Skeleton>
                <p className={styles.loading}>Please choose filter...</p>
              </SearchResult.Skeleton>
            )}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
