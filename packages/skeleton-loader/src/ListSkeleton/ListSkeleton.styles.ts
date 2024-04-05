import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

export const skeletonListWrapperStyles = css`
  padding: ${spacing[400]}px;
`;

export const getSkeletonListItemStyles = (
  index = 0,
  bulletsOnly?: boolean,
) => css`
  &:not(:first-child) {
    margin-block: ${spacing[300]}px;
  }

  // "Forgive me, for I have sinned" - AT
  // These styles get added _before_ the default Skeleton styles,
  // and are immediately overridden, hence the !important.
  // This is an issue with the emotion configuration
  width: ${getWidth(index, bulletsOnly)} !important;
`;

const getWidth = (index = 0, bulletsOnly?: boolean) => {
  if (bulletsOnly) {
    return spacing[400] + 'px';
  }

  const offset = 25 * (index % 3);
  return 100 - offset + '%';
};
