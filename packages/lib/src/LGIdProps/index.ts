/**
 * Base interface used by components to support LGId test.
 *
 * @public
 */
export default interface LGIdProps {
  /**
   * LG test id passed to the component wrapper.
   */
  ['data-lgid']?: string;
}
