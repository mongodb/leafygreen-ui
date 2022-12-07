import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { typeIs } from '@leafygreen-ui/lib';

import Pipeline from './Pipeline';
import Stage from './Stage';
import { Size } from './types';

const className = 'test-pipeline-class';
const stages = ['$group', '$match', '$limit'];
const parentElement = document.createElement('div');

function renderPipeline(props = {}) {
  const utils = render(
    <Pipeline {...props} size={Size.XSmall}>
      {stages.map((stage, index) => (
        <Stage key={`${index}-${stage}`}>{stage}</Stage>
      ))}
    </Pipeline>,
    { container: document.body.appendChild(parentElement) },
  );

  if (!typeIs.element(utils.container.firstChild)) {
    throw new Error('Pipeline element not found');
  }

  return {
    ...utils,
    element: utils.container.firstChild,
  };
}

afterAll(() => {
  parentElement.remove();
});

describe('packages/pipeline/Pipeline', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderPipeline();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  test(`renders "${className}" in the stage's classList`, () => {
    const { element } = renderPipeline({ className });
    expect(element.classList.contains(className)).toBe(true);
  });

  test(`renders each child as a Stage`, function () {
    const { getByText } = renderPipeline();

    stages.forEach(stage => {
      const element = getByText(stage);
      expect(element.getAttribute('data-testid')).toEqual(
        'pipeline-stage-item',
      );
    });
  });
});
