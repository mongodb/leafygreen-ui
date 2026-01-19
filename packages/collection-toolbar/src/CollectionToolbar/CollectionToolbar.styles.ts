import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

import { actionsClassName } from '../components/Actions/Action.styles';
import { paginationClassName } from '../components/Actions/Pagination/Pagination.styles';
import { filtersClassName } from '../components/Filters/Filters.styles';
import { titleClassName } from '../components/Title/Title.styles';
import { Size, Variant } from '../shared.types';

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
    background: lightblue;
  }
`;

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
`;

export const collapsibleContentStyles = css`
  flex: 100%;
`;

export const getCollectionToolbarStyles = ({
  className,
  variant,
}: {
  size?: Size;
  variant?: Variant;
  className?: string;
}) =>
  cx(
    baseStyles,
    {
      [collapsibleStyles]: variant === Variant.Collapsible,
    },
    className,
  );
