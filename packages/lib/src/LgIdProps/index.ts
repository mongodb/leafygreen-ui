export type LgIdString = `lg-${string}`;

/**
 * Base interface used by components to support data-lgid.
 *
 * @public
 */
export interface LgIdProps {
  /**
   * LG test id passed to the component wrapper.
   */
  ['data-lgid']?: LgIdString;
}
