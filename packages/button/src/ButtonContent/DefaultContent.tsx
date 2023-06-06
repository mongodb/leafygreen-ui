import React from 'react';

import { cx } from '@leafygreen-ui/emotion';

import ButtonIcon from '../ButtonIcon/ButtonIcon';

import {
  buttonContentSizeStyle,
  buttonContentStyle,
  darkModeRightGlyphStyles,
  leftGlyphStyles,
  rightGlyphStyles,
} from './ButtonContent.styles';
import { ButtonContentProps } from './ButtonContent.types';

const DefaultContent = ({
  leftGlyph,
  rightGlyph,
  className,
  children,
  variant,
  size,
  darkMode,
  disabled,
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
