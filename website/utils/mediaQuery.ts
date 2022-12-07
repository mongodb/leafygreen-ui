import facepaint from 'facepaint';

import { breakpoints } from '@leafygreen-ui/tokens';

export const mq = facepaint(
  Object.values(breakpoints).map(bp => `@media (min-width: ${bp}px)`),
  { literal: true },
);
