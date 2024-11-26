/**
 * Constructs a type which provides generic typing for React.memo
 */

import { ReactElement } from 'react';

// This removes propTypes and displayName
export interface MemoWithGenerics {
  <P extends object>(
    Component: (props: P) => ReactElement | null,
    propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean,
  ): (props: P) => ReactElement | null;
}
