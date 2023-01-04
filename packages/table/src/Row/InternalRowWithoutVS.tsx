import { isComponentType } from '@leafygreen-ui/lib';
import React, { PropsWithChildren, ReactElement, ReactNode, useState } from 'react';
import InternalCellWithoutVS from '../Cell/InternalCellWithoutVS';
import InternalRowBase from './InternalRowBase';
import { InternalRowWithoutVSProps } from './types';

const InternalRowWithoutVS = ({ children, depth = 0, ...rest }: PropsWithChildren<InternalRowWithoutVSProps>) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const ExpandedContentChild = React.Children.toArray(children).filter(c => isComponentType(c, 'ExpandedContent'))[0]
  const RowChildren = React.Children.toArray(children).filter(c => isComponentType(c, 'Row'))
  const CellChildren = React.Children.toArray(children).filter(c => isComponentType(c, 'Cell'))
  return (
    <>
      <InternalRowBase {...rest}>
        {React.Children.map(CellChildren, (child: ReactNode, index: number) => {
          return React.createElement(InternalCellWithoutVS, {
            ...((child as ReactElement)?.props),
            cellIndex: index,
            depth,
            toggleExpandedIconProps: (!!ExpandedContentChild || RowChildren.length > 0) ? {
              isExpanded,
              toggleExpanded: () => {
                setIsExpanded(x => !x)
              },
            } : undefined,
          });
        })}
      </InternalRowBase>

      {isExpanded && (
        <>
          {!!ExpandedContentChild && (
            <tr>
              <td colSpan={React.Children.count(CellChildren)}>
                {ExpandedContentChild}
              </td>
            </tr>
          )}
          {RowChildren.length > 0 && (
            RowChildren.map((rowChild) => {
              return React.createElement(InternalRowWithoutVS, {
                ...((rowChild as ReactElement)?.props),
                depth: depth + 1,
              });
            })
          )}
        </>
      )}
    </>
  );
};

export default InternalRowWithoutVS;
