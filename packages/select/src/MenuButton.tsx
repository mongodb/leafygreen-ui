import React, { useCallback, useContext, useMemo } from 'react';
import Button, { Variant } from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import CaretDownIcon from '@leafygreen-ui/icon/dist/CaretDown';
import { keyMap } from '@leafygreen-ui/lib';
import { breakpoints } from '@leafygreen-ui/tokens';
import { colorSets, mobileSizeSet, Mode, sizeSets } from './styleSets';
import SelectContext from './SelectContext';
import { useForwardedRef } from './utils';

const menuButtonStyle = css`
  margin-top: 2px;

  // reset default Button padding
  > span {
    padding: 0;
  }
`;

const menuButtonContentsStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

const menuButtonTextStyle = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const caretIconStyle = css`
  min-width: 16px;
`;

type Props = {
  children: React.ReactNode;
  value: string;
  text: React.ReactNode;
  name?: string;
  deselected: boolean;
  readOnly?: boolean;
  onFocusFirstOption: () => void;
  onFocusLastOption: () => void;
  onDeselect: React.KeyboardEventHandler;
  onClose: () => void;
  onOpen: () => void;
} & Required<
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
    onDeselect,
    onFocusFirstOption,
    onFocusLastOption,
    onClose,
    onOpen,
    ...ariaProps
  }: Props,
  forwardedRef,
) {
  const { mode, size, open, disabled } = useContext(SelectContext);

  const ref = useForwardedRef(forwardedRef, null);

  const colorSet = colorSets[mode];
  const sizeSet = sizeSets[size];

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (disabled) {
        return;
      }

      /* istanbul ignore if */
      if (event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      let bubble = false;

      switch (event.keyCode) {
        case keyMap.Tab:
          onClose();
          bubble = true;
          break;
        case keyMap.Escape:
          if (open) {
            onClose();
          } else {
            onDeselect(event);
          }
          break;
        case keyMap.ArrowUp:
          onOpen();
          onFocusLastOption();
          break;
        case keyMap.ArrowDown:
          onOpen();
          onFocusFirstOption();
          break;
        /* istanbul ignore next */
        default:
          bubble = true;
      }

      if (!bubble) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    [
      disabled,
      onClose,
      onDeselect,
      onFocusFirstOption,
      onFocusLastOption,
      onOpen,
      open,
    ],
  );

  const onClick = useCallback(() => {
    if (open) {
      onClose();
    } else {
      onOpen();
    }
    ref.current!.focus();
  }, [onClose, onOpen, open, ref]);

  const forceState = useMemo(() => {
    if (open && !disabled) {
      return { focused: true, active: true };
    }
  }, [open, disabled]);

  return (
    <Button
      // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
      role="combobox"
      {...ariaProps}
      ref={ref}
      name={name}
      value={value}
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
      variant={mode === Mode.Dark ? Variant.Dark : Variant.Default}
      darkMode={mode === Mode.Dark}
      forceState={forceState}
      className={cx(
        menuButtonStyle,
        css`
          height: ${sizeSet.height}px;
          width: ${typeof sizeSet.width === 'number'
            ? `${sizeSet.width}px`
            : sizeSet.width};
          font-size: ${sizeSet.text}px;
          color: ${deselected ? colorSet.text.deselected : colorSet.text.base};
          border-color: ${open && !disabled
            ? colorSet.border.open
            : colorSet.border.base};

          @media only screen and (max-width: ${breakpoints.Desktop}px) {
            height: ${mobileSizeSet.height}px;
            width: ${mobileSizeSet.width}px;
            font-size: ${mobileSizeSet.text}px;
          }
        `,
        {
          [css`
            // Displays the active state defined by <Button />
            &:after {
              opacity: 1;
            }
          `]: open && !disabled,
          [css`
            color: ${colorSet.text.disabled};
          `]: disabled,
        },
      )}
    >
      <div className={menuButtonContentsStyle}>
        <span className={menuButtonTextStyle}>{text}</span>
        <CaretDownIcon
          aria-hidden
          role="presentation"
          className={caretIconStyle}
        />
      </div>
      {children}
    </Button>
  );
});

MenuButton.displayName = 'MenuButton';

export default MenuButton;
