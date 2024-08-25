import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { SalaryIncomeInput } from "./IncomeInputPanel/SalaryIncomeInput";
import { IncomeTypeId, incomeTypes } from "../TaxLogic/01_income";

export const IncomeInput = () => {
  const [selectedTab, setSelectedTab] = useState<string>("salary");

  const IncomeInputPanel = (incomeTypeId: string) => {
    switch (incomeTypeId) {
      case "salary":
        return <SalaryIncomeInput />;
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
