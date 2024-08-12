import {Tab, Tabs} from "@mui/material";
import {useState} from "react";
import {incomeTypes} from "./IncomeTypes";
import {SalaryIncome} from "./IncomeInputPanel/SalaryIncome";

const IncomeInputPanel = (incomeType: string) => {
  switch (incomeType) {
    case "salary":
      return <SalaryIncome />
    default:
      return <>Not implemented so far...</>
  }
}


const Income = () => {
  const [selectedTab, setSelectedTab] = useState<string>("salary")

  return (
    <>
      <Tabs value={selectedTab} onChange={(evt, newValue)=>{ setSelectedTab(newValue)}}>
        {incomeTypes.map((incomeType) => {
          return <Tab label={incomeType.nameJp} value={incomeType.id} />
        })}
      </Tabs>
      {IncomeInputPanel(selectedTab)}
    </>
  )
}

export default Income;