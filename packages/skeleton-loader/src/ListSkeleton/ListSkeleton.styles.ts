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
  margin-block: ${spacing[300]}px;

  width: ${getWidth(index, bulletsOnly)};
`;

const getWidth = (index = 0, bulletsOnly?: boolean) => {
  if (bulletsOnly) {
    return spacing[400] + 'px';
  }

  /**
   * The first item will take up 100% of the available width.
   * Subsequent items will take up 1/4 less space,
   * until the item is 50% the available width.
   * Then repeat
   *
   * ----------
   * -------
   * -----
   * ----------
   * -------
   * ... etc
   */
  const offset = 25 * (index % 3);
  return 100 - offset + '%';
};
