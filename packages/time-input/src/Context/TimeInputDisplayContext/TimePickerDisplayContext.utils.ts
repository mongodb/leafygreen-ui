import {
  MAX_DATE,
  MIN_DATE,
  SupportedLocales,
} from '@leafygreen-ui/date-utils';
import {
  TimeInputDisplayContextProps,
  TimeInputDisplayProviderProps,
} from './TimeInputDisplayContext.types';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Size, TimeInputState } from '../../TimeInput/TimeInput.types';
import { AriaLabelPropsWithLabel } from '@leafygreen-ui/a11y';
import { getLgIds } from '../../utils/getLgIds';

export type ContextPropKeys = keyof TimeInputDisplayProviderProps;

export const contextPropNames: Array<ContextPropKeys> = [
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
  'darkMode',
  'className',
];

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
  darkMode: false,
  className: '',
};
