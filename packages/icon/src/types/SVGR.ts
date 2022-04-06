import { ComponentType, SVGProps } from 'react';

export interface ComponentProps extends SVGProps<SVGSVGElement> {
  title?: string | null;
  role?: 'presentation' | 'img';
}

export type Component = ComponentType<ComponentProps>;
