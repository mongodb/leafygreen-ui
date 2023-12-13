import { StoryContext } from '@storybook/react';

import { LeafyGreenProviderProps } from '@leafygreen-ui/leafygreen-provider';
import { pickAndOmit } from '@leafygreen-ui/lib';

import {
  ContextPropKeys,
  contextPropNames,
  SharedDatePickerProviderProps,
} from '../../context';
import { BaseDatePickerProps } from '../../types';

export interface ProviderPropsObject<T> {
  leafyGreenProviderProps: LeafyGreenProviderProps;
  datePickerProviderProps: SharedDatePickerProviderProps;
  storyProps: T;
}

export const getProviderPropsFromStoryContext = <P = BaseDatePickerProps>(
  ctx: StoryContext<Partial<P & SharedDatePickerProviderProps>>,
): ProviderPropsObject<Partial<Omit<P, ContextPropKeys>>> => {
  const [
    { darkMode, baseFontSize, ...datePickerProviderProps },
    { ...storyProps },
  ] = pickAndOmit(ctx.args, [...contextPropNames]);

  return {
    leafyGreenProviderProps: {
      darkMode,
      baseFontSize: baseFontSize === 13 ? 14 : baseFontSize,
    },
    datePickerProviderProps: {
      label: '',
      ...datePickerProviderProps,
    },
    storyProps,
  };
};
