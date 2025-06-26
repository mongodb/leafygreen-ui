import React, { forwardRef } from 'react';

import Button, { Size } from '@leafygreen-ui/button';
import ChevronDown from '@leafygreen-ui/icon/dist/ChevronDown';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { ButtonCorner, Side } from '../ButtonCorner';

import { getButtonStyles } from './ContextDrawerButton.styles';
import { ContextDrawerButtonProps } from './ContextDrawerButton.types';

export const ContextDrawerButton = forwardRef<
  HTMLButtonElement,
  ContextDrawerButtonProps
>(({ children, className, isOpen = false, ...rest }, ref) => {
  const { darkMode, theme } = useDarkMode();

  const label = children ?? (isOpen ? 'Hide' : 'View more');

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <Button
        ref={ref}
        rightGlyph={<ChevronDown />}
        size={Size.XSmall}
        className={getButtonStyles({ className, theme })}
        {...rest}
      >
        <ButtonCorner side={Side.Left} />
        {label}
        <ButtonCorner side={Side.Right} />
      </Button>
    </LeafyGreenProvider>
  );
});

ContextDrawerButton.displayName = 'ContextDrawerButton';
