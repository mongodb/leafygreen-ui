import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { TitleBar } from './TitleBar';
import { type TitleBarProps } from './TitleBar.types';

const TITLE_TEXT = 'LeafyGreen Chat';

const renderTitleBar = (props: Partial<TitleBarProps> = {}) => {
  return render(<TitleBar title={TITLE_TEXT} {...props} />);
};

describe('TitleBar', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderTitleBar();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  test('renders title text', () => {
    renderTitleBar();
    expect(screen.getByText(TITLE_TEXT)).toBeInTheDocument();
  });

  test('renders badge when badgeText is provided', () => {
    renderTitleBar({ badgeText: 'Beta' });
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });
});
