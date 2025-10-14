import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Accordion } from '../Accordion';

import { AccordionProps } from './Accordion.types';
import { AccordionButton } from './AccordionButton';
import { AccordionItem } from './AccordionItem';
import { AccordionPanel } from './AccordionPanel';

const mockOnExpand = jest.fn();

const renderAccordion = (props?: Partial<AccordionProps>) => {
  return render(
    <Accordion {...props}>
      <AccordionItem key="item-1">
        <AccordionButton onExpand={() => mockOnExpand('Button 1')}>
          Button 1
        </AccordionButton>
        <AccordionPanel>Lorem ipsum 1</AccordionPanel>
      </AccordionItem>
      <AccordionItem key="item-2">
        <AccordionButton onExpand={() => mockOnExpand('Button 2')}>
          Button 2
        </AccordionButton>
        <AccordionPanel>Lorem ipsum 2</AccordionPanel>
      </AccordionItem>
      <AccordionItem key="item-3">
        <AccordionButton onExpand={() => mockOnExpand('Button 3')}>
          Button 3
        </AccordionButton>
        <AccordionPanel>Lorem ipsum 3</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  );
};

describe('packages/feature-walls/Accordion', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('accessibility', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderAccordion();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('buttons are correctly marked with aria-expanded boolean', () => {
      const { getByText } = renderAccordion();

      expect(getByText('Button 1').getAttribute('aria-expanded')).toBe('true');
      expect(getByText('Button 2').getAttribute('aria-expanded')).toBe('false');
      expect(getByText('Button 3').getAttribute('aria-expanded')).toBe('false');
    });

    test('buttons and panels render with correctly related aria tags', () => {
      const { getByText } = renderAccordion();

      const button1 = getByText('Button 1');
      const panel1 = getByText('Lorem ipsum 1');

      expect(button1.getAttribute('id')).toEqual(
        panel1.getAttribute('aria-labelledby'),
      );
      expect(panel1.getAttribute('id')).toEqual(
        button1.getAttribute('aria-controls'),
      );
    });
  });

  describe('rendering', () => {
    test('renders only one panel at a time', () => {
      const { getByText } = renderAccordion();

      expect(getByText('Lorem ipsum 1')).toBeVisible();
      expect(getByText('Lorem ipsum 2')).not.toBeVisible();
      expect(getByText('Lorem ipsum 3')).not.toBeVisible();
    });
  });

  describe('onExpand', () => {
    test('fires when button is clicked and item is not expanded', () => {
      const { getByText } = renderAccordion();
      const button2 = getByText('Button 2');

      userEvent.click(button2);
      expect(mockOnExpand).toHaveBeenCalledTimes(1);
      expect(mockOnExpand).toHaveBeenCalledWith('Button 2');
    });

    test('does not fire when button is clicked and item is already expanded', () => {
      const { getByText } = renderAccordion();
      const button1 = getByText('Button 1');

      userEvent.click(button1);
      expect(mockOnExpand).not.toHaveBeenCalled();
    });
  });

  describe('when controlled', () => {
    test('renders panel matching provided index on initial render', () => {
      const onIndexChange = jest.fn();
      const { getByText } = renderAccordion({ onIndexChange, index: 1 });
      expect(getByText('Lorem ipsum 1')).not.toBeVisible();
      expect(getByText('Lorem ipsum 2')).toBeVisible();
    });

    test('clicking a button fires provided onIndexChange callback', () => {
      const onIndexChange = jest.fn();
      const { getByText } = renderAccordion({ onIndexChange, index: 0 });
      const button2 = getByText('Button 2');

      userEvent.click(button2);
      expect(onIndexChange).toHaveBeenCalledTimes(1);
    });

    test('keyboard navigation is supported', () => {
      const onIndexChange = jest.fn();
      const { getByText } = renderAccordion({ onIndexChange, index: 0 });
      const button1 = getByText('Button 1');
      const button2 = getByText('Button 2');

      // Focus first button
      userEvent.tab();
      expect(button1).toHaveFocus();

      // Invoke callback with enter
      userEvent.keyboard('{enter}');
      expect(onIndexChange).toHaveBeenCalledTimes(1);

      // Focus second button
      userEvent.tab();
      expect(button2).toHaveFocus();

      // Invoke callback with space
      userEvent.keyboard('{space}');
      expect(onIndexChange).toHaveBeenCalledTimes(2);
    });
  });

  describe('when uncontrolled', () => {
    describe('defaultIndex', () => {
      test('defaults rendering first panel on initial render if undefined', () => {
        const { getByText } = renderAccordion({ defaultIndex: undefined });
        expect(getByText('Lorem ipsum 1')).toBeVisible();
      });

      test('determines which panel is visible on initial render if provided', () => {
        const { getByText } = renderAccordion({ defaultIndex: 1 });
        expect(getByText('Lorem ipsum 2')).toBeVisible();
      });
    });

    test('clicking a button updates the visible panel', async () => {
      const { getByText } = renderAccordion();
      const panel1 = getByText('Lorem ipsum 1');
      const button2 = getByText('Button 2');
      const panel2 = getByText('Lorem ipsum 2');

      expect(panel1).toBeVisible();

      userEvent.click(button2);

      await waitFor(() => {
        expect(panel2).toBeVisible();
      });
    });

    test('keyboard navigation is supported', async () => {
      const { getByText } = renderAccordion();
      const button1 = getByText('Button 1');
      const panel1 = getByText('Lorem ipsum 1');
      const button2 = getByText('Button 2');
      const panel2 = getByText('Lorem ipsum 2');
      const button3 = getByText('Button 3');
      const panel3 = getByText('Lorem ipsum 3');

      // First panel visible by default
      expect(panel1).toBeVisible();

      // Focus first button
      userEvent.tab();
      await waitFor(() => {
        expect(button1).toHaveFocus();
      });

      // Tab to second button
      userEvent.tab();
      await waitFor(() => {
        expect(button2).toHaveFocus();
      });

      // Key down enter to update visible panel
      userEvent.keyboard('{enter}');
      await waitFor(() => {
        expect(panel2).toBeVisible();
      });

      // Tab to third button
      userEvent.tab();
      await waitFor(() => {
        expect(button3).toHaveFocus();
      });

      // Key down space to update visible panel
      userEvent.keyboard('{space}');
      await waitFor(() => {
        expect(panel3).toBeVisible();
      });
    });
  });

  /* eslint-disable jest/no-disabled-tests*/
  test.skip('types behave as expected', () => {
    <>
      {/* @ts-expect-error - requires children */}
      <Accordion></Accordion>
      <Accordion>Test</Accordion>
    </>;
  });
});
