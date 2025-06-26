import { StoryContext } from '@storybook/react';

export const getDarkModeFromContext = (context: StoryContext<any>): boolean => {
  const darkModeArg = context.args?.darkMode;
  const darkModeGlobal = context.globals?.theme;
  return darkModeArg ?? darkModeGlobal;
};
