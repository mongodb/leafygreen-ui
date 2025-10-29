import { css, cx } from '@leafygreen-ui/emotion';

import { gridAreas } from '../constants';

const baseContainerStyles = css`
  grid-area: ${gridAreas.main};
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
`;

export const getContainerStyles = ({ className }: { className?: string }) =>
  cx(baseContainerStyles, className);
