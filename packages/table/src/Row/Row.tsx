import { Row as RTRow } from '@tanstack/react-table';
import React, { PropsWithChildren } from 'react';
import InternalRowWithoutVS from './InternalRowWithoutVS';
import InternalRowWithVS from './InternalRowWithVS';
import { RowProps } from './types';

const Row = <T extends unknown & { renderExpandedContent: ({ row }: { row: RTRow<T> }) => JSX.Element }>({ row, ...rest }: PropsWithChildren<RowProps<T>>) => {
  const hasVS = !!row;

  if (hasVS) {
    return (
      <InternalRowWithVS
        row={row}
        {...rest}
      />
    );
  } else {
    return (
      <InternalRowWithoutVS
        {...rest}
      />
    );
  }
};

export default Row;
