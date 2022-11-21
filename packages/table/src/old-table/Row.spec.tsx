import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from '@testing-library/react';
import { defaultData } from './fixtures';
import { renderTable } from './testUtils';

describe('packages/table/row', () => {
  test('it renders a table row', () => {
    renderTable();
    const row = screen.getAllByRole('row')[1];
    expect(row.tagName.toLowerCase()).toBe('tr');
  });

  test('it renders a row as disabled when the prop is set', () => {
    renderTable({
      row: { disabled: true },
    });
    const disabledRow = screen.getAllByRole('row')[1];
    expect(disabledRow.getAttribute('aria-disabled')).toBe('true');
  });

  test('it renders an expandable icon, when the row is expandable', () => {
    renderTable();
    const chevrons = screen.getAllByLabelText(/Expand row|Collapse row/);
    expect(chevrons.length).toBe(
      defaultData.filter(data => data.expandable).length,
    );
  });

  test('the expandable icon reveals a hidden row when clicked', () => {
    renderTable();

    const chevrons = screen.getAllByLabelText(/Expand row|Collapse row/);
    const chevron = chevrons[0];
    fireEvent.click(chevron);

    const expandedChevrons = chevrons.filter(
      chevron => chevron.getAttribute('aria-expanded') === 'true',
    );

    expect(expandedChevrons.length).toBe(1);
  });
});
