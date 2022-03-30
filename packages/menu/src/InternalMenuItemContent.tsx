import React from 'react';
import { ExtendableBox } from '@leafygreen-ui/box';
import { cx } from '@leafygreen-ui/emotion';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { createDataProp, getNodeTextContent } from '@leafygreen-ui/lib';

import {
  descriptionTextStyle,
  disabledTextStyle,
  mainIconStyle,
  activeIconStyle,
  titleTextStyle,
  activeTitleTextStyle,
  linkDescriptionTextStyle,
  activeDescriptionTextStyle,
  textContainer,
  getFocusedStyles,
  getHoverStyles,
} from './styles';
import { BaseMenuItemProps, SubMenuProps } from './types';

export const InternalMenuItemContent: ExtendableBox<
  (SubMenuProps | BaseMenuItemProps) & {
    container: ReturnType<typeof createDataProp>;
  },
  'button'
> = ({
  disabled = false,
  active = false,
  children,
  description,
  glyph,
  className,
  container,
  ...rest
}: (SubMenuProps | BaseMenuItemProps) & {
  container: ReturnType<typeof createDataProp>;
}) => {
  const { usingKeyboard } = useUsingKeyboardContext();
  const hoverStyles = getHoverStyles(container.selector);
  const focusStyles = getFocusedStyles(container.selector);

  const updatedGlyph =
    glyph &&
    React.cloneElement(glyph, {
      role: 'presentation',
      className: cx(
        mainIconStyle,
        {
          [activeIconStyle]: active,
          [focusStyles.iconStyle]: usingKeyboard,
        },
        glyph.props?.className,
      ),
    });

  return (
    <>
      {updatedGlyph}
      <div className={textContainer}>
        <div
          data-text={getNodeTextContent(children)}
          className={cx(titleTextStyle, hoverStyles.text, {
            [activeTitleTextStyle]: active,
            [disabledTextStyle]: disabled,
            [focusStyles.textStyle]: usingKeyboard,
          })}
        >
          {children}
        </div>

        {description && (
          <div
            className={cx(descriptionTextStyle, {
              [activeDescriptionTextStyle]: active,
              [disabledTextStyle]: disabled,
              [focusStyles.descriptionStyle]: usingKeyboard,
              [linkDescriptionTextStyle]: typeof rest.href === 'string',
            })}
          >
            {description}
          </div>
        )}
      </div>
    </>
  );
};
