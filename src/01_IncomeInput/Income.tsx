import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { SalaryIncomeInput } from "./IncomeInputPanel/SalaryIncomeInput";
import { IncomeTypeId, incomeTypes } from "./IncomeTypes";

export type Income = number;
export type IncomeDict = { [key: IncomeTypeId]: Income };

type IncomeInputProps = {
  incomeDict: IncomeDict;
  setIncomeDict: React.Dispatch<React.SetStateAction<IncomeDict>>;
  salaryRevenue: number;
};

export const IncomeInput = (props: IncomeInputProps) => {
  const [selectedTab, setSelectedTab] = useState<string>("salary");

  const setSalaryIncome = (newValue: number) => {
    props.setIncomeDict((prev) => {
      return { ...prev, salary: newValue };
    });
  };

  const IncomeInputPanel = (incomeTypeId: string) => {
    switch (incomeTypeId) {
      case "salary":
        return (
          <SalaryIncomeInput
            salaryIncome={props.incomeDict.salary}
            setSalaryIncome={setSalaryIncome}
            salaryRevenue={props.salaryRevenue}
          />
        );
      default:
        return <>Not implemented so far...</>;
    }
  };

  return (
    <>
      <Tabs
        variant={"scrollable"}
        scrollButtons={"auto"}
        value={selectedTab}
        onChange={(evt, newValue) => {
          setSelectedTab(newValue);
        }}
      >
        {incomeTypes.map((incomeType) => {
          return <Tab label={incomeType.nameJp} value={incomeType.id} />;
        })}
      </Tabs>
      <br />
      {IncomeInputPanel(selectedTab)}
    </>
  );
};
