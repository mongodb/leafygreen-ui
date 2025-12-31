import React, { forwardRef } from 'react';

import { Button, Size as ButtonSize, Variant } from '@leafygreen-ui/button';
import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { Size as IconSize } from '@leafygreen-ui/icon';
import ReturnIcon from '@leafygreen-ui/icon/dist/Return';

import { ToolCardSubcomponentProperty } from '../shared.types';

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
            size={ButtonSize.Small}
            variant={Variant.Default}
          >
            Cancel
          </Button>
          <Button
            className={buttonStyles}
            onClick={onClickRun}
            rightGlyph={<ReturnIcon size={IconSize.Small} />}
            size={ButtonSize.Small}
            variant={Variant.Primary}
          >
            Run
          </Button>
        </div>
      );
    },
  ),
  {
    displayName: 'Message.ToolCard.Actions',
    key: ToolCardSubcomponentProperty.Actions,
  },
);
