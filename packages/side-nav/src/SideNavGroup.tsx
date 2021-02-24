import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import {
  createDataProp,
  IdAllocator,
  OneOf,
  isComponentType,
} from '@leafygreen-ui/lib';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import ChevronRight from '@leafygreen-ui/icon/dist/ChevronRight';
import { prefersReducedMotion } from '@leafygreen-ui/a11y';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import CollapsedSideNavItem from './CollapsedSideNavItem';
import { useSideNavContext } from './SideNavContext';
import {
  ulStyleOverrides,
  sideNavItemSidePadding,
  sideNavWidth,
} from './styles';

const menuGroupIdAllocator = IdAllocator.create('menu-group');

const button = createDataProp('side-nav-group-button');

const listItemStyle = css`
  & + & {
    margin-top: ${spacing[2]}px;
  }
`;

const labelStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  letter-spacing: 0.3px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${uiColors.green.dark2};
  min-height: ${spacing[5]}px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 4px ${sideNavItemSidePadding}px 4px ${sideNavItemSidePadding}px;
  line-height: 1.3em;

  &:not(:first-of-type) {
    margin-top: ${spacing[1]}px;
  }
`;

const collapsibleLabelStyle = css`
  transition: border-color 150ms ease-in-out, color 150ms ease-in-out;
  cursor: pointer;
  width: ${sideNavWidth}px;
  border-bottom: 1px solid ${uiColors.gray.light2};

  &:hover {
    border-color: ${uiColors.green.base};
  }
`;

const headerText = css`
  line-height: 1em;
  margin-left: ${spacing[2]}px;

  &:first-child {
    margin-left: 0;
  }
`;

const collapsibleHeaderFocusStyle = css`
  ${button.selector}:focus & {
    color: ${uiColors.blue.base};
    border-color: ${uiColors.blue.light1};
  }
`;

const buttonResetStyles = css`
  background-color: transparent;
  border: none;
  padding: 0px;
  margin: 0px;

  &:focus {
    outline: none;
  }
`;

const iconStyle = css`
  transition: 150ms all ease-in-out;

  ${prefersReducedMotion(`
    transition: none;
  `)}
`;

const openIconStyle = css`
  transform: rotate(90deg);
`;

const defaultStyle = css`
  transition: all 150ms ease-in-out;
  max-height: 0;
  overflow: hidden;
  opacity: 1;

  ${prefersReducedMotion(`
    transition: opacity 150ms ease-in-out;
  `)}
`;

const transitionStyles = {
  entering: css`
    opacity: 0;
  `,
  exiting: css`
    opacity: 0;
  `,
  exited: css`
    opacity: 0;
  `,
};

interface SideNavGroupBaseProps {
  /**
   * Class name that will be applied to the root-level element.
   */
  className?: string;

  /**
   * Content that will be rendered as the component's header. If a string is provided,
   * it will be rendered with default styling as a header tag.
   */
  header?: React.ReactNode;

  /**
   * Content that will be rendered inside the root-level element.
   */
  children?: React.ReactNode;

  /**
   * Icon that's rendered in the group label.
   */
  glyph?: React.ReactNode;
}

type CollapsedProps = OneOf<
  {
    /**
     * Determines whether or not the Group can be collapsed.
     *
     * @defaultValue `false`
     */
    collapsible: true;

    /**
     * If collapsible, determines whether or not the group should be expanded or collapsed by default.
     *
     * @defaultValue `true`
     */
    initialCollapsed?: boolean;
  },
  {
    collapsible?: false;
  }
>;

export type SideNavGroupProps = CollapsedProps & SideNavGroupBaseProps;

/**
 * # SideNavGroup
 *
 * ```
<SideNavGroup headerText="Section Header">
  <SideNavItem href="/">
    Back to Home
  </SideNavItem>
</SideNavGroup>
 * ```
 *
 * @param props.className Class name that will be applied to the root-level element.
 * @param props.header Content that will be rendered as the component's header
 *   If a string is provided, it will be rendered with default styling as a header tag.
 * @param props.children Class name that will be applied to the component's header.
 * @param props.collapsible Determines whether or not the Group can be collapsed. @defaultValue false
 * @param props.initialCollapsed Determines whether or not the Group is open by default. @defaultValue true
 */
function SideNavGroup({
  header,
  children,
  collapsible = false,
  initialCollapsed = true,
  glyph,
  className,
  ...rest
}: SideNavGroupProps) {
  const [open, setOpen] = React.useState(!initialCollapsed);
  const nodeRef = React.useRef(null);
  const ulRef = React.useRef<HTMLUListElement>(null);
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const { currentPath } = useSideNavContext();
  const menuGroupLabelId = useMemo(() => menuGroupIdAllocator.generate(), []);
  const menuId = useMemo(() => menuGroupIdAllocator.generate(), []);

  const isActiveGroup: boolean = useMemo(() => {
    return React.Children.toArray(children).some(child => {
      return (
        isComponentType(child, 'SideNavItem') &&
        (child.props.active || child.props.href === currentPath)
      );
    });
  }, [children, currentPath]);

  const accessibleGlyph =
    (glyph && isComponentType(glyph, 'Glyph')) || isComponentType(glyph, 'Icon')
      ? React.cloneElement(glyph, { 'aria-hidden': true })
      : null;

  const renderedLabel = (
    <div
      className={css`
        display: inline-flex;
        align-items: center;
      `}
    >
      {accessibleGlyph && (
        <>
          {accessibleGlyph}

          <CollapsedSideNavItem active={isActiveGroup}>
            {accessibleGlyph}
          </CollapsedSideNavItem>
        </>
      )}

      <span className={headerText}>{header}</span>
    </div>
  );

  if (collapsible) {
    return (
      <li role="menuitem" className={cx(listItemStyle, className)} {...rest}>
        <button
          {...button.prop}
          aria-controls={menuId}
          aria-expanded={open}
          className={buttonResetStyles}
          onClick={() => setOpen(curr => !curr)}
        >
          <label
            id={menuGroupLabelId}
            className={cx(labelStyle, collapsibleLabelStyle, {
              [collapsibleHeaderFocusStyle]: showFocus,
            })}
          >
            {renderedLabel}

            <ChevronRight
              role="presentation"
              size={12}
              className={cx(iconStyle, {
                [openIconStyle]: open,
              })}
            />
          </label>
        </button>

        <Transition
          in={open}
          appear
          timeout={150}
          nodeRef={nodeRef}
          mountOnEnter
          unmountOnExit
        >
          {(state: string) => (
            <div
              ref={nodeRef}
              className={cx(defaultStyle, {
                [transitionStyles.entering]: state === 'entering',
                [css`
                  opacity: 1;
                  max-height: ${ulRef?.current?.getBoundingClientRect()
                    .height}px;
                  border-bottom: 1px solid ${uiColors.gray.light2};
                `]: state === 'entered',
                [transitionStyles.exiting]: state === 'exiting',
                [transitionStyles.exited]: state === 'exited',
              })}
            >
              <ul
                ref={ulRef}
                id={menuId}
                role="menu"
                aria-labelledby={menuGroupLabelId}
                className={cx(
                  ulStyleOverrides,
                  css`
                    transition: opacity 150ms ease-in-out;
                    opacity: 0;
                  `,
                  {
                    [css`
                      opacity: 1;
                    `]: ['entering', 'entered'].includes(state),
                  },
                )}
              >
                {children}
              </ul>
            </div>
          )}
        </Transition>
      </li>
    );
  }

  return (
    <li role="menuitem" className={cx(listItemStyle, className)} {...rest}>
      <label id={menuGroupLabelId} className={labelStyle}>
        {renderedLabel}
      </label>

      <ul
        role="menu"
        aria-labelledby={menuGroupLabelId}
        className={ulStyleOverrides}
      >
        {children}
      </ul>
    </li>
  );
}

SideNavGroup.displayName = 'SideNavGroup';

SideNavGroup.propTypes = {
  className: PropTypes.string,
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
  children: PropTypes.node,
};

export default SideNavGroup;
