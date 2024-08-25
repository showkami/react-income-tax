/**
 * 0より小さい場合は0を返す
 * @param value
 */
export const plusPart = (value: number) => {
  return Math.max(value, 0);
};
