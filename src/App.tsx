import React, { useState } from "react";
import { Stack } from "@mui/material";

import { IncomeInput } from "./01_IncomeInput/Income";
import { IncomeContextProvider } from "./TaxLogic/01_income";
import { AggregationOfProfitLoss } from "./02_AggregationOfProfitLoss/AggregationOfProfitLoss";
import {
  DeductionsFromIncome,
  DeductionsDict,
} from "./03_DeductionsFromIncome/DeductionsFromIncome";
import { deductionTypes } from "./03_DeductionsFromIncome/DeductionTypes";
import { InputFromSalaryStatement } from "./00_InputFromSalaryStatement/InputFromSalaryStatement";
import { Accordion } from "./component/Accordion";
import { TaxCredit } from "./04_TaxCredit/TaxCredit";
import { TaxStatement } from "./10_TaxStatement/TaxStatement";
import { incomeTypes } from "./TaxLogic/01_incomeTypes";

function App() {
  // 所得控除の元となる数値state
  const initDeductionsDict: DeductionsDict = Object.fromEntries(
    deductionTypes.map((deductionType) => {
      return deductionType.id === "basic"
        ? [deductionType.id, { forIncomeTax: 480_000, forResidentTax: 430_000 }] // 基礎控除はあらかじめ金額を入れておく。TODO: 税額計算のロジックに関わることなので、ここに書くべきではない気がする。。
        : [deductionType.id, { forIncomeTax: 0, forResidentTax: 0 }];
    }),
  );
  const [deductionsDict, setDeductionsDict] =
    useState<DeductionsDict>(initDeductionsDict);

  return (
    <IncomeContextProvider>
      <Stack width={"100%"} spacing={1} padding={1}>
        <Accordion
          title={"給与明細からインプット"}
          content={<InputFromSalaryStatement />}
          defaultExpanded={false}
        />

        <Accordion
          title={`所得の計算`}
          content={<IncomeInput />}
          defaultExpanded={true}
        />

        <Accordion
          title={"損益通算及び損失の繰越控除"}
          content={<AggregationOfProfitLoss />}
        />

        <Accordion
          title={`所得控除`}
          content={
            <DeductionsFromIncome
              deductionsDict={deductionsDict}
              setDeductionDict={setDeductionsDict}
            />
          }
          defaultExpanded={true}
        />

        <Accordion title={"税額控除"} content={<TaxCredit />} />

        <Accordion
          title={"税額計算"}
          content={<TaxStatement deductionsDict={deductionsDict} />}
          defaultExpanded={true}
        />
      </Stack>
    </IncomeContextProvider>
  );
}

export default App;
