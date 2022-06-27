import React, { useCallback, useContext } from 'react';
import Button, { Size as ButtonSize, Variant } from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import CaretDownIcon from '@leafygreen-ui/icon/dist/CaretDown';
import { breakpoints, spacing } from '@leafygreen-ui/tokens';
import { palette, uiColors } from '@leafygreen-ui/palette';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { Mode, State } from './types';
import { colorSets, mobileSizeSet, sizeSets } from './styleSets';
import SelectContext from './SelectContext';
import { useForwardedRef } from './utils';

const menuButtonStyleOverrides = css`
  text-transform: unset;
  font-weight: 400;
  // Override button defaults
  > *:last-child {
    grid-template-columns: 1fr 16px;
    padding: 0 12px;
    > svg {
      justify-self: right;
      width: 16px;
      height: 16px;
    }
  }
`;

const menuButtonModeOverrides: Record<Mode, string> = {
  [Mode.Light]: css`
    background-color: ${palette.white};
    // Override button default color
    > *:last-child {
      > svg {
        color: ${palette.gray.dark2};
      }
    }
  `,
  [Mode.Dark]: css`
    border-color: transparent;
  `,
};

const menuButtonDeselectedStyles: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${colorSets['light'].text.deselected};
  `,
  [Mode.Dark]: css`
    color: ${colorSets['dark'].text.deselected};
  `,
};

const menuButtonDisabledStyles: Record<Mode, string> = {
  [Mode.Light]: css`
    background-color: ${palette.gray.light2};
    color: ${palette.gray.base};
    cursor: not-allowed;

    > *:last-child {
      > svg {
        color: ${palette.gray.base};
      }
    }
  `,
  [Mode.Dark]: css``,
};

const menuButtonTextWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  gap: ${spacing[1]}px;
`;

const menuButtonTextStyle = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const errorColor: Record<Mode, string> = {
  [Mode.Light]: palette.red.base,
  [Mode.Dark]: '#F97216',
};

const menuButtonErrorStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    border-color: ${errorColor[Mode.Light]};
    background-color: ${palette.white};

    &:hover,
    &:active {
      box-shadow: 0 0 0 3px #f9d5c5; // Between light2 & light3
    }
  `,
  [Mode.Dark]: css`
    border-color: ${errorColor[Mode.Dark]}; // off palette
    box-shadow: 0px 1px 2px rgba(87, 11, 8, 0.3);

    &:hover,
    &:active {
      border-color: ${errorColor[Mode.Dark]}; // off palette
      box-shadow: 0px 4px 4px rgba(87, 11, 8, 0.3),
        0px 0px 0px 3px ${uiColors.red.light3};
    }
  `,
};

interface MenuButtonProps
  extends HTMLElementProps<'button', HTMLButtonElement> {
  children: React.ReactNode;
  value: string;
  text: React.ReactNode;
  name?: string;
  deselected: boolean;
  readOnly?: boolean;
  onClose: () => void;
  onOpen: () => void;
  errorMessage?: string;
  state?: State;
  __INTERNAL__menuButtonSlot__?: React.ForwardRefExoticComponent<
    React.RefAttributes<unknown>
  >;
}

type Props = MenuButtonProps &
  Required<
    Pick<
      JSX.IntrinsicElements['div'],
      'aria-labelledby' | 'aria-controls' | 'aria-expanded' | 'aria-describedby'
    >
  >;

const MenuButton = React.forwardRef<HTMLElement, Props>(function MenuButton(
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
    __INTERNAL__menuButtonSlot__,
    ...rest
  }: Props,
  forwardedRef,
) {
  const { mode, open, size, disabled } = useContext(SelectContext);

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
        menuButtonStyleOverrides, // TODO: Refresh - remove overrides
        menuButtonModeOverrides[mode], // TODO: Refresh - remove overrides
        {
          [menuButtonDeselectedStyles[mode]]: deselected,
          [menuButtonDisabledStyles[mode]]: disabled,
          [menuButtonErrorStyle[mode]]: state === State.Error && !!errorMessage,
          [css`
            letter-spacing: initial;
          `]: size === ButtonSize.XSmall,
        },
        css`
          width: 100%;
          @media only screen and (max-width: ${breakpoints.Desktop}px) {
            height: ${mobileSizeSet.height}px;
            font-size: ${mobileSizeSet.text}px;
          }
        `,
      );

  return (
    <Component
      {...rest}
      ref={ref}
      name={name}
      value={value}
      disabled={disabled}
      onClick={onClick}
      variant={Variant.Default}
      darkMode={mode === Mode.Dark}
      rightGlyph={<CaretDownIcon />}
      size={size}
      data-testid="leafygreen-ui-select-menubutton"
      className={buttonClassName}
    >
      <div className={menuButtonTextWrapperStyle}>
        <div className={menuButtonTextStyle}>{text}</div>
        {state === State.Error && errorMessage && (
          <WarningIcon
            role="presentation"
            className={css`
              color: ${errorColor[mode]};
            `}
            size={sizeSet.warningIcon}
          />
        )}
      </div>
      {children}
    </Component>
  );
});

MenuButton.displayName = 'MenuButton';

export default MenuButton;
