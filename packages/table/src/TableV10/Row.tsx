import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

import { css, cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import ChevronDownIcon from '@leafygreen-ui/icon/dist/ChevronDown';
import ChevronRightIcon from '@leafygreen-ui/icon/dist/ChevronRight';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { HTMLElementProps, isComponentType, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import { CellElement, tdInnerDivClassName } from './Cell';
import NestedRow from './NestedRow';
import { DataType, TableActionTypes, useTableContext } from './TableContext';
import useSSR from './useSSR';

/**
 * Types & Constants
 */

const transitionTime = 200;

/**
 * Styles
 */
const iconButtonMargin = css`
  margin: -4px;
  margin-right: 4px;
`;

const iconButtonThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.base};
  `,
};

export const iconButtonThemeDisabledStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.light1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark1};
  `,
};

/**
 * @deprecated
 */
type StyledElements = 'rowStyle' | 'altColor' | 'disabledStyle';

const themeStyles: Record<Theme, Record<StyledElements, string>> = {
  [Theme.Light]: {
    rowStyle: css`
      background-color: ${palette.white};
      color: ${palette.gray.dark3};
    `,

    altColor: css`
      &:nth-of-type(even) {
        background-color: ${palette.gray.light3};
      }

      &:nth-of-type(odd) > th {
        background-color: ${palette.white};
      }
    `,

    disabledStyle: css`
      background-color: ${palette.gray.light2};
      color: ${palette.gray.base};
      border-top: 1px inset ${palette.gray.light1};
      border-bottom: 1px inset ${palette.gray.light1};
    `,
  },

  [Theme.Dark]: {
    rowStyle: css`
      background-color: ${palette.black};
      color: ${palette.gray.light2};
    `,

    altColor: css`
      &:nth-of-type(even) {
        background-color: ${palette.gray.dark4};
      }

      &:nth-of-type(odd) > th {
        background-color: ${palette.black};
      }
    `,

    disabledStyle: css`
      background-color: ${palette.gray.dark2};
      color: ${palette.gray.base};
    `,
  },
};

const rowStyle = css`
  --lg-cell-min-height: 20px;
  position: relative;
  z-index: 1;

  & > :is(td, th) > .${tdInnerDivClassName} {
    min-height: var(--lg-cell-min-height);
    max-height: unset;
  }
`;

const hideRow = css`
  opacity: 0;
`;

function styleColumn(index: string, dataType?: DataType) {
  let justify;

  if (dataType === DataType.Number) {
    justify = 'flex-end';
  } else {
    justify = 'flex-start';
  }

  return css`
    & :is(td, th):nth-child(${index}) > div {
      justify-content: ${justify};
    }
  `;
}

function getIndentLevelStyle(indentLevel: number) {
  const indentLevelMultiplier = 36;
  return css`
    & > :is(td, th):nth-child(1) {
      padding-left: ${8 + indentLevel * indentLevelMultiplier}px;
    }
  `;
}

/**
 * @deprecated
 * @noDocgen
 */
export interface RowProps
  extends React.PropsWithChildren<HTMLElementProps<'tr', HTMLTableRowElement>> {
  /**
   * Determines whether or not the row is expanded on first render
   */
  expanded?: boolean;
  /**
   * Determines whether or not the row is disabled
   */
  disabled?: boolean;
  /**
   * @internal
   */
  indentLevel?: number;
  /**
   * @internal
   */
  isAnyAncestorCollapsed?: boolean;
}

/**
 * @deprecated
 */
type RowElement = React.ReactComponentElement<
  typeof Row,
  React.ComponentPropsWithRef<typeof Row>
>;

/**
 * @deprecated
 */
const Row = forwardRef(
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
    ref: React.Ref<HTMLTableRowElement>,
  ) => {
    const { isBrowser } = useSSR();
    const {
      state: { data, columnInfo, hasNestedRows, hasRowSpan },
      dispatch: tableDispatch,
    } = useTableContext();
    const { theme, darkMode } = useDarkMode();

    const shouldAltRowColor =
      data && data.length >= 10 && hasNestedRows != null && !hasNestedRows;

    const indexRef = useRef(useIdAllocator({ prefix: 'row' }));
    const [isExpanded, setIsExpanded] = useState(expanded);
    const nestedRowParentRef = useRef<HTMLTableRowElement>(null);

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
    const { rowHasNestedRows, renderedNestedRowTransitionGroup } =
      useMemo(() => {
        const renderedNestedRows: Array<React.ReactElement> = [];
        const rowHasNestedRows = React.Children.toArray(children).some(child =>
          isComponentType<RowElement>(child, 'Row'),
        );

        const shouldTransitionGroupBeVisible =
          isExpanded && !isAnyAncestorCollapsedProp;

        // We don't need the transition group except on the client here, and rendering this bit on the server breaks rendering these rows.
        const renderedNestedRowTransitionGroup = isBrowser ? (
          <Transition
            in={shouldTransitionGroupBeVisible}
            timeout={{
              enter: 0,
              exit: transitionTime,
            }}
            nodeRef={nestedRowParentRef}
          >
            {state =>
              React.Children.map(children, (child, index) => {
                if (
                  child != null &&
                  isComponentType<RowElement>(child, 'Row')
                ) {
                  return (
                    <NestedRow
                      isAnyAncestorCollapsed={
                        isAnyAncestorCollapsedProp || !isExpanded
                      }
                      indentLevel={indentLevel + 1}
                      key={`${indexRef.current}-${indentLevel}-${index}`}
                      state={state}
                      {...child.props}
                    />
                  );
                }
              })
            }
          </Transition>
        ) : (
          renderedNestedRows
        );

        return {
          rowHasNestedRows,
          renderedNestedRows,
          renderedNestedRowTransitionGroup,
        };
      }, [
        children,
        isExpanded,
        isAnyAncestorCollapsedProp,
        isBrowser,
        indentLevel,
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
              isDisabled: disabled,
              isHeader: child.props.isHeader,
              ...child.props,
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
            className={cx(iconButtonMargin, iconButtonThemeStyles[theme], {
              [iconButtonThemeDisabledStyles[theme]]: disabled,
            })}
            darkMode={darkMode}
          >
            <Icon aria-hidden />
          </IconButton>
        );
        const { children: firstChildChildren, ...firstChildProps } =
          renderedChildren[0].props;
        renderedChildren[0] = React.cloneElement(renderedChildren[0], {
          children: (
            <>
              {chevronButton}
              <span>{firstChildChildren}</span>
            </>
          ),
          key: `${indexRef.current}-${renderedChildren[0].props.children}`,
          ...firstChildProps,
        });
      }

      return renderedChildren;
    }, [children, rowHasNestedRows, disabled, isExpanded, theme, darkMode]);

    const alignmentStyles = columnInfo
      ? Object.entries(columnInfo).map(([key, { dataType }]) =>
          styleColumn(key, dataType),
        )
      : [''];

    const rowClassName = cx(
      rowStyle,
      themeStyles[theme].rowStyle,
      getIndentLevelStyle(indentLevel),
      [...alignmentStyles],
      {
        // Hide the row until we can apply correct alignment to cells.
        [hideRow]: !columnInfo,
        [themeStyles[theme].altColor]: shouldAltRowColor,
        [themeStyles[theme].disabledStyle]: disabled,
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

        {renderedNestedRowTransitionGroup}
      </>
    );
  },
);

Row.displayName = 'Row';

export default Row;
