import * as React from 'react';
import PropTypes from 'prop-types';
import { emotion, createDataProp } from '@leafygreen-ui/lib';

const { css } = emotion;

export const menuGroup = createDataProp('menu-group-section');

const titleStyle = css`
  font-size: 16px;
  padding-left: 16px;
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
 * @param props.className Classname applied to MenuGroup.
 * @param props.children Content to appear inside of the MenuGroup.
 * @param props.title Text to appear before MenuGroup components.
 *
 */
export default function MenuGroup({
  children,
  className,
  title,
  ...rest
}: Props) {
  return (
    <section {...rest} {...menuGroup.prop} role="menu" className={className}>
      {title && <div className={titleStyle}>{title}</div>}
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
