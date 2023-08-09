import React, { useContext, useMemo } from 'react';
import isUndefined from 'lodash/isUndefined';

import { css, cx } from '@leafygreen-ui/emotion';
import { useAvailableSpace, useForwardedRef } from '@leafygreen-ui/hooks';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';
import Popover, { PortalControlProps } from '@leafygreen-ui/popover';
import { Error } from '@leafygreen-ui/typography';

import { ComboboxProps } from '../Combobox.types';
import { ComboboxContext } from '../ComboboxContext';

import {
  loadingIconStyle,
  menuBaseStyle,
  menuList,
  menuMessageBaseStyle,
  menuMessageSizeStyle,
  menuMessageThemeStyle,
  menuThemeStyle,
  popoverStyle,
  popoverThemeStyle,
} from './Menu.styles';

type ComboboxMenuProps = {
  children?: React.ReactNode;
  refEl: React.RefObject<HTMLDivElement>;
  id: string;
  labelId: string;
  menuWidth: number;
} & PortalControlProps &
  Pick<
    ComboboxProps<any>,
    | 'searchLoadingMessage'
    | 'searchErrorMessage'
    | 'searchEmptyMessage'
    | 'popoverZIndex'
  >;

export const ComboboxMenu = React.forwardRef<HTMLDivElement, ComboboxMenuProps>(
  (
    {
      children,
      id,
      refEl,
      labelId,
      menuWidth,
      searchLoadingMessage,
      searchErrorMessage,
      searchEmptyMessage,
      ...popoverProps
    }: ComboboxMenuProps,
    forwardedRef,
  ) => {
    const { darkMode, theme } = useDarkMode();
    const { disabled, size, isOpen, searchState } = useContext(ComboboxContext);
    const ref = useForwardedRef(forwardedRef, null);

    /** The max height of the menu element */
    const availableSpace = useAvailableSpace(refEl);
    const maxHeightValue = !isUndefined(availableSpace)
      ? `${Math.min(availableSpace, 256)}px`
      : 'unset';

    /**
     * The rendered menu JSX contents
     * Includes error, empty, search and default states
     */
    const renderedMenuContents = useMemo((): JSX.Element => {
      const messageStyles = cx(
        menuMessageBaseStyle,
        menuMessageThemeStyle[theme],
        menuMessageSizeStyle(size),
      );

      const errorMessageStyles = cx(
        menuMessageBaseStyle,
        menuMessageSizeStyle(size),
      );

      switch (searchState) {
        case 'loading': {
          return (
            <span className={messageStyles}>
              <Icon
                glyph="Refresh"
                color={darkMode ? palette.blue.light1 : palette.blue.base}
                className={loadingIconStyle}
              />
              {searchLoadingMessage}
            </span>
          );
        }

        case 'error': {
          return (
            <Error className={errorMessageStyles}>
              <Icon
                glyph="Warning"
                color={darkMode ? palette.red.light1 : palette.red.base}
              />
              <span>{searchErrorMessage}</span>
            </Error>
          );
        }

        case 'unset':
        default: {
          if (
            children &&
            typeof children === 'object' &&
            'length' in children &&
            (children as Array<React.ReactNode>).length > 0
          ) {
            return <ul className={menuList}>{children}</ul>;
          }

          return <span className={messageStyles}>{searchEmptyMessage}</span>;
        }
      }
    }, [
      theme,
      size,
      searchState,
      darkMode,
      searchLoadingMessage,
      searchErrorMessage,
      children,
      searchEmptyMessage,
    ]);

    return (
      <Popover
        active={isOpen && !disabled}
        spacing={4}
        align="bottom"
        justify="middle"
        refEl={refEl}
        adjustOnMutation={true}
        className={cx(popoverStyle(menuWidth), popoverThemeStyle[theme])}
        {...popoverProps}
      >
        <div
          ref={ref}
          id={id}
          role="listbox"
          aria-labelledby={labelId}
          aria-expanded={isOpen}
          className={cx(
            menuBaseStyle,
            menuThemeStyle[theme],
            css`
              max-height: ${maxHeightValue};
            `,
          )}
          onMouseDownCapture={e => e.preventDefault()}
        >
          {renderedMenuContents}
        </div>
      </Popover>
    );
  },
);

ComboboxMenu.displayName = 'ComboboxMenu';
