import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import styles from "./index.module.scss";
import { debounce } from "@/lib/utils";
import Select, { SelectOption } from "@/components/select";
import { Capacity } from "@/types/type";
import { Radios, SummaryOptions } from "@/types/emus";

export interface SearchBarProps {
  capacities: Capacity[];
  Particpant: SelectOption | undefined;
  setParticpant: Dispatch<SetStateAction<SelectOption | undefined>>;
  Competency: SelectOption | undefined;
  setCompetency: Dispatch<SetStateAction<SelectOption | undefined>>;
  Summary: SelectOption | undefined;
  setSummary: Dispatch<SetStateAction<SelectOption | undefined>>;
}

const Nav: React.FC<SearchBarProps> = ({
  capacities,
  Particpant,
  setParticpant,
  Competency,
  setCompetency,
  Summary,
  setSummary,
}) => {
  const summary = [
    { label: SummaryOptions[0], value: SummaryOptions[0] },
    { label: SummaryOptions[1], value: SummaryOptions[1] },
    { label: SummaryOptions[2], value: SummaryOptions[2] },
    { label: SummaryOptions[3], value: SummaryOptions[3] },
  ];
  const radios: string[] = [Radios[0], Radios[1]];

  const [radio, setRadio] = useState<string>(Radios[0]);
  const [Particpants, setParticpants] = useState<SelectOption[]>([]);
  const [Competencies, setCompetencies] = useState<SelectOption[]>([]);

  useEffect(() => {
    if (capacities.length != 0) {
      const particpants = capacities.map((item) => ({
        value: item.Participant,
        label: item.Participant,
      }));
      setParticpants(particpants);
      let competencies: SelectOption[] = [];
      const array = Object.keys(capacities[0]).filter(
        (item) => item !== Radios[0]
      );
      competencies = array.map((item) => {
        return {
          value: item,
          label: item,
        };
      });
      setCompetencies(competencies);
    }
  }, [capacities]);

  const debouncedSetRadioValue = debounce((value: string) => {
    if (value == Radios[1]) setParticpant(undefined);
    if (value == Radios[0]) setSummary(undefined);
    setRadio(value);
  }, 200);

  const changePanel = (value: string) => {
    debouncedSetRadioValue(value);
  };

  return (
    <div className={styles.header}>
      <div className={styles["choose-section"]}>
        <p className={styles.title}>Please choose a mode</p>
        <p className={styles.choices}>
          {radios.map((item, index) => {
            return (
              <span key={index}>
                <span
                  className={`${radio == item ? styles.active : ""} ${
                    styles.choose
                  }`}
                  onClick={() => changePanel(item)}
                  key={item}
                >
                  {item}
                </span>
                <span className={styles.choose}>
                  {index !== radios.length - 1 ? "|" : ""}
                </span>
              </span>
            );
          })}
        </p>
      </div>
      <div className={styles["select-section"]}>
        <Select
          disabled={false}
          label={"Competency"}
          options={Competencies}
          value={Competency}
          onChange={(o) => setCompetency(o)}
        />

        <Select
          disabled={radio !== Radios[0]}
          label={Radios[0]}
          options={Particpants}
          value={Particpant}
          onChange={(o) => setParticpant(o)}
        />

        <Select
          disabled={radio !== Radios[1]}
          label={Radios[1]}
          options={summary}
          value={Summary}
          onChange={(o) => setSummary(o)}
        />
      </div>
    </div>
  );
};

export default Nav;
