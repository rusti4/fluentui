import { ThemeProvider } from '@fluentui/react-provider';
import * as React from 'react';

export const Variables = () => (
  <ThemeProvider theme={{ colorBrand: 'blue' }}>
    <div style={{ color: 'var(--colorBrand)' }}>Hello World!</div>
  </ThemeProvider>
);

export const ScopedVariables = () => (
  <ThemeProvider theme={{ colorBrand: 'blue' }}>
    <ThemeProvider theme={{ colorBrand: 'red' }}>
      <div style={{ color: 'var(--colorBrand)' }}>Hello World!</div>
    </ThemeProvider>
  </ThemeProvider>
);
