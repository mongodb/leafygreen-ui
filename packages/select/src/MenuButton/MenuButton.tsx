import React, { useCallback, useContext } from 'react';

import Button, { Size as ButtonSize, Variant } from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import CaretDownIcon from '@leafygreen-ui/icon/dist/CaretDown';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';

import { LGIDS_SELECT } from '../constants';
import { State } from '../Select/Select.types';
import SelectContext from '../SelectContext';
import { mobileSizeSet, sizeSets } from '../styleSets';
import { MobileMediaQuery, useForwardedRef } from '../utils';

import {
  errorColor,
  menuButtonDeselectedStyles,
  menuButtonDisabledThemeStyles,
  menuButtonErrorStyle,
  menuButtonFocusStyle,
  menuButtonModeOverrides,
  menuButtonSizeStyle,
  menuButtonStyleOverrides,
  menuButtonTextClassName,
  menuButtonTextStyle,
  menuButtonTextWrapperStyle,
} from './MenuButton.styles';
import { MenuButtonProps } from './MenuButton.types';

/**
 * @internal
 */
const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  function MenuButton(
    {
      children,
      value,
      text,
      name,
      deselected,
      readOnly,
      onClose,
      onOpen,
      errorMessage,
      state,
      baseFontSize,
      __INTERNAL__menuButtonSlot__,
      __INTERNAL__menuButtonSlotProps__,
      ...rest
    }: MenuButtonProps,
    forwardedRef,
  ) {
    const { theme } = useDarkMode();
    const { open, size, disabled } = useContext(SelectContext);

    const ref = useForwardedRef(forwardedRef, null);

    const sizeSet = sizeSets[size];

    const onClick = useCallback(() => {
      if (open) {
        onClose();
      } else {
        onOpen();
      }
      ref.current!.focus();
    }, [onClose, onOpen, open, ref]);

    const Component = __INTERNAL__menuButtonSlot__
      ? __INTERNAL__menuButtonSlot__
      : Button;

    const buttonClassName = __INTERNAL__menuButtonSlot__
      ? ''
      : cx(
          menuButtonStyleOverrides,
          menuButtonModeOverrides[theme],
          menuButtonSizeStyle[size],
          menuButtonFocusStyle[theme],
          {
            [menuButtonDeselectedStyles[theme]]: deselected,
            [menuButtonDisabledThemeStyles[theme]]: disabled,
            [menuButtonErrorStyle[theme]]:
              state === State.Error && !!errorMessage,
            [css`
              letter-spacing: initial;
            `]: size === ButtonSize.XSmall,
          },
          css`
            width: 100%;
            ${MobileMediaQuery} {
              height: ${mobileSizeSet.height}px;
              font-size: ${mobileSizeSet.text}px;
            }
          `,
        );

    const testId =
      (rest as any)['data-testid'] ?? 'leafygreen-ui-select-menubutton';

    return (
      <Component
        {...rest}
        {...__INTERNAL__menuButtonSlotProps__}
        ref={ref}
        name={name}
        value={value}
        disabled={disabled}
        onClick={onClick}
        variant={Variant.Default}
        darkMode={theme === Theme.Dark}
        rightGlyph={<CaretDownIcon />}
        size={size}
        data-testid={testId}
        className={cx(
          buttonClassName,
          {
            [css`
              font-size: ${baseFontSize}px;
            `]: size === ButtonSize.Default,
          },
          __INTERNAL__menuButtonSlotProps__?.className,
        )}
      >
        <div className={menuButtonTextWrapperStyle}>
          <div
            data-lgid={LGIDS_SELECT.buttonText}
            className={cx(menuButtonTextClassName, menuButtonTextStyle)}
          >
            {text}
          </div>
          {state === State.Error && errorMessage && (
            <WarningIcon
              aria-hidden
              className={css`
                color: ${errorColor[theme]};
              `}
              size={sizeSet.warningIcon}
              title="Error"
            />
          )}
        </div>
        {children}
      </Component>
    );
  },
);

MenuButton.displayName = 'MenuButton';

export default MenuButton;
