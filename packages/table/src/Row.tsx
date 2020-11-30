import React, { useState, useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import IconButton from '@leafygreen-ui/icon-button';
import ChevronRightIcon from '@leafygreen-ui/icon/dist/ChevronRight';
import ChevronDownIcon from '@leafygreen-ui/icon/dist/ChevronDown';
import {
  isComponentType,
  IdAllocator,
  HTMLElementProps,
} from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { useTableContext, TableActionTypes, DataType } from './TableContext';
import { tdInnerDiv } from './Cell';

const rowStyle = css`
  border-top: 1px solid ${uiColors.gray.light2};
  color: ${uiColors.gray.dark2};

  & > td > ${tdInnerDiv.selector} {
    min-height: 40px;
    transition: all 150ms ease-in-out;
  }
`;

const altColor = css`
  &:nth-of-type(even) {
    background-color: ${uiColors.gray.light3};
  }
`;

const iconButtonMargin = css`
  flex-grow: 1;
  flex-shrink: 0;
  margin-right: 4px;
  margin-left: -8px;
`;

const disabledStyle = css`
  background-color: ${uiColors.gray.light2};
  color: ${uiColors.gray.base};
  cursor: not-allowed;
  border-top: 1px solid ${uiColors.gray.light1};
  border-bottom: 1px solid ${uiColors.gray.light1};
`;

const displayFlex = css`
  display: flex;
  align-items: center;
`;

const transitionStyles = {
  default: css`
    transition: border 150ms ease-in-out;
    border-top-color: transparent;

    & > td {
      padding-top: 0px;
      padding-bottom: 0px;
    }

    & > td > ${tdInnerDiv.selector} {
      max-height: 0;
    }
  `,

  entered: css`
    border-top-color: ${uiColors.gray.light2};

    & > td > ${tdInnerDiv.selector} {
      min-height: 40px;
    }
  `,
};

function styleColumn(index: string, dataType?: DataType) {
  let justify;

  if (dataType === DataType.Number) {
    justify = 'flex-end';
  } else {
    justify = 'flex-start';
  }

  return css`
    & td:nth-child(${index}) > div {
      justify-content: ${justify};
    }
  `;
}

function getIndentLevelStyle(indentLevel: number) {
  return css`
    & > td:nth-child(1) {
      padding-left: ${8 + indentLevel * 16}px;
    }
  `;
}

const idAllocator = IdAllocator.create('table-row');

interface RowProps extends HTMLElementProps<'tr', HTMLTableRowElement> {
  expanded?: boolean;
  disabled?: boolean;
  indentLevel?: number;
  isAnyAncestorCollapsed?: boolean;
}

const Row = React.forwardRef(
  (
    {
      expanded = false,
      disabled = false,
      indentLevel = 0,
      isAnyAncestorCollapsed: isAnyAncestorCollapsedProp,
      children,
      className,
      ...rest
    }: RowProps,
    ref: React.Ref<any>,
  ) => {
    const {
      state: { data, columnInfo, hasNestedRows, hasRowSpan },
      dispatch: tableDispatch,
    } = useTableContext();

    const indexRef = useRef(idAllocator.generate());
    const [isExpanded, setIsExpanded] = useState(expanded);
    const nodeRef = useRef(null);

    useEffect(() => {
      let shouldDispatchHasNestedRows = false;
      let shouldDispatchHasRowSpan = false;

      if (hasNestedRows && hasRowSpan) {
        return;
      }

      React.Children.forEach(children, child => {
        if (
          isComponentType(child, 'Row') &&
          !shouldDispatchHasNestedRows &&
          !hasNestedRows
        ) {
          shouldDispatchHasNestedRows = true;
        }

        if (
          isComponentType(child, 'Cell') &&
          child.props.rowSpan > 1 &&
          !hasRowSpan &&
          !shouldDispatchHasRowSpan
        ) {
          shouldDispatchHasRowSpan = true;
        }
      });

      if (
        shouldDispatchHasNestedRows &&
        hasNestedRows !== shouldDispatchHasNestedRows
      ) {
        tableDispatch({
          type: TableActionTypes.SetHasNestedRows,
          payload: true,
        });
      }

      if (shouldDispatchHasRowSpan && hasRowSpan !== shouldDispatchHasRowSpan) {
        tableDispatch({
          type: TableActionTypes.SetHasRowSpan,
          payload: true,
        });
      }
    }, [children, hasNestedRows, hasRowSpan, tableDispatch, data]);

    const renderedChildren = React.useMemo(() => {
      const Icon = isExpanded ? ChevronDownIcon : ChevronRightIcon;
      const chevronButton = (
        <IconButton
          onClick={() => setIsExpanded(curr => !curr)}
          aria-label="chevron"
          className={iconButtonMargin}
        >
          <Icon aria-label="chevron" color={uiColors.gray.dark2} />
        </IconButton>
      );
      const renderedChildren: Array<React.ReactElement> = [];
      let hasNestedRow = false;

      React.Children.forEach(children, (child, index) => {
        if (isComponentType(child, 'Cell')) {
          if (!child.props.children) {
            return null;
          }

          renderedChildren.push(
            React.cloneElement(child, {
              children: <span>{child.props.children}</span>,
              key: `${indexRef.current}-${index}`,
              disabled: child.props.disabled || disabled,
            }),
          );
        }

        if (isComponentType(child, 'Row')) {
          hasNestedRow = true;
        }
      });

      if (hasNestedRow) {
        renderedChildren[0] = React.cloneElement(renderedChildren[0], {
          children: (
            <>
              {chevronButton}
              <span>{renderedChildren[0].props.children}</span>
            </>
          ),
          className: cx(displayFlex, className),
          key: `${indexRef.current}-${renderedChildren[0].props.children}`,
        });
      }

      return renderedChildren;
    }, [children, disabled, className, isExpanded, setIsExpanded]);

    const nestedRows = React.useMemo(() => {
      if (!isExpanded) {
        return null;
      }

      const nestedRows: Array<React.ReactElement> = [];

      React.Children.forEach(children, (child, index) => {
        if (child != null && isComponentType(child, 'Row')) {
          nestedRows.push(
            React.cloneElement(child, {
              ref: nodeRef,
              isAnyAncestorCollapsed: isAnyAncestorCollapsedProp || !isExpanded,
              indentLevel: indentLevel + 1,
              key: `${indexRef.current}-${indentLevel}-${index}`,
            }),
          );
        }
      });

      return nestedRows;
    }, [isAnyAncestorCollapsedProp, isExpanded, indentLevel, children]);

    // Depending on network speed, will noticeably render columns with incorrect
    // alignment, would rather wait for proper information before rendering
    if (!columnInfo) {
      return null;
    }

    const shouldAltRowColor = data && data.length >= 10 && !hasNestedRows;

    const alignmentStyles = Object.entries(
      columnInfo,
    ).map(([key, { dataType }]) => styleColumn(key, dataType));

    const rowClassName = cx(
      rowStyle,
      getIndentLevelStyle(indentLevel),
      [...alignmentStyles],
      {
        [altColor]: shouldAltRowColor,
        [disabledStyle]: disabled,
      },
      className,
    );

    const rowHasNestedRows = nestedRows && nestedRows?.length > 0;

    const ariaExpanded = rowHasNestedRows
      ? {
          ['aria-expanded']: isExpanded,
        }
      : undefined;

    return (
      <>
        <tr
          className={rowClassName}
          aria-disabled={disabled}
          ref={ref}
          key={indexRef.current}
          {...ariaExpanded}
          {...rest}
        >
          {renderedChildren}
        </tr>
        {nestedRows && nestedRows.length > 0 && (
          <Transition
            in={isExpanded && !isAnyAncestorCollapsedProp}
            timeout={150}
            nodeRef={nodeRef}
          >
            {(state: string) => {
              return (
                <>
                  {nestedRows.map(element =>
                    React.cloneElement(element, {
                      className: cx(transitionStyles.default, {
                        [transitionStyles.entered]: [
                          'entering',
                          'entered',
                        ].includes(state),
                      }),
                    }),
                  )}
                </>
              );
            }}
          </Transition>
        )}
      </>
    );
  },
);

Row.displayName = 'Row';

export default Row;
