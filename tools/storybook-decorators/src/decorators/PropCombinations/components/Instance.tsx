import React, { ReactElement } from 'react';
import { GeneratedStoryConfig } from '@lg-tools/storybook-utils';
import { Args } from '@storybook/react';

import { PropCombination } from '../utils';

/**
 * Renders a component instance
 */
export function Instance<T extends React.ComponentType<any>>({
  component,
  instanceProps,
  decorator,
}: {
  component: T;
  instanceProps: PropCombination<T>;
  decorator: Required<GeneratedStoryConfig<T>>['decorator'];
}): ReactElement<any> {
  return decorator(
    (extraArgs: Args) =>
      React.createElement(component, {
        ...instanceProps,
        ...extraArgs,
      }),
    { args: { ...instanceProps } },
  );
}
