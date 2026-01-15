import React, { forwardRef } from 'react';

import { Button, Size, Variant } from '@leafygreen-ui/button';
import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import ReturnIcon from '@leafygreen-ui/icon/dist/Return';
import { consoleOnce } from '@leafygreen-ui/lib';

import { ActionCardSubcomponentProperty } from '../shared.types';

import { buttonStyles, getContainerStyles } from './Actions.styles';
import { type ActionsProps } from './Actions.types';

/**
 * @deprecated Use `Message.ActionCard.Button` instead
 */
export const Actions = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, ActionsProps>(
    ({ className, onClickCancel, onClickRun, ...rest }, fwdRef) => {
      if (process.env.NODE_ENV !== 'production') {
        consoleOnce.warn(
          'Message.ActionCard.Actions is deprecated. Use Message.ActionCard.Button instead.',
        );
      }

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
