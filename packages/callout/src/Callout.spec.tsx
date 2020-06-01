import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { render, RenderOptions, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Callout, {
  colorSets,
  headerIcons,
  headerLabels,
  CustomCallout,
  CustomCalloutProps,
  Variant,
} from './Callout';

const className = 'test-classname';
const children = 'this is the callout content.';
const title = 'this is the callout title';
const colorSet = colorSets[Variant.Note];
const headerIcon = headerIcons[Variant.Note];
const headerLabel = headerLabels[Variant.Note];

function renderCustomCallout(
  props: Partial<CustomCalloutProps> = {},
  options?: RenderOptions,
) {
  const defaultProps = {
    children,
    colorSet,
    headerLabel,
  };
  return render(<CustomCallout {...defaultProps} {...props} />, options);
}

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
    test(`renders class name in classList: "${className}"`, async () => {
      const { container } = renderCustomCallout({});
      expect(container.firstChild).not.toHaveClass(className);

      renderCustomCallout({ className }, { container });
      expect(container.firstChild).toHaveClass(className);
    });

    test(`renders header icon: "${headerIcon}"`, async () => {
      const { container } = renderCustomCallout();
      expect(document.getElementsByTagName('svg')).toHaveLength(0);

      renderCustomCallout({ headerIcon }, { container });
      const svgElement = screen.getByTitle('Edit Icon').parentElement;
      expect(svgElement).toBeInstanceOf(SVGElement);
      expect(svgElement).toBeVisible();
    });

    test(`renders header label: "${headerLabel}"`, () => {
      renderCustomCallout({ headerLabel });
      expect(screen.getByText(headerLabel)).toBeVisible();
    });

    test(`renders contents: "${children}"`, () => {
      renderCustomCallout({ children });
      expect(screen.getByText(children)).toBeVisible();
    });

    test(`renders title: "${title}"`, () => {
      renderCustomCallout({ title });
      expect(screen.getByText(title)).toBeVisible();
    });
  });
});
