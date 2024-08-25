import { editableMoneyColumn, Grid } from "../component/Grid";
import { useEffect, useState } from "react";
import { CellValueChangedEvent, ColDef } from "ag-grid-community";
import { sumArray } from "../utils";
import { getStandardizedMonthlyRemuneration } from "./getStandardizedMonthlyRemuneration";
import { useIncome } from "../TaxLogic/01_income";

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
  // 各項目を格納する state を定義
  const zeroinit = payMonths.map((m) => 0);
  const [totalPayrolls, setTotalPayrolls] = useState(zeroinit);
  const [standardizedPays, setStandardizedPays] = useState(zeroinit);
  const [employeePensionInsurancePrems, setEmployeePensionInsurancePrems] =
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
      employeePensionInsurancePrems,
      healthInsurancePrems,
      careInsurancePrems,
      incomeTaxes,
      residentTaxes,
    );
    setRowData(newRowData);
  }, [
    totalPayrolls,
    standardizedPays,
    employeePensionInsurancePrems,
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
      const newStandardizedPay = [...standardizedPays];
      newStandardizedPay[idx] = evt.newValue;
      setStandardizedPays(newStandardizedPay);
    } else if (columnId === "employeePensionInsurancePrem") {
      const newEmployeePensionInsurancePrems = [
        ...employeePensionInsurancePrems,
      ];
      newEmployeePensionInsurancePrems[idx] = evt.newValue;
      setEmployeePensionInsurancePrems(newEmployeePensionInsurancePrems);
    } else if (columnId === "healthInsurancePrem") {
      const newHealthInsurancePrems = [...healthInsurancePrems];
      newHealthInsurancePrems[idx] = evt.newValue;
      setHealthInsurancePrems(newHealthInsurancePrems);
    } else if (columnId === "careInsurancePrem") {
      const newCareInsurancePrems = [...careInsurancePrems];
      newCareInsurancePrems[idx] = evt.newValue;
      setCareInsurancePrems(newCareInsurancePrems);
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
