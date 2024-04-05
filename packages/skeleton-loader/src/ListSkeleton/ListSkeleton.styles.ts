import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

export const skeletonListWrapperStyles = css`
  width: 100%;
  padding: 0;
  margin: 0;
`;

export const getSkeletonListItemStyles = (
  index = 0,
  bulletsOnly?: boolean,
) => css`
  list-style: none;

  &:not(:first-child),
  &:not(:last-child) {
    margin-block: ${spacing[300]}px;
  }

  width: ${getWidth(index, bulletsOnly)};
`;

const getWidth = (index = 0, bulletsOnly?: boolean) => {
  if (bulletsOnly) {
    return spacing[400] + 'px';
  }

  const offset = 25 * (index % 3);
  return 100 - offset + '%';
};
