import { editableMoneyColumn, Grid } from "../component/Grid";
import { useEffect, useState } from "react";
import { CellValueChangedEvent, ColDef } from "ag-grid-community";
import { sumArray } from "../utils";
import { getStandardizedMonthlyRemuneration } from "./getStandardizedMonthlyRemuneration";
import { useIncome } from "../TaxLogic/01_income";
import { useDeduction } from "../TaxLogic/03_deductionsFromIncome";
import { PercentageForm } from "../component/PercentageForm";
import { Typography } from "@mui/material";

type MonthlySalaryWithhold = {
  month: string;
  totalPayroll: number;
  standardizedPay: number;
  employeePensionInsurancePrem: number; // 厚生年金保険料
  healthInsurancePrem: number; // 健康保険料
  careInsurancePrem: number; // 介護保険料
};

const payMonths = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
  "賞与1",
  "賞与2",
];

const generateRowDataFromEachColumn = (
  months: string[],
  totalPayrolls: number[],
  standardizedPays: number[],
  employeePensionInsurancePrems: number[],
  healthInsurancePrems: number[],
  careInsurancePrems: number[],
): MonthlySalaryWithhold[] => {
  return months.map((month, idx) => {
    return {
      month: month,
      totalPayroll: totalPayrolls[idx],
      standardizedPay: standardizedPays[idx],
      employeePensionInsurancePrem: employeePensionInsurancePrems[idx],
      healthInsurancePrem: healthInsurancePrems[idx],
      careInsurancePrem: careInsurancePrems[idx],
    };
  });
};

/**
 * TODO
 *    - 保険料率を変えられるようにする
 */
export const InputFromSalaryStatement = () => {
  const { setSalaryRevenue } = useIncome();
  const { setPaidSocialInsurancePremium } = useDeduction();

  // 保険料率とか
  const [pensionInsurancePremRate, setPensionInsurancePremRate] =
    useState<number>(18.3 / 2 / 100);
  const [healthInsurancePremRate, setHealthInsurancePremRate] =
    useState<number>(
      3.05 / 100, //三井住友銀行健康保険組合の被保険者負担率 see https://www.smbc-kenpo.or.jp/member/outline/fee.html#cat05Outline02
    );
  const [careInsurancePremRate, setCareInsurancePremRate] = useState<number>(
    // 0.9 / 100, //三井住友銀行健康保険組合の被保険者負担率 see https://www.smbc-kenpo.or.jp/member/outline/fee.html#cat05Outline02
    0, // 40歳未満（以下？）は0
  );

  // 各項目 (各月の給与総額・標準報酬月額・厚生年金保険料・健康保険料・介護保険料) を格納する state を定義
  const zeroinit = payMonths.map((m) => 0);
  const [totalPayrolls, setTotalPayrolls] = useState(zeroinit);
  const [standardizedPays, setStandardizedPays] = useState(zeroinit);
  const [pensionInsurancePrems, setPensionInsurancePrems] =
    useState<number[]>(zeroinit);
  const [healthInsurancePrems, setHealthInsurancePrems] =
    useState<number[]>(zeroinit);
  const [careInsurancePrems, setCareInsurancePrems] =
    useState<number[]>(zeroinit);

  // 社会保険料の合計が変わった時には更新
  // TODO: このeffectの使い方間違ってるんじゃないかなあ・・・effect不要なパターンな気がするが・・
  useEffect(() => {
    setPaidSocialInsurancePremium(
      sumArray(pensionInsurancePrems) +
        sumArray(healthInsurancePrems) +
        sumArray(careInsurancePrems),
    );
  }, [
    setPaidSocialInsurancePremium,
    pensionInsurancePrems,
    healthInsurancePrems,
    careInsurancePrems,
  ]);

  const handleTotalPayrollsChanged = (idx: number, newPayroll: number) => {
    // totalPayrollsの更新
    const newTotalPayrolls = [...totalPayrolls];
    newTotalPayrolls[idx] = newPayroll;
    setTotalPayrolls(newTotalPayrolls);

    // 給与収入金額の更新
    setSalaryRevenue(sumArray(newTotalPayrolls));

    // 該当する月の標準報酬月額の更新
    const isBonus = idx >= 12;
    const newStandardizedPay = getStandardizedMonthlyRemuneration(
      newPayroll,
      isBonus,
    );
    handleStandardizedPayChange(idx, newStandardizedPay);
  };

  const handleStandardizedPayChange = (
    idx: number,
    newStandardizedPay: number,
  ) => {
    const newStandardizedPays = [...standardizedPays];
    newStandardizedPays[idx] = newStandardizedPay;
    setStandardizedPays(newStandardizedPays);

    // 該当する月の厚生年金保険料・健康保険料・介護保険料の更新
    handlePensionInsurancePremChange(
      idx,
      newStandardizedPay * pensionInsurancePremRate,
    );
    handleHealthInsurancePremChange(
      idx,
      newStandardizedPay * healthInsurancePremRate,
    );
    handleCareInsurancePremChange(
      idx,
      newStandardizedPay * careInsurancePremRate,
    );
  };

  const handlePensionInsurancePremChange = (
    idx: number,
    newPensionInsurancePrem: number,
  ) => {
    const newPensionInsurancePrems = [...pensionInsurancePrems];
    newPensionInsurancePrems[idx] = newPensionInsurancePrem;
    setPensionInsurancePrems(newPensionInsurancePrems);
  };

  const handleHealthInsurancePremChange = (
    idx: number,
    newHealthInsurancePrem: number,
  ) => {
    const newHealthInsurancePrems = [...healthInsurancePrems];
    newHealthInsurancePrems[idx] = newHealthInsurancePrem;
    setHealthInsurancePrems(newHealthInsurancePrems);
  };

  const handleCareInsurancePremChange = (
    idx: number,
    newCareInsurancePrem: number,
  ) => {
    const newCareInsurancePrems = [...careInsurancePrems];
    newCareInsurancePrems[idx] = newCareInsurancePrem;
    setCareInsurancePrems(newCareInsurancePrems);
  };

  // AGGrid定義
  const [columnDefs] = useState<ColDef<MonthlySalaryWithhold>[]>([
    { field: "month", sortable: false, width: 90, pinned: true },
    {
      field: "totalPayroll",
      headerName: "給与総額",
      width: 150,
      ...editableMoneyColumn,
    },
    {
      field: "standardizedPay",
      headerName: "標準報酬月額",
      width: 150,
      ...editableMoneyColumn,
    },
    {
      field: "employeePensionInsurancePrem",
      headerName: "厚生年金保険料",
      width: 150,
      ...editableMoneyColumn,
    },
    {
      field: "healthInsurancePrem",
      headerName: "健康保険料",
      width: 150,
      ...editableMoneyColumn,
    },
    {
      field: "careInsurancePrem",
      headerName: "介護保険料",
      width: 150,
      ...editableMoneyColumn,
    },
  ]);

  const [rowData, setRowData] = useState<MonthlySalaryWithhold[]>([]);
  useEffect(() => {
    const newRowData: MonthlySalaryWithhold[] = generateRowDataFromEachColumn(
      payMonths,
      totalPayrolls,
      standardizedPays,
      pensionInsurancePrems,
      healthInsurancePrems,
      careInsurancePrems,
    );
    setRowData(newRowData);
  }, [
    totalPayrolls,
    standardizedPays,
    pensionInsurancePrems,
    healthInsurancePrems,
    careInsurancePrems,
  ]);
  const handleCellValueChanged = (evt: CellValueChangedEvent) => {
    const month: string = evt.data.month;
    const idx: number = payMonths.findIndex((elm) => elm === month);
    const columnId: string = evt.column.getColId();
    if (columnId === "totalPayroll") {
      handleTotalPayrollsChanged(idx, evt.newValue);
    } else if (columnId === "standardizedPay") {
      handleStandardizedPayChange(idx, evt.newValue);
    } else if (columnId === "employeePensionInsurancePrem") {
      handlePensionInsurancePremChange(idx, evt.newValue);
    } else if (columnId === "healthInsurancePrem") {
      handleHealthInsurancePremChange(idx, evt.newValue);
    } else if (columnId === "careInsurancePrem") {
      handleCareInsurancePremChange(idx, evt.newValue);
    }
  };

  return (
    <>
      厚生年金保険料率:{" "}
      <PercentageForm
        value={pensionInsurancePremRate}
        onChangeValue={setPensionInsurancePremRate}
      />
      <br />
      健康保険料率:{" "}
      <PercentageForm
        value={healthInsurancePremRate}
        onChangeValue={setHealthInsurancePremRate}
      />
      <br />
      介護保険料率:{" "}
      <PercentageForm
        value={careInsurancePremRate}
        onChangeValue={setCareInsurancePremRate}
      />
      <br />
      <Typography variant={"caption"}>
        【注】
        上の料率を変更しても、すでに下表に入力された数値は変更されません。料率は最初に変更してください。
      </Typography>
      <Grid<MonthlySalaryWithhold>
        height={600}
        columnDefs={columnDefs}
        rowData={rowData}
        onCellValueChanged={handleCellValueChanged}
        // grandTotalRow={"bottom"} // enterprise限定機能らしい。。。
      />
    </>
  );
};
