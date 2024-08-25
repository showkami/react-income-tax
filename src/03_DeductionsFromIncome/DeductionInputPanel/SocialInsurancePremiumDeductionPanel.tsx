import { CurrencyForm } from "../../component/CurrencyForm";
import { useDeduction } from "../../TaxLogic/03_deductionsFromIncome";

export const SocialInsurancePremiumDeductionPanel = () => {
  // TODO: 給与明細からのインプットに対応
  const { paidSocialInsurancePremium, setPaidSocialInsurancePremium } =
    useDeduction();
  return (
    <>
      支払った金額：
      <CurrencyForm
        value={paidSocialInsurancePremium}
        onChangeValue={setPaidSocialInsurancePremium}
      />
    </>
  );
};
