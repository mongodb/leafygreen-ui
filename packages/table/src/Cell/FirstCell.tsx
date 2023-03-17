

import { cx } from "@leafygreen-ui/emotion";
import React, { PropsWithChildren } from "react";

import Cell from "./Cell";
import { depthPadding } from "./Cell.styles";

export const FirstCell = ({
  children,
  cell,
  ...rest
}: PropsWithChildren<any>) => {
  return (
    <Cell
      cell={cell}
      contentClassName={depthPadding(cell.row.depth)}
      {...rest}
    >
      {children}
    </Cell>
  );
};


export default FirstCell;