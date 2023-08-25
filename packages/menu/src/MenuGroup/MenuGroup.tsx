import * as React from 'react';
import PropTypes from 'prop-types';

import { MenuGroupProps } from './MenuGroup.types';

/**
 * # MenuGroup
 *
 * ```
<MenuGroup>
  <MenuGroup>Hello World!</MenuGroup>
</MenuGroup>
 * ```
 * @param props.children Content to appear inside of the MenuGroup.
 *
 */
export function MenuGroup({ children, className, ...rest }: MenuGroupProps) {
  return (
    <section {...rest} className={className}>
      {children}
    </section>
  );
}

MenuGroup.displayName = 'MenuGroup';

MenuGroup.propTypes = {
  children: PropTypes.node,
};

export default MenuGroup;
