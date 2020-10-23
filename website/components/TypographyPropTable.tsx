import React from 'react';
import { css } from 'emotion';
import { Subtitle, InlineCode } from '@leafygreen-ui/typography';
import { Table, TableHeader, Row, Cell } from '@leafygreen-ui/table';

const subtTitleBottomMargin = css`
  margin-bottom: 24px;
`;

const tableBottomMargin = css`
  margin-bottom: 56px;
`;

const typeData = [
  { component: 'H1', root: 'h1' },
  { component: 'H2', root: 'h2' },
  { component: 'H3', root: 'h3' },
  { component: 'Subtitle', root: 'h6' },
  { component: 'Body', root: 'p' },
  { component: 'InlineCode', root: 'code' },
  { component: 'InlineKeyCode', root: 'code' },
  { component: 'Disclaimer', root: 'small' },
  { component: 'Overline', root: 'p' },
  { component: 'Link', root: 'a' },
];

function TypographyPropTable() {
  return (
    <div>
      <Subtitle className={subtTitleBottomMargin}>
        All props extend the <InlineCode>HTMLElementProps</InlineCode> of their
        root tag
      </Subtitle>
      <Table
        data={typeData}
        columns={[
          <TableHeader label="Component" key="comp" />,
          <TableHeader label="Root" key="root" />,
        ]}
        className={tableBottomMargin}
      >
        {({ datum }) => (
          <Row>
            <Cell>{datum.component}</Cell>
            <Cell>
              <InlineCode>{datum.root}</InlineCode>
            </Cell>
          </Row>
        )}
      </Table>
    </div>
  );
}

TypographyPropTable.displayName = 'TypographyPropTable';

export default TypographyPropTable;
