import React, { useState } from "react";
import { Box } from "@mui/material";
import { IncomeDict, IncomeInput } from "./01_IncomeInput/Income";
import { incomeTypes } from "./01_IncomeInput/IncomeTypes";
import { AggregationOfProfitLoss } from "./02_AggregationOfProfitLoss/AggregationOfProfitLoss";
import {
  DeductionsFromIncome,
  DeductionSourceDict,
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
  const initDeductionSourceDict: DeductionSourceDict = Object.fromEntries(
    deductionTypes.map((deductionType) => {
      return [deductionType.id, 0];
    }),
  );
  const [deductionSourceDict, setDeductionSourceDict] =
    useState<DeductionSourceDict>(initDeductionSourceDict);

  // 表示ように各種合計金額を計算
  const income: number = sumArray(Object.values(incomeDict));
  const deduction: number = sumArray(Object.values(deductionSourceDict));

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
        title={`課税所得の計算(所得控除の反映) (合計金額: ${formatCcy(deduction)})`}
        content={
          <DeductionsFromIncome
            deductionSourceDict={deductionSourceDict}
            setDeductionSourceDict={setDeductionSourceDict}
          />
        }
        defaultExpanded={true}
      />
    </Box>
  );
}

export default App;
