import {useEffect, useState} from "react";
import {Grid, TextField} from "@mui/material";
import { NumericForm } from "../../component/NumericForm";
import {MoneyDisplay} from "../../component/MoneyDisplay";

/**
 * 給与所得控除の金額の計算
 * @param revenue 給与収入金額
 * @return 給与所得控除
 *
 * 参考: https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1410.htm
 */
const calcSalaryIncomeDeduction = (revenue: number): number => {
  if (revenue <= 1_625_000) {
    return 550_000
  } else if (revenue <= 1_800_000) {
    return revenue * 0.1 - 100_000
  } else if (revenue <= 3_600_000) {
    return revenue * 0.3 + 80_000
  } else if (revenue <= 6_600_000) {
    return revenue * 0.2 + 440_000
  } else if (revenue <= 8_500_000) {
    return revenue * 0.1 + 1_100_000
  } else {
    return 1_950_000
  }
}

type SalaryIncomeInputProps = {
  salaryIncome: number,
  setSalaryIncome: (newValue: number) => void,
}

export const SalaryIncomeInput = (props: SalaryIncomeInputProps) => {
  const [revenue, setRevenue] = useState<number>(0)  // 収入金額
  useEffect(() => {
    const salaryIncome = Math.max(0, revenue - calcSalaryIncomeDeduction(revenue));
    props.setSalaryIncome(salaryIncome);
  }, [revenue, props]);

  return (
    <>
      <Grid container spacing={2}>
        <NumericForm
          label={"収入金額"}
          value={revenue}
          setValue={setRevenue}
        />
      </Grid>
      <Grid container>
        給与所得控除: <MoneyDisplay amount={calcSalaryIncomeDeduction(revenue)} />
      </Grid>
      <Grid container>
        給与収入: <MoneyDisplay amount={props.salaryIncome} />
      </Grid>
    </>
  )
}