import React, { forwardRef } from 'react';

import { Button as LGButton, Size } from '@leafygreen-ui/button';
import { CompoundSubComponent } from '@leafygreen-ui/compound-component';

import { ActionCardSubcomponentProperty } from '../shared.types';

import { getButtonStyles } from './Button.styles';
import { type ButtonProps } from './Button.types';

export const Button = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, ...props }, fwdRef) => {
      return (
        <LGButton
          {...props}
          className={getButtonStyles(className)}
          size={Size.Small}
          ref={fwdRef}
        >
          {children}
        </LGButton>
      );
    },
  ),
  {
    displayName: 'Message.ActionCard.Button',
    key: ActionCardSubcomponentProperty.Button,
  },
);
