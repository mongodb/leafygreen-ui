import React from 'react';

import { BaseFontSize } from '@leafygreen-ui/tokens';

import { State } from '../Select/Select.types';

export interface MenuButtonBaseProps extends React.ComponentProps<'button'> {
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
    React.RefAttributes<HTMLButtonElement>
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
