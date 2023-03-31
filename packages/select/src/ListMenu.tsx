import React, { useCallback, useContext } from 'react';
import isUndefined from 'lodash/isUndefined';

import { css, cx } from '@leafygreen-ui/emotion';
import { useAvailableSpace } from '@leafygreen-ui/hooks';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import Popover, { Align, Justify, PopoverProps } from '@leafygreen-ui/popover';
import { fontFamilies } from '@leafygreen-ui/tokens';

import SelectContext from './SelectContext';
import { colorSets, mobileSizeSet, sizeSets } from './styleSets';
import { DropdownWidthBasis, Size } from './types';
import { MobileMediaQuery, useForwardedRef } from './utils';

export const popoverClassName = createUniqueClassName('select-popover');

const maxMenuHeight = 274;
const menuMargin = 8;

const baseMenuStyle = css`
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

const autoWidthStyles = css`
  width: max-content;
`;

const getMenuStyles = (theme: Theme, size: Size) => {
  const sizeSet = sizeSets[size];
  const colorSet = colorSets[theme];

  return cx(
    css`
      font-family: ${fontFamilies.default};
      font-size: ${sizeSet.option.text}px;
      min-height: ${sizeSet.height}px;
      background-color: ${colorSet.option.background.base};
      border-radius: 12px;
      box-shadow: 0 4px 7px 0 ${colorSet.menu.shadow};
      padding: 8px 0;
    `,
  );
};

type ListMenuProps = {
  children: React.ReactNode;
  id: string;
  referenceElement: React.MutableRefObject<HTMLElement | null>;
  className?: string;
  labelId?: string;
  dropdownWidthBasis: DropdownWidthBasis;
} & Omit<PopoverProps, 'active' | 'refEl'>;

const ListMenu = React.forwardRef<HTMLUListElement, ListMenuProps>(
  function ListMenu(
    {
      children,
      id,
      referenceElement,
      className,
      labelId,
      dropdownWidthBasis,
      usePortal = true,
      portalContainer,
      scrollContainer,
      portalClassName,
      popoverZIndex,
    }: ListMenuProps,
    forwardedRef,
  ) {
    const { theme, size, disabled, open } = useContext(SelectContext);

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
        spacing={6}
        align={Align.Bottom}
        justify={Justify.Start}
        adjustOnMutation
        className={cx(popoverClassName, className, {
          [autoWidthStyles]: dropdownWidthBasis === DropdownWidthBasis.Option,
        })}
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
            getMenuStyles(theme, size),
            css`
              max-height: ${maxHeightValue};
              ${MobileMediaQuery} {
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
