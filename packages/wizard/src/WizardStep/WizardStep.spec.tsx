import React from 'react';
import { render } from '@testing-library/react';

import { Wizard } from '../Wizard/Wizard';

import { WizardStep } from '.';

describe('packages/wizard-step', () => {
  test('does not render outside WizardContext', () => {
    const { container } = render(
      <WizardStep data-testid="step-1" title="Step">
        Content
      </WizardStep>,
    );

    expect(container.firstChild).toBeNull();
  });
  test('renders in WizardContext', () => {
    const { getByTestId } = render(
      <Wizard>
        <WizardStep data-testid="step-1" title="Step">
          Content
        </WizardStep>
      </Wizard>,
    );

    expect(getByTestId('step-1')).toBeInTheDocument();
  });
});
