import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export function useCurrency() {
  const [currency, setCurrency] = useState<'GEL' | 'USD'>('GEL');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'GEL' ? 'USD' : 'GEL'));
  };

  useEffect(() => {
    if (currency === 'USD') {
      fetch('https://v6.exchangerate-api.com/v6/8758b2f94ecc01a304444b44/latest/GEL')
        .then((res) => res.json())
        .then((data) => {
          const rate = data?.conversion_rates?.USD;
          if (rate) {
            setExchangeRate(rate);
            toast.success('Exchange rate loaded successfully');
          } else {
            setExchangeRate(null);
            toast.error('USD exchange rate not found in response');
          }
        })
        .catch((err) => {
          console.error('Error fetching exchange rate:', err);
          toast.error('Failed to fetch exchange rate');
        });
    }
  }, [currency]);

  const formatPrice = (priceInGEL: number | null | undefined): string => {
    if (priceInGEL == null) return 'N/A';

    if (currency === 'GEL') return `${priceInGEL.toFixed(2)} ₾`;
    if (!exchangeRate) return 'N/A';

    const priceInUSD = priceInGEL * exchangeRate;
    return `$${priceInUSD.toFixed(2)}`;
  };

  return {
    currency,
    toggleCurrency,
    formatPrice,
  };
}
