import React from 'react';

import { cx } from '@leafygreen-ui/emotion';

import ButtonIcon from '../ButtonIcon/ButtonIcon';
import { ButtonProps, Size, Variant } from '../types';

import {
  buttonContentSizeStyle,
  buttonContentStyle,
  darkModeRightGlyphStyles,
  leftGlyphStyles,
  rightGlyphStyles,
} from './ButtonContent.styles';

type ButtonContentProps = Omit<ButtonProps, 'as'>;

const DefaultContent = ({
  leftGlyph,
  rightGlyph,
  className,
  children,
  variant = Variant.Default,
  size = Size.Default,
  darkMode = false,
  disabled = false,
}: ButtonContentProps) => {
  const isIconOnlyButton = ((leftGlyph || rightGlyph) && !children) ?? false;
  const iconProps = { variant, size, darkMode, disabled, isIconOnlyButton };
  return (
    <div
      className={cx(
        buttonContentStyle,
        buttonContentSizeStyle[size],
        {
          [darkModeRightGlyphStyles]: !!rightGlyph && darkMode,
        },
        className,
      )}
    >
      {leftGlyph && (
        <ButtonIcon
          glyph={leftGlyph}
          className={leftGlyphStyles}
          {...iconProps}
        />
      )}

      {children}

      {rightGlyph && (
        <ButtonIcon
          glyph={rightGlyph}
          className={rightGlyphStyles}
          {...iconProps}
        />
      )}
    </div>
  );
};

export default DefaultContent;
