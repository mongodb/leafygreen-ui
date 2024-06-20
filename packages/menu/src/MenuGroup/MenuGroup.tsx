import * as React from 'react';
import PropTypes from 'prop-types';

import { css } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { InputOption, InputOptionContent } from '@leafygreen-ui/input-option';
import { color } from '@leafygreen-ui/tokens';
import { Overline } from '@leafygreen-ui/typography';

import { MenuGroupProvider, useMenuContext } from '../MenuContext';
import { menuColor } from '../styles';

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
export function MenuGroup({
  children,
  className,
  title,
  glyph,
  ...rest
}: MenuGroupProps) {
  const { theme, darkMode } = useMenuContext();
  const id = useIdAllocator({ prefix: 'lg-menu-group' });

  return (
    <section {...rest} className={className}>
      {title && (
        <InputOption
          id={id}
          darkMode={darkMode}
          as="div"
          role="none"
          isInteractive={false}
          className={css`
            cursor: unset;
            background-color: ${menuColor[theme].background.default};
          `}
        >
          <InputOptionContent leftGlyph={glyph} preserveIconSpace={false}>
            <Overline
              className={css`
                color: ${color[theme].text.secondary.default};
              `}
            >
              {title}
            </Overline>
          </InputOptionContent>
        </InputOption>
      )}
      <MenuGroupProvider depth={1} hasIcon={!!glyph}>
        <ul
          role="menu"
          aria-labelledby={id}
          className={css`
            margin: 0;
            padding: 0;
          `}
        >
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
