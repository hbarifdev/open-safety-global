export const getCurrencySymbol = (code: string) => {
  const symbols: { [key: string]: string } = {
    usd: '$',
    eur: '€',
    gbp: '£',
    aud: 'A$',
    cad: 'C$',
    jpy: '¥',
    chf: 'CHF ',
  };

  return symbols[code.toLowerCase()] || code.toUpperCase();
};
