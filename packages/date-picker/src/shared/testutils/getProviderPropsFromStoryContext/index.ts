import { StoryContext } from '@storybook/react';

import { LeafyGreenProviderProps } from '@leafygreen-ui/leafygreen-provider';

import {
  ContextPropKeys,
  contextPropNames,
  DatePickerProviderProps,
} from '../../components/DatePickerContext';
import { BaseDatePickerProps } from '../../types';
import { pickAndOmit } from '../../utils';

export interface ProviderPropsObject<T> {
  leafyGreenProviderProps: LeafyGreenProviderProps;
  datePickerProviderProps: DatePickerProviderProps;
  storyProps: T;
}

export const getProviderPropsFromStoryContext = <P = BaseDatePickerProps>(
  ctx: StoryContext<Partial<P & DatePickerProviderProps>>,
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
