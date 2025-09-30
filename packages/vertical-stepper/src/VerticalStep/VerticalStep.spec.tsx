import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '@leafygreen-ui/button';

import { LGIDS_VERTICAL_STEPPER } from '../constants';

import { State } from './VerticalStep.types';
import {
  InternalVerticalStep,
  InternalVerticalStepProps,
  VerticalStep,
} from '.';

const titleText = 'This is the title';
const descriptionText = 'This is the description';

const renderVerticalStep = ({
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
        const { getByTestId } = renderVerticalStep({});
        const title = getByTestId(LGIDS_VERTICAL_STEPPER.stepTitle);
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent(titleText);
      });
      test('description renders', () => {
        const { getByTestId } = renderVerticalStep({});
        const description = getByTestId(LGIDS_VERTICAL_STEPPER.stepDescription);
        expect(description).toBeInTheDocument();
        expect(description).toHaveTextContent(descriptionText);
      });

      describe('media', () => {
        test('renders', () => {
          const { getByTestId } = renderVerticalStep({
            media: <img alt="test" src="https://placehold.co/800x620" />,
          });
          const media = getByTestId(LGIDS_VERTICAL_STEPPER.stepMedia);
          expect(media).toBeInTheDocument();
        });
        test('does not render', () => {
          const { queryByTestId } = renderVerticalStep({});
          const media = queryByTestId(LGIDS_VERTICAL_STEPPER.stepMedia);
          expect(media).not.toBeInTheDocument();
        });
      });

      describe('actions', () => {
        test('render', () => {
          const { getByTestId } = renderVerticalStep({
            actions: <Button>primary button</Button>,
          });
          const actions = getByTestId(LGIDS_VERTICAL_STEPPER.stepActions);
          expect(actions).toBeInTheDocument();
          expect(actions).toHaveTextContent('primary button');
        });
        test('does not render', () => {
          const { queryByTestId } = renderVerticalStep({});
          const actions = queryByTestId(LGIDS_VERTICAL_STEPPER.stepActions);
          expect(actions).not.toBeInTheDocument();
        });
      });
    });

    describe('current', () => {
      test('aria-current is "step"', async () => {
        const { verticalStep } = renderVerticalStep({});
        expect(verticalStep).toHaveAttribute('data-state', State.Current);
        expect(verticalStep).toHaveAttribute('aria-current', 'step');
      });

      test('buttons are tabbable', async () => {
        const buttonTestId = 'test-button';
        const { getByTestId } = renderVerticalStep({
          actions: <Button data-testid={buttonTestId}>primary button</Button>,
        });
        const button = getByTestId(buttonTestId);
        userEvent.tab();
        expect(button).toHaveFocus();
      });
    });

    describe('completed', () => {
      test('aria-current is false', async () => {
        const { verticalStep } = renderVerticalStep({
          state: State.Completed,
        });
        expect(verticalStep).toHaveAttribute('data-state', State.Completed);
        expect(verticalStep).toHaveAttribute('aria-current', 'false');
      });

      test('buttons are not tabbable', async () => {
        const { getByTestId } = renderVerticalStep({
          state: State.Completed,
          actions: <Button>primary button</Button>,
        });
        const actions = getByTestId(LGIDS_VERTICAL_STEPPER.stepActions);
        // should test with .not.toHaveFocus() but jsdom does not currently support the `inert` attribute: https://github.com/jsdom/jsdom/issues/3605
        expect(actions).toHaveAttribute('inert');
      });
    });

    describe('future', () => {
      test('aria-current is false', async () => {
        const { verticalStep } = renderVerticalStep({
          state: State.Future,
        });
        expect(verticalStep).toHaveAttribute('data-state', State.Future);
        expect(verticalStep).toHaveAttribute('aria-current', 'false');
      });

      test('buttons are not tabbable', async () => {
        const { getByTestId } = renderVerticalStep({
          state: State.Future,
          actions: <Button>primary button</Button>,
        });
        const actions = getByTestId(LGIDS_VERTICAL_STEPPER.stepActions);
        // should test with .not.toHaveFocus() but jsdom does not currently support the `inert` attribute: https://github.com/jsdom/jsdom/issues/3605
        expect(actions).toHaveAttribute('inert');
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
          actions={<Button onClick={() => {}}>primary button</Button>}
        />
      </>;
    });
  });
});
