import React, { useState, useEffect, useRef, useMemo } from 'react';
import useSSR from './useSSR';
import { Transition } from 'react-transition-group';
import IconButton from '@leafygreen-ui/icon-button';
import ChevronRightIcon from '@leafygreen-ui/icon/dist/ChevronRight';
import ChevronDownIcon from '@leafygreen-ui/icon/dist/ChevronDown';
import { isComponentType, HTMLElementProps } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { useTableContext, TableActionTypes, DataType } from './TableContext';
import { CellElement, tdInnerDiv } from './Cell';
import { useDarkModeContext } from './DarkModeContext';
import { TransitionStatus } from 'react-transition-group/Transition';

/**
 * Types & Constants
 */
const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

const transitionTime = 200;

/**
 * Styles
 */
const iconButtonMargin = css`
  margin-right: 4px;
  margin-left: -8px;
`;

const modeStyles = {
  [Mode.Light]: {
    rowStyle: css`
      --lg-table-row-border-color: ${uiColors.gray.light2};
      color: ${uiColors.gray.dark2};
    `,

    altColor: css`
      &:nth-of-type(even) {
        background-color: ${uiColors.gray.light3};
      }
    `,

    disabledStyle: css`
      background-color: ${uiColors.gray.light2};
      color: ${uiColors.gray.base};
      cursor: not-allowed;
      border-top: 1px solid ${uiColors.gray.light1};
      border-bottom: 1px solid ${uiColors.gray.light1};
    `,
  },

  [Mode.Dark]: {
    rowStyle: css`
      --lg-table-row-border-color: ${uiColors.gray.dark1};
      background-color: ${uiColors.gray.dark3};
      color: ${uiColors.gray.light3};
    `,

    altColor: css`
      &:nth-of-type(even) {
        background-color: ${uiColors.gray.dark2};
      }
    `,

    disabledStyle: css`
      background-color: ${uiColors.gray.dark1};
      color: ${uiColors.gray.base};
      cursor: not-allowed;
      border-top: 1px solid ${uiColors.gray.base};
      border-bottom: 1px solid ${uiColors.gray.base};
    `,
  },
};

const rowStyle = css`
  --lg-min-cell-height: 40px;
  border-top: 1px solid var(--lg-table-row-border-color);

  & > td > ${tdInnerDiv.selector} {
    min-height: var(--lg-min-cell-height);
    max-height: unset;
  }
`;

const hideRow = css`
  opacity: 0;
`;

const nestedRowInitialStyle = css`
  transform-origin: 50% 0%;
  border-color: var(--lg-table-row-border-color);
  opacity: 0;
  transition: ${transitionTime}ms ease-in-out;
  transition-property: border-color, opacity;

  & > td {
    transition: ${transitionTime}ms ease-in-out;
    transition-property: padding-block;

    & > ${tdInnerDiv.selector} {
      overflow: hidden;
      transition: ${transitionTime}ms ease-in-out;
      transition-property: min-height, max-height;
    }
  }
`;

const hiddenRowStyles = css`
  opacity: 0;
  border-color: transparent;

  & > td {
    padding-block: 0;

    & > ${tdInnerDiv.selector} {
      min-height: 0px;
      max-height: 0px;
    }
  }
`;

const transitionStyles = (state: TransitionStatus, height?: number): string => {
  switch (state) {
    case 'entered':
      return css`
        opacity: 1;
        & > td {
          padding-block: 8px;

          & > ${tdInnerDiv.selector} {
            min-height: var(--lg-min-cell-height);
            max-height: max(var(--lg-min-cell-height), ${height}px);
          }
        }
      `;
    default:
      return hiddenRowStyles;
  }
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

interface RowProps extends HTMLElementProps<'tr', HTMLTableRowElement> {
  expanded?: boolean;
  disabled?: boolean;
  indentLevel?: number;
  isAnyAncestorCollapsed?: boolean;
}

type RowElement = React.ReactComponentElement<
  typeof Row,
  React.ComponentPropsWithRef<typeof Row>
>;

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
    const { isBrowser } = useSSR();
    const {
      state: { data, columnInfo, hasNestedRows, hasRowSpan },
      dispatch: tableDispatch,
    } = useTableContext();
    const darkMode = useDarkModeContext();
    const mode = darkMode ? Mode.Dark : Mode.Light;

    const indexRef = useRef(useIdAllocator({ prefix: 'row' }));
    const [isExpanded, setIsExpanded] = useState(expanded);
    const nestedRowNodeRef = useRef<HTMLTableRowElement>(null);

    const [nestedRowHeight, setNestedRowHeight] = useState(0);
    useEffect(() => {
      if (nestedRowNodeRef && nestedRowNodeRef.current) {
        const innerSpan: HTMLSpanElement | null = nestedRowNodeRef.current.querySelector(
          `${tdInnerDiv.selector} > span`,
        );

        if (innerSpan && innerSpan.offsetHeight) {
          setNestedRowHeight(innerSpan.offsetHeight);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nestedRowNodeRef.current, isExpanded]);

    useEffect(() => {
      let shouldDispatchHasNestedRows = false;
      let shouldDispatchHasRowSpan = false;

      if (hasNestedRows && hasRowSpan) {
        return;
      }

      React.Children.forEach(children, child => {
        if (
          isComponentType<RowElement>(child, 'Row') &&
          !shouldDispatchHasNestedRows &&
          !hasNestedRows
        ) {
          shouldDispatchHasNestedRows = true;
        }

        if (
          isComponentType<CellElement>(child, 'Cell') &&
          child.props.rowSpan &&
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

    // Render any nested rows and their transition group
    const { rowHasNestedRows, renderedTransitionGroup } = useMemo(() => {
      const renderedNestedRows: Array<React.ReactElement> = [];
      const rowHasNestedRows = React.Children.toArray(children).some(child =>
        isComponentType<RowElement>(child, 'Row'),
      );

      const shouldTransitionGroupBeVisible =
        isExpanded && !isAnyAncestorCollapsedProp;

      // We don't need the transition group except on the client here, and rendering this bit on the server breaks rendering these rows.
      const renderedTransitionGroup = isBrowser ? (
        <Transition
          in={shouldTransitionGroupBeVisible}
          timeout={{
            enter: 0,
            exit: transitionTime,
          }}
          nodeRef={nestedRowNodeRef}
        >
          {state =>
            React.Children.map(children, (child, index) => {
              if (child != null && isComponentType<RowElement>(child, 'Row')) {
                return React.cloneElement(child, {
                  ref: nestedRowNodeRef,
                  isAnyAncestorCollapsed:
                    isAnyAncestorCollapsedProp || !isExpanded,
                  indentLevel: indentLevel + 1,
                  key: `${indexRef.current}-${indentLevel}-${index}`,
                  className: cx(
                    nestedRowInitialStyle,
                    transitionStyles(state, nestedRowHeight),
                    `transition-${state}`,
                  ),
                });
              }
            })
          }
        </Transition>
      ) : (
        renderedNestedRows
      );

      return { rowHasNestedRows, renderedNestedRows, renderedTransitionGroup };
    }, [
      children,
      isExpanded,
      isAnyAncestorCollapsedProp,
      isBrowser,
      indentLevel,
      nestedRowHeight,
    ]);

    const renderedChildren = useMemo(() => {
      const renderedChildren: Array<React.ReactElement> = [];

      React.Children.forEach(children, (child, index) => {
        if (isComponentType<CellElement>(child, 'Cell')) {
          if (child.props.children == null) {
            return null;
          }

          renderedChildren.push(
            React.cloneElement(child, {
              children: <span>{child.props.children}</span>,
              key: `${indexRef.current}-${index}`,
            }),
          );
        }
      });

      if (rowHasNestedRows) {
        const Icon = isExpanded ? ChevronDownIcon : ChevronRightIcon;

        const chevronButton = (
          <IconButton
            onClick={() => setIsExpanded(curr => !curr)}
            aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
            aria-expanded={isExpanded}
            className={iconButtonMargin}
            darkMode={darkMode}
          >
            <Icon
              aria-hidden
              color={darkMode ? uiColors.gray.base : uiColors.gray.dark2}
            />
          </IconButton>
        );
        renderedChildren[0] = React.cloneElement(renderedChildren[0], {
          children: (
            <>
              {chevronButton}
              <span>{renderedChildren[0].props.children}</span>
            </>
          ),
          key: `${indexRef.current}-${renderedChildren[0].props.children}`,
        });
      }

      return renderedChildren;
    }, [children, rowHasNestedRows, isExpanded, setIsExpanded, darkMode]);

    const shouldAltRowColor =
      data && data.length >= 10 && hasNestedRows != null && !hasNestedRows;

    const alignmentStyles = columnInfo
      ? Object.entries(columnInfo).map(([key, { dataType }]) =>
          styleColumn(key, dataType),
        )
      : [''];

    const rowClassName = cx(
      rowStyle,
      modeStyles[mode].rowStyle,
      getIndentLevelStyle(indentLevel),
      [...alignmentStyles],
      {
        // Hide the row until we can apply correct alignment to cells.
        [hideRow]: !columnInfo,
        [modeStyles[mode].altColor]: shouldAltRowColor,
        [modeStyles[mode].disabledStyle]: disabled,
      },
      className,
    );

    return (
      <>
        <tr
          role="row"
          className={rowClassName}
          aria-disabled={disabled}
          ref={ref}
          key={indexRef.current}
          {...rest}
        >
          {renderedChildren}
        </tr>

        {renderedTransitionGroup}
      </>
    );
  },
);

Row.displayName = 'Row';

export default Row;
