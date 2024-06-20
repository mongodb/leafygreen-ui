import * as React from 'react';
import PropTypes from 'prop-types';

import { css } from '@leafygreen-ui/emotion';
import { InputOption, InputOptionContent } from '@leafygreen-ui/input-option';
import { Overline } from '@leafygreen-ui/typography';

import { MenuGroupProvider } from '../MenuContext';

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
  return (
    <section {...rest} className={className}>
      {title && (
        <InputOption as="div" className={css``} isInteractive={false}>
          <InputOptionContent leftGlyph={glyph}>
            <Overline>{title}</Overline>
          </InputOptionContent>
        </InputOption>
      )}
      <MenuGroupProvider depth={1} hasIcon={!!glyph}>
        {children}
      </MenuGroupProvider>
    </section>
  );
}

MenuGroup.displayName = 'MenuGroup';

MenuGroup.propTypes = {
  children: PropTypes.node,
};

export default MenuGroup;
