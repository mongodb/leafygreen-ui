import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { cleanup, render } from '@testing-library/react';
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

function renderCustomCallout(props: Partial<CustomCalloutProps> = {}) {
  const defaultProps = {
    children,
    colorSet,
    headerLabel,
  };
  return render(<CustomCallout {...defaultProps} {...props} />);
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
    afterEach(async () => {
      await cleanup();
    });

    test(`renders class name in classList: "${className}"`, async () => {
      let { container } = renderCustomCallout({});
      expect(container.firstChild).not.toHaveClass(className);
      await cleanup();

      ({ container } = renderCustomCallout({ className }));
      expect(container.firstChild).toHaveClass(className);
    });

    test(`renders header icon: "${headerIcon}"`, async () => {
      renderCustomCallout();
      expect(document.getElementsByTagName('svg')).toHaveLength(0);
      await cleanup();

      const { getByTitle } = renderCustomCallout({ headerIcon });
      const svgElement = getByTitle('Edit Icon').parentElement;
      expect(svgElement).toBeInstanceOf(SVGElement);
      expect(svgElement).toBeVisible();
    });

    test(`renders header label: "${headerLabel}"`, () => {
      const { getByText } = renderCustomCallout({ headerLabel });
      expect(getByText(headerLabel)).toBeVisible();
    });

    test(`renders contents: "${children}"`, () => {
      const { getByText } = renderCustomCallout({ children });
      expect(getByText(children)).toBeVisible();
    });

    test(`renders title: "${title}"`, () => {
      const { getByText } = renderCustomCallout({ title });
      expect(getByText(title)).toBeVisible();
    });
  });
});
