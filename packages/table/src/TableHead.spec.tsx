import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import { TableHeader, HeaderRow } from '.';
import { renderTable } from './testUtils';

describe('packages/table/table-head', () => {
  test('it renders "thead" tags', () => {
    renderTable();
    const tableHead = screen.getAllByRole('rowgroup')[0];
    expect(tableHead.tagName.toLowerCase()).toBe('thead');
  });

  test('it creates a HeaderRow when one is not supplied', () => {
    renderTable();
    const headerRow = screen.getAllByTestId('leafygreen-ui-header-row');
    expect(headerRow.length).toBe(1);
    expect(headerRow[0].tagName.toLowerCase()).toBe('tr');
  });

  test('it renders one HeaderRow when it is supplied', () => {
    renderTable({
      table: {
        columns: [
          <HeaderRow key="header-row">
            <TableHeader key="name" label="name" />
            <TableHeader key="age" label="age" />
            <TableHeader key="color" label="color" />
            <TableHeader key="location" label="location" />
          </HeaderRow>,
        ],
      },
    });
    const headerRow = screen.getAllByTestId('leafygreen-ui-header-row');
    expect(headerRow.length).toBe(1);
    expect(headerRow[0].tagName.toLowerCase()).toBe('tr');
  });

  test('it formats columns that are passed in as a React.Fragment', () => {
    renderTable({
      table: {
        columns: (
          <>
            <TableHeader key="name" label="name" />
            <TableHeader key="age" label="age" />
            <TableHeader key="color" label="color" />
            <TableHeader key="location" label="location" />
          </>
        ),
      },
    });
    const headerRow = screen.getAllByTestId('leafygreen-ui-header-row');
    expect(headerRow.length).toBe(1);
    expect(headerRow[0].tagName.toLowerCase()).toBe('tr');
  });

  test('it formats columns that are passed in as a HeaderRow', () => {
    renderTable({
      table: {
        columns: (
          <HeaderRow>
            <TableHeader key="name" label="name" />
            <TableHeader key="age" label="age" />
            <TableHeader key="color" label="color" />
            <TableHeader key="location" label="location" />
          </HeaderRow>
        ),
      },
    });
    const headerRow = screen.getAllByTestId('leafygreen-ui-header-row');
    expect(headerRow.length).toBe(1);
    expect(headerRow[0].tagName.toLowerCase()).toBe('tr');
  });

  test('by default, it does not render columns as sortable', () => {
    renderTable();
    const sortableIcons = screen.queryAllByTitle('sorted icon');
    expect(sortableIcons).toStrictEqual([]);
  });

  test('when the "sortBy" prop is passed to a column, an icon is rendered', () => {
    renderTable({
      table: {
        columns: [
          <TableHeader key="name" label="Name" sortBy={() => 'name'} />,
          <TableHeader key="age" label="Age" />,
          <TableHeader key="color" label="Color" />,
          <TableHeader key="location" label="Location" />,
        ],
      },
    });

    const sortButton = screen.getAllByRole('button', { name: 'sort' });
    expect(sortButton.length).toBe(1);
  });

  test('when the "compareFn" prop is passed to a column, an icon is rendered', () => {
    renderTable({
      table: {
        columns: [
          <TableHeader
            key="name"
            label="Name"
            compareFn={(a: any, b: any) => (b > a ? 1 : -1)}
          />,
          <TableHeader key="age" label="Age" />,
          <TableHeader key="color" label="Color" />,
          <TableHeader key="location" label="Location" />,
        ],
      },
    });

    const sortButton = screen.getAllByRole('button', { name: 'sort' });
    expect(sortButton.length).toBe(1);
  });

  test('when the `handleSort` prop is passed to a column, an icon is rendered', () => {
    renderTable({
      table: {
        columns: [
          <TableHeader
            key="name"
            label="Name"
            handleSort={dir => {
              // eslint-disable-next-line no-console
              console.log(dir);
            }}
          />,
          <TableHeader key="age" label="Age" />,
          <TableHeader key="color" label="Color" />,
          <TableHeader key="location" label="Location" />,
        ],
      },
    });

    const sortButton = screen.getAllByRole('button', { name: 'sort' });
    expect(sortButton.length).toBe(1);
  });

  test('it renders the correct number of "th" elements based on the "columns" prop', () => {
    renderTable();
    const tableHeaderRow = Array.from(screen.getAllByRole('row')[0].children);
    expect(tableHeaderRow.length).toBe(4);
    tableHeaderRow.map(tableHeader => {
      expect(tableHeader.tagName.toLowerCase()).toBe('th');
    });
  });
});
