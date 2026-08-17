// Format a number as currency (USD by default)
//locale = 'en-US': controls how the number is displayed
//according to a regional formatting convention i.e $20 become $20.00
export const formatCurrency = (
  amount,
  currency = 'USD', 
  locale = 'en-US'
) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
