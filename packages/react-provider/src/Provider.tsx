import { useMergedRefs } from '@fluentui/react-hooks';
import { getSlots, makeMergeProps } from '@fluentui/react-utils';
import * as React from 'react';

import { ThemeContext, ProviderContextValue, useFluent } from './context';
import { PartialTheme } from '@fluentui/react-theme';
import { ThemeProviderState, useThemeProviderState } from './ThemeProvider';

export interface ProviderProps extends Partial<ProviderContextValue> {
  theme?: PartialTheme;
}
export interface ProviderState extends ProviderContextValue, ThemeProviderState {}

const mergeProps = makeMergeProps<ProviderState>();

export function useProviderState(draftState: ProviderState) {
  const parentContext = useFluent();

  useThemeProviderState(draftState);

  // TODO: add merge functions
  draftState.document = draftState.document || parentContext.document;
  draftState.dir = draftState.dir || parentContext.dir;
}

export function renderProvider(state: ProviderState) {
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
export function useProvider(props: ProviderProps, ref: React.Ref<HTMLElement>) {
  const rootRef = useMergedRefs(ref, React.useRef<HTMLElement>(null));
  const state = mergeProps(
    {
      ref: rootRef,
      as: 'div',
    },
    {},
    props,
  );

  useProviderState(state);

  return {
    state,
    render: renderProvider,
  };
}

/**
 * TODO
 */
export const Provider: React.FunctionComponent<ProviderProps> = React.forwardRef<HTMLDivElement, ProviderProps>(
  (props: ProviderProps, ref: React.Ref<HTMLDivElement>) => {
    const { render, state } = useProvider(props, ref);

    return render(state);
  },
);

Provider.displayName = 'Provider';
