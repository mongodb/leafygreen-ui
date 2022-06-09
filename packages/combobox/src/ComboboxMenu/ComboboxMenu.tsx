import React, { useContext, useMemo } from 'react';
import Popover from '@leafygreen-ui/popover';
import { ComboboxContext, useDarkMode } from '../ComboboxContext';
import { useAvailableSpace, useForwardedRef } from '@leafygreen-ui/hooks';
import {
  menuBaseStyle,
  menuList,
  menuMessageBaseStyle,
  menuMessageThemeStyle,
  menuMessageSizeStyle,
  menuThemeStyle,
  popoverStyle,
  loadingIconStyle,
  popoverThemeStyle,
} from './Menu.styles';
import { css, cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { ComboboxProps } from '../Combobox.types';
import { uiColors } from '@leafygreen-ui/palette';
import { isUndefined } from 'lodash';

type ComboboxMenuProps = {
  children?: React.ReactNode;
  refEl: React.RefObject<HTMLDivElement>;
  id: string;
  labelId: string;
  menuWidth: number;
} & Pick<
  ComboboxProps<any>,
  | 'searchLoadingMessage'
  | 'searchErrorMessage'
  | 'searchEmptyMessage'
  | 'usePortal'
  | 'portalClassName'
  | 'portalContainer'
  | 'scrollContainer'
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
    const { disabled, darkMode, size, isOpen, searchState } =
      useContext(ComboboxContext);
    const ref = useForwardedRef(forwardedRef, null);
    const theme = useDarkMode(darkMode);

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
        menuMessageSizeStyle[size],
      );

      switch (searchState) {
        case 'loading': {
          return (
            <span className={messageStyles}>
              <Icon
                glyph="Refresh"
                color={uiColors.blue.base}
                className={loadingIconStyle}
              />
              {searchLoadingMessage}
            </span>
          );
        }

        case 'error': {
          return (
            <span className={messageStyles}>
              <Icon glyph="Warning" color={uiColors.red.base} />
              {searchErrorMessage}
            </span>
          );
        }

        case 'unset':
        default: {
          if (
            children &&
            typeof children === 'object' &&
            'length' in children &&
            children.length > 0
          ) {
            return <ul className={menuList}>{children}</ul>;
          }

          return <span className={messageStyles}>{searchEmptyMessage}</span>;
        }
      }
    }, [
      theme,
      size,
      children,
      searchEmptyMessage,
      searchErrorMessage,
      searchLoadingMessage,
      searchState,
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
