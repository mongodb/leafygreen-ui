import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getTestUtils } from '../testing';
import { Wizard } from '../Wizard';
import { useWizardStepContext } from '../WizardStep';

import { WizardFooter } from '.';

describe('packages/wizard-footer', () => {
  test('does not render outside WizardContext', () => {
    const { container } = render(
      <WizardFooter
        data-testid="footer"
        primaryButtonProps={{ children: 'Next' }}
      >
        Content
      </WizardFooter>,
    );

    expect(container.firstChild).toBeNull();
  });

  test('renders in WizardContext', () => {
    render(
      <Wizard>
        <Wizard.Step>
          <WizardFooter
            data-testid="footer"
            primaryButtonProps={{ children: 'Next' }}
          >
            Content
          </WizardFooter>
        </Wizard.Step>
      </Wizard>,
    );

    const { getFooter } = getTestUtils();
    expect(getFooter()).toBeInTheDocument();
  });

  describe('primary button behavior', () => {
    test('primary button is enabled by default', () => {
      render(
        <Wizard>
          <Wizard.Step>
            <Wizard.Footer primaryButtonProps={{ children: 'Continue' }} />
          </Wizard.Step>
        </Wizard>,
      );

      const { isPrimaryButtonDisabled } = getTestUtils();
      expect(isPrimaryButtonDisabled()).toBe(false);
    });

    test('primary button advances to next step when clicked', async () => {
      const onStepChange = jest.fn();

      const { getByTestId } = render(
        <Wizard onStepChange={onStepChange}>
          <Wizard.Step>
            <div data-testid="step-1">Step 1</div>
            <Wizard.Footer primaryButtonProps={{ children: 'Next' }} />
          </Wizard.Step>
          <Wizard.Step>
            <div data-testid="step-2">Step 2</div>
            <Wizard.Footer primaryButtonProps={{ children: 'Finish' }} />
          </Wizard.Step>
        </Wizard>,
      );

      expect(getByTestId('step-1')).toBeInTheDocument();

      const { getPrimaryButton } = getTestUtils();
      userEvent.click(getPrimaryButton());

      expect(onStepChange).toHaveBeenCalledWith(1);
      expect(getByTestId('step-2')).toBeInTheDocument();
    });

    describe('requiresAcknowledgement', () => {
      test('primary button is disabled when step requires acknowledgement and is not acknowledged', () => {
        render(
          <Wizard>
            <Wizard.Step requiresAcknowledgement>
              <div>Step content</div>
              <Wizard.Footer primaryButtonProps={{ children: 'Continue' }} />
            </Wizard.Step>
          </Wizard>,
        );

        const { isPrimaryButtonDisabled } = getTestUtils();
        expect(isPrimaryButtonDisabled()).toBe(true);
      });

      test('primary button is enabled when step requires acknowledgement and is acknowledged', async () => {
        const TestComponent = () => {
          const { setAcknowledged } = useWizardStepContext();
          return (
            <>
              <div>Step content</div>
              <button onClick={() => setAcknowledged(true)}>Acknowledge</button>
              <Wizard.Footer primaryButtonProps={{ children: 'Continue' }} />
            </>
          );
        };

        const { getByRole } = render(
          <Wizard>
            <Wizard.Step requiresAcknowledgement>
              <TestComponent />
            </Wizard.Step>
          </Wizard>,
        );

        const { isPrimaryButtonDisabled } = getTestUtils();
        expect(isPrimaryButtonDisabled()).toBe(true);

        await userEvent.click(getByRole('button', { name: 'Acknowledge' }));

        expect(isPrimaryButtonDisabled()).toBe(false);
      });

      test('primary button is enabled when step does not require acknowledgement', () => {
        render(
          <Wizard>
            <Wizard.Step>
              <div>Step content</div>
              <Wizard.Footer primaryButtonProps={{ children: 'Continue' }} />
            </Wizard.Step>
          </Wizard>,
        );

        const { isPrimaryButtonDisabled } = getTestUtils();
        expect(isPrimaryButtonDisabled()).toBe(false);
      });

      test('primary button can advance step after acknowledgement', async () => {
        const TestComponent = () => {
          const { setAcknowledged } = useWizardStepContext();
          return (
            <>
              <div>Step content</div>
              <button onClick={() => setAcknowledged(true)}>Acknowledge</button>
              <Wizard.Footer primaryButtonProps={{ children: 'Continue' }} />
            </>
          );
        };

        const { getByRole, getByTestId } = render(
          <Wizard>
            <Wizard.Step requiresAcknowledgement>
              <div data-testid="step-1">Step 1</div>
              <TestComponent />
            </Wizard.Step>
            <Wizard.Step>
              <div data-testid="step-2">Step 2</div>
            </Wizard.Step>
          </Wizard>,
        );

        const { isPrimaryButtonDisabled, getPrimaryButton } = getTestUtils();

        expect(getByTestId('step-1')).toBeInTheDocument();
        expect(isPrimaryButtonDisabled()).toBe(true);

        // Acknowledge the step
        userEvent.click(getByRole('button', { name: 'Acknowledge' }));
        expect(isPrimaryButtonDisabled()).toBe(false);

        // Advance to next step
        userEvent.click(getPrimaryButton());
        expect(getByTestId('step-2')).toBeInTheDocument();
      });
    });
  });

  describe('back button', () => {
    test('back button is not rendered on first step', () => {
      render(
        <Wizard>
          <Wizard.Step>
            <Wizard.Footer
              primaryButtonProps={{ children: 'Next' }}
              backButtonProps={{ children: 'Back' }}
            />
          </Wizard.Step>
        </Wizard>,
      );

      const { queryBackButton } = getTestUtils();
      expect(queryBackButton()).not.toBeInTheDocument();
    });

    test('back button is rendered on subsequent steps', async () => {
      render(
        <Wizard>
          <Wizard.Step>
            <div data-testid="step-1">Step 1</div>
            <Wizard.Footer
              primaryButtonProps={{ children: 'Next' }}
              backButtonProps={{ children: 'Back' }}
            />
          </Wizard.Step>
          <Wizard.Step>
            <div data-testid="step-2">Step 2</div>
            <Wizard.Footer
              primaryButtonProps={{ children: 'Finish' }}
              backButtonProps={{ children: 'Back' }}
            />
          </Wizard.Step>
        </Wizard>,
      );

      const { getPrimaryButton, getBackButton } = getTestUtils();

      // Move to step 2
      userEvent.click(getPrimaryButton());

      // Back button should now be visible
      expect(getBackButton()).toBeInTheDocument();
    });

    test('back button navigates to previous step', async () => {
      const onStepChange = jest.fn();

      const { getByTestId } = render(
        <Wizard onStepChange={onStepChange}>
          <Wizard.Step>
            <div data-testid="step-1">Step 1</div>
            <Wizard.Footer
              primaryButtonProps={{ children: 'Next' }}
              backButtonProps={{ children: 'Back' }}
            />
          </Wizard.Step>
          <Wizard.Step>
            <div data-testid="step-2">Step 2</div>
            <Wizard.Footer
              primaryButtonProps={{ children: 'Finish' }}
              backButtonProps={{ children: 'Back' }}
            />
          </Wizard.Step>
        </Wizard>,
      );

      const { getPrimaryButton, getBackButton } = getTestUtils();

      // Move to step 2
      userEvent.click(getPrimaryButton());
      expect(getByTestId('step-2')).toBeInTheDocument();

      // Go back to step 1
      userEvent.click(getBackButton());
      expect(onStepChange).toHaveBeenCalledWith(0);
      expect(getByTestId('step-1')).toBeInTheDocument();
    });
  });
});
