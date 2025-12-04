import React, { useEffect } from 'react';

import {
  CompoundComponent,
  filterChildren,
  findChild,
} from '@leafygreen-ui/compound-component';
import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { getLockupStyles } from './Lockup.styles';
import { SpinnerLockupProps } from './Lockup.types';
import { Spinner } from './Spinner';

export const SpinnerLockup = CompoundComponent(
  ({
    children,
    className,
    darkMode: darkModeProp,
    direction = 'vertical',
    ...rest
  }: SpinnerLockupProps) => {
    const spinnerChild = findChild(children, 'Spinner');
    const restChildren = filterChildren(children, ['Spinner']);
    const { darkMode } = useDarkMode(darkModeProp);
    const size: Size | number = spinnerChild?.props.size || Size.Default;

    useEffect(() => {
      const restCount = React.Children.count(restChildren);

      if (restCount > 1) {
        console.error(
          `Spinner Lockup expects a Spinner component, and only one additional text element. Found ${restCount}`,
        );
      }
    }, [restChildren]);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div
          className={cx(
            getLockupStyles({
              direction,
              size,
            }),
            className,
          )}
          {...rest}
        >
          {spinnerChild}
          {restChildren}
        </div>
      </LeafyGreenProvider>
    );
  },
  {
    displayName: 'SpinnerLockup',
    Description: Body,
    Spinner,
  },
);
