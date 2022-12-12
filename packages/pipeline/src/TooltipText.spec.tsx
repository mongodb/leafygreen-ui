import React from 'react';
import { render } from '@testing-library/react';

import { typeIs } from '@leafygreen-ui/lib';

import TooltipText from './TooltipText';

function renderTooltipText({
  hiddenStages,
}: React.ComponentProps<typeof TooltipText>) {
  const utils = render(<TooltipText hiddenStages={hiddenStages} />);

  if (!typeIs.element(utils.container.firstChild)) {
    throw new Error('TooltipText element not found');
  }

  return {
    ...utils,
    element: utils.container.firstChild,
  };
}

describe('packages/pipeline/TooltipText', () => {
  test(`renders correct number of children`, () => {
    const { element } = renderTooltipText({
      hiddenStages: ['one', 'two', 'three'],
    });
    const children = element.querySelectorAll('span');
    expect(children.length).toEqual(5);
  });

  test(`renders nothing`, () => {
    const { element } = renderTooltipText({ hiddenStages: [] });
    const children = element.querySelectorAll('span');
    expect(children.length).toEqual(0);
  });
});
