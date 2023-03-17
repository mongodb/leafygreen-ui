

import React, { PropsWithChildren } from "react";

import { cx } from "@leafygreen-ui/emotion";

import Cell from "./Cell";
import { depthPadding } from "./Cell.styles";

export const FirstCell = ({
  children,
  depth,
  ...rest
}: PropsWithChildren<any>) => {
  return (
    <Cell
      contentClassName={depthPadding(depth)}
      {...rest}
    >
      {children}
    </Cell>
  );
};


export default FirstCell;