import { Theme } from '@fluentui/react-theme';
import * as React from 'react';

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

// TODO: should we use some theme as a default one?
export const ThemeContext = React.createContext<ThemeProviderValue>(({} as unknown) as Theme);

export function useTheme(): ThemeProviderValue {
  return React.useContext(ThemeContext);
}
