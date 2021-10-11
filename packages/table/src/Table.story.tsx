import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { Table, Row, Cell, TableHeader, HeaderRow, DataType } from '.';
import { defaultData, multiRowData } from './fixtures';
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
          width: 768px;
        `}
      >
        <Table
          baseFontSize={baseFontSize}
          darkMode={darkMode}
          data={defaultData}
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
                sortBy={(data: typeof defaultData[0]) => data.age.toString()}
              />

              <TableHeader
                dataType={DataType.String}
                label="Favorite Color"
                key="color"
                sortBy={(data: typeof defaultData[0]) => data.color}
              />

              <TableHeader
                dataType={DataType.String}
                label="Location"
                key="location"
                sortBy={(data: typeof defaultData[0]) => data.location}
              />
            </>
          }
        >
          {({ datum }) => (
            <Row key={datum.name} disabled={datum.disabled}>
              <Cell isHeader={withHeaders}>
                {datum.name} {datum.rand}
              </Cell>
              <Cell>{datum.age}</Cell>
              <Cell>{datum.color}</Cell>
              <Cell>{datum.location}</Cell>

              {datum.name === 'Donna' && (
                <Row>
                  <Cell isHeader={withHeaders} colSpan={4}>
                    Nulla vitae elit libero, a pharetra augue. Sed posuere
                    consectetur est at lobortis. Integer posuere erat a ante
                    venenatis dapibus posuere velit aliquet. Maecenas faucibus
                    mollis interdum. Nullam id dolor id nibh ultricies vehicula
                    ut id elit. Duis mollis, est non commodo luctus, nisi erat
                    porttitor ligula, eget lacinia odio sem nec elit. Cras justo
                    odio, dapibus ac facilisis in, egestas eget quam. Donec id
                    elit non mi porta gravida at eget metus. Donec id elit non
                    mi porta gravida at eget metus. Aenean lacinia bibendum
                    nulla sed consectetur. Vestibulum id ligula porta felis
                    euismod semper. Maecenas sed diam eget risus varius blandit
                    sit amet non magna. Etiam porta sem malesuada magna mollis
                    euismod. Donec ullamcorper nulla non metus auctor fringilla.
                    Donec id elit non mi porta gravida at eget metus.
                  </Cell>
                </Row>
              )}

              {datum.name !== 'Donna' && datum.expandable && (
                <Row>
                  <Cell isHeader={withHeaders}>
                    expanded name: {datum.name}
                  </Cell>
                  <Cell>expanded age: {datum.age}</Cell>
                  <Cell>expanded color: {datum.color}</Cell>
                  <Cell>{datum.location}</Cell>

                  {datum.age > 30 && (
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
