import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Wizard } from '.';

describe('packages/wizard', () => {
  describe('rendering', () => {
    test('renders first Wizard.Step', () => {
      const { getByText, getByTestId, queryByText, queryByTestId } = render(
        <Wizard>
          <Wizard.Step title="Step 1" description="First step">
            <div data-testid="step-1-content">Step 1 content</div>
          </Wizard.Step>
          <Wizard.Step title="Step 2">
            <div data-testid="step-2-content">Step 2 content</div>
          </Wizard.Step>
        </Wizard>,
      );
      expect(getByTestId('step-1-content')).toBeInTheDocument();
      expect(queryByTestId('step-2-content')).not.toBeInTheDocument();
    });

    test('renders Wizard.Footer', () => {
      const { getByTestId } = render(
        <Wizard>
          <Wizard.Step title="Step 1">
            <div data-testid="step-content">Content</div>
          </Wizard.Step>
          <Wizard.Footer
            data-testid="wizard-footer"
            primaryButtonProps={{ children: 'Next' }}
            cancelButtonProps={{ children: 'Cancel' }}
          />
        </Wizard>,
      );

      expect(getByTestId('wizard-footer')).toBeInTheDocument();
    });

    test('does not render any other elements', () => {
      const { queryByTestId } = render(
        <Wizard>
          <div data-testid="invalid-element-1">This should not render</div>
        </Wizard>,
      );

      // Non-wizard elements should not be rendered
      expect(queryByTestId('invalid-element-1')).not.toBeInTheDocument();
    });

    test('renders correct step when activeStep is provided', () => {
      const { queryByTestId, getByTestId } = render(
        <Wizard activeStep={1}>
          <Wizard.Step title="Step 1">
            <div data-testid="step-1-content">Step 1 content</div>
          </Wizard.Step>
          <Wizard.Step title="Step 2">
            <div data-testid="step-2-content">Step 2 content</div>
          </Wizard.Step>
        </Wizard>,
      );

      // Should render the second step when activeStep is 1
      expect(queryByTestId('step-1-content')).not.toBeInTheDocument();
      expect(getByTestId('step-2-content')).toBeInTheDocument();
    });

    test('does not render back button on first step', () => {
      const { queryByRole, getByRole } = render(
        <Wizard activeStep={0}>
          <Wizard.Step title="Step 1">
            <div data-testid="step-1-content">Content 1</div>
          </Wizard.Step>
          <Wizard.Step title="Step 2">
            <div data-testid="step-2-content">Content 2</div>
          </Wizard.Step>
          <Wizard.Footer
            backButtonProps={{ children: 'Back' }}
            primaryButtonProps={{ children: 'Next' }}
          />
        </Wizard>,
      );

      // Back button should not be rendered on first step
      expect(queryByRole('button', { name: 'Back' })).not.toBeInTheDocument();
      expect(getByRole('button', { name: 'Next' })).toBeInTheDocument();
    });

    test('renders back button on second step', () => {
      const { getByRole } = render(
        <Wizard activeStep={1}>
          <Wizard.Step title="Step 1">
            <div data-testid="step-1-content">Content 1</div>
          </Wizard.Step>
          <Wizard.Step title="Step 2">
            <div data-testid="step-2-content">Content 2</div>
          </Wizard.Step>
          <Wizard.Footer
            backButtonProps={{ children: 'Back' }}
            primaryButtonProps={{ children: 'Next' }}
          />
        </Wizard>,
      );

      expect(getByRole('button', { name: 'Back' })).toBeInTheDocument();
      expect(getByRole('button', { name: 'Next' })).toBeInTheDocument();
    });
  });

  describe('interaction', () => {
    test('calls `onStepChange` when incrementing step', async () => {
      const onStepChange = jest.fn();

      const { getByRole } = render(
        <Wizard activeStep={0} onStepChange={onStepChange}>
          <Wizard.Step title="Step 1">
            <div data-testid="step-1-content">Content 1</div>
          </Wizard.Step>
          <Wizard.Step title="Step 2">
            <div data-testid="step-2-content">Content 2</div>
          </Wizard.Step>
          <Wizard.Footer primaryButtonProps={{ children: 'Next' }} />
        </Wizard>,
      );

      await userEvent.click(getByRole('button', { name: 'Next' }));

      expect(onStepChange).toHaveBeenCalledWith(1);
    });

    test('calls `onStepChange` when decrementing step', async () => {
      const onStepChange = jest.fn();

      const { getByRole } = render(
        <Wizard activeStep={1} onStepChange={onStepChange}>
          <Wizard.Step title="Step 1">
            <div data-testid="step-1-content">Content 1</div>
          </Wizard.Step>
          <Wizard.Step title="Step 2">
            <div data-testid="step-2-content">Content 2</div>
          </Wizard.Step>
          <Wizard.Footer
            backButtonProps={{ children: 'Back' }}
            primaryButtonProps={{ children: 'Next' }}
          />
        </Wizard>,
      );

      await userEvent.click(getByRole('button', { name: 'Back' }));

      expect(onStepChange).toHaveBeenCalledWith(0);
    });

    test('calls custom button onClick handlers', async () => {
      const onStepChange = jest.fn();
      const onBackClick = jest.fn();
      const onPrimaryClick = jest.fn();
      const onCancelClick = jest.fn();

      const { getByRole } = render(
        <Wizard activeStep={1} onStepChange={onStepChange}>
          <Wizard.Step title="Step 1">
            <div data-testid="step-1-content">Content 1</div>
          </Wizard.Step>
          <Wizard.Step title="Step 2">
            <div data-testid="step-2-content">Content 2</div>
          </Wizard.Step>
          <Wizard.Footer
            backButtonProps={{ children: 'Back', onClick: onBackClick }}
            primaryButtonProps={{ children: 'Next', onClick: onPrimaryClick }}
            cancelButtonProps={{ children: 'Cancel', onClick: onCancelClick }}
          />
        </Wizard>,
      );

      await userEvent.click(getByRole('button', { name: 'Back' }));
      expect(onBackClick).toHaveBeenCalled();
      expect(onStepChange).toHaveBeenCalledWith(0);

      await userEvent.click(getByRole('button', { name: 'Next' }));
      expect(onPrimaryClick).toHaveBeenCalled();
      expect(onStepChange).toHaveBeenCalledWith(1);

      await userEvent.click(getByRole('button', { name: 'Cancel' }));
      expect(onCancelClick).toHaveBeenCalled();
    });

    describe('uncontrolled', () => {
      test('does not increment step beyond Steps count', async () => {
        const { getByText, queryByText, getByRole, queryByRole } = render(
          <Wizard>
            <Wizard.Step title="Step 1">
              <div data-testid="step-1-content">Content 1</div>
            </Wizard.Step>
            <Wizard.Step title="Step 2">
              <div data-testid="step-2-content">Content 2</div>
            </Wizard.Step>
            <Wizard.Footer primaryButtonProps={{ children: 'Next' }} />
          </Wizard>,
        );

        // Start at step 1
        expect(getByText('Step 1')).toBeInTheDocument();

        // Click next to go to step 2
        await userEvent.click(getByRole('button', { name: 'Next' }));
        expect(getByText('Step 2')).toBeInTheDocument();
        expect(queryByText('Step 1')).not.toBeInTheDocument();

        // Click next again - should stay at step 2 (last step)
        await userEvent.click(getByRole('button', { name: 'Next' }));
        expect(getByText('Step 2')).toBeInTheDocument();
        expect(queryByText('Step 1')).not.toBeInTheDocument();
      });
    });

    describe('controlled', () => {
      test('does not change steps internally when controlled', async () => {
        const onStepChange = jest.fn();

        const { getByText, queryByText, getByRole, queryByRole } = render(
          <Wizard activeStep={0} onStepChange={onStepChange}>
            <Wizard.Step title="Step 1">
              <div data-testid="step-1-content">Content 1</div>
            </Wizard.Step>
            <Wizard.Step title="Step 2">
              <div data-testid="step-2-content">Content 2</div>
            </Wizard.Step>
            <Wizard.Footer primaryButtonProps={{ children: 'Next' }} />
          </Wizard>,
        );

        // Should start at step 1
        expect(getByText('Step 1')).toBeInTheDocument();

        // Click next
        await userEvent.click(getByRole('button', { name: 'Next' }));

        // Should still be at step 1 since it's controlled
        expect(getByText('Step 1')).toBeInTheDocument();
        expect(queryByText('Step 2')).not.toBeInTheDocument();

        // But onStepChange should have been called
        expect(onStepChange).toHaveBeenCalledWith(1);
      });
    });
  });
});
