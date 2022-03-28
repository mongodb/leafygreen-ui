import { ComponentType } from 'react';
import * as SVGR from './svgr';

export interface ComponentProps extends SVGR.ComponentProps {
  size?: number | 'small' | 'default' | 'large' | 'xlarge';
}

export type Component = ComponentType<ComponentProps>;
