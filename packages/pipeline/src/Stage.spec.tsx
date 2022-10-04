import { mockIsIntersecting } from './mocks/IntersectionObserver';

import React from 'react';
import { typeIs } from '@leafygreen-ui/lib';
import { render, cleanup } from '@testing-library/react';
import Stage from './Stage';
import { Size } from './types';

const className = 'test-stage-class';
const parentElement = document.createElement('div');
const child = '$match';

function renderStage(props = {}) {
  const utils = render(
    <Stage {...props} intersectionNode={parentElement} size={Size.XSmall}>
      {child}
    </Stage>,
    {
      container: document.body.appendChild(parentElement),
    },
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
  (window.IntersectionObserver as jest.Mock<IntersectionObserver>).mockReset();
  cleanup();
});

describe('packages/pipeline/Stage', () => {
  test(`renders "${className}" in the stage's classList`, () => {
    const { element } = renderStage({ className });
    expect(element.classList.contains(className)).toBe(true);
  });

  test(`renders "${child}" as the badge's textContent`, () => {
    const { element } = renderStage();
    expect(element.textContent).toBe(child);
  });

  test('renders a "chevron"', () => {
    const { getByTestId } = renderStage();
    const element = getByTestId('pipeline-stage-chevron');

    expect(element).toBeTruthy();
  });

  test('observes the intersection of the provided root element', () => {
    renderStage();

    const {
      value: { root },
    } = (window.IntersectionObserver as jest.Mock<IntersectionObserver>).mock
      .results[0];

    expect(root).toBe(parentElement);
  });

  test('sets the default threshold for the intersection', () => {
    renderStage();

    const {
      value: { thresholds },
    } = (
      window.IntersectionObserver as jest.Mock<IntersectionObserver>
    ).mock.results.slice(-1)[0];

    expect(thresholds).toContain(0.8);
  });

  test('sets the provided threshold for the intersection', () => {
    renderStage({ threshold: [0.5, 0.75] });

    const {
      value: { thresholds },
    } = (
      window.IntersectionObserver as jest.Mock<IntersectionObserver>
    ).mock.results.slice(-1)[0];

    expect(thresholds).toContain(0.5);
    expect(thresholds).toContain(0.75);
  });

  describe('when it is NOT intersecting its parent', () => {
    test('should set the "data-stage-visible" attribute to "false"', () => {
      const { element } = renderStage();

      mockIsIntersecting(element, false);
      expect(element.getAttribute('data-stage-visible')).toBe('false');
    });
  });

  describe('when it is intersecting its parent', () => {
    test('should set the "data-stage-visible" attribute to "true"', () => {
      const { element } = renderStage();
      mockIsIntersecting(element, true);

      expect(element.getAttribute('data-stage-visible')).toBe('true');
    });
  });
});
