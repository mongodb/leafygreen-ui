import React from 'react';
import { render } from '@testing-library/react';

import { LGIDS_VERTICAL_STEPPER } from '../constants';

import { State } from './VerticalStep.types';
import {
  InternalVerticalStep,
  InternalVerticalStepProps,
  VerticalStep,
} from '.';

const titleText = 'This is the title';
const descriptionText = 'This is the description';

const renderVerticalStepper = ({
  title = titleText,
  description = descriptionText,
  state = State.Current,
  ...props
}: Partial<InternalVerticalStepProps>) => {
  const utils = render(
    <InternalVerticalStep
      state={state}
      title={title}
      description={description}
      index={1}
      {...props}
    />,
  );

  const verticalStep = utils.getByTestId(LGIDS_VERTICAL_STEPPER.step);

  return {
    ...utils,
    verticalStep,
  };
};

describe('packages/vertical-step', () => {
  describe('step', () => {
    describe('rendering', () => {
      test('title renders', () => {
        const { getByTestId } = renderVerticalStepper({});
        const title = getByTestId(LGIDS_VERTICAL_STEPPER.stepTitle);
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent(titleText);
      });
      test('description renders', () => {
        const { getByTestId } = renderVerticalStepper({});
        const description = getByTestId(LGIDS_VERTICAL_STEPPER.stepDescription);
        expect(description).toBeInTheDocument();
        expect(description).toHaveTextContent(descriptionText);
      });

      describe('media', () => {
        test('renders', () => {
          const { getByTestId } = renderVerticalStepper({
            media: <img alt="test" src="https://placehold.co/800x620" />,
          });
          const media = getByTestId(LGIDS_VERTICAL_STEPPER.stepMedia);
          expect(media).toBeInTheDocument();
        });
        test('does not render', () => {
          const { queryByTestId } = renderVerticalStepper({});
          const media = queryByTestId(LGIDS_VERTICAL_STEPPER.stepMedia);
          expect(media).not.toBeInTheDocument();
        });
      });

      describe('ctas', () => {
        test('primaryButton renders', () => {
          const { getByTestId } = renderVerticalStepper({
            primaryButtonProps: {
              children: 'primary button',
            },
          });
          const primaryButton = getByTestId(
            LGIDS_VERTICAL_STEPPER.stepPrimaryButton,
          );
          expect(primaryButton).toBeInTheDocument();
          expect(primaryButton).toHaveTextContent('primary button');
        });
        test('secondaryButton renders', () => {
          const { getByTestId } = renderVerticalStepper({
            primaryButtonProps: {
              children: 'primary button',
            },
            secondaryButtonProps: {
              children: 'secondary button',
            },
          });
          const secondaryButton = getByTestId(
            LGIDS_VERTICAL_STEPPER.stepSecondaryButton,
          );
          expect(secondaryButton).toBeInTheDocument();
          expect(secondaryButton).toHaveTextContent('secondary button');
        });
        test('secondaryButton does not render without a primaryButton', () => {
          const { queryByTestId } = renderVerticalStepper({
            secondaryButtonProps: {
              children: 'secondary button',
            },
          });
          const secondaryButton = queryByTestId(
            LGIDS_VERTICAL_STEPPER.stepSecondaryButton,
          );
          expect(secondaryButton).not.toBeInTheDocument();
        });
      });
    });

    describe('current', () => {
      test('aria-current is "step"', async () => {
        const { verticalStep } = renderVerticalStepper({});
        expect(verticalStep).toHaveAttribute('data-state', State.Current);
        expect(verticalStep).toHaveAttribute('aria-current', 'step');
      });

      test('buttons are tabbable', async () => {
        const { verticalStep } = renderVerticalStepper({
          primaryButtonProps: {
            children: 'primary button',
          },
        });
        const tabIndex = verticalStep.querySelectorAll("button[tabindex='-1']");
        expect(tabIndex).toHaveLength(0);
      });
    });

    describe('completed', () => {
      test('aria-current is false', async () => {
        const { verticalStep } = renderVerticalStepper({
          state: State.Completed,
        });
        expect(verticalStep).toHaveAttribute('data-state', State.Completed);
        expect(verticalStep).toHaveAttribute('aria-current', 'false');
      });

      test('buttons are not tabbable', async () => {
        const { verticalStep } = renderVerticalStepper({
          state: State.Completed,
          primaryButtonProps: {
            children: 'primary button',
          },
        });
        const tabIndex = verticalStep.querySelectorAll("button[tabindex='-1']");
        expect(tabIndex).toHaveLength(1);
      });
    });

    describe('future', () => {
      test('aria-current is false', async () => {
        const { verticalStep } = renderVerticalStepper({
          state: State.Future,
        });
        expect(verticalStep).toHaveAttribute('data-state', State.Future);
        expect(verticalStep).toHaveAttribute('aria-current', 'false');
      });

      test('buttons are not tabbable', async () => {
        const { verticalStep } = renderVerticalStepper({
          state: State.Future,
          primaryButtonProps: {
            children: 'primary button',
          },
        });
        const tabIndex = verticalStep.querySelectorAll("button[tabindex='-1']");
        expect(tabIndex).toHaveLength(1);
      });
    });
  });

  describe('TypeScript types are correct', () => {
    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('VerticalStepper component types', () => {
      <>
        <VerticalStep title="title" description="desc" />

        {/* @ts-expect-error Missing title and description */}
        <VerticalStep />

        <VerticalStep
          title="title"
          description="desc"
          media={<img alt="test" src="https://placehold.co/170x85" />}
          primaryButtonProps={{ children: 'primary button', onClick: () => {} }}
          secondaryButtonProps={{
            children: 'secondary button',
            onClick: () => {},
          }}
        />
      </>;
    });
  });
});
