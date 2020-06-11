import React, { useState } from 'react';
import { Transition } from 'react-transition-group';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { isComponentType } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import CheckboxCell from './CheckboxCell';
import { useTableContext, Types, DataType } from './table-context';

const rowStyle = css`
  cursor: pointer;
  border-bottom: 1px solid ${uiColors.gray.light2};
  color: ${uiColors.gray.dark2};

  & > td > div {
    height: 40px;
    overflow: hidden;
    transition: all 150ms ease-in-out;
  }
`;

const rowHoverStyle = css`
  &:hover {
    background-color: #ffffff;
    box-shadow: 0 1px 3px 0 #b8c4c2;
  }
`;

const altColor = css`
  &:nth-of-type(even) {
    background-color: ${uiColors.gray.light3};

    &:hover {
      border: 1px solid #e7eeec;
    }
  }
`;

const iconButtonMargin = css`
  margin-right: 4px;
`;

const stickyCell = css`
  position: sticky;
`;

const disabledStyle = css`
  background-color: ${uiColors.gray.light2};
  color: ${uiColors.gray.base};
  pointer-events: none;
  border-bottom: 1px solid ${uiColors.gray.light1};
`;

const disabledCell = css`
  border-top: 1px solid ${uiColors.gray.light1};
`;

const displayFlex = css`
  display: flex;
  align-items: center;
  padding: 2px;
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
  right: [DataType.NominalNumber, DataType.Quantity],
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

interface RowProps extends React.ComponentPropsWithoutRef<'tr'> {
  expanded?: boolean;
  disabled?: boolean;
  indentLevel?: number;
}

const Row = React.forwardRef(
  (
    {
      expanded = false,
      disabled = false,
      children,
      className,
      indentLevel = 0,
      ...rest
    }: RowProps,
    ref: React.Ref<any>,
  ) => {
    const {
      state: { data, columnInfo, hasNestedRows, hasRowSpan, selectable },
      dispatch,
    } = useTableContext();

    const indexRef = React.useRef(Math.floor(Math.random() * 1000000 + 1));

    const [isExpanded, setIsExpanded] = useState(expanded);
    const nodeRef = React.useRef(null);
    let hasSeenFirstCell = false;

    React.useEffect(() => {
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

    const nestedRows = React.Children.map(children, child => {
      if (isComponentType(child, 'Row')) {
        return React.cloneElement(child, {
          indentLevel: indentLevel + 1,
          ref: nodeRef,
        });
      }
    });

    const renderedChildren = React.Children.map(children, (child, index) => {
      const isSticky = columnInfo?.[index]?.sticky;
      const stickyStyle = { [stickyCell]: isSticky };

      if (isComponentType(child, 'CheckboxCell')) {
        if (disabled) {
          return React.cloneElement(child, {
            className: disabledCell,
            disabled,
          });
        } else {
          return child;
        }
      } else if (isComponentType(child, 'Cell')) {
        const { className, children } = child.props;

        if (disabled) {
          return React.cloneElement(child, {
            className: disabledCell,
            disabled,
          });
        } else {
          if (nestedRows && nestedRows.length > 0 && !hasSeenFirstCell) {
            hasSeenFirstCell = true;

            const rowChildren = Array.from(children);

            return React.cloneElement(child, {
              children: (
                <>
                  {chevronButton}
                  <span className={truncation}>{rowChildren}</span>
                </>
              ),
              className: cx(displayFlex, stickyStyle, className),
              key: children,
            });
          }

          if (!children) {
            return;
          }

          return React.cloneElement(child, {
            children: <span className={truncation}>{children}</span>,
            className: cx(stickyStyle, className),
          });
        }
      }
    });

    const shouldAltRowColor = data && data.length >= 10 && !hasNestedRows;

    const alignmentStyles = Object.entries(
      columnInfo,
    ).map(([key, { dataType }]) => styleColumn(key, dataType!));

    console.log(ref, nodeRef, nestedRows.length);

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
              [rowHoverStyle]: !hasRowSpan,
            },
            className,
          )}
          aria-disabled={disabled}
          ref={ref}
          {...rest}
        >
          {selectable && (
            <CheckboxCell
              index={indexRef.current}
              className={cx({ [disabledCell]: disabled })}
              disabled={disabled}
            />
          )}
          {renderedChildren}
        </tr>

        <Transition in={isExpanded} timeout={150} nodeRef={ref}>
          {(state: string) => {
            const props = {
              ['aria-expanded']: isExpanded ? 'true' : 'false',
              className: cx(transitionStyles.default, {
                [transitionStyles.entered]: ['entering', 'entered'].includes(
                  state,
                ),
              }),
            };
            return (
              <>
                {nestedRows?.map(element => React.cloneElement(element, props))}
              </>
            );
          }}
        </Transition>
      </>
    );
  },
);

Row.displayName = 'Row';

export default Row;
