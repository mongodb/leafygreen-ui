import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Description } from '@leafygreen-ui/typography';

import {
  descriptionClassName,
  titleClassName,
} from '../InputOption/InputOption.style';
import {
  getContentWrapperStyles,
  getDescriptionStyles,
  getLeftGlyphStyles,
  getRightGlyphStyles,
  getTitleStyles,
  leftGlyphClassName,
  textContainerStyles,
} from '../InputOptionContent/InputOptionContent.styles';
import { useInputOptionContext } from '../InputOptionContext';

import { InputOptionContentProps } from './InputOptionContent.types';

/**
 * @internal
 *
 * This is a temp workaround to add consistent option styles.
 * Once all components that use an input option are consistent
 * we can add this directly inside `InputOption`.
 */
export const InputOptionContent = ({
  children,
  description,
  leftGlyph,
  rightGlyph,
  className,
  ...rest
}: InputOptionContentProps) => {
  const { theme } = useDarkMode();
  const { disabled, highlighted, selected } = useInputOptionContext();
  return (
    <div className={cx(getContentWrapperStyles, className)} {...rest}>
      {leftGlyph && (
        <div
          className={cx(
            leftGlyphClassName,
            getLeftGlyphStyles({ theme, disabled, highlighted, selected }),
          )}
        >
          {leftGlyph}
        </div>
      )}
      <div className={textContainerStyles}>
        <div
          className={cx(
            titleClassName,
            getTitleStyles({ theme, highlighted, selected }),
          )}
        >
          {children}
        </div>
        {description && (
          <Description
            className={cx(
              descriptionClassName,
              getDescriptionStyles({ theme, disabled, highlighted, selected }),
            )}
          >
            {description}
          </Description>
        )}
      </div>
      {rightGlyph && (
        <div
          className={getRightGlyphStyles({
            theme,
            disabled,
          })}
        >
          {rightGlyph}
        </div>
      )}
    </div>
  );
};

InputOptionContent.displayName = 'InputOptionContent';
