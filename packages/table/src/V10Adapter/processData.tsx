import React, { ReactElement } from "react";
import { TableRowInterface } from "../TableV10/Table"

const processData = (
  data: any[], 
  processedColumns: any[], 
  childrenFn: ((TableRowArgs: TableRowInterface<unknown>) => JSX.Element)
) => {
  const processedData = data.map((oldDatum, index) => {
    // for each row, evaluate childrenFn
    const evaluatedChildren = childrenFn({ datum: oldDatum, index })
    const childrenArray = React.Children.toArray(evaluatedChildren)
    const evaluatedRow = childrenArray[0] as ReactElement;
    const evaluatedCells = React.Children.toArray(evaluatedRow.props.children)
    return evaluatedCells.reduce((acc, currVal, index) => {
      return {
        ...acc,
        [processedColumns[index].accessorKey]: () => (currVal as ReactElement).props.children
      }
    }, {})
  })
  return processedData;
}

export default processData;