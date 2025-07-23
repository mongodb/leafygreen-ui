import { ComponentType, ReactComponentElement } from 'react';

import * as SVGR from './SVGR';

export interface ComponentProps extends SVGR.ComponentProps {
  size?: number | 'small' | 'default' | 'large' | 'xlarge';
  ['data-testid']?: string;
}

export type Component = ComponentType<ComponentProps> & { isGlyph?: boolean };

export type Element = ReactComponentElement<Component, ComponentProps>;
