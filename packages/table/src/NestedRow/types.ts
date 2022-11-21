import Row from '../Row/Row';
import { RowProps } from '../Row/types';
import NestedRow from './NestedRow';

export interface NestedRowProps extends RowProps {
  nestedRows: Array<typeof Row | typeof NestedRow>;
  /**
   * Determines whether or not the row is expanded on first render
   */
  expanded?: boolean;
  /**
   * @internal
   */
  indentLevel?: number;
}
