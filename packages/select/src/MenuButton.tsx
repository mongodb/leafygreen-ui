import React, { useCallback, useContext, useState } from 'react';
import { cx, css } from '@leafygreen-ui/emotion';
import CaretDownIcon from '@leafygreen-ui/icon/dist/CaretDown';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { breakpoints } from '@leafygreen-ui/tokens';
import { colorSets, mobileSizeSet, Mode, sizeSets } from './styleSets';
import SelectContext from './SelectContext';

const menuButtonStyle = css`
  cursor: pointer;
  outline: none;
  border: 1px solid;
  border-radius: 3px;
  font-weight: initial;
  user-select: none;
  margin-top: 2px;
`;

const menuButtonContentsStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const menuButtonTextStyle = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

type Props = {
  children: React.ReactNode;
  value: string;
  text: React.ReactNode;
  name: string;
  deselected: boolean;
  readOnly?: boolean;
  refElement: React.MutableRefObject<HTMLDivElement | null>;
  onFocusFirstOption: () => void;
  onFocusLastOption: () => void;
  onDeselect: () => void;
  onClose: () => void;
  onOpen: () => void;
} & Required<
  Pick<
    JSX.IntrinsicElements['div'],
    'aria-labelledby' | 'aria-controls' | 'aria-expanded' | 'aria-describedby'
  >
>;

function MenuButton({
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
  refElement,
  ...ariaProps
}: Props) {
  const { mode, size, open, disabled } = useContext(SelectContext);

  const { usingKeyboard } = useUsingKeyboardContext();

  const [isHovered, setIsHovered] = useState(false);

  const colorSet = colorSets[mode];
  const sizeSet = sizeSets[size];

  const baseBoxShadow = `inset 0 -1px 0 0 ${colorSet.shadow.base}`;
  let boxShadowExpanded = `0 0 0 3px ${colorSet.shadow.expanded}`;

  if (mode === Mode.Dark) {
    boxShadowExpanded = `inset 0 2px 2px 0 #373B3C, ${boxShadowExpanded}`;
  }

  const focusStyle = cx({
    [css`
      box-shadow: ${boxShadowExpanded};
    `]: usingKeyboard,
  });

  const onMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (disabled) {
        // prevent receiving focus
        event.preventDefault();
      }
    },
    [disabled],
  );

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
        case 9: // Tab
          onClose();
          bubble = true;
          break;
        case 27: // Escape
          if (open) {
            onClose();
          } else {
            onDeselect();
          }
          break;
        case 38: // ArrowUp
          onOpen();
          onFocusLastOption();
          break;
        case 40: // ArrowDown
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
    if (!disabled) {
      if (open) {
        onClose();
      } else {
        onOpen();
      }
      refElement.current!.focus();
    }
  }, [disabled, onClose, onOpen, open, refElement]);

  const offHover = useCallback(() => {
    setIsHovered(false);
  }, []);

  const onHover = useCallback(() => {
    setIsHovered(true);
  }, []);

  // Only directly hovering over the button should induce hover
  const preventChildrenFromTriggeringHoverProps = {
    onMouseEnter: offHover,
    onMouseLeave: onHover,
  };

  return (
    <div
      // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
      role="combobox"
      {...ariaProps}
      tabIndex={disabled ? -1 : 0}
      ref={refElement}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onKeyDown={onKeyDown}
      onMouseEnter={onHover}
      onMouseLeave={offHover}
      className={cx(
        menuButtonStyle,
        css`
          height: ${sizeSet.height}px;
          width: ${sizeSet.width}px;
          font-size: ${sizeSet.text}px;
          color: ${deselected ? colorSet.text.deselected : colorSet.text.base};
          border-color: ${open ? colorSet.border.open : colorSet.border.base};
          background: linear-gradient(
            180deg,
            ${colorSet.background.gradientStart.base} 0%,
            ${colorSet.background.gradientEnd.base} 100%
          );
          box-shadow: ${baseBoxShadow};
          transition: box-shadow 150ms ease-in-out;
          padding-bottom: 2px; // Counter-balances inset box shadow to re-center text

          @media only screen and (max-width: ${breakpoints.Desktop}px) {
            height: ${mobileSizeSet.height}px;
            width: ${mobileSizeSet.width}px;
            font-size: ${mobileSizeSet.text}px;
          }
        `,
        {
          [css`
            background: linear-gradient(
              180deg,
              ${colorSet.background.gradientStart.base} 0%,
              ${colorSet.background.gradientEnd.hovered} 100%
            );
            box-shadow: ${baseBoxShadow}, 0 0 0 3px ${colorSet.shadow.hovered};
          `]: isHovered && !disabled,
          [css`
            ${focusStyle};

            background: linear-gradient(
              180deg,
              ${colorSet.background.gradientStart.expanded} 0%,
              ${colorSet.background.gradientEnd.expanded} 100%
            );
            padding-bottom: 0;
          `]: open && !disabled,
          [css`
            &:focus {
              ${focusStyle}
            }
          `]: !disabled,
          [css`
            cursor: not-allowed;
            box-shadow: none;
            background: ${colorSet.background.disabled};
            color: ${colorSet.text.disabled};
            padding-bottom: 0;
          `]: disabled,
        },
      )}
    >
      <div className={menuButtonContentsStyle}>
        <input
          type="hidden"
          name={name}
          value={value}
          readOnly={readOnly}
          disabled={disabled}
        />

        <span
          className={cx(
            menuButtonTextStyle,
            css`
              margin-left: ${sizeSet.option.margin}px;

              @media only screen and (max-width: ${breakpoints.Desktop}px) {
                margin-left: ${mobileSizeSet.option.margin}px;
              }
            `,
          )}
        >
          {text}
        </span>

        <CaretDownIcon
          className={css`
            min-width: 16px;
            margin: 0 ${sizeSet.icon.margin}px 0 0;

            @media only screen and (max-width: ${breakpoints.Desktop}px) {
              margin: 0 ${mobileSizeSet.icon.margin}px 0 0;
            }
          `}
        />
      </div>
      <div {...preventChildrenFromTriggeringHoverProps}>{children}</div>
    </div>
  );
}

MenuButton.displayName = 'MenuButton';

export default MenuButton;
