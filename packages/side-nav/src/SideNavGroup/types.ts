import { HTMLElementProps, OneOf } from '@leafygreen-ui/lib';

interface SideNavGroupBaseProps extends HTMLElementProps<'li'> {
  /**
   * Content that will be rendered as the component's header. If a string is provided,
   * it will be rendered with default styling as a header tag.
   */
  header?: React.ReactNode;

  /**
   * Content that will be rendered inside the root-level element.\
   *
   * @type `<SideNavItem />`
   */
  children?: React.ReactNode;

  /**
   * Icon that's rendered in the group label.
   *
   * @type `<Icon />`
   */
  glyph?: React.ReactNode;

  /**
   * Manually overrides automatic detection of whether a group contains an active item.
   * This is useful for cases when an active item might be wrapped with another component like a Tooltip or routing component.
   */
  hasActiveItem?: boolean;

  indentLevel?: number;
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
