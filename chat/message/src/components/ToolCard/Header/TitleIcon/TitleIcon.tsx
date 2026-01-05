import React from 'react';

import { Size as IconSize } from '@leafygreen-ui/icon';
import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import QuestionMarkWithCircleIcon from '@leafygreen-ui/icon/dist/QuestionMarkWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import XWithCircleIcon from '@leafygreen-ui/icon/dist/XWithCircle';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Spinner } from '@leafygreen-ui/loading-indicator';
import { Size } from '@leafygreen-ui/tokens';

import { State, ToolCardStateProps } from '../../shared.types';

import { getIconFill, TitleIconVariant } from './TitleIcon.styles';

export const TitleIcon = ({ state }: ToolCardStateProps) => {
  const { theme } = useDarkMode();

  switch (state) {
    case State.Canceled:
      return (
        <XWithCircleIcon
          size={IconSize.Small}
          fill={getIconFill({ theme, variant: TitleIconVariant.Default })}
        />
      );

    case State.Error:
      return (
        <WarningIcon
          size={IconSize.Small}
          fill={getIconFill({ theme, variant: TitleIconVariant.Error })}
        />
      );

    case State.Running:
      return (
        <Spinner
          colorOverride={getIconFill({
            theme,
            variant: TitleIconVariant.Default,
          })}
          size={Size.XSmall}
        />
      );

    case State.Success:
      return (
        <CheckmarkWithCircleIcon
          size={IconSize.Small}
          fill={getIconFill({ theme, variant: TitleIconVariant.Success })}
        />
      );

    case State.Idle:
    default:
      return (
        <QuestionMarkWithCircleIcon
          size={IconSize.Small}
          fill={getIconFill({ theme, variant: TitleIconVariant.Default })}
        />
      );
  }
};

TitleIcon.displayName = 'TitleIcon';
