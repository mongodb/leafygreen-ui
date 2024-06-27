import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Link } from '@leafygreen-ui/typography';

import { LGIDS_VERTICAL_STEPPER } from '../constants';
import { VerticalStep } from '../VerticalStep/VerticalStep';

import { VerticalStepper, VerticalStepperProps } from '.';

const currentStepString = 'li[data-state="current"]';
const completedStepString = 'li[data-state="completed"]';
const futureStepString = 'li[data-state="future"]';

const childrenData = [
  <VerticalStep
    key={1}
    title="first step"
    description={
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        efficitur nunc mattis magna pretium, id mattis metus vestibulum. Integer
        cursus ex ante, ut molestie lorem vestibulum id.{' '}
        <Link href="https://www.mongodb.design/">Im a link</Link>
      </>
    }
    primaryButtonProps={{
      children: 'primary button',
    }}
  />,
  <VerticalStep
    key={2}
    title="second step"
    description="In eleifend, ante eget rhoncus dignissim, ex ex interdum arcu, quis commodo erat lectus non felis. Nulla malesuada dui non consectetur placerat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
    primaryButtonProps={{ children: 'primary button' }}
    secondaryButtonProps={{ children: 'secondary button' }}
    media={<img alt="test" src="https://placehold.co/170x85" />}
  />,
  <VerticalStep
    key={3}
    title="third step"
    description="In eleifend, ante eget rhoncus dignissim, ex ex interdum arcu, quis commodo erat lectus non felis. Nulla malesuada dui non consectetur placerat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In eleifend, ante eget rhoncus dignissim, ex ex interdum arcu, quis commodo erat lectus non felis. Nulla malesuada dui non consectetur placerat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In eleifend, ante eget rhoncus dignissim, ex ex interdum arcu, quis commodo erat lectus non felis. Nulla malesuada dui non consectetur placerat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In eleifend, ante eget rhoncus dignissim, ex ex interdum arcu, quis commodo erat lectus non felis."
    primaryButtonProps={{ children: 'primary button' }}
    secondaryButtonProps={{ children: 'secondary button' }}
    media={<img alt="test" src="https://placehold.co/170x100" />}
  />,
  <VerticalStep
    key={4}
    title="fourth step"
    description="Morbi et tellus dapibus, ultrices risus at, vestibulum urna. Vivamus lorem ex, iaculis sit amet bibendum eget, tristique in ante."
    primaryButtonProps={{ children: 'primary button' }}
  />,
  <VerticalStep
    key={5}
    title="fifth step"
    description="Morbi vitae imperdiet elit. Sed pharetra interdum sagittis. Ut venenatis neque id vestibulum varius. In sed dictum augue. Sed sed arcu mi."
  />,
  <VerticalStep
    key={6}
    title="sixth step"
    description="Sed sed arcu mi. Sed sed arcu mi. Sed sed arcu mi."
    primaryButtonProps={{ children: 'primary button' }}
    media={<img alt="test" src="https://placehold.co/800x620" />}
  />,
];

const renderVerticalStepper = ({
  currentStep: currentStepProp = 2,
  children = childrenData,
  ...props
}: Partial<VerticalStepperProps>) => {
  const utils = render(
    <VerticalStepper currentStep={currentStepProp} {...props}>
      {children}
    </VerticalStepper>,
  );

  const verticalStepper = utils.getByTestId(LGIDS_VERTICAL_STEPPER.root);
  const verticalSteps = utils.getAllByTestId(LGIDS_VERTICAL_STEPPER.step);
  const currentStep = verticalStepper.querySelectorAll(currentStepString);
  const completedSteps = verticalStepper.querySelectorAll(completedStepString);
  const futureSteps = verticalStepper.querySelectorAll(futureStepString);

  return {
    ...utils,
    verticalStepper,
    verticalSteps,
    currentStep,
    completedSteps,
    futureSteps,
  };
};

describe('packages/vertical-stepper', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderVerticalStepper({});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  test('warns if there is only 1 step', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <VerticalStepper currentStep={0}>
        <VerticalStep
          title="sixth step"
          description="Sed sed arcu mi. Sed sed arcu mi. Sed sed arcu mi."
          primaryButtonProps={{ children: 'primary button' }}
          media={<img alt="test" src="https://placehold.co/800x620" />}
        />
      </VerticalStepper>,
    );

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      'Two or more <VerticalStep/> components are required',
    );
    spy.mockClear();
  });

  describe('steps', () => {
    test('are all rendered', async () => {
      const { verticalSteps } = renderVerticalStepper({});
      expect(verticalSteps).toHaveLength(6);
    });

    describe('current', () => {
      test('has 1 current step', async () => {
        const { currentStep } = renderVerticalStepper({});
        expect(currentStep).toHaveLength(1);
      });
    });

    describe('completed', () => {
      test('has correct number of steps', async () => {
        const { completedSteps } = renderVerticalStepper({});
        expect(completedSteps).toHaveLength(2);
      });
    });

    describe('future', () => {
      test('has correct number of steps', async () => {
        const { futureSteps } = renderVerticalStepper({});
        expect(futureSteps).toHaveLength(3);
      });
    });
  });

  describe('TypeScript types are correct', () => {
    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('VerticalStepper component types', () => {
      <>
        {/* @ts-expect-error Missing children and currentStep */}
        <VerticalStepper />

        {/* @ts-expect-error Missing children */}
        <VerticalStepper currentStep={0} />

        {/* @ts-expect-error Missing currentStep */}
        <VerticalStepper>
          {/* @ts-expect-error Missing all props */}
          <VerticalStep />
        </VerticalStepper>

        <VerticalStepper currentStep={0}>
          {/* @ts-expect-error Missing all props */}
          <VerticalStep />
        </VerticalStepper>
      </>;
    });
  });
});
