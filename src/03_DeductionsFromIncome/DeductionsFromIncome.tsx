import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { DeductionTypeId, deductionTypes } from "../TaxLogic/03_deductionTypes";
import { MedicalDeductionPanel } from "./DeductionInputPanel/MedicalDeductionPanel";
import { SocialInsurancePremiumDeductionPanel } from "./DeductionInputPanel/SocialInsurancePremiumDeductionPanel";
import { LifeInsurancePremiumDeductionPanel } from "./DeductionInputPanel/LifeInsurancePremiumDeductionPanel";

export const DeductionsFromIncome = () => {
  const [selectedTab, setSelectedTab] = useState<string>(
    "socialInsurancePremium",
  );

  const DeductionInputPanel = (deductionTypeId: DeductionTypeId) => {
    switch (deductionTypeId) {
      case "medicalExpenses":
        return <MedicalDeductionPanel />;
      case "socialInsurancePremium":
        return <SocialInsurancePremiumDeductionPanel />;
      case "lifeInsurancePremium":
        return <LifeInsurancePremiumDeductionPanel />;
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
