import * as React from 'react';
import PropTypes from 'prop-types';

import { useIdAllocator } from '@leafygreen-ui/hooks';
import { InputOption, InputOptionContent } from '@leafygreen-ui/input-option';
import { Overline } from '@leafygreen-ui/typography';

import {
  MenuGroupProvider,
  useMenuContext,
  useMenuGroupContext,
} from '../MenuContext';

import {
  getMenuGroupItemStyles,
  getMenuGroupTitleStyles,
  menuGroupULStyles,
} from './MenuGroup.styles';
import { MenuGroupProps } from './MenuGroup.types';

/**
 * # MenuGroup
 *
 * ```
<MenuGroup title="Hello World!">
  <MenuItem>Item 1</MenuItem>
</MenuGroup>
 * ```
 * @param props.children Content to appear inside of the MenuGroup.
 *
 */
export function MenuGroup({
  children,
  className,
  title,
  glyph,
  ...rest
}: MenuGroupProps) {
  const { theme, darkMode } = useMenuContext();
  const id = useIdAllocator({ prefix: 'lg-menu-group' });
  const { depth } = useMenuGroupContext();

  const shouldRenderGroupHeader = !!title;
  const hasIcon = shouldRenderGroupHeader && !!glyph;
  // We only indent the child items if we render a title here,
  // otherwise we just pass through
  const nextGroupDepth = depth + (shouldRenderGroupHeader ? 1 : 0);

  return (
    <section {...rest} className={className}>
      {title && (
        <InputOption
          id={id}
          darkMode={darkMode}
          as="div"
          role="none"
          isInteractive={false}
          className={getMenuGroupItemStyles(theme)}
        >
          <InputOptionContent leftGlyph={glyph} preserveIconSpace={false}>
            <Overline className={getMenuGroupTitleStyles(theme)}>
              {title}
            </Overline>
          </InputOptionContent>
        </InputOption>
      )}
      <MenuGroupProvider depth={nextGroupDepth} hasIcon={hasIcon}>
        <ul role="menu" aria-labelledby={id} className={menuGroupULStyles}>
          {children}
        </ul>
      </MenuGroupProvider>
    </section>
  );
}

MenuGroup.displayName = 'MenuGroup';

MenuGroup.propTypes = {
  children: PropTypes.node,
};

export default MenuGroup;
