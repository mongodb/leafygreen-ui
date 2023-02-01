import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

import { cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';

import { useTableContext } from '../TableContext/TableContext';
import ToggleExpandedIcon from '../ToggleExpandedIcon/ToggleExpandedIcon';

import {
  alignmentStyles,
  baseStyles,
  cellContentContainerStyles,
  depthPadding,
} from './Cell.styles';
import { InternalCellBaseProps } from './Cell.types';

const defaultStyle = {
  transition: `all 500ms ease-in-out`,
  padding: 0,
  height: 0,
  maxHeight: 0,
  opacity: 0,
}

const transitionStyles: any = {
  entering: {
    padding: 0,
    height: 0,
    maxHeight: 0,
    opacity: 0,
  },
  entered: {
    height: 'auto',
    maxHeight: 500,
    opacity: 1,
  },
  exiting: {
    height: 'auto',
    maxHeight: 500,
    opacity: 1,
  },
  exited: {
    padding: 0,
    height: 0,
    maxHeight: 0,
    opacity: 0,
  },
};

const CellContentWrapper = ({ depth, cellIndex, align, children }: any) => {
  const nodeRef = useRef(null);
  return (
    <>
      {depth !== 0 ? (
        <Transition
          in
          appear
          nodeRef={nodeRef}
          timeout={{
            appear: 0,
            exit: 500,
          }}
        >
          {state => (
            <div
              ref={nodeRef}
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}
            >
              <div
                className={cx(cellContentContainerStyles, {
                  [depthPadding(depth)]: cellIndex === 0,
                  [alignmentStyles(align)]: !!align,
                })}
              >{children}</div>
            </div>
          )}
        </Transition>
      ) : (
        <div
          className={cx(cellContentContainerStyles, {
            [depthPadding(depth)]: cellIndex === 0,
            [alignmentStyles(align)]: !!align,
          })}
        >{children}</div>
      )}
    </>
  )
}

const InternalCellBase = ({
  children,
  className,
  cellIndex,
  depth = 0,
  toggleExpandedIconProps,
  align: alignProp,
  ...rest
}: PropsWithChildren<InternalCellBaseProps>) => {
  const { columnAlignments } = useTableContext();
  const [align, setAlign] =
    useState<HTMLElementProps<'td'>['align']>(alignProp);

  useEffect(() => {
    if (columnAlignments !== undefined && cellIndex !== undefined) {
      setAlign(columnAlignments[cellIndex]);
    }
  }, [cellIndex, columnAlignments]);

  return (
    <td className={cx(baseStyles, className)} {...rest}>
      <CellContentWrapper
        cellIndex={cellIndex}
        depth={depth}
        align={align}
      >
        {!!toggleExpandedIconProps && (
          <ToggleExpandedIcon {...toggleExpandedIconProps} />
        )}
        {children}
      </CellContentWrapper>
    </td>
  );
};

export default InternalCellBase;
