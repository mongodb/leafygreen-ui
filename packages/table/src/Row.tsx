import React, { useState, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { isComponentType } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import CheckboxCell from './CheckboxCell';
import { useTableContext, Types, DataType } from './TableContext';

const rowStyle = css`
  border-bottom: 1px solid ${uiColors.gray.light2};
  color: ${uiColors.gray.dark2};

  & > td > div {
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
  border-bottom: 1px solid ${uiColors.gray.light1};
`;

const disabledCell = css`
  border-top: 1px solid ${uiColors.gray.light1};
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
    border-bottom-color: transparent;

    & > td {
      padding-top: 0px;
      padding-bottom: 0px;
    }

    & > td > div {
      max-height: 0;
    }
  `,

  entered: css`
    border-bottom-color: ${uiColors.gray.light2};

    & > td > div {
      max-height: 40px;
    }
  `,
};

const styleMap = {
  left: [DataType.String, DataType.Weight, DataType.ZipCode, DataType.Date],
  right: [DataType.Number, DataType.Quantity],
};

function styleColumn(index: string, dataType: DataType) {
  let justify = '';

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

function getIndentLevelStyle(indentLevel: number) {
  return css`
    & > td:nth-child(2) {
      padding-left: ${8 + indentLevel * 16}px;
    }
  `;
}

function generateIndexRef() {
  return Math.floor(Math.random() * 1000000 + 1);
}

interface RowProps extends React.ComponentPropsWithoutRef<'tr'> {
  expanded?: boolean;
  disabled?: boolean;
  indentLevel?: number;
  isParentExpanded?: boolean;
}

const Row = React.forwardRef(
  (
    {
      expanded = false,
      disabled = false,
      children,
      className,
      indentLevel = 0,
      isParentExpanded = true,
      ...rest
    }: RowProps,
    ref: React.Ref<any>,
  ) => {
    const {
      state: {
        data,
        columnInfo,
        hasNestedRows,
        hasRowSpan,
        selectable,
        rowCheckedState,
      },
      dispatch,
    } = useTableContext();

    const indexRef = React.useRef(generateIndexRef());

    const [isExpanded, setIsExpanded] = useState(expanded);
    const nodeRef = React.useRef(null);
    let hasSeenFirstCell = false;

    useEffect(() => {
      dispatch({
        type: Types.RegisterRow,
        payload: {
          index: indexRef.current,
          checked: false,
          disabled: disabled,
        },
      });
    }, []);

    useEffect(() => {
      let hasDispatchedHasNestedRows = false;
      let hasDispatchedHasRowSpan = false;

      React.Children.forEach(children, child => {
        if (
          isComponentType(child, 'Row') &&
          !hasDispatchedHasNestedRows &&
          !hasNestedRows
        ) {
          dispatch({
            type: Types.SetHasNestedRows,
            payload: true,
          });

          hasDispatchedHasNestedRows = true;
        }

        if (
          isComponentType(child, 'Cell') &&
          child.props.rowSpan > 1 &&
          !hasRowSpan &&
          !hasDispatchedHasRowSpan
        ) {
          dispatch({
            type: Types.SetHasRowSpan,
            payload: true,
          });

          hasDispatchedHasRowSpan = true;
        }
      });
    }, [children]);

    // Depending on network speed, will noticeably render columns with incorrect
    // alignment, would rather wait for proper information before rendering
    if (!columnInfo) {
      return null;
    }

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

    const checkboxProps = {
      onChange: () =>
        dispatch({
          type: Types.ToggleIndividualChecked,
          payload: {
            index: indexRef.current,
            checked: !rowCheckedState[indexRef.current].checked,
          },
        }),
      disabled,
      className: disabled ? disabledCell : '',
      checked: rowCheckedState[indexRef.current]?.checked || false,
    };

    const renderedChildren: Array<React.ReactNode> = [];
    const nestedRows: Array<React.ReactNode> = [];
    let firstCellIndex: number | undefined;

    React.Children.forEach(children, (child, index) => {
      if (isComponentType(child, 'Row')) {
        nestedRows.push(
          React.cloneElement(child, {
            ref: nodeRef,
            ['aria-expanded']: isExpanded ? 'true' : 'false',
            isParentExpanded: isExpanded,
            indentLevel: indentLevel + 1,
          }),
        );
      } else if (isComponentType(child, 'Cell')) {
        if (!hasSeenFirstCell) {
          hasSeenFirstCell = true;
          firstCellIndex = index;
        }

        if (!children) {
          return null;
        }

        if (disabled) {
          renderedChildren.push(
            React.cloneElement(child, {
              disabled,
              className: disabled ? disabledCell : '',
              key: `${indexRef.current}-${children}`,
            }),
          );
        } else {
          renderedChildren.push(
            React.cloneElement(child, {
              children: (
                <span className={truncation}>{child.props.children}</span>
              ),
              key: `${indexRef.current}-${child.props.children}`,
            }),
          );
        }
      }
    });

    if (nestedRows && nestedRows.length > 0) {
      renderedChildren[firstCellIndex] = React.cloneElement(
        renderedChildren[firstCellIndex],
        {
          children: (
            <>
              {chevronButton}
              <span className={truncation}>
                {renderedChildren[firstCellIndex].props.children}
              </span>
            </>
          ),
          className: cx(displayFlex, className),
          key: `${indexRef.current}-${renderedChildren[firstCellIndex].props.children}`,
        },
      );
    }

    const shouldAltRowColor = data && data.length >= 10 && !hasNestedRows;

    const alignmentStyles = Object.entries(
      columnInfo,
    ).map(([key, { dataType }]) => styleColumn(key, dataType!));

    return (
      <>
        <tr
          className={cx(
            rowStyle,
            getIndentLevelStyle(indentLevel),
            [...alignmentStyles],
            {
              [altColor]: shouldAltRowColor,
              [disabledStyle]: disabled,
            },
            className,
          )}
          aria-disabled={disabled}
          ref={ref}
          key={indexRef.current}
          {...rest}
        >
          {selectable && <CheckboxCell {...checkboxProps} />}
          {renderedChildren}
        </tr>

        {nestedRows && (
          <Transition
            in={isExpanded && isParentExpanded}
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
