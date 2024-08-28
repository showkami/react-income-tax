import React, { useState } from "react";
import { Input } from "@mui/material";

interface PercentageFormProps {
  value: number;
  onChangeValue: (value: number) => void;
}

export const PercentageForm = (props: PercentageFormProps) => {
  const [displayVal, setDisplayVal] = useState<string>(
    (props.value * 100).toString() + "%",
  );

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayVal(evt.target.value);
  };

  const handleFocus = () => {
    // 末尾の "%" を取る
    setDisplayVal((prev) => {
      if (prev.endsWith("%")) {
        return prev.slice(0, -1);
      } else {
        return prev;
      }
    });
  };

  const handleBlur = () => {
    const inputted = displayVal.replace(/,/g, ""); // Remove commas
    if (/^\d*\.?\d*$/.test(inputted)) {
      // Check if the input is a valid number
      const newValue = Number(inputted) / 100;
      props.onChangeValue(newValue);
    }
    setDisplayVal(displayVal + "%");
  };

  // エンターキーを押したらBlurするようにするためのコールバック
  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") {
      (evt.target as HTMLInputElement).blur();
    }
  };

  return (
    <Input
      type="text"
      inputProps={{
        inputMode: "decimal", // iPhoneで入力時に表示される仮想キーボードを数字キーボードにする
        pattern: "^([1-9]\\d*|0)(\\.\\d*)?$", // FIXME: pattern指定して小数だけ受け入れるようにしたいが。。。
        enterKeyHint: "done",
      }}
      value={displayVal}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
};
