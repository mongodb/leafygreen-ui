import * as React from 'react';
import PropTypes from 'prop-types';
import { emotion, createDataProp } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import { cx } from 'emotion';

const { css } = emotion;

export const menuGroup = createDataProp('menu-group-section');

const borderStyle = css`
  border-bottom: 1px solid ${colors.gray[7]};
`;
interface Props {
  /**
   * Content that will appear inside of MenuGroup component.
   */
  children: React.ReactNode;

  /**
   * Text to appear before MenuGroup components.
   */
  title: string;

  /**
   * Class name that will be applied to root MenuGroup element.
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
 * @param props.className Classname applied to MenuGroup.
 * @param props.children Content to appear inside of the MenuGroup.
 * @param props.title Text to appear before MenuGroup components.
 *
 */
export default function MenuGroup({ children, className, title }: Props) {
  return (
    <section
      {...menuGroup.prop}
      role="menu"
      className={cx(borderStyle, className)}
    >
      {title && <div>{title}</div>}
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
