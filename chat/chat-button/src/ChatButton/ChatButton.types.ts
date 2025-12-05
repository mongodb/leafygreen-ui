import { ComponentPropsWithRef } from 'react';

import { BaseButtonProps } from '@leafygreen-ui/button';

export interface ChatButtonProps
  extends ComponentPropsWithRef<'button'>,
    Pick<
      BaseButtonProps,
      | 'variant'
      | 'size'
      | 'darkMode'
      | 'baseFontSize'
      | 'isLoading'
      | 'loadingIndicator'
      | 'loadingText'
    > {}
