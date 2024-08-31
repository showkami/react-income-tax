import {
  AgGridReact,
  AgGridReactProps,
  CustomCellEditorProps,
} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";

import { formatCcy } from "../utils";
import { ValueFormatterParams } from "ag-grid-community";
import { CurrencyForm } from "./CurrencyForm";
import { useEffect, useRef } from "react";

type GridProps<TData> = {
  height: number;
} & AgGridReactProps<TData>;

export const Grid = <TData extends any>(props: GridProps<TData>) => {
  const { height, ...rest } = props;
  const agGridProps: AgGridReactProps<TData> = rest;
  return (
    <div className={"ag-theme-quartz-dark"} style={{ height: height }}>
      <AgGridReact<TData>
        rowHeight={35}
        gridOptions={{
          suppressDragLeaveHidesColumns: true,
          suppressMovableColumns: true,
        }}
        {...agGridProps}
      />
    </div>
  );
};

export const currencyFormatter = (param: ValueFormatterParams) => {
  return param.value === undefined || param.value === null
    ? ""
    : formatCcy(param.value);
};

export const uneditableMoneyColumn = {
  valueFormatter: currencyFormatter,
  sortable: false,
  cellType: "number",
  type: "rightAligned",
  // aggFunc: "sum", // Grand Total Row用
};

const MoneyEditor = ({
  value,
  onValueChange,
  eventKey,
}: CustomCellEditorProps) => {
  // 選択後、自動でフォーカスがあたるように
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const eInput = inputRef.current;
    eInput?.focus();
  }, [inputRef]);

  return (
    <CurrencyForm
      value={value ?? 0}
      onChangeValue={onValueChange}
      inputRef={inputRef}
    />
  );
};

export const editableMoneyColumn = {
  editable: true,
  cellEditor: MoneyEditor,
  ...uneditableMoneyColumn,
};
