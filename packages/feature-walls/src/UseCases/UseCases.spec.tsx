import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { UseCasesProps } from './UseCases.types';
import { generateMockUseCases, MOCK_SECTION_TITLE } from './UseCases.utils';
import { UseCases } from '.';

const mockUseCases = generateMockUseCases(3);

const renderUseCases = (props?: Partial<UseCasesProps>) => {
  return render(
    <UseCases title={MOCK_SECTION_TITLE} cases={mockUseCases} {...props} />,
  );
};

describe('packages/feature-walls/UseCases', () => {
  test('does not have basic accessibility issues', async () => {
    const { container } = renderUseCases();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('renders each of the provided cases', () => {
    const { getByText } = renderUseCases();

    mockUseCases.forEach(useCase => {
      expect(getByText(useCase.label)).toBeInTheDocument();
      expect(getByText(useCase.description)).toBeInTheDocument();
    });
  });

  /* eslint-disable jest/no-disabled-tests*/
  test.skip('types behave as expected', () => {
    <>
      {/* @ts-expect-error - requires `cases` */}
      <UseCases title={MOCK_SECTION_TITLE} />

      {/* @ts-expect-error - requires `title` */}
      <UseCases cases={mockUseCases} />

      <UseCases
        title={MOCK_SECTION_TITLE}
        // @ts-expect-error - `cases` elements must be type `UseCase`
        cases={['test1', 'test2', 'test3']}
      />

      <UseCases title={MOCK_SECTION_TITLE} cases={mockUseCases} />
    </>;
  });
});
