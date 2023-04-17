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
  leftContentWrapper,
  leftTextWrapper,
  titleBaseStyles,
} from '../InputOptionContent/InputOptionContent.styles';

import { InputOptionContentProps } from './InputOptionContent.types';

/**
 * @internal
 *
 * This is a temp workaround to add consistent option styles. TODO: finish
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
      <div className={leftContentWrapper}>
        {leftGlyph && <div className={glyphContainer}>{leftGlyph}</div>}
        <div className={leftTextWrapper}>
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
      </div>
      {rightGlyph && <div className={glyphContainer}>{rightGlyph}</div>}
    </div>
  );
};

InputOptionContent.displayName = 'InputOptionContent';
