import { IncomeDict } from "../01_IncomeInput/Income";
import { DeductionsDict } from "../03_DeductionsFromIncome/DeductionsFromIncome";
import { useEffect, useState } from "react";
import { ColDef } from "ag-grid-community";
import { Grid } from "../component/Grid";

type StatementRow = {
  item: string;
  incomeTaxCalc: number;
  residentTaxCalc: number;
};

type TaxStatementProps = {
  incomeDict: IncomeDict;
  deductionsDict: DeductionsDict;
};

export const TaxStatement = (props: TaxStatementProps) => {
  const [columnDefs, setColumnDefs] = useState<ColDef<StatementRow>[]>([
    { field: "item", sortable: false },
    { field: "incomeTaxCalc", headerName: "所得税の計算", sortable: false },
    { field: "residentTaxCalc", headerName: "住民税の計算", sortable: false },
  ]);
  const [rowData, setRowData] = useState<StatementRow[]>([]);
  useEffect(() => {
    setRowData([
      { item: "総所得金額", incomeTaxCalc: 100, residentTaxCalc: 100 },
    ]);
  }, []);

  return (
    <>
      <Grid<StatementRow>
        height={600}
        columnDefs={columnDefs}
        rowData={rowData}
      />
    </>
  );
};
