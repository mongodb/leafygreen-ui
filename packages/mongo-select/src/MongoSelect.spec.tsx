import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import MongoSelect, { Variant } from './MongoSelect';

afterAll(cleanup);
describe('packages/mongo-select', () => {
  describe('when variant is set to organization', () => {
    const data = [
      { name: 'GlobalWork', product: 'Atlas' },
      { name: 'LocalWork', product: 'Atlas' },
      { name: 'Pizza on Demand', product: 'Atlas' },
      { name: 'YouWork', product: 'Atlas' },
      { name: 'YouWork Enterprise', product: 'Cloud Manager' },
    ];

    const selected = 'YouWork';
    const onClick = jest.fn();

    const { getByText, getByPlaceholderText, getAllByTitle } = render(
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
      const input = getByPlaceholderText('Search for an Organization...');
      expect(input).toBeInTheDocument();

      fireEvent.click(selectedOrg);
      expect(input).not.toBeVisible();
    });

    test('typing in the input field changes what data is displayed', () => {
      const caretDown = getAllByTitle('Caret Down Icon')[0];
      fireEvent.click(caretDown);

      const input = getByPlaceholderText('Search for an Organization...');
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

    test('onClick is fired when organization is clicked', () => {
      const caretDown = getAllByTitle('Caret Down Icon')[0];
      fireEvent.click(caretDown);

      const localWork = getByText('LocalWork');
      fireEvent.click(localWork);

      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('when variant is set to project', () => {
    const onClick = jest.fn();
    const selectedProject = 'Core';
    const projectData = [
      { name: 'Core', details: { clusters: 2, apps: 1, dashboards: 4 } },
      { name: 'London', details: { dashboards: 20 } },
      { name: 'Madrid', details: { clusters: 30, apps: 1 } },
    ];

    const { getByText, getByPlaceholderText, getAllByTitle } = render(
      <MongoSelect
        variant={Variant.Project}
        selected={selectedProject}
        onClick={onClick}
        data={projectData}
      />,
    );

    test('by default, selected organization is rendered', () => {
      const selected = getByText(selectedProject);
      expect(selected).toBeInTheDocument();
    });

    test('clicking selected project opens and closes the menu', () => {
      const selected = getByText(selectedProject);
      fireEvent.click(selected);
      const input = getByPlaceholderText('Search for a Project...');
      expect(input).toBeInTheDocument();

      fireEvent.click(selected);
      expect(input).not.toBeVisible();
    });

    test('typing in the input field changes what data is displayed', () => {
      const caretDown = getAllByTitle('Caret Down Icon')[1];
      fireEvent.click(caretDown);

      const input = getByPlaceholderText('Search for a Project...');
      expect(input).toBeInTheDocument();

      const london = getByText('London');
      expect(london).toBeInTheDocument();

      const madrid = getByText('Madrid');
      expect(madrid).toBeInTheDocument();

      fireEvent.change(input, {
        target: {
          value: 'london',
        },
      });

      expect(london).toBeInTheDocument();
      expect(madrid).not.toBeInTheDocument();
    });

    test('onClick is fired when project is clicked', () => {
      const caretDown = getAllByTitle('Caret Down Icon')[1];
      fireEvent.click(caretDown);
      const london = getByText('London');
      fireEvent.click(london);

      expect(onClick).toHaveBeenCalled();
    });
  });
});
