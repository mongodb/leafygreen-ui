import React, { useCallback, useContext } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import Popover, { Align, Justify, PopoverProps } from '@leafygreen-ui/popover';
import { breakpoints, fontFamilies } from '@leafygreen-ui/tokens';
import { useAvailableSpace } from '@leafygreen-ui/hooks';
import SelectContext from './SelectContext';
import {
  colorSets,
  legacySizeSets,
  mobileSizeSet,
  Mode,
  sizeSets,
} from './styleSets';
import { useForwardedRef } from './utils';
import { Size } from '.';
import isUndefined from 'lodash/isUndefined';

const maxMenuHeight = 274;
const menuMargin = 8;

const baseMenuStyle = css`
  position: relative;
  text-align: left;
  width: 100%;
  border-radius: 3px; //
  line-height: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: auto;
`;

const getMenuStyles = (mode: Mode, size: Size) => {
  const sizeSet = mode === Mode.Dark ? legacySizeSets[size] : sizeSets[size];

  const colorSet = colorSets[mode];

  return cx(
    css`
      font-size: ${sizeSet.option.text}px;
      min-height: ${sizeSet.height}px;
      background-color: ${colorSet.option.background.base};
    `,
    {
      // TODO: Refresh - remove dark mode logic
      [css`
        font-family: ${fontFamilies.default};
        border: 1px solid ${colorSet.menu.border};
        border-radius: 12px;
        box-shadow: 0 4px 7px 0 ${colorSet.menu.shadow};
        padding: 8px 0;
      `]: mode === Mode.Light,
      [css`
        font-family: ${fontFamilies.legacy};
        border-radius: 3px;
        box-shadow: 0 3px 7px 0 ${colorSet.menu.shadow};
      `]: mode === Mode.Dark,
    },
  );
};

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

    const ref = useForwardedRef(forwardedRef, null);

    const availableSpace = useAvailableSpace(referenceElement, menuMargin);
    const maxHeightValue = !isUndefined(availableSpace)
      ? `${Math.min(availableSpace, maxMenuHeight)}px`
      : 'unset';

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
        spacing={mode === 'dark' ? 4 : 8}
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
            baseMenuStyle,
            getMenuStyles(mode, size),
            css`
              max-height: ${maxHeightValue};
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
