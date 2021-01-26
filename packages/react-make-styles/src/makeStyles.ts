import {
  createDOMRenderer,
  makeStyles as vanillaMakeStyles,
  MakeStylesDefinition,
  MakeStylesOptions,
  MakeStylesRenderer,
} from '@fluentui/make-styles';
import { useTheme } from '@fluentui/react-theme-provider';
import { useDocument } from '@fluentui/react-window-provider';
import { Tokens } from '@fluentui/theme';
import * as React from 'react';

function useRenderer(): MakeStylesRenderer {
  const target = useDocument();

  return React.useMemo(() => {
    return createDOMRenderer(target);
  }, [target]);
}

export function makeStyles<Selectors>(definitions: MakeStylesDefinition<Selectors, Tokens>[]) {
  const getStyles = vanillaMakeStyles(definitions);

  return function useClasses(selectors: Selectors) {
    const { tokens, rtl } = useTheme();
    const renderer = useRenderer();

    const options: MakeStylesOptions<Tokens> = {
      tokens: tokens as Tokens,
      renderer,
      rtl,
    };

    return getStyles(selectors, options);
  };
}
