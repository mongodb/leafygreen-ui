import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  descriptionClassName,
  titleClassName,
} from '../InputOption/InputOption.style';
import {
  contentWrapper,
  descriptionBaseStyles,
  descriptionThemeStyles,
  glyphContainer,
  glyphRightStyles,
  textWrapper,
  titleBaseStyles,
} from '../InputOptionContent/InputOptionContent.styles';

import { InputOptionContentProps } from './InputOptionContent.types';

/**
 * @internal
 *
 * This is a temp workaround to add consistent option styles. Once all input options in all components are consistent we can add this directly inside `InputOption`.
 */
export const InputOptionContent = ({
  children,
  description,
  leftGlyph,
  rightGlyph,
}: InputOptionContentProps) => {
  const { theme } = useDarkMode();
  return (
    <div className={contentWrapper}>
      {leftGlyph && <div className={glyphContainer}>{leftGlyph}</div>}
      <div className={textWrapper}>
        <div className={cx(titleClassName, titleBaseStyles)}>{children}</div>
        {description && (
          <div
            className={cx(
              descriptionClassName,
              descriptionBaseStyles,
              descriptionThemeStyles[theme],
            )}
          >
            {description}
          </div>
        )}
      </div>
      {rightGlyph && (
        <div className={cx(glyphContainer, glyphRightStyles)}>{rightGlyph}</div>
      )}
    </div>
  );
};

InputOptionContent.displayName = 'InputOptionContent';
