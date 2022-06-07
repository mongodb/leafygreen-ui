import React, { useContext, useMemo } from 'react';
import Popover from '@leafygreen-ui/popover';
import { ComboboxContext } from '../ComboboxContext';
import { useAvailableSpace, useForwardedRef } from '@leafygreen-ui/hooks';
import { loadingIconStyle } from '../Combobox.styles';
import {
  menuBaseStyle,
  menuList,
  menuMessageBaseStyle,
  menuMessageModeStyle,
  menuMessageSizeStyle,
  menuModeStyle,
  popoverStyle,
} from './Menu.styles';
import { css, cx } from '@leafygreen-ui/emotion';
import { Mode } from '@leafygreen-ui/tokens';
import Icon from '@leafygreen-ui/icon';
import { ComboboxProps } from '../Combobox.types';
import { uiColors } from '@leafygreen-ui/palette';

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
    const mode = darkMode ? Mode.Dark : Mode.Light;

    /** The max height of the menu element */
    const maxHeight = Math.min(256, useAvailableSpace(refEl));

    /**
     * The rendered menu JSX contents
     * Includes error, empty, search and default states
     */
    const renderedMenuContents = useMemo((): JSX.Element => {
      const messageStyles = cx(
        menuMessageBaseStyle,
        menuMessageModeStyle[mode],
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
      mode,
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
        className={popoverStyle(menuWidth)}
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
            menuModeStyle[mode],
            css`
              max-height: ${maxHeight}px;
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
