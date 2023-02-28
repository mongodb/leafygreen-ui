import React, { Fragment, PropsWithChildren } from 'react';

import { TableBodyProps } from './TableBody.types';

const TableBody = <T extends unknown>({
  children,
  table,
  renderingExpandableRows = false,
  ...rest
}: PropsWithChildren<TableBodyProps<T>>) => {
  let paddingTop = 0;
  let paddingBottom = 0;

  const ContainerElement = renderingExpandableRows
    ? Fragment
    : (
      props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLTableSectionElement>,
        HTMLTableSectionElement
      >,
    ) => <tbody {...props} />;

  if (table && 'virtualRows' in table) {
    const { virtualRows, totalSize } = table;
    paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
    paddingBottom =
      virtualRows.length > 0
        ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
        : 0;
  }

  return (
    <ContainerElement {...rest}>
      {paddingTop > 0 && (
        <tr aria-hidden>
          <td style={{ height: `${paddingTop}px` }} />
        </tr>
      )}
      {children}
      {paddingBottom > 0 && (
        <tr aria-hidden>
          <td style={{ height: `${paddingBottom}px` }} />
        </tr>
      )}
    </ContainerElement>
  );
};

export default TableBody;
