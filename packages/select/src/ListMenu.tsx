import React, { useCallback, useContext } from 'react';
import { cx, css } from '@leafygreen-ui/emotion';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { breakpoints } from '@leafygreen-ui/tokens';
import SelectContext from './SelectContext';
import { colorSets, mobileSizeSet, sizeSets } from './styleSets';

const menuStyle = css`
  position: relative;
  top: 5px;

  width: 100%;
  border-radius: 3px;

  line-height: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: auto scroll;
`;

interface ListMenuProps {
  children: React.ReactNode;
  id: string;
  refElement: React.MutableRefObject<HTMLUListElement | null>;
  onClose: () => void;
  onSelectFocusedOption: () => void;
  onFocusPreviousOption: () => void;
  onFocusNextOption: () => void;
}

export default function ListMenu({
  children,
  id,
  refElement,
  onClose,
  onFocusPreviousOption,
  onFocusNextOption,
  onSelectFocusedOption,
}: ListMenuProps) {
  const { mode, size } = useContext(SelectContext);

  const colorSet = colorSets[mode];
  const sizeSet = sizeSets[size];

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      // No support for modifiers yet
      /* istanbul ignore if */
      if (event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      let bubble = false;

      switch (event.keyCode) {
        case 9: // Tab
        case 13: // Enter
          onSelectFocusedOption();
          break;
        case 27: // Escape
          onClose();
          break;
        case 38: // ArrowUp
          onFocusPreviousOption();
          break;
        case 40: // ArrowDown
          onFocusNextOption();
          break;
        /* istanbul ignore next */
        default:
          bubble = true;
      }

      /* istanbul ignore else */
      if (!bubble) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    [onClose, onFocusNextOption, onFocusPreviousOption, onSelectFocusedOption],
  );

  const viewportSize = useViewportSize();

  const maxHeight =
    viewportSize === null || refElement.current === null
      ? 0
      : viewportSize.height -
        refElement.current.getBoundingClientRect().top -
        10;

  return (
    <ul
      role="listbox"
      ref={refElement}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      className={cx(
        menuStyle,
        css`
          font-size: ${sizeSet.option.text}px;
          max-height: ${maxHeight}px;
          background-color: ${colorSet.option.background.base};
          box-shadow: 0 3px 7px 0 ${colorSet.menu.shadow};

          @media only screen and (max-width: ${breakpoints.Desktop}px) {
            font-size: ${mobileSizeSet.option.text}px;
          }
        `,
      )}
      id={id}
    >
      {children}
    </ul>
  );
}

ListMenu.displayName = 'ListMenu';
