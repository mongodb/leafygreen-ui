import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { TemplatesProps } from './Templates.types';
import { generateMockTemplates, MOCK_SECTION_TITLE } from './Templates.utils';
import { Templates } from '.';

const mockTemplates = generateMockTemplates(3);

const renderTemplates = (props?: Partial<TemplatesProps>) => {
  return render(
    <Templates
      title={MOCK_SECTION_TITLE}
      templates={mockTemplates}
      {...props}
    />,
  );
};

describe('packages/feature-walls/Templates', () => {
  test('does not have basic accessibility issues', async () => {
    const { container } = renderTemplates();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('renders each of the provided templates', () => {
    const { getByText } = renderTemplates();

    mockTemplates.forEach(template => {
      expect(getByText(template.label)).toBeInTheDocument();
      expect(getByText(template.description)).toBeInTheDocument();
    });
  });

  /* eslint-disable jest/no-disabled-tests*/
  test.skip('types behave as expected', () => {
    <>
      {/* @ts-expect-error - requires `templates` */}
      <Templates title={MOCK_SECTION_TITLE} />

      {/* @ts-expect-error - requires `title` */}
      <Templates features={mockTemplates} />

      <Templates
        title={MOCK_SECTION_TITLE}
        // @ts-expect-error - `templates` elements must be type `Template`
        features={['test1', 'test2', 'test3']}
      />

      <Templates title={MOCK_SECTION_TITLE} templates={mockTemplates} />
    </>;
  });
});
