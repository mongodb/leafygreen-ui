import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Wizard } from '../Wizard/Wizard';

import { useWizardStepContext, WizardStep } from '.';

describe('packages/wizard-step', () => {
  test('does not render outside WizardContext', () => {
    const { container } = render(
      <WizardStep data-testid="step-1">Content</WizardStep>,
    );

    expect(container.firstChild).toBeNull();
  });

  test('renders in WizardContext', () => {
    const { getByTestId } = render(
      <Wizard>
        <Wizard.Step>
          <div data-testid="step-1">Content</div>
        </Wizard.Step>
      </Wizard>,
    );

    expect(getByTestId('step-1')).toBeInTheDocument();
  });

  describe('requiresAcknowledgement', () => {
    test('when false, does not require acknowledgement', () => {
      const TestComponent = () => {
        const { requiresAcknowledgement } = useWizardStepContext();
        return (
          <div data-testid="requires-ack">
            {String(requiresAcknowledgement)}
          </div>
        );
      };

      const { getByTestId } = render(
        <Wizard>
          <Wizard.Step>
            <TestComponent />
          </Wizard.Step>
        </Wizard>,
      );

      expect(getByTestId('requires-ack')).toHaveTextContent('false');
    });

    test('when true, requires acknowledgement', () => {
      const TestComponent = () => {
        const { requiresAcknowledgement } = useWizardStepContext();
        return (
          <div data-testid="requires-ack">
            {String(requiresAcknowledgement)}
          </div>
        );
      };

      const { getByTestId } = render(
        <Wizard>
          <Wizard.Step requiresAcknowledgement>
            <TestComponent />
          </Wizard.Step>
        </Wizard>,
      );

      expect(getByTestId('requires-ack')).toHaveTextContent('true');
    });

    test('isAcknowledged starts as false', () => {
      const TestComponent = () => {
        const { isAcknowledged } = useWizardStepContext();
        return <div data-testid="is-ack">{String(isAcknowledged)}</div>;
      };

      const { getByTestId } = render(
        <Wizard>
          <Wizard.Step requiresAcknowledgement>
            <TestComponent />
          </Wizard.Step>
        </Wizard>,
      );

      expect(getByTestId('is-ack')).toHaveTextContent('false');
    });

    test('setAcknowledged updates isAcknowledged state', async () => {
      const TestComponent = () => {
        const { isAcknowledged, setAcknowledged } = useWizardStepContext();
        return (
          <>
            <div data-testid="is-ack">{String(isAcknowledged)}</div>
            <button onClick={() => setAcknowledged(true)}>Acknowledge</button>
          </>
        );
      };

      const { getByTestId, getByRole } = render(
        <Wizard>
          <Wizard.Step requiresAcknowledgement>
            <TestComponent />
          </Wizard.Step>
        </Wizard>,
      );

      expect(getByTestId('is-ack')).toHaveTextContent('false');

      await userEvent.click(getByRole('button', { name: 'Acknowledge' }));

      expect(getByTestId('is-ack')).toHaveTextContent('true');
    });

    test('acknowledgement state resets between steps', async () => {
      const TestComponent = () => {
        const { isAcknowledged, setAcknowledged } = useWizardStepContext();
        return (
          <>
            <div data-testid="is-ack">{String(isAcknowledged)}</div>
            <button onClick={() => setAcknowledged(true)}>Acknowledge</button>
          </>
        );
      };

      const { getByTestId, getByRole } = render(
        <Wizard>
          <Wizard.Step requiresAcknowledgement>
            <TestComponent />
          </Wizard.Step>
          <Wizard.Step requiresAcknowledgement>
            <TestComponent />
          </Wizard.Step>
        </Wizard>,
      );

      // Step 1: acknowledge and move forward
      expect(getByTestId('is-ack')).toHaveTextContent('false');
      await userEvent.click(getByRole('button', { name: 'Acknowledge' }));
      expect(getByTestId('is-ack')).toHaveTextContent('true');

      // Step 2: acknowledgement should be reset to false
      expect(getByTestId('is-ack')).toHaveTextContent('false');
    });
  });
});
