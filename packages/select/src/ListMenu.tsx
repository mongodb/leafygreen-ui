import React, { useCallback, useContext } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { keyMap } from '@leafygreen-ui/lib';
import Popover, { Align, Justify } from '@leafygreen-ui/popover';
import { breakpoints } from '@leafygreen-ui/tokens';
import SelectContext from './SelectContext';
import { colorSets, mobileSizeSet, sizeSets } from './styleSets';
import { useForwardedRef } from './utils';

const menuStyle = css`
  position: relative;
  text-align: left;
  width: 100%;
  border-radius: 3px;
  line-height: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: auto;
`;

interface ListMenuProps {
  children: React.ReactNode;
  id: string;
  referenceElement: React.MutableRefObject<HTMLElement | null>;
  onClose: () => void;
  onSelectFocusedOption: React.KeyboardEventHandler;
  onFocusPreviousOption: () => void;
  onFocusNextOption: () => void;
  className?: string;
  usePortal?: boolean;
}

const ListMenu = React.forwardRef<HTMLUListElement, ListMenuProps>(
  function ListMenu(
    {
      children,
      id,
      referenceElement,
      onClose,
      onFocusPreviousOption,
      onFocusNextOption,
      onSelectFocusedOption,
      className,
      usePortal,
    }: ListMenuProps,
    forwardedRef,
  ) {
    const { mode, size, disabled, open } = useContext(SelectContext);

    const colorSet = colorSets[mode];
    const sizeSet = sizeSets[size];

    const ref = useForwardedRef(forwardedRef, null);

    const onKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        // No support for modifiers yet
        /* istanbul ignore if */
        if (event.ctrlKey || event.shiftKey || event.altKey) {
          return;
        }

        let bubble = false;

        switch (event.keyCode) {
          case keyMap.Tab:
          case keyMap.Enter:
            onSelectFocusedOption(event);
            break;
          case keyMap.Escape:
            onClose();
            break;
          case keyMap.ArrowUp:
            onFocusPreviousOption();
            break;
          case keyMap.ArrowDown:
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
      [
        onClose,
        onFocusNextOption,
        onFocusPreviousOption,
        onSelectFocusedOption,
      ],
    );

    const viewportSize = useViewportSize();

    const maxHeight =
      viewportSize === null || ref.current === null
        ? 0
        : viewportSize.height - ref.current.getBoundingClientRect().top - 10;

    const onClick = useCallback(
      (event: React.MouseEvent) => {
        if (ref.current) {
          ref.current.focus();
        }
        event.stopPropagation();
      },
      [ref],
    );

    return (
      <Popover
        active={open && !disabled}
        spacing={4}
        align={Align.Bottom}
        justify={Justify.Middle}
        adjustOnMutation
        className={className}
        refEl={referenceElement}
        usePortal={usePortal}
        data-testid="popover-container"
      >
        <ul
          role="listbox"
          ref={ref}
          tabIndex={-1}
          onKeyDown={onKeyDown}
          onClick={onClick}
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
      </Popover>
    );
  },
);

ListMenu.displayName = 'ListMenu';

export default ListMenu;
