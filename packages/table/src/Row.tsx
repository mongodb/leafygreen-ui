import React from 'react';
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

interface RowProps extends React.ComponentPropsWithoutRef<'tr'> {
  expanded?: boolean;
  setExpanded?: (state: boolean) => boolean;
}

function Row({ expanded, setExpanded, children }: RowProps) {
  // const [expandedRows, setExandedRows]
  let expandedRows = [];
  let indexes = [];

  const shouldAltRowColor = useNumRows() >= 10;

  const renderedChildren = React.Children.map(children, (child, index) => {
    // console.log(child.props.)
    if (child?.type?.displayName === 'Cell') {
      return child;
    } else if (child?.type?.displayName === 'Row') {
      // should be expandable
      // apply props to know if expanded
      // console.log(child);
      indexes.push(index - 1);
      expandedRows.push(child);
    }
  });

  console.log(indexes);

  return (
    <>
      <tr className={cx(rowStyle, { [altColor]: shouldAltRowColor })}>
        {renderedChildren}
      </tr>
      <>{expandedRows}</>
    </>
  );
}

Row.displayName = 'Row';

export default Row;
