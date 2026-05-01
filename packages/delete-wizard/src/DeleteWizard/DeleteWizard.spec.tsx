import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getTestUtils } from '../testing';

import { DeleteWizard } from '.';

describe('packages/delete-wizard', () => {
  describe('rendering', () => {
    test('renders step 1 by default', () => {
      const { getByTestId, queryByTestId } = render(
        <DeleteWizard>
          <DeleteWizard.Step>
            <div data-testid="step-1-content">Step 1 content</div>
          </DeleteWizard.Step>
          <DeleteWizard.Step>
            <div data-testid="step-2-content">Step 2 content</div>
          </DeleteWizard.Step>
        </DeleteWizard>,
      );

      expect(getByTestId('step-1-content')).toBeInTheDocument();
      expect(queryByTestId('step-2-content')).not.toBeInTheDocument();
    });

    test('renders a Header component as child', () => {
      render(
        <DeleteWizard>
          <DeleteWizard.Header pageTitle="Delete Cluster" />
          <DeleteWizard.Step>
            <div data-testid="step-1-content">Step 1 content</div>
          </DeleteWizard.Step>
        </DeleteWizard>,
      );

      const { getHeader } = getTestUtils();
      const header = getHeader();

      expect(header).toBeInTheDocument();
      expect(header).toHaveTextContent('Delete Cluster');
    });

    test('renders Header above steps regardless of whether it is passed as the last react child', () => {
      const { container } = render(
        <DeleteWizard>
          <DeleteWizard.Step>
            <div data-testid="step-1-content">Step 1 content</div>
          </DeleteWizard.Step>
          <DeleteWizard.Header pageTitle="Delete Cluster" />
        </DeleteWizard>,
      );

      const { getHeader, getActiveStep } = getTestUtils();
      const header = getHeader();
      const activeStep = getActiveStep();

      // Get the parent (DeleteWizard root) to check order
      const deleteWizardRoot = container.firstChild as HTMLElement;
      const children = Array.from(deleteWizardRoot.children);

      // Header should come before the active step in the DOM
      const headerIndex = children.indexOf(header);
      const stepIndex = children.findIndex(child => child.contains(activeStep));

      expect(headerIndex).toBeLessThan(stepIndex);
    });

    test('does not render any non-step or non-header children', () => {
      const { queryByTestId } = render(
        <DeleteWizard>
          <DeleteWizard.Header pageTitle="Delete Cluster" />
          <div data-testid="invalid-element-1">This should not render</div>
          <DeleteWizard.Step>
            <div data-testid="step-1-content">Step 1 content</div>
          </DeleteWizard.Step>
          <span data-testid="invalid-element-2">Also should not render</span>
        </DeleteWizard>,
      );

      // Non-DeleteWizard elements should not be rendered
      expect(queryByTestId('invalid-element-1')).not.toBeInTheDocument();
      expect(queryByTestId('invalid-element-2')).not.toBeInTheDocument();
      // But valid children should be rendered
      expect(queryByTestId('step-1-content')).toBeInTheDocument();
    });

    test('renders the step via activeStep prop', () => {
      const { queryByTestId, getByTestId } = render(
        <DeleteWizard activeStep={1}>
          <DeleteWizard.Header pageTitle="Delete Cluster" />
          <DeleteWizard.Step>
            <div data-testid="step-1-content">Step 1 content</div>
          </DeleteWizard.Step>
          <DeleteWizard.Step>
            <div data-testid="step-2-content">Step 2 content</div>
          </DeleteWizard.Step>
        </DeleteWizard>,
      );

      // Should render the second step when activeStep is 1
      expect(queryByTestId('step-1-content')).not.toBeInTheDocument();
      expect(getByTestId('step-2-content')).toBeInTheDocument();
    });
  });

  describe('interaction', () => {
    test('renders step 2 when primary button is clicked', () => {
      const { getByTestId, queryByTestId } = render(
        <DeleteWizard>
          <DeleteWizard.Header pageTitle="Delete Cluster" />
          <DeleteWizard.Step>
            <div data-testid="step-1-content">Step 1 content</div>
            <DeleteWizard.Footer primaryButtonText="Next" />
          </DeleteWizard.Step>
          <DeleteWizard.Step>
            <div data-testid="step-2-content">Step 2 content</div>
            <DeleteWizard.Footer primaryButtonText="Delete" />
          </DeleteWizard.Step>
        </DeleteWizard>,
      );

      // Start at step 1
      expect(getByTestId('step-1-content')).toBeInTheDocument();
      expect(queryByTestId('step-2-content')).not.toBeInTheDocument();

      // Click next to go to step 2
      const { getPrimaryButton } = getTestUtils();
      userEvent.click(getPrimaryButton());

      expect(queryByTestId('step-1-content')).not.toBeInTheDocument();
      expect(getByTestId('step-2-content')).toBeInTheDocument();
    });

    test('calls onStepChange when the primary button is clicked', () => {
      const onStepChange = jest.fn();

      render(
        <DeleteWizard activeStep={0} onStepChange={onStepChange}>
          <DeleteWizard.Header pageTitle="Delete Cluster" />
          <DeleteWizard.Step>
            <div data-testid="step-1-content">Step 1 content</div>
            <DeleteWizard.Footer primaryButtonText="Next" />
          </DeleteWizard.Step>
          <DeleteWizard.Step>
            <div data-testid="step-2-content">Step 2 content</div>
            <DeleteWizard.Footer primaryButtonText="Delete" />
          </DeleteWizard.Step>
        </DeleteWizard>,
      );

      const { getPrimaryButton } = getTestUtils();
      userEvent.click(getPrimaryButton());

      expect(onStepChange).toHaveBeenCalledWith(1);
    });

    test('calls onStepChange when the back button is clicked', () => {
      const onStepChange = jest.fn();

      render(
        <DeleteWizard activeStep={1} onStepChange={onStepChange}>
          <DeleteWizard.Header pageTitle="Delete Cluster" />
          <DeleteWizard.Step>
            <div data-testid="step-1-content">Step 1 content</div>
            <DeleteWizard.Footer primaryButtonText="Next" />
          </DeleteWizard.Step>
          <DeleteWizard.Step>
            <div data-testid="step-2-content">Step 2 content</div>
            <DeleteWizard.Footer
              backButtonText="Back"
              primaryButtonText="Delete"
            />
          </DeleteWizard.Step>
        </DeleteWizard>,
      );

      const { getBackButton } = getTestUtils();
      userEvent.click(getBackButton());

      expect(onStepChange).toHaveBeenCalledWith(0);
    });

    test('calls onCancel when the cancel button is clicked', () => {
      const onCancel = jest.fn();

      render(
        <DeleteWizard onCancel={onCancel}>
          <DeleteWizard.Header pageTitle="Delete Cluster" />
          <DeleteWizard.Step>
            <div data-testid="step-1-content">Step 1 content</div>
            <DeleteWizard.Footer
              primaryButtonText="Next"
              cancelButtonText="Cancel"
            />
          </DeleteWizard.Step>
        </DeleteWizard>,
      );

      const { getCancelButton } = getTestUtils();
      userEvent.click(getCancelButton());

      expect(onCancel).toHaveBeenCalled();
    });

    test('calls onDelete when the primary button is clicked on final step', () => {
      const onDelete = jest.fn();

      render(
        <DeleteWizard activeStep={1} onDelete={onDelete}>
          <DeleteWizard.Header pageTitle="Delete Cluster" />
          <DeleteWizard.Step>
            <div data-testid="step-1-content">Step 1 content</div>
            <DeleteWizard.Footer primaryButtonText="Next" />
          </DeleteWizard.Step>
          <DeleteWizard.Step>
            <div data-testid="step-2-content">Step 2 content</div>
            <DeleteWizard.Footer primaryButtonText="Delete" />
          </DeleteWizard.Step>
        </DeleteWizard>,
      );

      const { getPrimaryButton } = getTestUtils();
      userEvent.click(getPrimaryButton());

      expect(onDelete).toHaveBeenCalled();
    });

    test('does not call onDelete when primary button is clicked on non-final step', () => {
      const onDelete = jest.fn();

      render(
        <DeleteWizard activeStep={0} onDelete={onDelete}>
          <DeleteWizard.Header pageTitle="Delete Cluster" />
          <DeleteWizard.Step>
            <div data-testid="step-1-content">Step 1 content</div>
            <DeleteWizard.Footer primaryButtonText="Next" />
          </DeleteWizard.Step>
          <DeleteWizard.Step>
            <div data-testid="step-2-content">Step 2 content</div>
            <DeleteWizard.Footer primaryButtonText="Delete" />
          </DeleteWizard.Step>
        </DeleteWizard>,
      );

      const { getPrimaryButton } = getTestUtils();
      userEvent.click(getPrimaryButton());

      expect(onDelete).not.toHaveBeenCalled();
    });
  });
});
