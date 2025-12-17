import { createContext, useState, type FC } from "react";
import type { CurrencyContextTypeInterface, CurrencyProviderPropsInterface } from "./CurrencyContextInterfaces";


export const CurrencyContext = createContext<CurrencyContextTypeInterface | undefined>(undefined);

const CurrencyContextProvider: FC<CurrencyProviderPropsInterface> = ({ children }) => {
  const [currency, setCurrency] = useState("GEL");

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "USD" ? "GEL" : "USD"));
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContextProvider;
