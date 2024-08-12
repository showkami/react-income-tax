type MoneyProps = {
  amount: number
}

export const MoneyDisplay = (props: MoneyProps) => {
  return <>{props.amount.toLocaleString()}</>
}