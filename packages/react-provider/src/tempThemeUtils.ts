import { PartialTheme, Theme } from './tempTheme';

export function mergeThemes(a: Theme, b: PartialTheme | Theme): Theme {
  return { ...a, ...b };
}

export function themeToCSSVariables(theme: Theme): Record<string, string> {
  const result = {};

  Object.keys(theme).forEach(propertyName => {
    result[`--${propertyName}`] = theme[propertyName];
  });

  return result;
}
