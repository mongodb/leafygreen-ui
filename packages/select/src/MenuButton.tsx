import React, { useCallback, useContext } from 'react';
import Button, { Variant } from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import CaretDownIcon from '@leafygreen-ui/icon/dist/CaretDown';
import { breakpoints, spacing } from '@leafygreen-ui/tokens';
import { palette, uiColors } from '@leafygreen-ui/palette';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import { colorSets, mobileSizeSet, Mode, sizeSets } from './styleSets';
import SelectContext from './SelectContext';
import { useForwardedRef } from './utils';
import { State } from '.';
import { HTMLElementProps } from '@leafygreen-ui/lib';

const interactionRingStyle = css`
  width: 100%;
`;

const menuButtonStyle = css`
  // reset default Button padding
  > span {
    padding: 0;
  }
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

const menuButtonFocusStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    &:focus {
      box-shadow: none;
      border-color: transparent;
    }
  `,
  [Mode.Dark]: css``,
};

const menuButtonErrorStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    border-color: ${errorColor[Mode.Light]};
    background-color: ${palette.white};
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

  const colorSet = colorSets[mode];
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

  const Wrapper = mode === Mode.Dark ? React.Fragment : InteractionRing;

  return (
    <Wrapper
      borderRadius={mode === Mode.Dark ? '4px' : '6px'}
      darkMode={mode === Mode.Dark}
      disabled={disabled}
      className={interactionRingStyle}
    >
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
        data-testid="leafygreen-ui-select-menubutton"
        className={cx(
          menuButtonStyle,
          css`
            width: 100%;
            @media only screen and (max-width: ${breakpoints.Desktop}px) {
              height: ${mobileSizeSet.height}px;
              font-size: ${mobileSizeSet.text}px;
            }
          `,
          {
            [css`
              border-color: transparent;
            `]: mode === Mode.Dark,
            [css`
              color: ${colorSet.text.deselected};
            `]: deselected,
            [menuButtonErrorStyle[mode]]:
              state === State.Error && !!errorMessage,
          },
          menuButtonFocusStyle[mode],
        )}
      >
        <div
          className={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-grow: 1;
            width: 90%;
          `}
        >
          <div className={menuButtonTextStyle}>{text}</div>
          {state === State.Error && errorMessage && (
            <WarningIcon
              role="presentation"
              className={css`
                color: ${errorColor[mode]};
                margin-left: ${spacing[1]}px;
              `}
              size={sizeSet.warningIcon}
            />
          )}
        </div>
        {children}
      </Component>
    </Wrapper>
  );
});

MenuButton.displayName = 'MenuButton';

export default MenuButton;
