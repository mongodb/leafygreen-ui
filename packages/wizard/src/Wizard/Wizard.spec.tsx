import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getTestUtils } from '../testing';
import { useWizardStepContext } from '../WizardStep';

import { Wizard } from '.';

describe('packages/wizard', () => {
  describe('rendering', () => {
    test('renders first Wizard.Step', () => {
      const { getByTestId, queryByTestId } = render(
        <Wizard>
          <Wizard.Step>
            <div data-testid="step-1-content">Step 1 content</div>
          </Wizard.Step>
          <Wizard.Step>
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
          <Wizard.Step>
            <div data-testid="step-content">Content</div>
            <Wizard.Footer
              data-testid="wizard-footer"
              primaryButtonProps={{ children: 'Next' }}
              cancelButtonProps={{ children: 'Cancel' }}
            />
          </Wizard.Step>
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
          <Wizard.Step>
            <div data-testid="step-1-content">Step 1 content</div>
          </Wizard.Step>
          <Wizard.Step>
            <div data-testid="step-2-content">Step 2 content</div>
          </Wizard.Step>
        </Wizard>,
      );

      // Should render the second step when activeStep is 1
      expect(queryByTestId('step-1-content')).not.toBeInTheDocument();
      expect(getByTestId('step-2-content')).toBeInTheDocument();
    });

    test('does not render back button on first step', () => {
      render(
        <Wizard activeStep={0}>
          <Wizard.Step>
            <div data-testid="step-1-content">Content 1</div>
            <Wizard.Footer
              backButtonProps={{ children: 'Back' }}
              primaryButtonProps={{ children: 'Next' }}
            />
          </Wizard.Step>
          <Wizard.Step>
            <div data-testid="step-2-content">Content 2</div>
            <Wizard.Footer
              backButtonProps={{ children: 'Back' }}
              primaryButtonProps={{ children: 'Next' }}
            />
          </Wizard.Step>
        </Wizard>,
      );

      const { queryBackButton, getPrimaryButton } = getTestUtils();

      // Back button should not be rendered on first step
      expect(queryBackButton()).not.toBeInTheDocument();
      expect(getPrimaryButton()).toBeInTheDocument();
    });

    test('renders back button on second step', () => {
      render(
        <Wizard activeStep={1}>
          <Wizard.Step>
            <div data-testid="step-1-content">Content 1</div>
            <Wizard.Footer
              backButtonProps={{ children: 'Back' }}
              primaryButtonProps={{ children: 'Next' }}
            />
          </Wizard.Step>
          <Wizard.Step>
            <div data-testid="step-2-content">Content 2</div>
            <Wizard.Footer
              backButtonProps={{ children: 'Back' }}
              primaryButtonProps={{ children: 'Next' }}
            />
          </Wizard.Step>
        </Wizard>,
      );

      const { getBackButton, getPrimaryButton } = getTestUtils();

      expect(getBackButton()).toBeInTheDocument();
      expect(getPrimaryButton()).toBeInTheDocument();
    });
  });

  describe('interaction', () => {
    test('calls `onStepChange` when incrementing step', async () => {
      const onStepChange = jest.fn();

      render(
        <Wizard activeStep={0} onStepChange={onStepChange}>
          <Wizard.Step>
            <div data-testid="step-1-content">Content 1</div>
            <Wizard.Footer primaryButtonProps={{ children: 'Next' }} />
          </Wizard.Step>
          <Wizard.Step>
            <div data-testid="step-2-content">Content 2</div>
            <Wizard.Footer primaryButtonProps={{ children: 'Next' }} />
          </Wizard.Step>
        </Wizard>,
      );

      const { getPrimaryButton } = getTestUtils();
      userEvent.click(getPrimaryButton());

      expect(onStepChange).toHaveBeenCalledWith(1);
    });

    test('calls `onStepChange` when decrementing step', async () => {
      const onStepChange = jest.fn();

      render(
        <Wizard activeStep={1} onStepChange={onStepChange}>
          <Wizard.Step>
            <div data-testid="step-1-content">Content 1</div>
            <Wizard.Footer
              backButtonProps={{ children: 'Back' }}
              primaryButtonProps={{ children: 'Next' }}
            />
          </Wizard.Step>
          <Wizard.Step>
            <div data-testid="step-2-content">Content 2</div>
            <Wizard.Footer
              backButtonProps={{ children: 'Back' }}
              primaryButtonProps={{ children: 'Next' }}
            />
          </Wizard.Step>
        </Wizard>,
      );

      const { getBackButton } = getTestUtils();
      userEvent.click(getBackButton());

      expect(onStepChange).toHaveBeenCalledWith(0);
    });

    test('calls custom button onClick handlers', async () => {
      const onStepChange = jest.fn();
      const onBackClick = jest.fn();
      const onPrimaryClick = jest.fn();
      const onCancelClick = jest.fn();

      render(
        <Wizard activeStep={1} onStepChange={onStepChange}>
          <Wizard.Step>
            <div data-testid="step-1-content">Content 1</div>
            <Wizard.Footer
              backButtonProps={{ children: 'Back', onClick: onBackClick }}
              primaryButtonProps={{ children: 'Next', onClick: onPrimaryClick }}
              cancelButtonProps={{ children: 'Cancel', onClick: onCancelClick }}
            />
          </Wizard.Step>
          <Wizard.Step>
            <div data-testid="step-2-content">Content 2</div>
            <Wizard.Footer
              backButtonProps={{ children: 'Back', onClick: onBackClick }}
              primaryButtonProps={{ children: 'Next', onClick: onPrimaryClick }}
              cancelButtonProps={{ children: 'Cancel', onClick: onCancelClick }}
            />
          </Wizard.Step>
        </Wizard>,
      );

      const { getBackButton, getPrimaryButton, getCancelButton } =
        getTestUtils();

      userEvent.click(getBackButton());
      expect(onBackClick).toHaveBeenCalled();
      expect(onStepChange).toHaveBeenCalledWith(0);

      userEvent.click(getPrimaryButton());
      expect(onPrimaryClick).toHaveBeenCalled();
      expect(onStepChange).toHaveBeenCalledWith(1);

      userEvent.click(getCancelButton());
      expect(onCancelClick).toHaveBeenCalled();
    });

    describe('uncontrolled', () => {
      test('does not increment step beyond Steps count', async () => {
        const { getByTestId, queryByTestId } = render(
          <Wizard>
            <Wizard.Step>
              <div data-testid="step-1-content">Content 1</div>
              <Wizard.Footer primaryButtonProps={{ children: 'Next' }} />
            </Wizard.Step>
            <Wizard.Step>
              <div data-testid="step-2-content">Content 2</div>
              <Wizard.Footer primaryButtonProps={{ children: 'Next' }} />
            </Wizard.Step>
          </Wizard>,
        );

        const { getPrimaryButton } = getTestUtils();

        // Start at step 1
        expect(getByTestId('step-1-content')).toBeInTheDocument();

        // Click next to go to step 2
        userEvent.click(getPrimaryButton());
        expect(getByTestId('step-2-content')).toBeInTheDocument();
        expect(queryByTestId('step-1-content')).not.toBeInTheDocument();

        // Click next again - should stay at step 2 (last step)
        userEvent.click(getPrimaryButton());
        expect(getByTestId('step-2-content')).toBeInTheDocument();
        expect(queryByTestId('step-1-content')).not.toBeInTheDocument();
      });
    });

    describe('controlled', () => {
      test('does not change steps internally when controlled', async () => {
        const onStepChange = jest.fn();

        const { getByTestId, queryByTestId } = render(
          <Wizard activeStep={0} onStepChange={onStepChange}>
            <Wizard.Step>
              <div data-testid="step-1-content">Content 1</div>
              <Wizard.Footer primaryButtonProps={{ children: 'Next' }} />
            </Wizard.Step>
            <Wizard.Step>
              <div data-testid="step-2-content">Content 2</div>
              <Wizard.Footer primaryButtonProps={{ children: 'Next' }} />
            </Wizard.Step>
          </Wizard>,
        );

        const { getPrimaryButton } = getTestUtils();

        // Should start at step 1
        expect(getByTestId('step-1-content')).toBeInTheDocument();

        // Click next
        userEvent.click(getPrimaryButton());

        // Should still be at step 1 since it's controlled
        expect(getByTestId('step-1-content')).toBeInTheDocument();
        expect(queryByTestId('step-2-content')).not.toBeInTheDocument();

        // But onStepChange should have been called
        expect(onStepChange).toHaveBeenCalledWith(1);
      });

      test('warns when activeStep exceeds number of steps', () => {
        const consoleWarnSpy = jest
          .spyOn(console, 'warn')
          .mockImplementation(() => {});

        render(
          <Wizard activeStep={5}>
            <Wizard.Step>
              <div data-testid="step-1-content">Content 1</div>
            </Wizard.Step>
            <Wizard.Step>
              <div data-testid="step-2-content">Content 2</div>
            </Wizard.Step>
          </Wizard>,
        );

        expect(consoleWarnSpy).toHaveBeenCalledWith(
          'LeafyGreen Wizard received (zero-indexed) `activeStep` prop exceeding the number of Steps provided\n',
          'Received activeStep: 5, Wizard.Steps count: 2',
        );

        consoleWarnSpy.mockRestore();
      });

      test('warns when activeStep is negative', () => {
        const consoleWarnSpy = jest
          .spyOn(console, 'warn')
          .mockImplementation(() => {});

        render(
          <Wizard activeStep={-1}>
            <Wizard.Step>
              <div data-testid="step-1-content">Content 1</div>
            </Wizard.Step>
            <Wizard.Step>
              <div data-testid="step-2-content">Content 2</div>
            </Wizard.Step>
          </Wizard>,
        );

        expect(consoleWarnSpy).toHaveBeenCalledWith(
          'LeafyGreen Wizard received (zero-indexed) `activeStep` prop exceeding the number of Steps provided\n',
          'Received activeStep: -1, Wizard.Steps count: 2',
        );

        consoleWarnSpy.mockRestore();
      });
    });

    describe('requiresAcknowledgement', () => {
      test('disables primary button when requiresAcknowledgement is true and not acknowledged', () => {
        render(
          <Wizard>
            <Wizard.Step requiresAcknowledgement>
              <div data-testid="step-1-content">Content 1</div>
              <Wizard.Footer primaryButtonProps={{ children: 'Next' }} />
            </Wizard.Step>
          </Wizard>,
        );

        const { isPrimaryButtonDisabled } = getTestUtils();
        expect(isPrimaryButtonDisabled()).toBe(true);
      });

      test('enables primary button when requiresAcknowledgement is true and acknowledged', async () => {
        const AcknowledgeButton = () => {
          const { setAcknowledged } = useWizardStepContext();
          return (
            <button onClick={() => setAcknowledged(true)}>Acknowledge</button>
          );
        };

        const { getByRole } = render(
          <Wizard>
            <Wizard.Step requiresAcknowledgement>
              <div data-testid="step-1-content">Content 1</div>
              <AcknowledgeButton />
              <Wizard.Footer primaryButtonProps={{ children: 'Next' }} />
            </Wizard.Step>
          </Wizard>,
        );

        const { isPrimaryButtonDisabled } = getTestUtils();
        expect(isPrimaryButtonDisabled()).toBe(true);

        // Acknowledge the step
        const acknowledgeButton = getByRole('button', { name: 'Acknowledge' });
        userEvent.click(acknowledgeButton);

        expect(isPrimaryButtonDisabled()).toBe(false);
      });

      test('enables primary button when requiresAcknowledgement is false', () => {
        render(
          <Wizard>
            <Wizard.Step requiresAcknowledgement={false}>
              <div data-testid="step-1-content">Content 1</div>
              <Wizard.Footer primaryButtonProps={{ children: 'Next' }} />
            </Wizard.Step>
          </Wizard>,
        );

        const { isPrimaryButtonDisabled } = getTestUtils();
        expect(isPrimaryButtonDisabled()).toBe(false);
      });

      test('enables primary button when requiresAcknowledgement is not set (default)', () => {
        render(
          <Wizard>
            <Wizard.Step>
              <div data-testid="step-1-content">Content 1</div>
              <Wizard.Footer primaryButtonProps={{ children: 'Next' }} />
            </Wizard.Step>
          </Wizard>,
        );

        const { isPrimaryButtonDisabled } = getTestUtils();
        expect(isPrimaryButtonDisabled()).toBe(false);
      });
    });
  });
});
