import React, { forwardRef } from 'react';

import { Button, Variant } from '@leafygreen-ui/button';
import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import ReturnIcon from '@leafygreen-ui/icon/dist/Return';

import { ToolCardSubcomponentProperty } from '../shared.types';

import { getContainerStyles } from './Actions.styles';
import { type ActionsProps } from './Actions.types';

export const Actions = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, ActionsProps>(
    ({ className, onClickCancel, onClickRun, ...rest }, fwdRef) => {
      return (
        <div className={getContainerStyles(className)} ref={fwdRef} {...rest}>
          <Button onClick={onClickCancel} variant={Variant.Default}>
            Cancel
          </Button>
          <Button
            onClick={onClickRun}
            rightGlyph={<ReturnIcon />}
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
