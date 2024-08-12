import {Tab, Tabs} from "@mui/material";
import {useState} from "react";
import { SalaryIncomeInput } from "./IncomeInputPanel/SalaryIncomeInput";
import {IncomeTypeId, incomeTypes} from "./IncomeTypes";

type Income = number;
type IncomeDict = {[key: IncomeTypeId]: Income}



export const IncomeInput = () => {
  const [selectedTab, setSelectedTab] = useState<string>("salary")

  const initIncomeDict: IncomeDict = Object.fromEntries(incomeTypes.map((incomeType)=>{return [incomeType.id, 0]}));
  const [incomeDict, setIncomeDict] = useState<IncomeDict>(initIncomeDict)
  const setSalaryIncome = (newValue: number) => {setIncomeDict((prev) => {return {...prev, salary: newValue}})};

  const IncomeInputPanel = (incomeType: string) => {
    switch (incomeType) {
      case "salary":
        return <SalaryIncomeInput salaryIncome={incomeDict.salary} setSalaryIncome={setSalaryIncome} />
      default:
        return <>Not implemented so far...</>
    }
  }

  return (
    <>
      <Tabs value={selectedTab} onChange={(evt, newValue)=>{ setSelectedTab(newValue)}}>
        {incomeTypes.map((incomeType) => {
          return <Tab label={incomeType.nameJp} value={incomeType.id} />
        })}
      </Tabs>
      <br />
      {IncomeInputPanel(selectedTab)}
    </>
  )
}