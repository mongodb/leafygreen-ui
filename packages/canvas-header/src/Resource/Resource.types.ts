import { CanvasHeaderProps } from '../CanvasHeader';

export type ResourceProps = Pick<
  CanvasHeaderProps,
  'resourceName' | 'resourceIcon' | 'resourceBadges'
>;
