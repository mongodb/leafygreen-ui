import React, { ReactElement } from "react";

import { HeaderRowProps } from "../TableV10/HeaderRow";
import { TableHeaderProps } from "../TableV10/TableHeader";

type ColumnsType = React.ReactFragment | Array<React.ReactElement<HeaderRowProps | TableHeaderProps<unknown>, string | React.JSXElementConstructor<any>>>

const processColumns = (columns: ColumnsType) => {
  const HeaderRow = React.Children.toArray(columns)[0] as ReactElement;
  const TableHeaders = React.Children.toArray(HeaderRow.props.children);
  const processedColumns: Array<any> = [];
  TableHeaders.forEach(TableHeader => {
    const headerProps = (TableHeader as ReactElement).props;
    processedColumns.push({
      accessorKey: headerProps.key ?? headerProps.label,
      header: headerProps.label,
    })
  })
  return processedColumns;
}

export default processColumns;