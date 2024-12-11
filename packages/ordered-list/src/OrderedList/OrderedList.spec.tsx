import React from 'react';
import { render, screen } from '@testing-library/react';

import { ListItem } from '../ListItem';

import { OrderedList } from './OrderedList';

const renderOL = () => {
  return render(
    <OrderedList>
      <ListItem title="Title" description="Description" />
      <ListItem title="Title" description="Description" />
      <ListItem title="Title" description="Description" />
    </OrderedList>,
  );
};

describe('packages/typography/ordered-list', () => {
  describe('OrderedList', () => {
    test('renders an ordered list', () => {
      renderOL();

      const ol = screen.getByRole('list');
      expect(ol).toBeInTheDocument();
    });

    test('renders list items', () => {
      renderOL();

      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(3);
    });

    test('renders list items with titles', () => {
      renderOL();

      const titles = screen.getAllByText('Title');
      expect(titles).toHaveLength(3);
    });

    test('renders list items with descriptions', () => {
      renderOL();

      const descriptions = screen.getAllByText('Description');
      expect(descriptions).toHaveLength(3);
    });

    test('renders list items with step numbers', () => {
      renderOL();

      const steps = screen.getAllByRole('listitem');
      steps.forEach((step, index) => {
        expect(step).toHaveTextContent(`${index + 1}`);
      });
    });

    test('renders list items with step numbers in order', () => {
      renderOL();

      const steps = screen.getAllByRole('listitem');
      steps.forEach((step, index) => {
        expect(step).toHaveTextContent(`${index + 1}`);
      });
    });
  });
});
