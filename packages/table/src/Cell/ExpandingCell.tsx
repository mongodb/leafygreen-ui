import React, { PropsWithChildren } from "react";
import ToggleExpandedIcon from "../ToggleExpandedIcon";

import FirstCell from "./FirstCell";

const ExpandingCell = ({
  children,
  toggleIsExpanding,
  isExpanding,
  ...rest
}: PropsWithChildren<any>) => {

  return (
    <FirstCell
      {...rest}
    >
      <ToggleExpandedIcon 
        isExpanded={isExpanding}
        toggleExpanded={toggleIsExpanding}
      />
      {children}
    </FirstCell>
  );
};

export default ExpandingCell;