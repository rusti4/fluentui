import * as React from 'react';
import { Theme } from './tempTheme';

export interface ProviderContextValue {
  /** Sets the direction of text & generated styles. */
  dir: 'ltr' | 'rtl';

  /** Provides the document, can be undefined during SSR render. */
  document: Document | undefined;
}

export interface ThemeProviderValue extends Theme {}

export const ProviderContext = React.createContext<ProviderContextValue>({
  document: typeof document === 'object' ? document : undefined,
  dir: 'ltr',
});

export function useFluent(): ProviderContextValue {
  return React.useContext(ProviderContext);
}

export const ThemeContext = React.createContext<ThemeProviderValue>({});

export function useTheme(): ThemeProviderValue {
  return React.useContext(ThemeContext);
}
