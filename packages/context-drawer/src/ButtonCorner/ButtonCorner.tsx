import React from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getFill, getWrapperStyles } from './ButtonCorner.styles';
import { Side } from './ButtonCorner.types';

/**
 * @returns component that renders the visually rounded sides of the ContextDrawerButton.
 *
 * @internal
 */
export const ButtonCorner = ({ side }: { side: Side }) => {
  const { theme } = useDarkMode();

  return (
    <div className={getWrapperStyles(side)}>
      <svg
        aria-hidden={true}
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0.000523481C4.39583 0.0500261 7.94998 3.60417 7.99949 8H8V0H0V0.000523481Z"
          fill={getFill(theme)}
        />
      </svg>
    </div>
  );
};
