import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { DeductionTypeId, deductionTypes } from "./DeductionTypes";
import { CurrencyForm } from "../component/CurrencyForm";
import { MedicationDeductionPanel } from "./DeductionInputPanel/MedicationDeductionPanel";

/**
 * ある所得控除項目の、所得税用の所得控除・住民税用の所得控除
 */
export type Deduction = {
  forIncomeTax: number; // 所得税計算上の所得控除
  forResidentTax: number; // 住民税計算上の所得控除
};
/**
 * 各所得控除の情報を持ったdict
 */
export type DeductionsDict = { [key: DeductionTypeId]: Deduction };

type DeductionsFromIncomeProps = {
  deductionsDict: DeductionsDict;
  setDeductionDict: React.Dispatch<React.SetStateAction<DeductionsDict>>;
};

export const DeductionsFromIncome = (props: DeductionsFromIncomeProps) => {
  const [selectedTab, setSelectedTab] = useState<string>(
    "socialInsurancePremium",
  );

  const setMedicationExpensesDeduction = (newDeduction: Deduction) => {
    console.log("setting medicationExpensesDeduction.. ", newDeduction);
    props.setDeductionDict((prev) => {
      return { ...prev, medicationExpenses: newDeduction };
    });
  };

  const DeductionInputPanel = (deductionTypeId: DeductionTypeId) => {
    switch (deductionTypeId) {
      case "medicalExpenses":
        return (
          <MedicationDeductionPanel
            deduction={props.deductionsDict.medicalExpenses}
            setDeduction={setMedicationExpensesDeduction}
          />
        );
      default:
        return <>Not Implemented...</>;
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
        {deductionTypes.map((deductionType) => {
          return <Tab label={deductionType.nameJp} value={deductionType.id} />;
        })}
      </Tabs>
      <br />
      {DeductionInputPanel(selectedTab)}
    </>
  );
};
