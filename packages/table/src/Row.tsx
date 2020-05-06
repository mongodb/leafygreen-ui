import React, { useState } from 'react';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { isComponentType } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { useNumRows } from './NumRowsContext';

const rowStyle = css`
  cursor: pointer;

  &:hover {
    border: 1px solid #e7eeec;
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

const displayFlex = css`
  display: flex;
  align-items: center;
  padding: 2px;
`;

interface RowProps extends React.ComponentPropsWithoutRef<'tr'> {
  expanded?: boolean;
}

function Row({ expanded = false, children }: RowProps) {
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
      <Icon glyph={isExpanded ? 'ChevronDown' : 'ChevronRight'} size="small" />
    </IconButton>
  );

  const nestedRows = React.Children.map(children, child => {
    if (isComponentType(child, 'Row')) {
      return child;
    }
  });

  const renderedChildren = React.Children.map(children, (child, index) => {
    if (isComponentType(child, 'Cell')) {
      if (nestedRows && nestedRows.length > 0 && !hasSeenFirstCell) {
        hasSeenFirstCell = true;
        return React.cloneElement(child, {
          children: [chevronButton, ...child?.props.children],
          className: displayFlex,
        });
      }

      return child;
    }
  });

  const shouldAltRowColor = useNumRows() >= 10 && !nestedRows;

  return (
    <>
      <tr className={cx(rowStyle, { [altColor]: shouldAltRowColor })}>
        {renderedChildren}
      </tr>

      {isExpanded && <>{nestedRows}</>}
    </>
  );
}

Row.displayName = 'Row';

export default Row;
