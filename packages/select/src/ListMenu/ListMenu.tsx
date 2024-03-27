import React, { useCallback, useContext } from 'react';
import isUndefined from 'lodash/isUndefined';

import { css, cx } from '@leafygreen-ui/emotion';
import { useAvailableSpace } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import Popover, { Align, Justify } from '@leafygreen-ui/popover';

import { LGIDS_SELECT } from '../constants';
import { DropdownWidthBasis } from '../Select/Select.types';
import SelectContext from '../SelectContext';
import { mobileSizeSet } from '../styleSets';
import { MobileMediaQuery, useForwardedRef } from '../utils';

import {
  autoWidthStyles,
  baseMenuStyle,
  getMenuStyles,
  maxMenuHeight,
  menuMargin,
  popoverClassName,
} from './ListMenu.styles';
import { ListMenuProps } from './ListMenu.types';

/**
 * @internal
 */
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
      onEntering,
      onEnter,
      onEntered,
      onExiting,
      onExit,
      onExited,
    }: ListMenuProps,
    forwardedRef,
  ) {
    const { theme } = useDarkMode();
    const { size, disabled, open } = useContext(SelectContext);

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
      onEntering,
      onEnter,
      onEntered,
      onExiting,
      onExit,
      onExited,
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
          data-lgid={LGIDS_SELECT.popover}
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
