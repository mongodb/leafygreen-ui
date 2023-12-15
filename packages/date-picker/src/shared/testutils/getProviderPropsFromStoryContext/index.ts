import { StoryContext } from '@storybook/react';

import { LeafyGreenProviderProps } from '@leafygreen-ui/leafygreen-provider';
import { pickAndOmit } from '@leafygreen-ui/lib';

import { DatePickerProps } from '../../../DatePicker/DatePicker.types';
import {
  ContextPropKeys,
  contextPropNames,
  SharedDatePickerProviderProps,
} from '../../context';

export interface ProviderPropsObject {
  leafyGreenProviderProps: LeafyGreenProviderProps;
  datePickerProviderProps: SharedDatePickerProviderProps;
  storyProps: Partial<Omit<DatePickerProps, ContextPropKeys>>;
}

export const getProviderPropsFromStoryContext = <P = DatePickerProps>(
  ctx: StoryContext<Partial<P & SharedDatePickerProviderProps>>,
): ProviderPropsObject => {
  const [
    { darkMode, baseFontSize, ...datePickerProviderProps },
    { ...storyProps },
  ] = pickAndOmit(ctx, [...contextPropNames]);

  return {
    leafyGreenProviderProps: {
      darkMode,
      baseFontSize: baseFontSize === 13 ? 14 : baseFontSize,
    },
    datePickerProviderProps: {
      ...datePickerProviderProps,
    },
    storyProps,
  };
};
