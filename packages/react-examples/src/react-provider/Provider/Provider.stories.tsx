import { Provider } from '@fluentui/react-provider';
import * as React from 'react';

export const Direction = () => (
  <>
    <Provider theme={{ colorBrand: 'blue' }}>
      <div style={{ display: 'flex', color: 'var(--colorBrand)' }}>Hello World!</div>
    </Provider>
    <Provider dir="rtl" theme={{ colorBrand: 'blue' }}>
      <div style={{ color: 'var(--colorBrand)' }}>مرحبا بالعالم!</div>
    </Provider>
  </>
);

export const Variables = () => (
  <Provider theme={{ colorBrand: 'blue' }}>
    <div style={{ color: 'var(--colorBrand)' }}>Hello World!</div>
  </Provider>
);

export const ScopedVariables = () => (
  <Provider theme={{ colorBrand: 'blue' }}>
    <Provider theme={{ colorBrand: 'red' }}>
      <div style={{ color: 'var(--colorBrand)' }}>Hello World!</div>
    </Provider>
  </Provider>
);
