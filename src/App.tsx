import React, { useState } from "react";
import { Box } from "@mui/material";
import { IncomeDict, IncomeInput } from "./01_IncomeInput/Income";
import { incomeTypes } from "./01_IncomeInput/IncomeTypes";
import { AggregationOfProfitLoss } from "./02_AggregationOfProfitLoss/AggregationOfProfitLoss";
import {
  DeductionsFromIncome,
  DeductionsDict,
} from "./03_DeductionsFromIncome/DeductionsFromIncome";
import { deductionTypes } from "./03_DeductionsFromIncome/DeductionTypes";
import { InputFromSalaryStatement } from "./00_InputFromSalaryStatement/InputFromSalaryStatement";
import { Accordion } from "./component/Accordion";
import { formatCcy, sumArray } from "./utils";

function App() {
  // 所得計算用state
  const initIncomeDict: IncomeDict = Object.fromEntries(
    incomeTypes.map((incomeType) => {
      return [incomeType.id, 0];
    }),
  );
  const [incomeDict, setIncomeDict] = useState<IncomeDict>(initIncomeDict);
  const [salaryRevenue, setSalaryRevenue] = useState<number>(0);

  // 所得控除の元となる数値state
  const initDeductionsDict: DeductionsDict = Object.fromEntries(
    deductionTypes.map((deductionType) => {
      return [deductionType.id, { forIncomeTax: 0, forResidentTax: 0 }];
    }),
  );
  const [deductionsDict, setDeductionsDict] =
    useState<DeductionsDict>(initDeductionsDict);

  // 表示ように各種合計金額を計算
  const income: number = sumArray(Object.values(incomeDict));

  return (
    <Box width={"100%"}>
      <Accordion
        title={"給与明細からインプット"}
        content={
          <InputFromSalaryStatement setSalaryRevenue={setSalaryRevenue} />
        }
        defaultExpanded={false}
      />

      <Accordion
        title={`所得の計算 (合計所得: ${formatCcy(income)})`}
        content={
          <IncomeInput
            incomeDict={incomeDict}
            setIncomeDict={setIncomeDict}
            salaryRevenue={salaryRevenue}
          />
        }
      />

      <Accordion
        title={"損益通算及び損失の繰越控除"}
        content={<AggregationOfProfitLoss />}
      />

      <Accordion
        title={`課税所得の計算(所得控除の反映)`}
        content={
          <DeductionsFromIncome
            deductionsDict={deductionsDict}
            setDeductionDict={setDeductionsDict}
          />
        }
        defaultExpanded={true}
      />
    </Box>
  );
}

export default App;
