//
// TODO: should be moved to `react-theme-provider`
// https://github.com/microsoft/fluentui/pull/16698

import { useMergedRefs } from '@fluentui/react-hooks';
import { mergeThemes, themeToCSSVariables, PartialTheme, Theme } from '@fluentui/react-theme';
import { getSlots, makeMergeProps } from '@fluentui/react-utils';
import * as React from 'react';

import { ThemeContext, useTheme } from './context';

export interface ThemeProviderProps {
  theme?: PartialTheme | Theme;
}
export interface ThemeProviderState {
  style: React.HTMLAttributes<HTMLElement>['style'];
  theme: Theme;
}

const mergeProps = makeMergeProps<ThemeProviderState>();

export function useThemeProviderState(draftState: ThemeProviderState) {
  const parentTheme = useTheme();
  const localTheme = draftState.theme;

  draftState.theme = mergeThemes(parentTheme, localTheme);
  draftState.style = React.useMemo(() => {
    // TODO: should we consider insertion to head?
    //       - how to modify, remove styles?
    //       - SSR rendering
    return {
      ...draftState.style,
      ...themeToCSSVariables(draftState.theme),
    };
  }, [draftState.style, draftState.theme]);
}

export function renderThemeProvider(state: ThemeProviderState) {
  const { slots, slotProps } = getSlots(state);
  const { theme } = state;

  return (
    <ThemeContext.Provider value={theme}>
      <slots.root {...slotProps.root} />
    </ThemeContext.Provider>
  );
}

/**
 * Returns the ThemeProvider render function and calculated state, given user input, ref, and
 * a set of default prop values.
 */
export function useThemeProvider(props: ThemeProviderProps, ref: React.Ref<HTMLElement>) {
  const rootRef = useMergedRefs(ref, React.useRef<HTMLElement>(null));
  const state = mergeProps(
    {
      ref: rootRef,
      as: 'div',
    },
    {},
    props,
  );

  useThemeProviderState(state);

  return {
    state,
    render: renderThemeProvider,
  };
}

/**
 * Used for providing CSS variables and tokens via React Context.
 */
export const ThemeProvider: React.FunctionComponent<ThemeProviderProps> = React.forwardRef<
  HTMLDivElement,
  ThemeProviderProps
>((props: ThemeProviderProps, ref: React.Ref<HTMLDivElement>) => {
  const { render, state } = useThemeProvider(props, ref);

  return render(state);
});

ThemeProvider.displayName = 'ThemeProvider';
