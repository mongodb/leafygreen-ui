import React, { useState } from 'react';
import { Transition } from 'react-transition-group';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { isComponentType } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import CheckboxCell from './CheckboxCell';
import { coerceArray } from './utils';
import { useTableContext } from './Context';

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
    & > td {
      padding: 0px;
    }

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
}

const Row = React.forwardRef(
  (
    { expanded = false, disabled = false, children, className }: RowProps,
    ref: React.Ref<any>,
  ) => {
    const { state } = useTableContext();
    const { data, stickyColumns, selectable, mainCheckState } = state;

    const [isExpanded, setIsExpanded] = useState(expanded);
    const nodeRef = React.useRef(null);
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
          aria-label="chevron"
          glyph={isExpanded ? 'ChevronDown' : 'ChevronRight'}
          color={uiColors.gray.dark2}
        />
      </IconButton>
    );

    const nestedRows = React.Children.map(children, child => {
      if (isComponentType(child, 'Row')) {
        const selectCell = <CheckboxCell checked={mainCheckState} />;

        return React.cloneElement(child, {
          selectable,
          children: [selectCell, ...coerceArray(child.props.children)],
          ref: nodeRef,
        });
      }
    });

    const renderedChildren = React.Children.map(children, (child, index) => {
      const isSticky = stickyColumns.indexOf(index) !== -1;
      const stickyStyle = { [stickyCell]: isSticky };

      if (isComponentType(child, 'CheckboxCell')) {
        if (disabled) {
          return React.cloneElement(child, {
            className: disabledCell,
            disabled,
          });
        }

        return child;
      }

      if (isComponentType(child, 'Cell')) {
        const { className, children } = child.props;

        if (disabled) {
          return React.cloneElement(child, {
            className: disabledCell,
            disabled,
          });
        }

        if (nestedRows && nestedRows.length > 0 && !hasSeenFirstCell) {
          hasSeenFirstCell = true;
          const rowChildren = coerceArray(children);

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

        return React.cloneElement(child, {
          children: <span className={truncation}>{child.props.children}</span>,
          className: cx(stickyStyle, className),
        });
      }
    });

    const shouldAltRowColor = data.length >= 10 && !nestedRows;

    return (
      <>
        <tr
          className={cx(
            rowStyle,
            {
              [altColor]: shouldAltRowColor,
              [disabledStyle]: disabled,
            },
            className,
          )}
          aria-disabled={disabled}
        >
          {renderedChildren}
        </tr>

        <Transition in={isExpanded} timeout={150} nodeRef={ref}>
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
  },
);

Row.displayName = 'Row';

export default Row;
