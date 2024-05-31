import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { Description } from '@leafygreen-ui/typography';

import {
  descriptionClassName,
  titleClassName,
} from '../InputOption/InputOption.style';
import {
  descriptionBaseStyles,
  getContentWrapperStyles,
  leftGlyphClassName,
  leftGlyphContainerStyles,
  rightGlyphContainerStyles,
  textContainerStyles,
  titleBaseStyles,
} from '../InputOptionContent/InputOptionContent.styles';

import { InputOptionContentProps } from './InputOptionContent.types';

/**
 * @internal
 *
 * This is a temp workaround to add consistent option styles. Once all components that use an input option are consistent we can add this directly inside `InputOption`.
 */
export const InputOptionContent = ({
  children,
  description,
  leftGlyph,
  rightGlyph,
  className,
  ...rest
}: InputOptionContentProps) => {
  return (
    <div className={cx(getContentWrapperStyles, className)} {...rest}>
      {leftGlyph && (
        <div className={cx(leftGlyphClassName, leftGlyphContainerStyles)}>
          {leftGlyph}
        </div>
      )}
      <div className={textContainerStyles}>
        <div className={cx(titleClassName, titleBaseStyles)}>{children}</div>
        {description && (
          <Description
            className={cx(descriptionClassName, descriptionBaseStyles)}
          >
            {description}
          </Description>
        )}
      </div>
      {rightGlyph && (
        <div
          className={cx(leftGlyphContainerStyles, rightGlyphContainerStyles)}
        >
          {rightGlyph}
        </div>
      )}
    </div>
  );
};

InputOptionContent.displayName = 'InputOptionContent';
