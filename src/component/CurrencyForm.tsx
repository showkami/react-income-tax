import React, { Ref, useState } from "react";
import { Input } from "@mui/material";
import { formatCcy } from "../utils";

interface CurrencyFormProps {
  value: number;
  onChangeValue: (value: number) => void;
  inputRef?: Ref<HTMLInputElement>;
}

export const CurrencyForm = (props: CurrencyFormProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputted = evt.target.value.replace(/,/g, ""); // Remove commas
    if (/^\d*\.?\d*$/.test(inputted)) {
      // Check if the input is a valid number
      const newValue = Number(inputted);
      props.onChangeValue(newValue);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // エンターキーを押したらBlurするようにするためのコールバック
  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") {
      (evt.target as HTMLInputElement).blur();
    }
  };

  const displayValue = isFocused
    ? props.value.toString()
    : formatCcy(props.value);

  return (
    <Input
      type="text"
      inputProps={{
        inputMode: "numeric", // iPhoneで入力時に表示される仮想キーボードを数字キーボードにする
        pattern: "[0-9]*",
        enterKeyHint: "done",
      }}
      value={displayValue}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      inputRef={props.inputRef}
    />
  );
};
