import React, { useCallback, useContext } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { useViewportSize } from '@leafygreen-ui/hooks';
import Popover, { Align, Justify, PopoverProps } from '@leafygreen-ui/popover';
import { breakpoints, fontFamilies } from '@leafygreen-ui/tokens';
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

type ListMenuProps = {
  children: React.ReactNode;
  id: string;
  referenceElement: React.MutableRefObject<HTMLElement | null>;
  className?: string;
  labelId?: string;
} & Omit<PopoverProps, 'active' | 'refEl'>;

const ListMenu = React.forwardRef<HTMLUListElement, ListMenuProps>(
  function ListMenu(
    {
      children,
      id,
      referenceElement,
      className,
      labelId,
      usePortal = true,
      portalContainer,
      scrollContainer,
      portalClassName,
      popoverZIndex,
    }: ListMenuProps,
    forwardedRef,
  ) {
    const { mode, size, disabled, open } = useContext(SelectContext);

    const colorSet = colorSets[mode];
    const sizeSet = sizeSets[size];

    const ref = useForwardedRef(forwardedRef, null);

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

    const popoverProps = {
      popoverZIndex,
      ...(usePortal
        ? { usePortal, portalClassName, portalContainer, scrollContainer }
        : { usePortal }),
    };

    return (
      <Popover
        active={open && !disabled}
        spacing={4}
        align={Align.Bottom}
        justify={Justify.Middle}
        adjustOnMutation
        className={className}
        refEl={referenceElement}
        {...popoverProps}
      >
        {/* Keyboard events handled in Select component through event listener hook */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <ul
          aria-labelledby={labelId}
          role="listbox"
          ref={ref}
          tabIndex={-1}
          onClick={onClick}
          className={cx(
            menuStyle,
            css`
              font-family: ${fontFamilies.default};
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
