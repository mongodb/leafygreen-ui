import React from 'react';

import { OneOf } from '@leafygreen-ui/lib';

export type PortalProps = {
  children?: React.ReactNode;
  portalRef?: React.MutableRefObject<HTMLElement | null>;
} & OneOf<
  {
    /**
     * `className` prop passed to the container element.
     */
    className?: never;
    /**
     * A custom container element. By default, the container will be a `div` appended to the document body.
     * @required
     */
    container: HTMLElement;
  },
  {
    /**
     * `className` prop passed to the container element.
     */
    className?: string;
    /**
     * A custom container element. By default, the container will be a `div` appended to the document body.
     */
    container?: null;
  }
>;
