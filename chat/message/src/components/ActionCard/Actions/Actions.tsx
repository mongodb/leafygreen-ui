import React, { forwardRef } from 'react';

import { Button, Size, Variant } from '@leafygreen-ui/button';
import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import ReturnIcon from '@leafygreen-ui/icon/dist/Return';

import { ActionCardSubcomponentProperty } from '../shared.types';

import { buttonStyles, getContainerStyles } from './Actions.styles';
import { type ActionsProps } from './Actions.types';

export const Actions = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, ActionsProps>(
    ({ className, onClickCancel, onClickRun, ...rest }, fwdRef) => {
      return (
        <div className={getContainerStyles(className)} ref={fwdRef} {...rest}>
          <Button
            className={buttonStyles}
            onClick={onClickCancel}
            size={Size.Small}
            variant={Variant.Default}
          >
            Cancel
          </Button>
          <Button
            className={buttonStyles}
            onClick={onClickRun}
            rightGlyph={<ReturnIcon />}
            size={Size.Small}
            variant={Variant.Primary}
          >
            Run
          </Button>
        </div>
      );
    },
  ),
  {
    displayName: 'Message.ActionCard.Actions',
    key: ActionCardSubcomponentProperty.Actions,
  },
);
