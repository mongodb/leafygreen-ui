import { mockIsIntersecting } from './mocks/IntersectionObserver';

import React from 'react';
import { typeIs } from '@leafygreen-ui/lib';
import { render, cleanup } from '@testing-library/react';
import Stage from './Stage';
import Pipeline from './Pipeline';
import { Size } from './types';

const className = 'test-stage-class';
const parentElement = document.createElement('div');
const child = '$match';

function renderStage(props = {}) {
  const utils = render(
    <Pipeline size={Size.Normal}>
      <Stage {...props}>
        {child}
      </Stage>
    </Pipeline>,
    // {
    //   container: document.body.appendChild(parentElement),
    // },
  );

  // if (!typeIs.element(utils.container.firstChild)) {
  //   throw new Error('Pipeline element not found');
  // }

  // This element used to check if `useInView`
  const element = utils.getByTestId('pipeline-stage');
  const childElement = utils.getByTestId('pipeline-stage-item');
  const observedNode = utils.getByTestId('pipeline-stages');

  return {
    ...utils,
    // element: utils.container.firstChild,
    element,
    childElement,
    observedNode
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

  // test('observes the intersection of the provided root element', () => {
  //   const {observedNode} = renderStage();

  //   const {
  //     value: { root },
  //   } = (window.IntersectionObserver as jest.Mock<IntersectionObserver>).mock
  //     .results[0];

  //     console.log((window.IntersectionObserver as jest.Mock<IntersectionObserver>).mock
  //     .results[0]);

  //   // expect(root).toBe(observedNode);
  //   expect(root).toBe('t');
  // });

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
      const { childElement, element } = renderStage();

      mockIsIntersecting(childElement, false);
      expect(element.getAttribute('data-stage-visible')).toBe('false');
    });
  });

  describe('when it is intersecting its parent', () => {
    test('should set the "data-stage-visible" attribute to "true"', () => {
      const { childElement, element } = renderStage();
      mockIsIntersecting(childElement, true);

      expect(element.getAttribute('data-stage-visible')).toBe('true');
    });
  });
});
