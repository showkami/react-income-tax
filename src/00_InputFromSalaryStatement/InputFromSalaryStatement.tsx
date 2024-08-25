import { editableMoneyColumn, Grid } from "../component/Grid";
import { useEffect, useState } from "react";
import { CellValueChangedEvent, ColDef } from "ag-grid-community";
import { sumArray } from "../utils";
import { getStandardizedMonthlyRemuneration } from "./getStandardizedMonthlyRemuneration";
import { useIncome } from "../TaxLogic/01_income";
import { useDeduction } from "../TaxLogic/03_deductionsFromIncome";

type MonthlySalaryWithhold = {
  month: string;
  totalPayroll: number;
  standardizedPay: number;
  employeePensionInsurancePrem: number; // 厚生年金保険料
  healthInsurancePrem: number; // 健康保険料
  careInsurancePrem: number; // 介護保険料
  incomeTax: number; // 所得税
  residentTax: number; // 住民税
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
  incomeTaxes: number[],
  residentTaxes: number[],
): MonthlySalaryWithhold[] => {
  return months.map((month, idx) => {
    return {
      month: month,
      totalPayroll: totalPayrolls[idx],
      standardizedPay: standardizedPays[idx],
      employeePensionInsurancePrem: employeePensionInsurancePrems[idx],
      healthInsurancePrem: healthInsurancePrems[idx],
      careInsurancePrem: careInsurancePrems[idx],
      incomeTax: incomeTaxes[idx],
      residentTax: residentTaxes[idx],
    };
  });
};

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
  const [incomeTaxes, setIncomeTaxes] = useState<number[]>(zeroinit);
  const [residentTaxes, setResidentTaxes] = useState<number[]>(zeroinit);

  const handleTotalPayrollsChanged = (idx: number, newPayroll: number) => {
    // totalPayrollsの更新
    const newTotalPayrolls = [...totalPayrolls];
    newTotalPayrolls[idx] = newPayroll;
    setTotalPayrolls(newTotalPayrolls);

    // 給与収入金額の更新
    setSalaryRevenue(sumArray(newTotalPayrolls));

    // 該当する月の標準報酬月額の更新 // TODO: 標準報酬月額か標準賞与額かどっちを取りに行くかの分岐が必要
    const newStandardizedPay = getStandardizedMonthlyRemuneration(newPayroll);
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

    // 社会保険料支払い総額の更新
    // TODO: 3つ一気に更新される場合にこれで正しく更新できるのか・・・？
    setPaidSocialInsurancePremium(
      sumArray(newPensionInsurancePrems) +
        sumArray(healthInsurancePrems) +
        sumArray(careInsurancePrems),
    );
  };

  const handleHealthInsurancePremChange = (
    idx: number,
    newHealthInsurancePrem: number,
  ) => {
    const newHealthInsurancePrems = [...healthInsurancePrems];
    newHealthInsurancePrems[idx] = newHealthInsurancePrem;
    setHealthInsurancePrems(newHealthInsurancePrems);

    // 社会保険料支払い総額の更新
    // TODO: 3つ一気に更新される場合にこれで正しく更新できるのか・・・？
    setPaidSocialInsurancePremium(
      sumArray(pensionInsurancePrems) +
        sumArray(newHealthInsurancePrems) +
        sumArray(careInsurancePrems),
    );
  };

  const handleCareInsurancePremChange = (
    idx: number,
    newCareInsurancePrem: number,
  ) => {
    const newCareInsurancePrems = [...careInsurancePrems];
    newCareInsurancePrems[idx] = newCareInsurancePrem;
    setCareInsurancePrems(newCareInsurancePrems);

    // 社会保険料支払い総額の更新
    // TODO: 3つ一気に更新される場合にこれで正しく更新できるのか・・・？
    setPaidSocialInsurancePremium(
      sumArray(pensionInsurancePrems) +
        sumArray(healthInsurancePrems) +
        sumArray(newCareInsurancePrems),
    );
  };

  // AGGrid定義
  const [columnDefs] = useState<ColDef<MonthlySalaryWithhold>[]>([
    { field: "month", sortable: false, width: 80, pinned: true },
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
    {
      field: "incomeTax",
      headerName: "所得税",
      width: 150,
      ...editableMoneyColumn,
    },
    {
      field: "residentTax",
      headerName: "住民税",
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
      incomeTaxes,
      residentTaxes,
    );
    setRowData(newRowData);
  }, [
    totalPayrolls,
    standardizedPays,
    pensionInsurancePrems,
    healthInsurancePrems,
    careInsurancePrems,
    incomeTaxes,
    residentTaxes,
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
    } else if (columnId === "incomeTax") {
      const newIncomeTaxes = [...incomeTaxes];
      newIncomeTaxes[idx] = evt.newValue;
      setIncomeTaxes(newIncomeTaxes);
    } else if (columnId === "residentTax") {
      const newResidentTaxes = [...residentTaxes];
      newResidentTaxes[idx] = evt.newValue;
      setResidentTaxes(newResidentTaxes);
    }
  };

  return (
    <>
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
