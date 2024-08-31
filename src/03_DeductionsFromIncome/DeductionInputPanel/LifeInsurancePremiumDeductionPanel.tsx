import { useDeduction } from "../../TaxLogic/03_deductionsFromIncome";
import { useState } from "react";
import {
  CellValueChangedEvent,
  ColDef,
  ValueFormatterParams,
} from "ag-grid-community";
import { InfoForEachContract } from "../../TaxLogic/03_deductionsFromIncome/lifeInsurancePremium";
import { editableMoneyColumn, Grid } from "../../component/Grid";
import { Box, Button, Snackbar, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BackspaceIcon from "@mui/icons-material/Backspace";

export const LifeInsurancePremiumDeductionPanel = () => {
  const { lifeInsuranceContracts, setLifeInsuranceContracts } = useDeduction();

  // ag grid用
  const categoryId2Name = (
    categoryId: "general" | "careOrMedical" | "pension",
  ) => {
    switch (categoryId) {
      case "general":
        return "一般生命保険";
      case "careOrMedical":
        return "介護医療保険";
      case "pension":
        return "個人年金保険";
    }
  };
  const categoryName2Id = (
    categoryName: "一般生命保険" | "介護医療保険" | "個人年金保険",
  ) => {
    switch (categoryName) {
      case "一般生命保険":
        return "general";
      case "介護医療保険":
        return "careOrMedical";
      case "個人年金保険":
        return "pension";
    }
  };
  const [columnDefs] = useState<ColDef<InfoForEachContract>[]>([
    {
      field: "isNew",
      headerName: "新契約？",
      width: 100,
      sortable: false,
      editable: true,
    },
    {
      field: "category",
      headerName: "カテゴリ",
      width: 150,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["一般生命保険", "介護医療保険", "個人年金保険"],
      },
      valueFormatter: (params: ValueFormatterParams) => {
        return categoryId2Name(params.value);
      },
      sortable: false,
      editable: true,
    },
    {
      field: "paidAmount",
      headerName: "支払保険料",
      width: 150,
      ...editableMoneyColumn,
    },
    {
      field: "rebatedAmount",
      headerName: "剰余金・割戻金等",
      width: 150,
      ...editableMoneyColumn,
    },
  ]);
  const initialRow: InfoForEachContract = {
    isNew: true,
    category: "general",
    paidAmount: 0,
    rebatedAmount: 0,
  };
  const [openOldCareOrMedicalAddingAlert, setOpenOldCareOrMedicalAddingAlert] =
    useState<boolean>(false);
  const handleCellValueChanged = (
    evt: CellValueChangedEvent<InfoForEachContract>,
  ): void => {
    const idx: number = evt.rowIndex ?? 0; // TODO: この ?? 0 は危険な気がする。変なところを編集しようとしたら絶対一番上の行が編集されてしまう
    const columnId: string = evt.column.getColId();
    let newInfoForEachContract = [...lifeInsuranceContracts];
    const targetRow = newInfoForEachContract[idx];
    // 介護医療保険で旧契約、というのを入れさせないためのvalidationをかける
    if (evt.node.data?.category === "careOrMedical" && !evt.node.data?.isNew) {
      setOpenOldCareOrMedicalAddingAlert(true);
      return;
    }
    if (columnId === "isNew") {
      targetRow.isNew = evt.newValue;
    } else if (columnId === "category") {
      targetRow.category = categoryName2Id(evt.newValue);
    } else if (columnId === "paidAmount") {
      targetRow.paidAmount = evt.newValue;
    } else if (columnId === "rebatedAmount") {
      targetRow.rebatedAmount = evt.newValue;
    }
    newInfoForEachContract[idx] = targetRow;
    setLifeInsuranceContracts(newInfoForEachContract);
  };

  return (
    <>
      <Box sx={{ "& button": { m: 0.3 } }}>
        {/*追加ボタン*/}
        <Button
          variant={"contained"}
          startIcon={<AddCircleIcon />}
          onClick={() =>
            setLifeInsuranceContracts((prev) => [...prev, initialRow])
          }
        >
          <Typography variant={"caption"}>Add</Typography>
        </Button>
        {/* 削除ボタン */}
        <Button
          variant={"contained"}
          color={"error"}
          startIcon={<BackspaceIcon />}
          onClick={() => setLifeInsuranceContracts([])}
        >
          <Typography variant={"caption"}>Delete all</Typography>
        </Button>
        <Typography variant={"caption"}>1件ずつ削除は不可..</Typography>
      </Box>

      <Grid<InfoForEachContract>
        height={300}
        columnDefs={columnDefs}
        rowData={lifeInsuranceContracts}
        onCellValueChanged={handleCellValueChanged}
      />

      <Snackbar
        open={openOldCareOrMedicalAddingAlert}
        autoHideDuration={2000}
        onClose={() => setOpenOldCareOrMedicalAddingAlert(false)}
        message="旧契約である介護医療保険は存在しません。入力された支払保険料は無視されます。"
      />
    </>
  );
};
