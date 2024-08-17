import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { DeductionTypeId, deductionTypes } from "./DeductionTypes";
import { CurrencyForm } from "../component/CurrencyForm";

export type DeductionSource = number; // 所得控除そのものではなく、所得控除の計算の元となる数字 (例えば支払った医療費の全額)
export type DeductionSourceDict = { [key: DeductionTypeId]: DeductionSource };

type DeductionsFromIncomeProps = {
  deductionSourceDict: DeductionSourceDict;
  setDeductionSourceDict: React.Dispatch<
    React.SetStateAction<DeductionSourceDict>
  >;
};

export const DeductionsFromIncome = (props: DeductionsFromIncomeProps) => {
  const [selectedTab, setSelectedTab] = useState<string>(
    "socialInsurancePremium",
  );

  const DeductionInputPanel = (deductionTypeId: DeductionTypeId) => {
    return (
      <CurrencyForm
        value={props.deductionSourceDict[deductionTypeId]}
        onChangeValue={(newValue) => {
          props.setDeductionSourceDict((prev) => {
            prev[deductionTypeId] = newValue;
            return prev;
          });
        }}
      />
    );
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
