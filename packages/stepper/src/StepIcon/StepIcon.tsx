import React from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { stepIconClassName } from '../constants';

import { baseStyles, getThemedStateStyles } from './StepIcon.styles';
import { StepIconProps } from './StepIcon.types';
import { StepIconGlyph } from './StepIconGlyph';

const StepIcon = ({ state, size, className, ...rest }: StepIconProps) => {
  const { theme } = useDarkMode();

  return (
    <div
      className={cx(
        stepIconClassName,
        baseStyles,
        css`
          width: ${size}px;
          height: ${size}px;
        `,
        getThemedStateStyles(theme, state),
        className,
      )}
    >
      <StepIconGlyph state={state} {...rest} />
    </div>
  );
};

export default StepIcon;
