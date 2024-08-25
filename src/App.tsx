import React from "react";
import { Stack } from "@mui/material";

import { IncomeInput } from "./01_IncomeInput/Income";
import { IncomeContextProvider } from "./TaxLogic/01_income";
import { AggregationOfProfitLoss } from "./02_AggregationOfProfitLoss/AggregationOfProfitLoss";
import { DeductionsFromIncome } from "./03_DeductionsFromIncome/DeductionsFromIncome";
import { InputFromSalaryStatement } from "./00_InputFromSalaryStatement/InputFromSalaryStatement";
import { Accordion } from "./component/Accordion";
import { TaxCredit } from "./04_TaxCredit/TaxCredit";
import { TaxStatement } from "./10_TaxStatement/TaxStatement";
import { DeductionsContextProvider } from "./TaxLogic/03_deductionsFromIncome";

function App() {
  return (
    <IncomeContextProvider>
      <DeductionsContextProvider>
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
            content={<DeductionsFromIncome />}
            defaultExpanded={true}
          />

          <Accordion title={"税額控除"} content={<TaxCredit />} />

          <Accordion
            title={"税額計算"}
            content={<TaxStatement />}
            defaultExpanded={true}
          />
        </Stack>
      </DeductionsContextProvider>
    </IncomeContextProvider>
  );
}

export default App;
