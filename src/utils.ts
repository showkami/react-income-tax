export const sumArray = (arr: number[]) => {
  return arr.reduce((tmpsum, elm) => tmpsum + elm, 0);
};

export const formatCcy = (value: number) => {
  return value
    .toLocaleString("ja-JP", {
      style: "currency",
      currency: "JPY",
    })
    .replace("-", "▲");
};
