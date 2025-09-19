import React from 'react';
import { render } from '@testing-library/react';

import { CodeEditorTooltip } from './CodeEditorTooltip';

describe('CodeEditorTooltip', () => {
  test('renders messages', () => {
    const { getByText } = render(
      <CodeEditorTooltip messages={['Message 1', 'Message 2']} />,
    );
    expect(getByText('Message 1')).toBeInTheDocument();
    expect(getByText('Message 2')).toBeInTheDocument();
  });

  test('renders links', () => {
    const { getByRole } = render(
      <CodeEditorTooltip
        links={[{ label: 'Link 1', href: 'https://www.google.com' }]}
      />,
    );
    expect(getByRole('link', { name: 'Link 1' })).toBeInTheDocument();
  });
});
