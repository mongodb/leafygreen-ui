import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

import { gridAreas } from '../constants';

const CHAT_WINDOW_MAX_WIDTH = 800;

const baseContainerStyles = css`
  grid-area: ${gridAreas.main};
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
`;

export const getContainerStyles = ({ className }: { className?: string }) =>
  cx(baseContainerStyles, className);

export const chatWindowWrapperStyles = css`
  height: 100%;
  width: 100%;
  max-width: ${CHAT_WINDOW_MAX_WIDTH}px;
  padding: 0 ${spacing[800]}px;
  display: flex;
  align-self: center;
`;
