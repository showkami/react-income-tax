import { editableMoneyColumn, Grid } from "../component/Grid";
import { useEffect, useState } from "react";
import { CellValueChangedEvent, ColDef } from "ag-grid-community";
import { sumArray } from "../utils";

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

type InputFromSalaryStatementProps = {
  setSalaryRevenue: (salaryIncome: number) => void;
};

export const InputFromSalaryStatement = (
  props: InputFromSalaryStatementProps,
) => {
  const paidMonths = [
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

  // 各項目を格納する state を定義
  const zeroinit = paidMonths.map((m) => 0);
  const [totalPayrolls, setTotalPayrolls] = useState(zeroinit);
  const [standardizedPay, setStandardizedPay] = useState(zeroinit);
  const [employeePensionInsurancePrems, setEmployeePensionInsurancePrems] =
    useState<number[]>(zeroinit);
  const [healthInsurancePrems, setHealthInsurancePrems] =
    useState<number[]>(zeroinit);
  const [careInsurancePrems, setCareInsurancePrems] =
    useState<number[]>(zeroinit);
  const [incomeTaxes, setIncomeTaxes] = useState<number[]>(zeroinit);
  const [residentTaxes, setResidentTaxes] = useState<number[]>(zeroinit);

  // 各項目が変化したときの effect
  useEffect(() => {
    props.setSalaryRevenue(sumArray(totalPayrolls));
  }, [totalPayrolls]);

  // AGGrid定義
  const [columnDefs, setColumnDefs] = useState<ColDef<MonthlySalaryWithhold>[]>(
    [
      { field: "month", sortable: false, width: 80 },
      { field: "totalPayroll", headerName: "給与総額", ...editableMoneyColumn },
      {
        field: "standardizedPay",
        headerName: "標準報酬月額",
        ...editableMoneyColumn,
      },
      {
        field: "employeePensionInsurancePrem",
        headerName: "厚生年金保険料",
        ...editableMoneyColumn,
      },
      {
        field: "healthInsurancePrem",
        headerName: "健康保険料",
        ...editableMoneyColumn,
      },
      {
        field: "careInsurancePrem",
        headerName: "介護保険料",
        ...editableMoneyColumn,
      },
      { field: "incomeTax", headerName: "所得税", ...editableMoneyColumn },
      { field: "residentTax", headerName: "住民税", ...editableMoneyColumn },
    ],
  );
  const [rowData, setRowData] = useState<MonthlySalaryWithhold[]>(
    paidMonths.map((month, idx) => {
      return {
        month: month,
        totalPayroll: totalPayrolls[idx],
        standardizedPay: standardizedPay[idx],
        employeePensionInsurancePrem: employeePensionInsurancePrems[idx],
        healthInsurancePrem: healthInsurancePrems[idx],
        careInsurancePrem: careInsurancePrems[idx],
        incomeTax: incomeTaxes[idx],
        residentTax: residentTaxes[idx],
      } as MonthlySalaryWithhold;
    }),
  );
  const handleCellValueChanged = (evt: CellValueChangedEvent) => {
    const month: string = evt.data.month;
    const idx: number = paidMonths.findIndex((elm) => elm === month);
    const columnId: string = evt.column.getColId();
    if (columnId === "totalPayroll") {
      const newTotalPayrolls = [...totalPayrolls];
      newTotalPayrolls[idx] = evt.newValue;
      setTotalPayrolls(newTotalPayrolls);
    } else if (columnId === "standardizedPay") {
      const newStandardizedPay = [...standardizedPay];
      newStandardizedPay[idx] = evt.newValue;
      setStandardizedPay(newStandardizedPay);
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
