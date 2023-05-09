import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { Description } from '@leafygreen-ui/typography';

import {
  descriptionClassName,
  titleClassName,
} from '../MenuOption/MenuOption.style';
import {
  contentWrapper,
  descriptionBaseStyles,
  glyphContainer,
  glyphRightStyles,
  leftGlyphClassName,
  textWrapper,
  titleBaseStyles,
} from '../MenuOptionContent/MenuOptionContent.styles';

import { MenuOptionContentProps } from './MenuOptionContent.types';

/**
 * @internal
 *
 * This is a temp workaround to add consistent option styles.
 * Once all components that use an menu option are consistent we can add this directly inside `MenuOption`.
 */
export const MenuOptionContent = ({
  children,
  description,
  leftGlyph,
  rightGlyph,
}: MenuOptionContentProps) => {
  return (
    <div className={contentWrapper}>
      {leftGlyph && (
        <div className={cx(leftGlyphClassName, glyphContainer)}>
          {leftGlyph}
        </div>
      )}
      <div className={textWrapper}>
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
        <div className={cx(glyphContainer, glyphRightStyles)}>{rightGlyph}</div>
      )}
    </div>
  );
};

MenuOptionContent.displayName = 'MenuOptionContent';
