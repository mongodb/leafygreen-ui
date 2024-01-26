import { LeafyGreenProviderProps } from '@leafygreen-ui/leafygreen-provider';
import { pickAndOmit } from '@leafygreen-ui/lib';

import { DatePickerProps } from '../../../DatePicker/DatePicker.types';
import {
  ContextPropKeys,
  contextPropNames,
  SharedDatePickerProviderProps,
} from '../../context';

export interface ProviderPropsObject<T> {
  leafyGreenProviderProps: LeafyGreenProviderProps;
  datePickerProviderProps: SharedDatePickerProviderProps;
  storyProps: T;
}

export const getProviderPropsFromStoryContext = <P = DatePickerProps>(
  storyContextProps: Partial<P & SharedDatePickerProviderProps>,
): ProviderPropsObject<Partial<Omit<P, ContextPropKeys>>> => {
  const [
    { darkMode, baseFontSize, ...datePickerProviderProps },
    { ...storyProps },
  ] = pickAndOmit(storyContextProps, [...contextPropNames]);

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
