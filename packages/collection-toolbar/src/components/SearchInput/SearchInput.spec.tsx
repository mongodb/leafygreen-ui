import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { CollectionToolbarProvider } from '../../Context/CollectionToolbarProvider';
import {
  CollectionToolbarSubComponentProperty,
  Size,
  Variant,
} from '../../shared.types';
import { getLgIds } from '../../utils';

import { SearchInput } from './SearchInput';

const lgIds = getLgIds();

const renderSearchInput = ({
  size = Size.Default,
  variant = Variant.Default,
  darkMode = false,
  'aria-label': ariaLabel = 'Search',
  ...props
}: {
  size?: Size;
  variant?: Variant;
  darkMode?: boolean;
} & Partial<React.ComponentProps<typeof SearchInput>> = {}) => {
  return render(
    <CollectionToolbarProvider
      lgIds={lgIds}
      size={size}
      variant={variant}
      darkMode={darkMode}
    >
      <SearchInput aria-label={ariaLabel} {...props} />
    </CollectionToolbarProvider>,
  );
};

/** Helper to get the actual input element from the SearchInput component */
const getSearchInputElement = (container: HTMLElement) => {
  return container.querySelector('input[type="search"]') as HTMLInputElement;
};

/** Helper to get the form element */
const getFormElement = (container: HTMLElement) => {
  return container.querySelector('form') as HTMLFormElement;
};

/**
 * Note: Core SearchInput functionality (disabled, value, onChange, onSubmit,
 * keyboard interactions, etc.) is tested in @leafygreen-ui/search-input.
 * These tests focus on the CollectionToolbar wrapper-specific behavior.
 */
describe('packages/collection-toolbar/components/SearchInput', () => {
  describe('rendering', () => {
    test('renders the search input', () => {
      const { container } = renderSearchInput();
      const input = getSearchInputElement(container);
      expect(input).toBeInTheDocument();
    });
  });

  describe('context integration', () => {
    test('applies data-lgid attribute from context', () => {
      const { container } = renderSearchInput();
      const form = getFormElement(container);
      expect(form).toHaveAttribute(
        'data-lgid',
        'lg-collection_toolbar-search-input',
      );
    });
  });

  describe('props', () => {
    test('spreads additional props to SearchInput', () => {
      const { container } = renderSearchInput({
        placeholder: 'Search items...',
      });

      const input = getSearchInputElement(container);
      expect(input).toHaveAttribute('placeholder', 'Search items...');
    });

    test('applies className prop with wrapper styles', () => {
      const { container } = renderSearchInput({ className: 'custom-class' });
      const form = getFormElement(container);
      expect(form).toHaveClass('custom-class');
    });

    test('applies default empty aria-labelledby when not provided', () => {
      const { container } = renderSearchInput({
        'aria-label': undefined,
        'aria-labelledby': '',
      });
      const searchboxWrapper = container.querySelector('[role="searchbox"]');
      expect(searchboxWrapper).toHaveAttribute('aria-labelledby', '');
    });
  });

  describe('compound component', () => {
    test('has the correct static property for compound component identification', () => {
      expect(SearchInput[CollectionToolbarSubComponentProperty.SearchInput]).toBe(
        true,
      );
    });
  });

  describe('ref forwarding', () => {
    test('forwards ref to the input element', () => {
      const ref = createRef<HTMLInputElement>();
      const { container } = render(
        <CollectionToolbarProvider lgIds={lgIds}>
          <SearchInput ref={ref} aria-label="Search" />
        </CollectionToolbarProvider>,
      );
      const input = getSearchInputElement(container);
      expect(ref.current).not.toBeNull();
      expect(ref.current).toBe(input);
    });
  });
});
