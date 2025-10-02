import {
  MAX_DATE,
  MIN_DATE,
  SupportedLocales,
} from '@leafygreen-ui/date-utils';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { Size } from '../../TimeInput/TimeInput.types';

import {
  TimeInputDisplayContextProps,
  TimeInputDisplayProviderProps,
} from './TimeInputDisplayContext.types';

export type DisplayContextPropKeys = keyof TimeInputDisplayProviderProps;

/**
 * Props names that that are added to the context and used to pick and omit props
 */
export const displayContextPropNames: Array<DisplayContextPropKeys> = [
  'aria-label',
  'aria-labelledby',
  'label',
  'description',
  'locale',
  'timeZone',
  'min',
  'max',
  'baseFontSize',
  'disabled',
  'size',
  'errorMessage',
  'state',
];

/**
 * The default display context values
 */
export const defaultTimeInputDisplayContext: TimeInputDisplayContextProps = {
  ariaLabelProp: '',
  ariaLabelledbyProp: '',
  label: '',
  description: '',
  locale: SupportedLocales.ISO_8601,
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  min: MIN_DATE,
  max: MAX_DATE,
  baseFontSize: BaseFontSize.Body1,
  disabled: false,
  size: Size.Default,
  errorMessage: '',
  isDirty: false,
  setIsDirty: () => {},
};
