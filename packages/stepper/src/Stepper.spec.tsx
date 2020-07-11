import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import { Step, Stepper } from '.';

function isVisible(element: HTMLElement): boolean {
  try {
    expect(element).toBeVisible();
    return true;
  } catch (e) {
    return false;
  }
}

function onlyElement(elements: Array<HTMLElement>): HTMLElement | null {
  expect(elements.length).toBeLessThanOrEqual(1);
  return elements[0] ?? null;
}

function renderSteps(
  {
    allSteps,
    currentStep,
    maxDisplayedSteps,
  }: {
    allSteps: Array<string>;
    currentStep: number;
    maxDisplayedSteps: number;
    expectedSteps?: Array<string>;
  },
  renderFunction: typeof render | RenderResult['rerender'],
) {
  const result = renderFunction(
    <Stepper currentStep={currentStep} maxDisplayedSteps={maxDisplayedSteps}>
      {allSteps.map(step => (
        <Step key={step}>{step}</Step>
      ))}
    </Stepper>,
  );
  return result ? result.rerender : undefined;
}

function assertVisibleSteps({
  allSteps,
  currentStep,
  expectedSteps = allSteps,
}: {
  allSteps: Array<string>;
  currentStep?: number;
  expectedSteps?: Array<string>;
}) {
  const visiblePreviousStepsElement = onlyElement(
    screen.queryAllByLabelText('Previous steps').filter(isVisible),
  );

  if (expectedSteps.includes('Previous steps')) {
    expect(visiblePreviousStepsElement).not.toBeNull();
  } else {
    expect(visiblePreviousStepsElement).toBeNull();
  }

  allSteps.forEach(step => {
    const visibleStepElement = onlyElement(
      screen.queryAllByText(step).filter(isVisible),
    );

    if (expectedSteps.includes(step)) {
      expect(visibleStepElement).not.toBeNull();

      if (allSteps[currentStep] === step) {
        expect(visibleStepElement).toHaveAttribute('aria-current', 'step');
      } else {
        expect(visibleStepElement).not.toHaveAttribute('aria-current');
      }
    } else {
      expect(visibleStepElement).toBeNull();
    }
  });

  const visibleNextStepsElement = onlyElement(
    screen.queryAllByLabelText('Next steps').filter(isVisible),
  );

  if (expectedSteps.includes('Next steps')) {
    expect(visibleNextStepsElement).not.toBeNull();
  } else {
    expect(visibleNextStepsElement).toBeNull();
  }
}

describe('packages/stepper', () => {
  // eslint-disable-next-line jest/expect-expect
  test('renders steps with correct current step', () => {
    const allSteps = ['First step', 'Second step', 'Third step'];
    const maxDisplayedSteps = 3;

    const rerender = renderSteps(
      {
        allSteps,
        maxDisplayedSteps,
        currentStep: 0,
      },
      render,
    );
    assertVisibleSteps({ allSteps, currentStep: 0 });

    renderSteps(
      {
        allSteps,
        maxDisplayedSteps,
        currentStep: 1,
      },
      rerender,
    );
    assertVisibleSteps({ allSteps, currentStep: 1 });

    renderSteps(
      {
        allSteps,
        maxDisplayedSteps,
        currentStep: 2,
      },
      rerender,
    );
    assertVisibleSteps({ allSteps, currentStep: 2 });
  });

  // eslint-disable-next-line jest/expect-expect
  test('does not show hidden steps', () => {
    const allSteps = [
      'First step',
      'Second step',
      'Third step',
      'Fourth step',
      'Fifth step',
    ];
    const maxDisplayedSteps = 3;

    /**
     *  ----------------------------------------
     * | *First Step* > Second step >    ...    |
     *  ----------------------------------------
     */
    const rerender = renderSteps(
      {
        allSteps,
        maxDisplayedSteps,
        currentStep: 0,
      },
      render,
    );
    assertVisibleSteps({
      allSteps,
      currentStep: 0,
      expectedSteps: ['First step', 'Second step', 'Next steps'],
    });

    /**
     *  ----------------------------------------
     * | First Step > *Second step* >    ...    |
     *  ----------------------------------------
     */
    renderSteps(
      {
        allSteps,
        maxDisplayedSteps,
        currentStep: 1,
        expectedSteps: ['First step', 'Second step', 'Next steps'],
      },
      rerender,
    );
    assertVisibleSteps({
      allSteps,
      currentStep: 1,
      expectedSteps: ['First step', 'Second step', 'Next steps'],
    });

    // Preview of next steps appears on hover
    fireEvent.mouseEnter(
      onlyElement(screen.getAllByLabelText('Next steps').filter(isVisible)),
    );
    assertVisibleSteps({
      allSteps,
      expectedSteps: ['Previous steps', 'Third step', 'Next steps'],
    });
    // Preview disappears
    fireEvent.mouseLeave(
      onlyElement(screen.getAllByLabelText('Next steps').filter(isVisible)),
    );
    assertVisibleSteps({
      allSteps,
      currentStep: 1,
      expectedSteps: ['First step', 'Second step', 'Next steps'],
    });

    /**
     *  -------------------------------------
     * |    ...   > *Third step* >    ...    |
     *  -------------------------------------
     */
    renderSteps(
      {
        allSteps,
        maxDisplayedSteps,
        currentStep: 2,
      },
      rerender,
    );
    assertVisibleSteps({
      allSteps,
      currentStep: 2,
      expectedSteps: ['Previous steps', 'Third step', 'Next steps'],
    });

    /**
     *  ----------------------------------------
     * | *Fourth Step* > Fifth step >    ...    |
     *  ----------------------------------------
     */
    renderSteps(
      {
        allSteps,
        maxDisplayedSteps,
        currentStep: 3,
      },
      rerender,
    );
    assertVisibleSteps({
      allSteps,
      currentStep: 3,
      expectedSteps: ['Previous steps', 'Fourth step', 'Fifth step'],
    });

    /**
     *  ----------------------------------------
     * | Fourth Step > *Fifth step* >    ...    |
     *  ----------------------------------------
     */
    renderSteps(
      {
        allSteps,
        maxDisplayedSteps,
        currentStep: 4,
      },
      rerender,
    );
    assertVisibleSteps({
      allSteps,
      currentStep: 4,
      expectedSteps: ['Previous steps', 'Fourth step', 'Fifth step'],
    });

    // Preview of previous steps appears on hover
    const visiblePreviousStepsElement = onlyElement(
      screen.queryAllByLabelText('Previous steps').filter(isVisible),
    );
    fireEvent.mouseEnter(visiblePreviousStepsElement);
    assertVisibleSteps({
      allSteps,
      expectedSteps: ['Previous steps', 'Third step', 'Next steps'],
    });
    // Preview disappears
    fireEvent.mouseLeave(
      onlyElement(screen.getAllByLabelText('Previous steps').filter(isVisible)),
    );
    assertVisibleSteps({
      allSteps,
      currentStep: 4,
      expectedSteps: ['Previous steps', 'Fourth step', 'Fifth step'],
    });
  });
});
