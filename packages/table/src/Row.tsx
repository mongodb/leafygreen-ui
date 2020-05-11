import React, { useState } from 'react';
import { Transition } from 'react-transition-group';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { isComponentType } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { useNumRows } from './NumRowsContext';
import CheckboxCell from './CheckboxCell';

const rowStyle = css`
  cursor: pointer;
  border-top: 1px solid ${uiColors.gray.light2};
  border-bottom: 1px solid ${uiColors.gray.light2};
  color: ${uiColors.gray.dark2};

  & > td > div {
    height: 40px;
    overflow: hidden;
    transition: all 500ms ease-in-out;
  }

  &:hover {
    background-color: #ffffff;
    box-shadow: 0 1px 3px 0 #b8c4c2;
  }
`;

const altColor = css`
  &:nth-child(even) {
    background-color: ${uiColors.gray.light3};

    &:hover {
      border: 1px solid #e7eeec;
    }
  }
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

const transitionStyles = {
  default: css`
    & > td > div {
      max-height: 0;
    }
  `,

  entered: css`
    & > td > div {
      max-height: 40px;
    }
  `,
};

interface RowProps extends React.ComponentPropsWithoutRef<'tr'> {
  expanded?: boolean;
  disabled?: boolean;
  selectable?: boolean;
}

function Row({
  expanded = false,
  disabled = false,
  children,
  className,
  selectable,
}: RowProps) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  let hasSeenFirstCell = false;

  const chevronButton = (
    <IconButton
      onClick={() => setIsExpanded(curr => !curr)}
      aria-label="chevron"
      className={css`
        margin-right: 4px;
      `}
    >
      <Icon
        glyph={isExpanded ? 'ChevronDown' : 'ChevronRight'}
        color={uiColors.gray.dark2}
      />
    </IconButton>
  );

  const nestedRows = React.Children.map(children, child => {
    if (isComponentType(child, 'Row')) {
      const selectCell = <CheckboxCell />;

      return React.cloneElement(child, {
        selectable,
        children: [
          selectCell,
          [
            ...(child.props?.children instanceof Array
              ? child.props.children
              : [child.props.children]),
          ],
        ],
      });
    }
  });

  const renderedChildren = React.Children.map(children, child => {
    if (
      isComponentType(child, 'Cell') ||
      isComponentType(child, 'CheckboxCell')
    ) {
      if (disabled) {
        return React.cloneElement(child, {
          className: disabledCell,
          disabled,
        });
      }

      if (isComponentType(child, 'CheckboxCell')) {
        return child;
      }

      if (nestedRows && nestedRows.length > 0 && !hasSeenFirstCell) {
        hasSeenFirstCell = true;

        const rowChildren = [
          ...(child.props?.children instanceof Array
            ? child.props.children
            : [child.props.children]),
        ];

        return React.cloneElement(child, {
          children: [chevronButton, ...rowChildren],
          className: displayFlex,
          key: child.props.children,
        });
      }

      return child;
    }
  });

  const shouldAltRowColor = useNumRows() >= 10 && !nestedRows;

  return (
    <>
      <tr
        className={cx(
          rowStyle,
          { [altColor]: shouldAltRowColor, [disabledStyle]: disabled },
          className,
        )}
        aria-disabled={disabled}
      >
        {renderedChildren}
      </tr>

      <Transition in={isExpanded} timeout={150} mountOnEnter unmountOnExit>
        {(state: string) => {
          const props = {
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
}

Row.displayName = 'Row';

export default Row;
