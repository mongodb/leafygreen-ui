import { createContext, RefObject, createRef } from 'react';
import { UseSelectPropGetters } from 'downshift';

export interface ValueContextExternalProps<OptionT> {
  value: OptionT | undefined;
  valueIsEqual?: (val1: OptionT, val2: OptionT) => boolean;
  valueToString?: (val: OptionT) => string;
}

interface ValueContextInternalProps<OptionT> {
  highlightedValue: OptionT | undefined;
  getItemProps: UseSelectPropGetters<OptionT>['getItemProps'];
  isOpen: boolean;
  selectedOptionRef: RefObject<HTMLElement>;
}

export type ValueContextProps<OptionT = any> = Required<
  ValueContextExternalProps<OptionT>
> &
  ValueContextInternalProps<OptionT>;

const valueContext = createContext<ValueContextProps>({
  value: undefined,
  valueIsEqual: (a, b) => a === b,
  valueToString: v => String(v),
  highlightedValue: undefined,
  getItemProps: () => ({}),
  isOpen: false,
  selectedOptionRef: createRef(),
});

export default valueContext;
