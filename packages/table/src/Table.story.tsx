import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { Table, Row, Cell, TableHeader, HeaderRow, DataType } from '.';
import { defaultData, testHeavierDataSet, multiRowData } from './fixtures';
import { uiColors } from '@leafygreen-ui/palette';

storiesOf('Table', module)
  .add('Default', () => {
    const withHeaders = boolean('Use Headers', false);
    const darkMode = boolean('darkMode', false);
    const baseFontSize = select('Base Font Size', [14, 16], 14);

    return (
      <div
        className={css`
          padding: 20px;
          background-color: ${darkMode ? uiColors.gray.dark3 : 'transparent'};
        `}
      >
        <Table
          baseFontSize={baseFontSize}
          darkMode={darkMode}
          data={testHeavierDataSet}
          columns={
            <>
              <TableHeader
                dataType={DataType.String}
                label="Name"
                key="name"
                sortBy="name"
              />

              <TableHeader
                dataType={DataType.Number}
                label="Age"
                key="age"
                sortBy={(data: typeof testHeavierDataSet[0]) =>
                  data.age.toString()
                }
              />

              <TableHeader
                dataType={DataType.String}
                label="Favorite Color"
                key="color"
                sortBy={(data: typeof testHeavierDataSet[0]) => data.color}
              />

              <TableHeader
                dataType={DataType.String}
                label="Location"
                key="location"
                sortBy={(data: typeof testHeavierDataSet[0]) => data.location}
              />
            </>
          }
        >
          {({ datum }) => (
            <Row key={datum.name} disabled={datum.name === 'Charlotte'}>
              <Cell isHeader={withHeaders}>{datum.name}</Cell>
              <Cell>{datum.age}</Cell>
              <Cell>{datum.color}</Cell>
              <Cell>{datum.location}</Cell>

              {datum.age > 21 && (
                <Row>
                  <Cell isHeader={withHeaders}>
                    expanded name: {datum.name}
                  </Cell>
                  <Cell>expanded age: {datum.age}</Cell>
                  <Cell>expanded color: {datum.color}</Cell>
                  <Cell>{datum.location}</Cell>

                  {datum.age > 25 && (
                    <Row>
                      <Cell isHeader={withHeaders}>
                        expanded name: {datum.name}
                      </Cell>
                      <Cell>expanded age: {datum.age}</Cell>
                      <Cell>expanded color: {datum.color}</Cell>
                      <Cell>{datum.location}</Cell>
                    </Row>
                  )}
                </Row>
              )}
            </Row>
          )}
        </Table>
      </div>
    );
  })
  .add('Multi-row Header', () => {
    const darkMode = boolean('darkMode', false);
    return (
      <div
        className={css`
          padding: 20px;
          background-color: ${darkMode ? uiColors.gray.dark3 : 'transparent'};
        `}
      >
        <Table
          darkMode={darkMode}
          data={multiRowData}
          columns={[
            <HeaderRow key="1">
              <TableHeader
                key="icecreamshoppe"
                colSpan={3}
                label="Ice Cream Shoppe"
              />
            </HeaderRow>,
            <HeaderRow key="2">
              <TableHeader key="flavor" label="Flavor" />
              <TableHeader key="price" label="Price" />
            </HeaderRow>,
          ]}
        >
          {({ datum }) => (
            <Row>
              <Cell rowSpan={datum.flavor === 'Funfetti' ? 2 : 1}>
                {datum.flavor}
              </Cell>
              <Cell>{datum.price}</Cell>
            </Row>
          )}
        </Table>
      </div>
    );
  })
  .add('No nested Rows', () => {
    const darkMode = boolean('darkMode', false);
    return (
      <div
        className={css`
          padding: 20px;
          background-color: ${darkMode ? uiColors.gray.dark3 : 'transparent'};
        `}
      >
        <Table
          darkMode={darkMode}
          data={defaultData}
          columns={
            <HeaderRow>
              <TableHeader key="name" label="Name" dataType="string" />
              <TableHeader key="age" label="Age" dataType="number" />
              <TableHeader
                label="Color"
                sortBy={(datum: typeof defaultData[0]) => datum.color}
                dataType="string"
                key="color"
              />
              <TableHeader key="location" label="Location" />
            </HeaderRow>
          }
        >
          {({ datum }) => (
            <Row key={datum.name} disabled={datum.name === 'Charlotte'}>
              <Cell>{datum.name}</Cell>
              <Cell>{datum.age}</Cell>
              <Cell>{datum.color}</Cell>
              <Cell>{datum.location}</Cell>
            </Row>
          )}
        </Table>
      </div>
    );
  })
  .add('When table is too big for its container', () => {
    const darkMode = boolean('darkMode', false);
    return (
      <div
        className={css`
          padding: 20px;
          background-color: ${darkMode ? uiColors.gray.dark3 : 'transparent'};
        `}
      >
        <Table
          darkMode={darkMode}
          data={defaultData}
          columns={
            <HeaderRow>
              <TableHeader key="name" label="Name" dataType="string" />
              <TableHeader key="age" label="Age" dataType="number" />
              <TableHeader label="Color" dataType="string" key="color" />
              <TableHeader key="location" label="Location" />
            </HeaderRow>
          }
        >
          {({ datum }) => (
            <Row key={datum.name} disabled={datum.name === 'Charlotte'}>
              <Cell>{datum.name}</Cell>
              <Cell>{datum.age}</Cell>
              <Cell>{datum.color}</Cell>
              <Cell>{datum.location}</Cell>
            </Row>
          )}
        </Table>
      </div>
    );
  });
