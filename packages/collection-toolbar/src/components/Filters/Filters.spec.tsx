import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';

import { consoleOnce } from '@leafygreen-ui/lib';

import { CollectionToolbarProvider } from '../../Context/CollectionToolbarProvider';
import { Size, Variant } from '../../shared.types';
import { getTestUtils } from '../../testing/getTestUtils';
import { getLgIds, MAX_FILTER_COUNT } from '../../utils';

import { Filters } from './Filters';

jest.mock('@leafygreen-ui/lib', () => ({
  ...jest.requireActual('@leafygreen-ui/lib'),
  consoleOnce: {
    error: jest.fn(),
    warn: jest.fn(),
    log: jest.fn(),
  },
}));

const lgIds = getLgIds();
const { getFilters } = getTestUtils();

interface RenderFiltersProps extends React.ComponentProps<typeof Filters> {
  children?: React.ReactNode;
  size?: Size;
  variant?: Variant;
}

const renderFilters = (props: RenderFiltersProps = {}) => {
  const {
    children,
    size = Size.Default,
    variant = Variant.Default,
    ...rest
  } = props;

  return render(
    <CollectionToolbarProvider lgIds={lgIds} size={size} variant={variant}>
      <Filters {...rest}>{children}</Filters>
    </CollectionToolbarProvider>,
  );
};

describe('packages/collection-toolbar/components/Filters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    test('renders container with correct data-lgid', () => {
      renderFilters();
      const filtersContainer = getFilters();
      expect(filtersContainer).toBeInTheDocument();
      expect(filtersContainer).toHaveAttribute('data-lgid', lgIds.filters);
    });

    test('renders as a div element', () => {
      renderFilters();
      const filtersContainer = getFilters();
      expect(filtersContainer.tagName).toBe('DIV');
    });
  });

  describe('props & styling', () => {
    test('applies className prop to container', () => {
      renderFilters({ className: 'custom-class' });
      const filtersContainer = getFilters();
      expect(filtersContainer).toHaveClass('custom-class');
    });

    test('spreads additional props to container element', () => {
      renderFilters({
        'aria-label': 'Filter controls',
        id: 'custom-id',
      } as React.ComponentProps<typeof Filters>);

      const filtersContainer = getFilters();
      expect(filtersContainer).toHaveAttribute('aria-label', 'Filter controls');
      expect(filtersContainer).toHaveAttribute('id', 'custom-id');
    });

    test('forwards ref to the container element', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <CollectionToolbarProvider
          lgIds={lgIds}
          size={Size.Default}
          variant={Variant.Default}
        >
          <Filters ref={ref} />
        </CollectionToolbarProvider>,
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute('data-lgid', lgIds.filters);
    });
  });

  describe('child filtering', () => {
    test('renders Filters.TextInput children', () => {
      renderFilters({
        children: <Filters.TextInput aria-label="Search text" />,
      });
      expect(
        screen.getByRole('textbox', { name: 'Search text' }),
      ).toBeInTheDocument();
    });

    test('renders Filters.Select with Option children', () => {
      renderFilters({
        children: (
          <Filters.Select aria-label="Select option" defaultValue="option1">
            <Filters.SelectOption value="option1">
              Option 1
            </Filters.SelectOption>
            <Filters.SelectOption value="option2">
              Option 2
            </Filters.SelectOption>
          </Filters.Select>
        ),
      });

      expect(
        screen.getByRole('button', { name: /Select option/i }),
      ).toBeInTheDocument();
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    test('renders Filters.SegmentedControl children', () => {
      renderFilters({
        children: (
          <Filters.SegmentedControl
            aria-label="View mode"
            defaultValue="option1"
          >
            <Filters.SegmentedControlOption value="option1">
              Grid
            </Filters.SegmentedControlOption>
            <Filters.SegmentedControlOption value="option2">
              List
            </Filters.SegmentedControlOption>
          </Filters.SegmentedControl>
        ),
      });
      expect(screen.getByText('Grid')).toBeInTheDocument();
      expect(screen.getByText('List')).toBeInTheDocument();
    });

    test('renders Filters.NumberInput children', () => {
      renderFilters({
        children: <Filters.NumberInput aria-label="Enter number" />,
      });
      expect(screen.getByLabelText('Enter number')).toBeInTheDocument();
    });

    test('renders Filters.Combobox children', () => {
      renderFilters({
        children: <Filters.Combobox aria-label="Search combobox" />,
      });
      expect(screen.getByLabelText('Search combobox')).toBeInTheDocument();
    });

    test('renders Filters.DatePicker children', () => {
      renderFilters({
        children: <Filters.DatePicker aria-label="Select date" />,
      });
      expect(screen.getByLabelText('Select date')).toBeInTheDocument();
    });

    test('renders multiple filter types together', () => {
      renderFilters({
        children: (
          <>
            <Filters.TextInput aria-label="Search text" />
            <Filters.Select aria-label="Select option" defaultValue="option1">
              <Filters.SelectOption value="option1">
                Option 1
              </Filters.SelectOption>
            </Filters.Select>
            <Filters.NumberInput aria-label="Enter number" />
          </>
        ),
      });

      expect(
        screen.getByRole('textbox', { name: 'Search text' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /Select option/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('spinbutton', { name: 'Enter number' }),
      ).toBeInTheDocument();
    });

    test('filters out non-filter children', () => {
      renderFilters({
        children: (
          <>
            <Filters.TextInput aria-label="Valid filter" />
            <div data-testid="invalid-child">Should not render</div>
            <span>Also should not render</span>
          </>
        ),
      });

      expect(
        screen.getByRole('textbox', { name: 'Valid filter' }),
      ).toBeInTheDocument();
      expect(screen.queryByTestId('invalid-child')).not.toBeInTheDocument();
      expect(
        screen.queryByText('Also should not render'),
      ).not.toBeInTheDocument();
    });
  });

  describe('compound component', () => {
    test('has the correct static property key for compound component identification', () => {
      expect(Filters.displayName).toBe('Filters');
    });

    test('exposes TextInput as a static property', () => {
      expect(Filters.TextInput).toBeDefined();
    });

    test('exposes Select as a static property', () => {
      expect(Filters.Select).toBeDefined();
    });

    test('exposes SegmentedControl as a static property', () => {
      expect(Filters.SegmentedControl).toBeDefined();
    });

    test('exposes NumberInput as a static property', () => {
      expect(Filters.NumberInput).toBeDefined();
    });

    test('exposes Combobox as a static property', () => {
      expect(Filters.Combobox).toBeDefined();
    });

    test('exposes DatePicker as a static property', () => {
      expect(Filters.DatePicker).toBeDefined();
    });
  });

  describe('filter count validation', () => {
    test('logs error when Compact variant has more than 2 filters', () => {
      renderFilters({
        variant: Variant.Compact,
        children: (
          <>
            <Filters.TextInput aria-label="Filter 1" />
            <Filters.TextInput aria-label="Filter 2" />
            <Filters.TextInput aria-label="Filter 3" />
          </>
        ),
      });

      expect(consoleOnce.error).toHaveBeenCalledWith(
        `CollectionToolbarFilters with ${Variant.Compact} variant can only have up to ${MAX_FILTER_COUNT[Variant.Compact]} filters`,
      );
    });

    test('does not log error when Compact variant has 2 or fewer filters', () => {
      renderFilters({
        variant: Variant.Compact,
        children: (
          <>
            <Filters.TextInput aria-label="Filter 1" />
            <Filters.TextInput aria-label="Filter 2" />
          </>
        ),
      });

      expect(consoleOnce.error).not.toHaveBeenCalled();
    });

    test('does not log error when Default variant has 5 filters', () => {
      renderFilters({
        variant: Variant.Default,
        children: (
          <>
            <Filters.TextInput aria-label="Filter 1" />
            <Filters.TextInput aria-label="Filter 2" />
            <Filters.TextInput aria-label="Filter 3" />
            <Filters.TextInput aria-label="Filter 4" />
            <Filters.TextInput aria-label="Filter 5" />
          </>
        ),
      });

      expect(consoleOnce.error).not.toHaveBeenCalled();
    });

    test('logs error when Default variant has more than 5 filters', () => {
      renderFilters({
        variant: Variant.Default,
        children: (
          <>
            <Filters.TextInput aria-label="Filter 1" />
            <Filters.TextInput aria-label="Filter 2" />
            <Filters.TextInput aria-label="Filter 3" />
            <Filters.TextInput aria-label="Filter 4" />
            <Filters.TextInput aria-label="Filter 5" />
            <Filters.TextInput aria-label="Filter 6" />
          </>
        ),
      });

      expect(consoleOnce.error).toHaveBeenCalledWith(
        `CollectionToolbarFilters with ${Variant.Default} variant can only have up to ${MAX_FILTER_COUNT[Variant.Default]} filters`,
      );
    });

    test('logs error when Collapsible variant has more than 5 filters', () => {
      renderFilters({
        variant: Variant.Collapsible,
        children: (
          <>
            <Filters.TextInput aria-label="Filter 1" />
            <Filters.TextInput aria-label="Filter 2" />
            <Filters.TextInput aria-label="Filter 3" />
            <Filters.TextInput aria-label="Filter 4" />
            <Filters.TextInput aria-label="Filter 5" />
            <Filters.TextInput aria-label="Filter 6" />
          </>
        ),
      });

      expect(consoleOnce.error).toHaveBeenCalledWith(
        `CollectionToolbarFilters with ${Variant.Collapsible} variant can only have up to ${MAX_FILTER_COUNT[Variant.Collapsible]} filters`,
      );
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('types', () => {
    test('TextInput requires aria-label or label', () => {
      <>
        {/* @ts-expect-error - Missing aria-label or label */}
        <Filters.TextInput />

        {/* Valid: aria-label provided */}
        <Filters.TextInput aria-label="Search" />

        {/* Valid: label provided */}
        <Filters.TextInput label="Search" />
      </>;
    });

    test('Select requires aria-label or label', () => {
      <>
        {/* @ts-expect-error - Missing aria-label or label */}
        <Filters.Select>
          <Filters.SelectOption value="1">Option 1</Filters.SelectOption>
        </Filters.Select>

        {/* Valid: aria-label provided */}
        <Filters.Select aria-label="Select option">
          <Filters.SelectOption value="1">Option 1</Filters.SelectOption>
        </Filters.Select>

        {/* Valid: label provided */}
        <Filters.Select label="Select option">
          <Filters.SelectOption value="1">Option 1</Filters.SelectOption>
        </Filters.Select>
      </>;
    });

    test('NumberInput requires aria-label or label', () => {
      <>
        {/* @ts-expect-error - Missing aria-label or label */}
        <Filters.NumberInput />

        {/* Valid: aria-label provided */}
        <Filters.NumberInput aria-label="Enter number" />

        {/* Valid: label provided */}
        <Filters.NumberInput label="Enter number" />
      </>;
    });

    test('Combobox requires aria-label or label', () => {
      <>
        {/* @ts-expect-error - Missing aria-label or label */}
        <Filters.Combobox />

        {/* Valid: aria-label provided */}
        <Filters.Combobox aria-label="Search" />

        {/* Valid: label provided */}
        <Filters.Combobox label="Search" />
      </>;
    });

    test('DatePicker requires aria-label or label', () => {
      <>
        {/* @ts-expect-error - Missing aria-label or label */}
        <Filters.DatePicker />

        {/* Valid: aria-label provided */}
        <Filters.DatePicker aria-label="Select date" />

        {/* Valid: label provided */}
        <Filters.DatePicker label="Select date" />
      </>;
    });
  });
});
