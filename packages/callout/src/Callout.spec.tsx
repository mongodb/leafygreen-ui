import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import Callout from './Callout';
import { headerIcons, headerLabels } from './styles';
import { Variant } from './types';

const title = 'this is the callout title';
const children = 'this is the callout content.';
const className = 'test-classname';

const defaultProps = {
  children,
  variant: Variant.Note,
};

describe('packages/callout', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<Callout {...defaultProps} />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });

  for (const key of Object.keys(Variant)) {
    const variant = Variant[key as keyof typeof Variant];
    const icon = headerIcons[variant];
    const label = headerLabels[variant];

    describe(`for variant ${variant}`, () => {
      test(`renders icon "${icon.displayName}" and label "${label}" in header"`, () => {
        render(<Callout {...defaultProps} variant={variant} />);

        expect(typeof icon.displayName).toBe('string');

        expect(screen.getByText(label)).toBeVisible();
      });
    });
  }

  test(`renders class name in classList: "${className}"`, () => {
    const { container, rerender } = render(<Callout {...defaultProps} />);
    expect(container.firstChild).not.toHaveClass(className);

    rerender(<Callout {...defaultProps} className={className} />);
    expect(container.firstChild).toHaveClass(className);
  });

  test(`renders contents: "${children}"`, () => {
    render(<Callout {...defaultProps} />);
    expect(screen.getByText(defaultProps.children)).toBeVisible();
  });

  test(`renders title: "${title}"`, () => {
    render(<Callout {...defaultProps} title={title} />);
    expect(screen.getByText(title)).toBeVisible();
  });
});
