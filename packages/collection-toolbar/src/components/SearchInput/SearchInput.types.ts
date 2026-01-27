import { SearchInputProps as LGSearchInputProps } from '@leafygreen-ui/search-input';

/**
 * Omit 'size' and 'darkMode' from base props (provided by context),
 * then intersect with AriaLabelProps to preserve the discriminated union.
 */
export type SearchInputProps = Omit<LGSearchInputProps, 'size' | 'darkMode'>;
