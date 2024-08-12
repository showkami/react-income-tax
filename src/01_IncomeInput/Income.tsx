import {Tab, Tabs} from "@mui/material";
import React, {useState} from "react";
import { SalaryIncomeInput } from "./IncomeInputPanel/SalaryIncomeInput";
import {IncomeTypeId, incomeTypes} from "./IncomeTypes";

export type Income = number;
export type IncomeDict = {[key: IncomeTypeId]: Income}

type IncomeInputProps = {
  incomeDict: IncomeDict,
  setIncomeDict: React.Dispatch<React.SetStateAction<IncomeDict>>,
}

export const IncomeInput = ({incomeDict, setIncomeDict}: IncomeInputProps) => {
  const [selectedTab, setSelectedTab] = useState<string>("salary")

  const setSalaryIncome = (newValue: number) => {setIncomeDict((prev) => {return {...prev, salary: newValue}})};

  const IncomeInputPanel = (incomeTypeId: string) => {
    switch (incomeTypeId) {
      case "salary":
        return <SalaryIncomeInput salaryIncome={incomeDict.salary} setSalaryIncome={setSalaryIncome} />
      default:
        return <>Not implemented so far...</>
    }
  }

  return (
    <>
      <Tabs variant={"scrollable"} scrollButtons={"auto"} value={selectedTab} onChange={(evt, newValue)=>{ setSelectedTab(newValue)}}>
        {incomeTypes.map((incomeType) => {
          return <Tab label={incomeType.nameJp} value={incomeType.id} />
        })}
      </Tabs>
      <br />
      {IncomeInputPanel(selectedTab)}
    </>
  )
}