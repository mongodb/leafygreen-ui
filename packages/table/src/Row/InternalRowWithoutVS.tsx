import { isComponentType } from '@leafygreen-ui/lib';
import React, { PropsWithChildren, ReactElement, ReactNode, useState } from 'react';
import InternalCellWithoutVS from '../Cell/InternalCellWithoutVS';
import InternalRowBase from './InternalRowBase';
import { InternalRowWithoutVSProps } from './types';

const InternalRowWithoutVS = ({ children, ...rest }: PropsWithChildren<InternalRowWithoutVSProps>) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const ExpandedContentChild = React.Children.toArray(children).filter(c => isComponentType(c, 'ExpandedContent'))[0]
  const CellChildren = React.Children.toArray(children).filter(c => isComponentType(c, 'Cell'))
  return (
    <>
      <InternalRowBase {...rest}>
        {React.Children.map(CellChildren, (child: ReactNode, index: number) => {
          return React.createElement(InternalCellWithoutVS, {
            ...((child as ReactElement)?.props),
            cellIndex: index,
            toggleExpandedIconProps: !!ExpandedContentChild ? {
              isExpanded,
              toggleExpanded: () => {
                setIsExpanded(x => !x)
              },
            } : undefined,
          });
        })}
      </InternalRowBase>

      {isExpanded && (
        <tr>
          <td colSpan={React.Children.count(CellChildren)}>
            {ExpandedContentChild}
          </td>
        </tr>
      )}
    </>
  );
};

export default InternalRowWithoutVS;
