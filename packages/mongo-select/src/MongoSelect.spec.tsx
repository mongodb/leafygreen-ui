import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import MongoSelect, { Variant } from './MongoSelect';

afterAll(cleanup);

describe('packages/org-select', () => {
  const data = [
    { name: 'GlobalWork', product: 'Atlas' },
    { name: 'LocalWork', product: 'Atlas' },
    { name: 'Pizza on Demand', product: 'Atlas' },
    { name: 'YouWork', product: 'Atlas' },
    { name: 'YouWork Enterprise', product: 'Cloud Manager' },
  ];

  const selected = 'YouWork';
  const onClick = jest.fn();

  const { getByText, getByPlaceholderText, getByTitle } = render(
    <MongoSelect
      selected={selected}
      data={data}
      onClick={onClick}
      variant={Variant.Organization}
    />,
  );

  test('by default, selected organization is rendered', () => {
    const selectedOrg = getByText(selected);
    expect(selectedOrg).toBeInTheDocument();
  });

  test('clicking selected organization opens and closes the menu', () => {
    const selectedOrg = getByText(selected);
    fireEvent.click(selectedOrg);
    const input = getByPlaceholderText('Search for an organization...');
    expect(input).toBeInTheDocument();

    fireEvent.click(selectedOrg);
    expect(input).not.toBeVisible();
  });

  test('typing in the input field changes what data is displayed', () => {
    const caretDown = getByTitle('Caret Down Icon');
    fireEvent.click(caretDown);

    const input = getByPlaceholderText('Search for an organization...');
    expect(input).toBeInTheDocument();

    const pizza = getByText('Pizza on Demand');
    expect(pizza).toBeInTheDocument();

    const localWork = getByText('LocalWork');
    expect(localWork).toBeInTheDocument();

    fireEvent.change(input, {
      target: {
        value: 'work',
      },
    });

    expect(localWork).toBeInTheDocument();
    expect(pizza).not.toBeInTheDocument();
  });
});
