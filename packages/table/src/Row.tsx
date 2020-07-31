import React, { useState, useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { isComponentType } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import CheckboxCell from './CheckboxCell';
import { useTableContext, TableTypes, DataType } from './TableContext';
import { tdInnerDiv } from './Cell';

const rowStyle = css`
  border-top: 1px solid ${uiColors.gray.light2};
  color: ${uiColors.gray.dark2};

  & > td > ${tdInnerDiv.selector} {
    height: 40px;
    overflow: hidden;
    transition: all 150ms ease-in-out;
  }
`;

const altColor = css`
  &:nth-of-type(even) {
    background-color: ${uiColors.gray.light3};
  }
`;

const iconButtonMargin = css`
  margin-right: 4px;
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

const truncation = css`
  max-width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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
      max-height: 40px;
    }
  `,
};

const styleMap = {
  left: [DataType.String, DataType.Weight, DataType.ZipCode, DataType.Date],
  right: [DataType.Number],
} as const;

function styleColumn(index: string, dataType: DataType) {
  let justify;

  if (styleMap.left.includes(dataType)) {
    justify = 'flex-start';
  } else if (styleMap.right.includes(dataType)) {
    justify = 'flex-end';
  }

  return css`
    & td:nth-child(${index}) > div {
      justify-content: ${justify};
    }
  `;
}

function getIndentLevelStyle(indentLevel: number, selectable = false) {
  return css`
    & > td:nth-child(${selectable ? 2 : 1}) {
      padding-left: ${8 + indentLevel * 16}px;
    }
  `;
}

function generateIndexRef() {
  return Math.random().toString(36).substring(2);
}

interface RowProps extends React.ComponentPropsWithoutRef<'tr'> {
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
      state: { data, columnInfo, hasNestedRows, hasRowSpan, selectable },
      dispatch: tableDispatch,
    } = useTableContext();

    const indexRef = useRef(generateIndexRef());
    const [isExpanded, setIsExpanded] = useState(expanded);
    const nodeRef = useRef(null);

    useEffect(() => {
      let shouldDispatchHasNestedRows = false;
      let shouldDispatchHasRowSpan = false;

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

      if (shouldDispatchHasNestedRows) {
        tableDispatch({
          type: TableTypes.SetHasNestedRows,
          payload: true,
        });
      }

      if (shouldDispatchHasRowSpan) {
        tableDispatch({
          type: TableTypes.SetHasRowSpan,
          payload: true,
        });
      }
    }, [children, hasNestedRows, hasRowSpan, tableDispatch]);

    // Iterating over children twice because generated memoized values have different dependants
    const renderedChildren = React.useMemo(() => {
      const chevronButton = (
        <IconButton
          onClick={() => setIsExpanded(curr => !curr)}
          aria-label="chevron"
          className={iconButtonMargin}
        >
          <Icon
            aria-label="chevron"
            glyph={isExpanded ? 'ChevronDown' : 'ChevronRight'}
            color={uiColors.gray.dark2}
          />
        </IconButton>
      );
      const renderedChildren: Array<React.ReactElement> = [];
      let hasSeenRow = false;

      React.Children.forEach(children, (child, index) => {
        if (isComponentType(child, 'Cell')) {
          if (!child.props.children) {
            return null;
          }

          renderedChildren.push(
            React.cloneElement(child, {
              children: (
                <span className={truncation}>{child.props.children}</span>
              ),
              key: `${indexRef.current}-${index}`,
              disabled: child.props.disabled || disabled,
            }),
          );
        } else {
          if (isComponentType(child, 'Row')) {
            hasSeenRow = true;
          }
        }
      });

      if (hasSeenRow) {
        renderedChildren[0] = React.cloneElement(renderedChildren[0], {
          children: (
            <>
              {chevronButton}
              <span className={truncation}>
                {renderedChildren[0].props.children}
              </span>
            </>
          ),
          className: cx(displayFlex, className),
          key: `${indexRef.current}-${renderedChildren[0].props.children}`,
        });
      }

      return renderedChildren;
    }, [children, disabled, className, isExpanded, setIsExpanded]);

    // Iterating over children twice because generated memoized values have different dependants
    const nestedRows = React.useMemo(() => {
      let hasSeenFirstCell = false;
      const nestedRows: Array<React.ReactElement> = [];

      React.Children.forEach(children, (child, index) => {
        if (isComponentType(child, 'Cell') && !hasSeenFirstCell) {
          hasSeenFirstCell = true;
        }

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
    ).map(([key, { dataType }]) => styleColumn(key, dataType!));

    const rowClassName = cx(
      rowStyle,
      getIndentLevelStyle(indentLevel, selectable),
      [...alignmentStyles],
      {
        [altColor]: shouldAltRowColor,
        [disabledStyle]: disabled,
      },
      className,
    );

    const ariaExpanded =
      nestedRows.length > 0
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
          {selectable && (
            <CheckboxCell disabled={disabled} index={indexRef.current} />
          )}
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
                  {nestedRows?.map(element =>
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
