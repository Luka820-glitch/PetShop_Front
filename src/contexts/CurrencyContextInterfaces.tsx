import type { ReactNode } from "react";

export interface CurrencyContextTypeInterface {
  currency: string;
  toggleCurrency: () => void;
}

export interface CurrencyProviderPropsInterface {
  children: ReactNode;
}