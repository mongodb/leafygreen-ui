import React from 'react';
import { StepIconProps } from './types';
import { StepStates } from '../types';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import EllipsisIcon from '@leafygreen-ui/icon/dist/Ellipsis';
import { css, cx } from '@leafygreen-ui/emotion';
import { Overline } from '@leafygreen-ui/typography';
import { useStepperContext } from '../StepperContext';
import { stepIconClassName } from '../constants';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { baseStyles, styles } from './styles';

const StepIconGlyph = ({ state, content }: StepIconProps) => {
  if (state === StepStates.Completed) {
    return <CheckmarkIcon />;
  } else if (
    state === StepStates.UpcomingMultiple ||
    state === StepStates.CompletedMultiple
  ) {
    return <EllipsisIcon />;
  } else {
    // if Current (single) or Upcoming (single)
    // TODO: Use centralized, reusable font-weight value
    return (
      <Overline
        className={css`
          font-weight: 500;
          color: inherit;
        `}
      >
        {content}
      </Overline>
    );
  }
};

const StepIcon = ({ state, size, ...rest }: StepIconProps) => {
  const { darkMode: darkModeProp } = useStepperContext();
  const { theme } = useDarkMode(darkModeProp);

  return (
    <div
      className={cx(stepIconClassName, baseStyles(size), styles[theme][state])}
    >
      <StepIconGlyph state={state} size={size} {...rest} />
    </div>
  );
};

export default StepIcon;
