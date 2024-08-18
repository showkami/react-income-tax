import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { DeductionTypeId, deductionTypes } from "./DeductionTypes";
import { CurrencyForm } from "../component/CurrencyForm";
import { MedicalDeductionPanel } from "./DeductionInputPanel/MedicalDeductionPanel";

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

  const setMedicalExpensesDeduction = (newDeduction: Deduction) => {
    props.setDeductionDict((prev) => {
      return { ...prev, medicalExpenses: newDeduction };
    });
  };

  const DeductionInputPanel = (deductionTypeId: DeductionTypeId) => {
    switch (deductionTypeId) {
      case "medicalExpenses":
        return (
          <MedicalDeductionPanel
            deduction={props.deductionsDict.medicalExpenses}
            setDeduction={setMedicalExpensesDeduction}
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
