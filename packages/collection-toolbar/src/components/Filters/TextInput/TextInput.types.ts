import { TextInputProps as LGTextInputProps } from '@leafygreen-ui/text-input';

import { DistributiveOmit } from '../../../shared.types';

export type TextInputProps = DistributiveOmit<
  LGTextInputProps,
  'sizeVariant' | 'darkMode'
>;
