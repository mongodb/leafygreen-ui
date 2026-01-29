import { css, cx } from '@leafygreen-ui/emotion';

import { Variant } from '../../shared.types';

const collapsibleTitleStyles = css`
  flex: 1;
`;

export const getTitleStyles = ({
  className,
  variant,
}: {
  className?: string;
  variant?: Variant;
}) => {
  return cx(className, {
    [collapsibleTitleStyles]: variant === Variant.Collapsible,
  });
};
