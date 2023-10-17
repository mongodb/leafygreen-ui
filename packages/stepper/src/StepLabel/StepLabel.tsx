import React from 'react';
import { PropsWithChildren } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import { stepLabelClassName } from '../constants';
import { StepStates } from '../types';

import { getThemedStateColorStyles, multipleStyles } from './StepLabel.styles';
import { StepLabelProps } from './StepLabel.types';

export const StepLabel = ({
  children,
  state,
}: PropsWithChildren<StepLabelProps>) => {
  const isCurrent = state === StepStates.Current;
  const { theme } = useDarkMode();

  return (
    <Body
      className={cx(
        getThemedStateColorStyles(theme, state),
        {
          [multipleStyles]:
            state === StepStates.CompletedMultiple ||
            state === StepStates.UpcomingMultiple,
        },
        stepLabelClassName,
      )}
      weight={isCurrent ? 'medium' : 'regular'}
      as="div"
    >
      {children}
    </Body>
  );
};
