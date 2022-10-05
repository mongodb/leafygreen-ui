import * as React from 'react';
import PropTypes from 'prop-types';
import { createDataProp } from '@leafygreen-ui/lib';

export const menuGroupDataProp = createDataProp('menu-group-section');

interface MenuGroupProps {
  /**
   * Content that will appear inside of MenuGroup component.
   * @type `<MenuItem />` | `<SubMenu />` | `<MenuGroup />` | `<MenuSeparator />`
   */
  children: React.ReactNode;

  /**
   * className that will be applied to root MenuGroup element.
   */
  className?: string;
}

/**
 * # MenuGroup
 *
 * ```
<MenuGroup>
  <MenuGroup>Hello World!</MenuGroup>
</MenuGroup>
 * ```
 * @param props.className ClassName applied to MenuGroup.
 * @param props.children Content to appear inside of the MenuGroup.
 *
 */
function MenuGroup({ children, className, ...rest }: MenuGroupProps) {
  return (
    <section {...rest} {...menuGroupDataProp.prop} className={className}>
      {children}
    </section>
  );
}

MenuGroup.displayName = 'MenuGroup';

MenuGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
};

export default MenuGroup;
