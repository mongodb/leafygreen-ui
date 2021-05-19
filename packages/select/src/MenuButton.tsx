import React, { useCallback, useContext } from 'react';
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

const menuButtonTextStyle = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
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
  __INTERNAL__menuButtonSlot__?: React.ForwardRefExoticComponent<
    React.RefAttributes<unknown>
  >;
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
    __INTERNAL__menuButtonSlot__,
    ...ariaProps
  }: Props,
  forwardedRef,
) {
  const { mode, open, size, disabled } = useContext(SelectContext);

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

  const Component = __INTERNAL__menuButtonSlot__
    ? __INTERNAL__menuButtonSlot__
    : Button;

  return (
    <Component
      {...ariaProps}
      ref={ref}
      name={name}
      value={value}
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
      variant={Variant.Default}
      darkMode={mode === Mode.Dark}
      rightGlyph={<CaretDownIcon />}
      className={cx(
        menuButtonStyle,
        css`
          height: ${sizeSet.height}px;
          font-size: ${sizeSet.text}px;
          width: 100%;
          color: ${deselected ? colorSet.text.deselected : colorSet.text.base};
          border-color: ${open && !disabled
            ? colorSet.border.open
            : colorSet.border.base};

          @media only screen and (max-width: ${breakpoints.Desktop}px) {
            height: ${mobileSizeSet.height}px;
            font-size: ${mobileSizeSet.text}px;
          }
        `,
      )}
    >
      <div className={menuButtonTextStyle}>{text}</div>
      {children}
    </Component>
  );
});

MenuButton.displayName = 'MenuButton';

export default MenuButton;
