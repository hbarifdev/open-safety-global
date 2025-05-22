export const formatPrice = (
  price: number,
  exchangeRate: number = 1,
  currencyCode: string = 'USD'
): string => {
  const convertedPrice = price * exchangeRate;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertedPrice);
};
