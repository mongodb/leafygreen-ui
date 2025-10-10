import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Wizard } from '../Wizard';

import { getTestUtils } from './getTestUtils';

function renderWizard() {
  render(
    <Wizard>
      <Wizard.Step title="Step 1">
        <p>Content for step 1</p>
      </Wizard.Step>
      <Wizard.Step title="Step 2">
        <p>Content for step 2</p>
      </Wizard.Step>
      <Wizard.Step title="Step 3">
        <p>Content for step 3</p>
      </Wizard.Step>
      <Wizard.Footer
        primaryButtonProps={{
          children: 'Next',
        }}
        cancelButtonProps={{
          children: 'Cancel',
        }}
      />
    </Wizard>,
  );
  return getTestUtils();
}

function renderWizardWithoutFooter() {
  render(
    <Wizard>
      <Wizard.Step title="Step 1">
        <p>Content for step 1</p>
      </Wizard.Step>
      <Wizard.Step title="Step 2">
        <p>Content for step 2</p>
      </Wizard.Step>
    </Wizard>,
  );
  return getTestUtils();
}

function renderMultipleWizards() {
  render(
    <>
      <Wizard data-lgid="lg-wizard-1">
        <Wizard.Step title="Wizard 1 Step">
          <p>Content</p>
        </Wizard.Step>
        <Wizard.Footer
          primaryButtonProps={{
            children: 'Next',
          }}
        />
      </Wizard>
      <Wizard data-lgid="lg-wizard-2">
        <Wizard.Step title="Wizard 2 Step">
          <p>Content</p>
        </Wizard.Step>
        <Wizard.Footer
          primaryButtonProps={{
            children: 'Continue',
          }}
        />
      </Wizard>
    </>,
  );
}

describe('packages/wizard/getTestUtils', () => {
  describe('throws error if Wizard is not found', () => {
    test('getWizard', () => {
      render(<div />);

      try {
        const utils = getTestUtils();
        utils.getWizard();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty(
          'message',
          expect.stringMatching(
            /Unable to find an element by: \[data-lgid="lg-wizard"\]/,
          ),
        );
      }
    });
  });

  describe('single Wizard', () => {
    describe('wizard root element', () => {
      test('getWizard returns the wizard element', () => {
        const { getWizard } = renderWizard();
        expect(getWizard()).toBeInTheDocument();
      });

      test('queryWizard returns the wizard element', () => {
        const { queryWizard } = renderWizard();
        expect(queryWizard()).toBeInTheDocument();
      });

      test('queryWizard returns null when wizard is not found', () => {
        render(<div />);
        const { queryWizard } = getTestUtils();
        expect(queryWizard()).toBeNull();
      });

      test('findWizard returns a promise that resolves to the wizard element', async () => {
        const { findWizard } = renderWizard();
        const wizard = await findWizard();
        expect(wizard).toBeInTheDocument();
      });
    });

    describe('current step', () => {
      test('getCurrentStep returns the current step element', () => {
        const { getCurrentStep } = renderWizard();
        const step = getCurrentStep();
        expect(step).toBeInTheDocument();
        expect(step).toHaveTextContent('Step 1');
      });

      test('queryCurrentStep returns the current step element', () => {
        const { queryCurrentStep } = renderWizard();
        const step = queryCurrentStep();
        expect(step).toBeInTheDocument();
        expect(step).toHaveTextContent('Step 1');
      });

      test('findCurrentStep returns a promise that resolves to the current step', async () => {
        const { findCurrentStep } = renderWizard();
        const step = await findCurrentStep();
        expect(step).toBeInTheDocument();
        expect(step).toHaveTextContent('Step 1');
      });

      test('current step updates after clicking next', () => {
        const { getCurrentStep, getPrimaryButtonUtils } = renderWizard();
        const initialStep = getCurrentStep();
        expect(initialStep).toHaveTextContent('Step 1');

        const primaryButton = getPrimaryButtonUtils().getButton();
        userEvent.click(primaryButton);

        const nextStep = getCurrentStep();
        expect(nextStep).toHaveTextContent('Step 2');
      });
    });

    describe('footer', () => {
      test('getFooter returns the footer element', () => {
        const { getFooter } = renderWizard();
        expect(getFooter()).toBeInTheDocument();
      });

      test('queryFooter returns the footer element', () => {
        const { queryFooter } = renderWizard();
        expect(queryFooter()).toBeInTheDocument();
      });

      test('queryFooter returns null when footer is not present', () => {
        const { queryFooter } = renderWizardWithoutFooter();
        expect(queryFooter()).toBeNull();
      });

      test('findFooter returns a promise that resolves to the footer element', async () => {
        const { findFooter } = renderWizard();
        const footer = await findFooter();
        expect(footer).toBeInTheDocument();
      });
    });

    describe('primary button', () => {
      test('getPrimaryButtonUtils returns button utilities', () => {
        const { getPrimaryButtonUtils } = renderWizard();
        const utils = getPrimaryButtonUtils();
        expect(utils.getButton()).toBeInTheDocument();
      });

      test('primary button can be clicked', () => {
        const { getPrimaryButtonUtils, getCurrentStep } = renderWizard();
        const button = getPrimaryButtonUtils().getButton();

        expect(getCurrentStep()).toHaveTextContent('Step 1');
        userEvent.click(button);
        expect(getCurrentStep()).toHaveTextContent('Step 2');
      });

      test('isDisabled works for primary button', () => {
        render(
          <Wizard>
            <Wizard.Step title="Step 1">Content</Wizard.Step>
            <Wizard.Footer
              primaryButtonProps={{
                children: 'Next',
                disabled: true,
              }}
            />
          </Wizard>,
        );

        const { getPrimaryButtonUtils } = getTestUtils();
        expect(getPrimaryButtonUtils().isDisabled()).toBe(true);
      });
    });

    describe('back button', () => {
      test('back button is not present on first step', () => {
        const { getBackButtonUtils } = renderWizard();
        expect(getBackButtonUtils().queryButton()).toBeNull();
      });

      test('back button appears after navigating to second step', () => {
        const { getPrimaryButtonUtils, getBackButtonUtils } = renderWizard();

        // Navigate to step 2
        const primaryButton = getPrimaryButtonUtils().getButton();
        userEvent.click(primaryButton);

        // Back button should now be visible
        expect(getBackButtonUtils().queryButton()).toBeInTheDocument();
      });

      test('back button navigates to previous step', () => {
        const { getPrimaryButtonUtils, getBackButtonUtils, getCurrentStep } =
          renderWizard();

        // Navigate to step 2
        userEvent.click(getPrimaryButtonUtils().getButton());
        expect(getCurrentStep()).toHaveTextContent('Step 2');

        // Navigate back to step 1
        const backButton = getBackButtonUtils().getButton();
        userEvent.click(backButton);
        expect(getCurrentStep()).toHaveTextContent('Step 1');
      });
    });

    describe('cancel button', () => {
      test('getCancelButtonUtils returns button utilities', () => {
        const { getCancelButtonUtils } = renderWizard();
        const utils = getCancelButtonUtils();
        expect(utils.getButton()).toBeInTheDocument();
        expect(utils.getButton()).toHaveTextContent('Cancel');
      });

      test('cancel button can be clicked', () => {
        const handleCancel = jest.fn();
        render(
          <Wizard>
            <Wizard.Step title="Step 1">Content</Wizard.Step>
            <Wizard.Footer
              primaryButtonProps={{
                children: 'Next',
              }}
              cancelButtonProps={{
                children: 'Cancel',
                onClick: handleCancel,
              }}
            />
          </Wizard>,
        );

        const { getCancelButtonUtils } = getTestUtils();
        const button = getCancelButtonUtils().getButton();
        userEvent.click(button);
        expect(handleCancel).toHaveBeenCalled();
      });

      test('cancel button is not present when cancelButtonProps is undefined', () => {
        render(
          <Wizard>
            <Wizard.Step title="Step 1">Content</Wizard.Step>
            <Wizard.Footer
              primaryButtonProps={{
                children: 'Next',
              }}
            />
          </Wizard>,
        );

        const { getCancelButtonUtils } = getTestUtils();
        expect(getCancelButtonUtils().queryButton()).toBeNull();
      });
    });
  });

  describe('multiple Wizard instances', () => {
    test('can query different wizards by lgId', () => {
      renderMultipleWizards();

      const utils1 = getTestUtils('lg-wizard-1');
      const utils2 = getTestUtils('lg-wizard-2');

      expect(utils1.getWizard()).toBeInTheDocument();
      expect(utils2.getWizard()).toBeInTheDocument();

      expect(utils1.getCurrentStep()).toHaveTextContent('Wizard 1 Step');
      expect(utils2.getCurrentStep()).toHaveTextContent('Wizard 2 Step');
    });

    test('can query different wizard buttons by lgId', () => {
      renderMultipleWizards();

      const utils1 = getTestUtils('lg-wizard-1');
      const utils2 = getTestUtils('lg-wizard-2');

      const button1 = utils1.getPrimaryButtonUtils().getButton();
      const button2 = utils2.getPrimaryButtonUtils().getButton();

      expect(button1).toHaveTextContent('Next');
      expect(button2).toHaveTextContent('Continue');
    });
  });
});
