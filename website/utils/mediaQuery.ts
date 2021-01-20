import { breakpoints } from '@leafygreen-ui/tokens';
import facepaint from 'facepaint';

export const mq = facepaint(
  Object.values(breakpoints).map(bp => `@media (min-width: ${bp}px)`),
  { literal: true },
);
