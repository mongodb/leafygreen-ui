import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from '@testing-library/react';
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
    const chevrons = screen.getAllByRole('button', { name: 'chevron' });
    expect(chevrons.length).toBe(4);
  });

  test('the expandable icon reveals a hidden row when clicked', () => {
    renderTable();

    const chevron = screen.getAllByRole('button', { name: 'chevron' })[0];
    fireEvent.click(chevron);

    const revealedRow = screen
      .getAllByRole('row')
      .filter(row => row.getAttribute('aria-expanded') === 'true');

    expect(revealedRow.length).toBe(1);
  });
});
