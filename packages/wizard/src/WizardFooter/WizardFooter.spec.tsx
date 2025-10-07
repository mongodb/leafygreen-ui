import React from 'react';
import { render } from '@testing-library/react';

import { Wizard } from '../Wizard';

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
    const { getByTestId } = render(
      <Wizard>
        <WizardFooter
          data-testid="footer"
          primaryButtonProps={{ children: 'Next' }}
        >
          Content
        </WizardFooter>
      </Wizard>,
    );

    expect(getByTestId('footer')).toBeInTheDocument();
  });
});
