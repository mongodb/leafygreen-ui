/* eslint-disable react/display-name */
import React from 'react';

import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import ImportantWithCircleIcon from '@leafygreen-ui/icon/dist/ImportantWithCircle';
import InfoWithCircle from '@leafygreen-ui/icon/dist/InfoWithCircle';
import RefreshIcon from '@leafygreen-ui/icon/dist/Refresh';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';

import { Variant } from '../Toast.types';

export const variantIcons: Record<Variant, React.ComponentType<any>> = {
  [Variant.Success]: CheckmarkWithCircleIcon,
  [Variant.Note]: InfoWithCircle,
  [Variant.Warning]: WarningIcon,
  [Variant.Important]: ImportantWithCircleIcon,
  [Variant.Progress]: RefreshIcon,
};
