import React from 'react';
import { render } from '@testing-library/react';

import { Wizard } from '../Wizard';

import { getTestUtils } from './getTestUtils';

describe('packages/wizard/getTestUtils', () => {
  describe('Footer utils', () => {
    test('getFooter returns the correct footer element', () => {
      render(
        <Wizard>
          <Wizard.Step>
            <div>Step 1</div>
            <Wizard.Footer
              primaryButtonProps={{ children: 'Next Step' }}
              cancelButtonProps={{ children: 'Cancel Action' }}
            />
          </Wizard.Step>
        </Wizard>,
      );

      const { getFooter } = getTestUtils();
      const footer = getFooter();
      expect(footer).toBeInTheDocument();
      expect(footer.tagName).toBe('FOOTER');
      expect(footer).toHaveAttribute('data-testid', 'lg-wizard-footer');
      // Verify it contains the buttons
      expect(footer).toHaveTextContent('Next Step');
      expect(footer).toHaveTextContent('Cancel Action');
    });

    test('queryFooter returns null when footer is not present', () => {
      render(<div>No wizard here</div>);

      const { queryFooter } = getTestUtils();
      const footer = queryFooter();
      expect(footer).not.toBeInTheDocument();
    });

    test('findFooter finds the footer element', async () => {
      render(
        <Wizard>
          <Wizard.Step>
            <div>Step 1</div>
            <Wizard.Footer primaryButtonProps={{ children: 'Submit' }} />
          </Wizard.Step>
        </Wizard>,
      );

      const { findFooter } = getTestUtils();
      const footer = await findFooter();
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveTextContent('Submit');
    });
  });

  describe('Button utils', () => {
    test('getPrimaryButton returns the correct primary button element', () => {
      render(
        <Wizard>
          <Wizard.Step>
            <div>Step 1</div>
            <Wizard.Footer primaryButtonProps={{ children: 'Next Step' }} />
          </Wizard.Step>
        </Wizard>,
      );

      const { getPrimaryButton } = getTestUtils();
      const primaryButton = getPrimaryButton();
      expect(primaryButton).toBeInTheDocument();
      expect(primaryButton.tagName).toBe('BUTTON');
      expect(primaryButton).toHaveAttribute(
        'data-testid',
        'lg-wizard-footer-primary_button',
      );
      expect(primaryButton).toHaveTextContent('Next Step');
    });

    test('queryPrimaryButton returns null when the primary button is not present', () => {
      render(<div>No wizard here</div>);

      const { queryPrimaryButton } = getTestUtils();
      const button = queryPrimaryButton();
      expect(button).not.toBeInTheDocument();
    });

    test('findPrimaryButton finds the primary button element', async () => {
      render(
        <Wizard>
          <Wizard.Step>
            <div>Step 1</div>
            <Wizard.Footer primaryButtonProps={{ children: 'Continue' }} />
          </Wizard.Step>
        </Wizard>,
      );

      const { findPrimaryButton } = getTestUtils();
      const button = await findPrimaryButton();
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Continue');
    });

    test('getBackButton returns the correct back button element', () => {
      render(
        <Wizard activeStep={1}>
          <Wizard.Step>
            <div>Step 1</div>
            <Wizard.Footer primaryButtonProps={{ children: 'Next' }} />
          </Wizard.Step>
          <Wizard.Step>
            <div>Step 2</div>
            <Wizard.Footer
              backButtonProps={{ children: 'Go Back' }}
              primaryButtonProps={{ children: 'Finish' }}
            />
          </Wizard.Step>
        </Wizard>,
      );

      const { getBackButton } = getTestUtils();
      const backButton = getBackButton();
      expect(backButton).toBeInTheDocument();
      expect(backButton.tagName).toBe('BUTTON');
      expect(backButton).toHaveAttribute(
        'data-testid',
        'lg-wizard-footer-back_button',
      );
      expect(backButton).toHaveTextContent('Go Back');
    });

    test('queryBackButton returns null when back button is not present', () => {
      render(
        <Wizard>
          <Wizard.Step>
            <div>Step 1</div>
            <Wizard.Footer primaryButtonProps={{ children: 'Next' }} />
          </Wizard.Step>
        </Wizard>,
      );

      const { queryBackButton } = getTestUtils();
      const button = queryBackButton();
      expect(button).not.toBeInTheDocument();
    });

    test('findBackButton finds the back button element', async () => {
      render(
        <Wizard activeStep={1}>
          <Wizard.Step>
            <div>Step 1</div>
            <Wizard.Footer primaryButtonProps={{ children: 'Next' }} />
          </Wizard.Step>
          <Wizard.Step>
            <div>Step 2</div>
            <Wizard.Footer
              backButtonProps={{ children: 'Previous' }}
              primaryButtonProps={{ children: 'Next' }}
            />
          </Wizard.Step>
        </Wizard>,
      );

      const { findBackButton } = getTestUtils();
      const button = await findBackButton();
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Previous');
    });

    test('getCancelButton returns the correct cancel button element', () => {
      render(
        <Wizard>
          <Wizard.Step>
            <div>Step 1</div>
            <Wizard.Footer
              cancelButtonProps={{ children: 'Cancel Process' }}
              primaryButtonProps={{ children: 'Next' }}
            />
          </Wizard.Step>
        </Wizard>,
      );

      const { getCancelButton } = getTestUtils();
      const cancelButton = getCancelButton();
      expect(cancelButton).toBeInTheDocument();
      expect(cancelButton.tagName).toBe('BUTTON');
      expect(cancelButton).toHaveAttribute(
        'data-testid',
        'lg-wizard-footer-cancel_button',
      );
      expect(cancelButton).toHaveTextContent('Cancel Process');
    });

    test('queryCancelButton returns the default cancel button if no props are provided', () => {
      render(
        <Wizard>
          <Wizard.Step>
            <div>Step 1</div>
            <Wizard.Footer primaryButtonProps={{ children: 'Next' }} />
          </Wizard.Step>
        </Wizard>,
      );

      const { queryCancelButton } = getTestUtils();
      const button = queryCancelButton();
      expect(button).toBeInTheDocument();
    });

    test('findCancelButton finds the cancel button element', async () => {
      render(
        <Wizard>
          <Wizard.Step>
            <div>Step 1</div>
            <Wizard.Footer
              cancelButtonProps={{ children: 'Abort' }}
              primaryButtonProps={{ children: 'Next' }}
            />
          </Wizard.Step>
        </Wizard>,
      );

      const { findCancelButton } = getTestUtils();
      const button = await findCancelButton();
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Abort');
    });
  });

  describe('with custom lgId', () => {
    test('uses custom lgId when provided', () => {
      render(
        <Wizard data-lgid="lg-custom-wizard">
          <Wizard.Step>
            <div data-testid="custom-content">Step 1</div>
            <Wizard.Footer primaryButtonProps={{ children: 'Next' }} />
          </Wizard.Step>
        </Wizard>,
      );

      const { getFooter, getPrimaryButton } = getTestUtils('lg-custom-wizard');

      const footer = getFooter();
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveAttribute('data-testid', 'lg-custom-wizard-footer');

      const button = getPrimaryButton();
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute(
        'data-testid',
        'lg-custom-wizard-footer-primary_button',
      );
    });
  });
});
