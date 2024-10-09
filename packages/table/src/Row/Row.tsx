import React, { ForwardedRef } from 'react';
import PropTypes from 'prop-types';

import { LGRowData } from '../useLeafyGreenTable';

import InternalRowWithoutRT from './InternalRowWithoutRT';
import InternalRowWithRT from './InternalRowWithRT';
import { RowProps } from './Row.types';

/**
 * Renders the provided cells
 */
const RowForwardRef = <T extends LGRowData>(
  { row, virtualRow, ...rest }: RowProps<T>,
  ref: ForwardedRef<HTMLTableRowElement>,
) => {
  return (
    <>
      {row ? (
        <InternalRowWithRT
          //@ts-expect-error - FIXME: types are weird 😭
          ref={ref}
          row={row}
          virtualRow={virtualRow}
          {...rest}
        />
      ) : (
        <InternalRowWithoutRT {...rest} />
      )}
    </>
  );
};

// https://oida.dev/typescript-react-generic-forward-refs/#option-1%3A-type-assertion
export const Row = React.forwardRef(RowForwardRef) as <T extends LGRowData>(
  props: RowProps<T> & { ref?: React.ForwardedRef<HTMLTableRowElement> },
) => ReturnType<typeof RowForwardRef>;

// @ts-ignore - Row assertion does not include propTypes
Row.propTypes = {
  virtualRow: PropTypes.any,
  row: PropTypes.any,
  disabled: PropTypes.bool,
};

// @ts-ignore - Row assertion type does not include displayName
Row.displayName = 'Row';

export default Row;

// const Row = forwardRef(
//   <T extends LGRowData>(
//     { row, virtualRow, ...rest }: RowProps<T>,
//     fwdRef: ForwardedRef<HTMLTableRowElement>,
//   ) => {
//     return (
//       <>
//         {row ? (
//           <InternalRowWithRT
//             ref={fwdRef}
//             //@ts-ignore - FIXME: incompatible type 😭
//             row={row}
//             virtualRow={virtualRow}
//             {...rest}
//           />
//         ) : (
//           <InternalRowWithoutRT {...rest} />
//         )}
//       </>
//     );
//   },
// );
