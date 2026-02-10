import { NumberInputProps as LGNumberInputProps } from '@leafygreen-ui/number-input';

import { DistributiveOmit } from '../../../shared.types';

export type NumberInputProps = DistributiveOmit<
  LGNumberInputProps,
  'size' | 'darkMode'
>;
