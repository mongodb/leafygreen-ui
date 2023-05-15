import React, { ReactElement, useRef } from 'react';
import isEmpty from 'lodash/isEmpty';

import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';
import { Menu, MenuItem } from '@leafygreen-ui/menu';

import { buttonContainerStyles } from './SplitButton.styles';
import { SplitButtonProps } from './SplitButton.types';

export const SplitButton = React.forwardRef<HTMLInputElement, SplitButtonProps>(
  (
    {
      darkMode: darkModeProp,
      variant = 'default',
      type = 'button',
      align = 'bottom',
      justify = 'end',
      label,
      menuItems,
      ...rest
    }: SplitButtonProps,
    forwardedRef,
  ) => {
    const { darkMode } = useDarkMode(darkModeProp);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // console.log(menuItems.props.children);

    const renderMenuItems = () => {
      if (menuItems) {
        if ('props' in menuItems) {
          if (!isEmpty(menuItems.props)) {
            return menuItems.props.children.map((item: ReactElement) => {
              if (isComponentType(item, 'MenuItem')) {
                // TODO: clone and remove active prop
                return item;
              }
            });
          } else {
            console.log('no items');
          }
        }
      } else {
        console.log('no prop');
        // console.error('errorrrrrrr');
      }
    };

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div ref={forwardedRef}>
          <div className={buttonContainerStyles} ref={containerRef}>
            <Button type={type} variant={variant} {...rest}>
              {label}
            </Button>
            <Menu
              align={align}
              justify={justify}
              refEl={containerRef}
              trigger={
                <Button
                  type="button"
                  variant={variant}
                  leftGlyph={<Icon glyph="CaretDown" />}
                />
              }
            >
              {renderMenuItems()}
            </Menu>
          </div>
        </div>
      </LeafyGreenProvider>
    );
  },
);

SplitButton.displayName = 'SplitButton';
