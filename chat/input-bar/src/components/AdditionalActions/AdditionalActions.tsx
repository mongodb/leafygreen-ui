import React, { forwardRef } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';

import { InputBarSubcomponentProperty } from '../../shared.types';

import { getContainerStyles } from './AdditionalActions.styles';
import { AdditionalActionsProps } from './AdditionalActions.types';

export const AdditionalActions = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, AdditionalActionsProps>(
    ({ children, className, ...rest }, ref) => {
      return (
        <div ref={ref} className={getContainerStyles(className)} {...rest}>
          {children}
        </div>
      );
    },
  ),
  {
    displayName: 'AdditionalActions',
    key: InputBarSubcomponentProperty.AdditionalActions,
  },
);
