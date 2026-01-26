import { css, cx } from '@leafygreen-ui/emotion';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

import { actionsClassName } from '../components/Actions/Action.styles';
import { paginationClassName } from '../components/Actions/Pagination/Pagination.styles';
import { comboboxClassName } from '../components/Filters/Combobox/Combobox.styles';
import { filtersClassName } from '../components/Filters/Filters.styles';
import { searchInputClassName } from '../components/SearchInput/SearchInput.styles';
import { titleClassName } from '../components/Title/Title.styles';
import { Variant } from '../shared.types';

const COMPACT_SEARCH_INPUT_WIDTH = '17.5rem';

export const baseStyles = css`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing[200]}px;
  padding: ${spacing[200]}px ${spacing[600]}px;

  .${actionsClassName} {
    margin-left: 4.5rem;
  }

  .${paginationClassName} {
    width: max-content;
  }

  .${filtersClassName} {
    flex: 100%;

    & .${comboboxClassName} {
      width: fit-content;
    }

    & input[type='number'] {
      width: auto;
    }
  }
`;

export const compactStyles = css`
  background: lightblue;

  .${searchInputClassName} {
    max-width: ${COMPACT_SEARCH_INPUT_WIDTH};
  }

  .${filtersClassName} {
    flex: 1;
  }
`

const collapsibleStyles = css`
  .${titleClassName} {
    flex: 1;
  }

  .${actionsClassName} {
    margin-left: 4.5rem;
  }

  .${paginationClassName} {
    width: max-content;
  }

  .${filtersClassName} {
    margin-top: ${spacing[200]}px;
  }
`;

export const collapsibleContentBaseStyles = css`
  display: grid;
  transition-property: grid-template-rows, margin-bottom, opacity;
  transition-duration: ${transitionDuration.default}ms;
  transition-timing-function: ease-in-out;
  grid-template-rows: 1fr;
  margin-bottom: 0;
  opacity: 1;
`

const collapsibleContentCollapsedStyles = css`
  grid-template-rows: 0fr;
  opacity: 0;
`

export const getCollapsibleContentStyles = ({isCollapsed}: {isCollapsed?: boolean}) => cx(collapsibleContentBaseStyles, {
  [collapsibleContentCollapsedStyles]: isCollapsed,
});

export const getCollectionToolbarStyles = ({
  className,
  variant,
}: {
  variant?: Variant;
  className?: string;
}) =>
  cx(
    baseStyles,
    {
      [collapsibleStyles]: variant === Variant.Collapsible,
      [compactStyles]: variant === Variant.Compact,
    },
    className,
  );
