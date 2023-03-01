export interface NumberSelectProps {
  /**
   * Specifies that the popover content should be rendered at the end of the DOM,
   * rather than in the DOM tree.
   *
   * default: `true`
   */
  usePortal?: boolean;

  /**
   * When usePortal is `true`, specifies a class name to apply to the root element of the portal.
   */
  portalClassName?: string;

  /**
   * When usePortal is `true`, specifies an element to portal within. The default behavior is to generate a div at the end of the document to render within.
   */
  portalContainer?: HTMLElement | null;

  /**
   * When usePortal is `true`, specifies the scrollable element to position relative to.
   */
  scrollContainer?: HTMLElement | null;

  /**
   * Number that controls the z-index of the popover element directly.
   */
  popoverZIndex?: number;
}
