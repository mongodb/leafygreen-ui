import { HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { State } from '../Select/Select.types';

export interface MenuButtonBaseProps
  extends HTMLElementProps<'button', HTMLButtonElement> {
  children: React.ReactNode;
  value: string;
  text: React.ReactNode;
  name?: string;
  deselected: boolean;
  readOnly?: boolean;
  onClose: () => void;
  onOpen: () => void;
  state?: State;
  baseFontSize?: BaseFontSize;
  __INTERNAL__menuButtonSlot__?: React.ForwardRefExoticComponent<
    React.RefAttributes<unknown>
  >;
  __INTERNAL__menuButtonSlotProps__?: Record<string, any>;
}

export type LabelProp = Pick<
  JSX.IntrinsicElements['div'],
  'aria-label' | 'aria-labelledby'
>;

export type MenuButtonProps = MenuButtonBaseProps &
  Required<
    | LabelProp
    | Pick<
        JSX.IntrinsicElements['div'],
        'aria-controls' | 'aria-expanded' | 'aria-describedby'
      >
  >;
