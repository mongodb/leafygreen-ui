import React from 'react';

import { type AssetsType, Color, type IllustrationProps } from './Illustration.types';
import * as Assets from '../assets';

// TODO: forwardRef
export function Illustration({ color = Color.None, name }: IllustrationProps) {
  const assetColorKey = color === Color.None ? '' : `${color}`;
  const assetKey = `${name}${assetColorKey}`;

  const IllustrationComponent = (Assets as AssetsType)[assetKey];
  
  return <IllustrationComponent />;
}

Illustration.displayName = 'Illustration';
