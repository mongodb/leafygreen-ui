import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Callout, {
  colorSets,
  headerIcons,
  headerLabels,
  CustomCallout,
  Variant,
} from './Callout';

const className = 'test-classname';
const children = 'this is the callout content.';
const title = 'this is the callout title';
const colorSet = colorSets[Variant.Note];
const headerIcon = headerIcons[Variant.Note];
const headerLabel = headerLabels[Variant.Note];

const defaultProps = {
  children,
  colorSet,
  headerLabel,
};

describe('packages/callout', () => {
  describe('Callout component', () => {
    test('renders each variant correctly', () => {
      for (const variant of Object.values(Variant)) {
        const calloutMarkup = renderToStaticMarkup(
          <Callout className={className} variant={variant}>
            {children}
          </Callout>,
        );

        const customCalloutMarkup = renderToStaticMarkup(
          <CustomCallout
            className={className}
            colorSet={colorSets[variant]}
            headerIcon={headerIcons[variant]}
            headerLabel={headerLabels[variant]}
          >
            {children}
          </CustomCallout>,
        );

        expect(calloutMarkup).toEqual(customCalloutMarkup);
      }
    });
  });

  describe('CustomCallout component', () => {
    test(`renders class name in classList: "${className}"`, () => {
      const { container, rerender } = render(
        <CustomCallout {...defaultProps} />,
      );
      expect(container.firstChild).not.toHaveClass(className);

      rerender(<CustomCallout {...defaultProps} className={className} />);
      expect(container.firstChild).toHaveClass(className);
    });

    test(`renders header icon: "${headerIcon.type.displayName}"`, () => {
      const { rerender } = render(<CustomCallout {...defaultProps} />);
      expect(screen.queryByTitle('Info With Circle Icon')).toBeNull();

      rerender(<CustomCallout {...defaultProps} headerIcon={headerIcon} />);
      expect(screen.getByTitle('Info With Circle Icon')).toBeVisible();
    });

    test(`renders header label: "${headerLabel}"`, () => {
      render(<CustomCallout {...defaultProps} headerLabel={headerLabel} />);
      expect(screen.getByText(headerLabel)).toBeVisible();
    });

    test(`renders contents: "${children}"`, () => {
      render(<CustomCallout {...defaultProps} />);
      expect(screen.getByText(defaultProps.children)).toBeVisible();
    });

    test(`renders title: "${title}"`, () => {
      render(<CustomCallout {...defaultProps} title={title} />);
      expect(screen.getByText(title)).toBeVisible();
    });
  });
});
