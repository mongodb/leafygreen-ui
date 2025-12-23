import React from 'react';
import { getByText, waitFor } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import PaginationItemsPerPage from '.';

let offsetParentSpy: jest.SpyInstance;

beforeAll(() => {
  offsetParentSpy = jest.spyOn(HTMLElement.prototype, 'offsetParent', 'get');
  offsetParentSpy.mockImplementation(function (this: HTMLElement) {
    return this.parentElement;
  });
});

afterAll(() => {
  offsetParentSpy.mockRestore();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('PaginationItemsPerPage', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(
        <PaginationItemsPerPage
          itemsPerPageOptions={[10, 25, 50]}
          itemsPerPage={10}
          onItemsPerPageOptionChange={jest.fn()}
        />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    test('renders select when onItemsPerPageOptionChange is provided', () => {
      const { getByTestId, getByText } = render(
        <PaginationItemsPerPage
          itemsPerPageOptions={[10, 25, 50]}
          itemsPerPage={10}
          onItemsPerPageOptionChange={jest.fn()}
        />,
      );

      expect(getByText('Items per page:')).toBeInTheDocument();
      expect(
        getByTestId('leafygreen-ui-select-menubutton'),
      ).toBeInTheDocument();
    });

    test('does not render select when onItemsPerPageOptionChange is undefined', () => {
      const { queryByTestId, queryByText } = render(
        <PaginationItemsPerPage
          itemsPerPageOptions={[10, 25, 50]}
          itemsPerPage={10}
        />,
      );

      expect(queryByText('Items per page:')).not.toBeInTheDocument();
      expect(
        queryByTestId('leafygreen-ui-select-menubutton'),
      ).not.toBeInTheDocument();
    });

    test('renders default options when itemsPerPageOptions is not provided', async () => {
      const { getByTestId, queryByRole } = render(
        <PaginationItemsPerPage onItemsPerPageOptionChange={jest.fn()} />,
      );

      const selectButton = getByTestId('leafygreen-ui-select-menubutton');
      userEvent.click(selectButton);

      const listbox = await waitFor(() => {
        const listbox = queryByRole('listbox');
        expect(listbox).toBeVisible();
        return listbox as HTMLElement;
      });

      // Default options from constants
      expect(getByText(listbox, '10')).toBeInTheDocument();
      expect(getByText(listbox, '25')).toBeInTheDocument();
      expect(getByText(listbox, '50')).toBeInTheDocument();
    });

    test('renders custom itemsPerPageOptions', async () => {
      const { getByTestId, queryByRole } = render(
        <PaginationItemsPerPage
          itemsPerPageOptions={[5, 15, 30]}
          onItemsPerPageOptionChange={jest.fn()}
        />,
      );

      const selectButton = getByTestId('leafygreen-ui-select-menubutton');
      userEvent.click(selectButton);

      const listbox = await waitFor(() => {
        const listbox = queryByRole('listbox');
        expect(listbox).toBeVisible();
        return listbox as HTMLElement;
      });

      expect(getByText(listbox, '5')).toBeInTheDocument();
      expect(getByText(listbox, '15')).toBeInTheDocument();
      expect(getByText(listbox, '30')).toBeInTheDocument();
    });
  });

  describe('validation', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('console errors when itemsPerPage is not a valid option', () => {
      render(
        <PaginationItemsPerPage
          itemsPerPageOptions={[10, 25, 50]}
          itemsPerPage={22}
          onItemsPerPageOptionChange={jest.fn()}
        />,
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        `Value of the 'itemsPerPage' prop is not a valid option specified in 'itemsPerPageOptions'.`,
      );
    });

    test('does not console error when itemsPerPage is a valid option', () => {
      render(
        <PaginationItemsPerPage
          itemsPerPageOptions={[10, 25, 50]}
          itemsPerPage={25}
          onItemsPerPageOptionChange={jest.fn()}
        />,
      );

      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('select functionality', () => {
    test('calls onItemsPerPageOptionChange when option is selected', async () => {
      const onItemsPerPageOptionChange = jest.fn();
      const { getByTestId, queryByRole } = render(
        <PaginationItemsPerPage
          itemsPerPageOptions={[10, 25, 50]}
          itemsPerPage={10}
          onItemsPerPageOptionChange={onItemsPerPageOptionChange}
        />,
      );

      const selectButton = getByTestId('leafygreen-ui-select-menubutton');
      userEvent.click(selectButton);

      const listbox = await waitFor(() => {
        const listbox = queryByRole('listbox');
        expect(listbox).toBeVisible();
        return listbox as HTMLElement;
      });

      const option25 = getByText(listbox, '25');
      userEvent.click(option25);

      await waitFor(() => {
        expect(onItemsPerPageOptionChange).toHaveBeenCalledWith(
          '25',
          expect.anything(),
        );
      });
    });

    test('displays current itemsPerPage value in select', () => {
      const { getByTestId } = render(
        <PaginationItemsPerPage
          itemsPerPageOptions={[10, 25, 50]}
          itemsPerPage={25}
          onItemsPerPageOptionChange={jest.fn()}
        />,
      );

      const selectButton = getByTestId('leafygreen-ui-select-menubutton');
      expect(selectButton).toHaveTextContent('25');
    });
  });

  describe('id prop', () => {
    test('generates unique ids with custom id prefix', () => {
      const { getByText } = render(
        <PaginationItemsPerPage
          id="custom-pagination"
          itemsPerPageOptions={[10, 25, 50]}
          itemsPerPage={10}
          onItemsPerPageOptionChange={jest.fn()}
        />,
      );

      const label = getByText('Items per page:');
      expect(label).toHaveAttribute(
        'id',
        expect.stringContaining('custom-pagination'),
      );
    });
  });
});
