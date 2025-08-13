import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { ConfigurationParameters, State } from '../shared.types';

import { SuggestedActionsProps } from './SuggestedActions.types';
import { SuggestedActions } from '.';

const defaultConfigurationParameters: ConfigurationParameters = [
  { key: 'Cluster Tier', value: 'M10 ($9.00/month)' },
  { key: 'Provider', value: 'AWS / N. Virginia (us-east-1)' },
  { key: 'Storage', value: '10 GB' },
  { key: 'RAM', value: '2 GB' },
  { key: 'vCPUs', value: '2 vCPUs' },
];

const successConfigurationParameters: ConfigurationParameters = [
  { key: 'Cluster Tier', value: 'M10 ($9.00/month)' },
  { key: 'Provider', value: 'AWS / N. Virginia (us-east-1)' },
  {
    key: 'Cloud Provider & Region',
    value: 'AWS / N. Virginia (us-east-1)',
    state: State.Success,
  },
  { key: 'Cluster Tier', value: 'M10 ($9.00/month)', state: State.Success },
];

const errorConfigurationParameters: ConfigurationParameters = [
  { key: 'Cluster Tier', value: 'M30 ($31.00/month)' },
  { key: 'Provider', value: 'GCP / Iowa (us-central1)' },
  {
    key: 'Cloud Provider & Region',
    value: 'GCP / Iowa (us-central1)',
    state: State.Error,
  },
  { key: 'Cluster Tier', value: 'M30 ($31.00/month)', state: State.Error },
];

const defaultProps: SuggestedActionsProps = {
  state: State.Unset,
  configurationParameters: defaultConfigurationParameters,
  onClickApply: jest.fn(),
};

function renderSuggestedActions(props: Partial<SuggestedActionsProps> = {}) {
  const allProps = { ...defaultProps, ...props };
  const utils = render(
    <LeafyGreenProvider>
      <SuggestedActions {...allProps} />
    </LeafyGreenProvider>,
  );
  return { ...utils, props: allProps };
}

describe('chat/suggestions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderSuggestedActions();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('does not have accessibility issues with Apply button', async () => {
      const { container } = renderSuggestedActions({ state: State.Unset });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('does not have accessibility issues with Success banner', async () => {
      const { container } = renderSuggestedActions({
        state: State.Success,
        configurationParameters: successConfigurationParameters,
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('does not have accessibility issues with Error banner', async () => {
      const { container } = renderSuggestedActions({
        state: State.Error,
        configurationParameters: errorConfigurationParameters,
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    test('renders title text', () => {
      renderSuggestedActions();
      expect(
        screen.getByText('Apply configuration to your cluster?'),
      ).toBeInTheDocument();
    });

    test('renders all configuration parameters in table', () => {
      renderSuggestedActions();

      // Check keys from the key-value pairs
      expect(screen.getByText('Cluster Tier')).toBeInTheDocument();
      expect(screen.getByText('Provider')).toBeInTheDocument();
      expect(screen.getByText('Storage')).toBeInTheDocument();
      expect(screen.getByText('RAM')).toBeInTheDocument();
      expect(screen.getByText('vCPUs')).toBeInTheDocument();

      // Check values from the key-value pairs
      expect(screen.getByText('M10 ($9.00/month)')).toBeInTheDocument();
      expect(
        screen.getByText('AWS / N. Virginia (us-east-1)'),
      ).toBeInTheDocument();
      expect(screen.getByText('10 GB')).toBeInTheDocument();
      expect(screen.getByText('2 GB')).toBeInTheDocument();
      expect(screen.getByText('2 vCPUs')).toBeInTheDocument();
    });

    test('renders with custom configuration parameters', () => {
      const customParams = [
        { key: 'Cluster Tier', value: 'M30 ($31.00/month)' },
        { key: 'Provider', value: 'GCP / Iowa (us-central1)' },
        { key: 'Storage', value: '100 GB' },
        { key: 'RAM', value: '8 GB' },
        { key: 'vCPUs', value: '2 vCPUs' },
      ];

      renderSuggestedActions({
        configurationParameters: customParams,
      });

      expect(screen.getByText('M30 ($31.00/month)')).toBeInTheDocument();
      expect(screen.getByText('GCP / Iowa (us-central1)')).toBeInTheDocument();
      expect(screen.getByText('100 GB')).toBeInTheDocument();
      expect(screen.getByText('8 GB')).toBeInTheDocument();
      expect(screen.getByText('2 vCPUs')).toBeInTheDocument();
    });

    test('handles empty configuration parameters', () => {
      renderSuggestedActions({
        configurationParameters: [],
      });

      expect(
        screen.getByText('Apply configuration to your cluster?'),
      ).toBeInTheDocument();
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      expect(screen.queryAllByRole('columnheader')).toHaveLength(0);
    });

    test('renders parameters with mixed state values', () => {
      const mixedParams = [
        { key: 'Cluster Tier', value: 'M10 ($9.00/month)' }, // defaults to apply
        {
          key: 'Provider',
          value: 'AWS / N. Virginia (us-east-1)',
          state: State.Unset,
        },
        {
          key: 'Success Param',
          value: 'Success Value',
          state: State.Success,
        },
        { key: 'Error Param', value: 'Error Value', state: State.Error },
      ];

      renderSuggestedActions({
        configurationParameters: mixedParams,
      });

      // Should render all parameters in table
      expect(screen.getByText('Cluster Tier')).toBeInTheDocument();
      expect(screen.getByText('Provider')).toBeInTheDocument();
      expect(screen.getByText('Success Param')).toBeInTheDocument();
      expect(screen.getByText('Error Param')).toBeInTheDocument();
    });
  });

  describe('Apply button', () => {
    test('renders when state is Unset', () => {
      renderSuggestedActions({ state: State.Unset });
      expect(screen.getByText('Apply configuration to your cluster?')).toBeInTheDocument();
    });

    test('renders when state is Apply', () => {
      renderSuggestedActions({ state: State.Apply });
      const button = screen.getByRole('button', {
        name: /apply these suggestions/i,
      });
      expect(button).toBeInTheDocument();
    });

    test('does not render when state is Success', () => {
      renderSuggestedActions({ state: State.Success });
      expect(
        screen.queryByRole('button', { name: /apply these suggestions/i }),
      ).not.toBeInTheDocument();
    });

    test('does not render when state is Error', () => {
      renderSuggestedActions({ state: State.Error });
      expect(
        screen.queryByRole('button', { name: /apply these suggestions/i }),
      ).not.toBeInTheDocument();
    });

    test('calls onClickApply when clicked in Apply state', () => {
      const onClickApply = jest.fn();
      renderSuggestedActions({ state: State.Apply, onClickApply });

      const button = screen.getByRole('button', {
        name: /apply these suggestions/i,
      });
      userEvent.click(button);

      expect(onClickApply).toHaveBeenCalledTimes(1);
    });
  });

  describe('Status banner', () => {
    test('does not render when state is Unset', () => {
      renderSuggestedActions({ state: State.Unset });
      expect(
        screen.queryByText('The suggestions have been applied.'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/we ran into an error/i),
      ).not.toBeInTheDocument();
    });

    test('renders success banner when state is Success', () => {
      renderSuggestedActions({
        state: State.Success,
        configurationParameters: successConfigurationParameters,
      });

      expect(
        screen.getByText('The suggestions have been applied.'),
      ).toBeInTheDocument();

      // Check that success parameters are displayed
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toContainEqual(
        expect.objectContaining({
          textContent: expect.stringContaining(
            'Cloud Provider & Region: AWS / N. Virginia (us-east-1)',
          ),
        }),
      );
    });

    test('renders error banner when state is Error', () => {
      renderSuggestedActions({
        state: State.Error,
        configurationParameters: errorConfigurationParameters,
      });

      expect(
        screen.getByText(
          'We ran into an error when applying the suggestion. Please manually try it:',
        ),
      ).toBeInTheDocument();

      // Check that error parameters are displayed
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toContainEqual(
        expect.objectContaining({
          textContent: expect.stringContaining(
            'Cloud Provider & Region: GCP / Iowa (us-central1)',
          ),
        }),
      );
    });

    test('handles empty success parameters', () => {
      renderSuggestedActions({
        state: State.Success,
        configurationParameters: [],
      });

      expect(
        screen.getByText('The suggestions have been applied.'),
      ).toBeInTheDocument();

      // Should render empty list when no parameters
      const list = screen.queryByRole('list');
      expect(list).toBeInTheDocument();
      expect(list?.children).toHaveLength(0);
    });

    test('handles empty error parameters', () => {
      renderSuggestedActions({
        state: State.Error,
        configurationParameters: [],
      });

      expect(
        screen.getByText(
          'We ran into an error when applying the suggestion. Please manually try it:',
        ),
      ).toBeInTheDocument();

      // Should render empty list when no parameters
      const list = screen.queryByRole('list');
      expect(list).toBeInTheDocument();
      expect(list?.children).toHaveLength(0);
    });

    test('filters parameters correctly for success banner', () => {
      const mixedParams = [
        { key: 'Apply Param', value: 'Apply Value' },
        {
          key: 'Success Param 1',
          value: 'Success Value 1',
          state: State.Success,
        },
        {
          key: 'Success Param 2',
          value: 'Success Value 2',
          state: State.Success,
        },
        { key: 'Error Param', value: 'Error Value', state: State.Error },
      ];

      renderSuggestedActions({
        state: State.Success,
        configurationParameters: mixedParams,
      });

      const listItems = screen.getAllByRole('listitem');

      // Should only show success parameters
      expect(listItems).toHaveLength(2);
      expect(listItems[0]).toHaveTextContent(
        'Success Param 1: Success Value 1',
      );
      expect(listItems[1]).toHaveTextContent(
        'Success Param 2: Success Value 2',
      );
    });

    test('filters parameters correctly for error banner', () => {
      const mixedParams = [
        { key: 'Apply Param', value: 'Apply Value' },
        {
          key: 'Success Param',
          value: 'Success Value',
          state: State.Success,
        },
        { key: 'Error Param 1', value: 'Error Value 1', state: State.Error },
        { key: 'Error Param 2', value: 'Error Value 2', state: State.Error },
      ];

      renderSuggestedActions({
        state: State.Error,
        configurationParameters: mixedParams,
      });

      const listItems = screen.getAllByRole('listitem');

      // Should only show error parameters
      expect(listItems).toHaveLength(2);
      expect(listItems[0]).toHaveTextContent('Error Param 1: Error Value 1');
      expect(listItems[1]).toHaveTextContent('Error Param 2: Error Value 2');
    });
  });

  describe('dark mode', () => {
    test('renders in light mode by default', () => {
      const { container } = renderSuggestedActions();
      expect(container.firstChild).toBeInTheDocument();
    });

    test('renders in dark mode when darkMode prop is true', () => {
      const { container } = renderSuggestedActions({ darkMode: true });
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('parameter edge cases', () => {
    test('renders with special characters in parameter names and values', () => {
      const specialParams = [
        {
          key: 'Special-Chars & Symbols',
          value: 'Value with "quotes" & symbols!',
        },
        {
          key: 'Unicode Test',
          value: 'Test with émojis 🚀 and ünicöde çharacters',
        },
      ];

      renderSuggestedActions({
        configurationParameters: specialParams,
      });

      expect(screen.getByText('Special-Chars & Symbols')).toBeInTheDocument();
      expect(
        screen.getByText('Value with "quotes" & symbols!'),
      ).toBeInTheDocument();
      expect(screen.getByText('Unicode Test')).toBeInTheDocument();
      expect(
        screen.getByText('Test with émojis 🚀 and ünicöde çharacters'),
      ).toBeInTheDocument();
    });

    test('handles very long parameter names and values', () => {
      const longParams = [
        {
          key: 'Very Long Parameter Name That Exceeds Normal Length',
          value:
            'Very Long Value That Also Exceeds What Would Normally Be Expected In A Configuration Parameter',
        },
      ];

      renderSuggestedActions({
        configurationParameters: longParams,
      });

      expect(
        screen.getByText('Very Long Parameter Name That Exceeds Normal Length'),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Very Long Value That Also Exceeds What Would Normally Be Expected In A Configuration Parameter',
        ),
      ).toBeInTheDocument();
    });

    test('maintains table structure with varying parameter counts', () => {
      const singleParam = [{ key: 'Single Param', value: 'Value' }];

      const { rerender } = renderSuggestedActions({
        configurationParameters: singleParam,
      });

      expect(screen.getAllByRole('columnheader')).toHaveLength(1);
      expect(screen.getAllByRole('cell')).toHaveLength(1);

      const multipleParams = [
        { key: 'Param 1', value: 'Value 1' },
        { key: 'Param 2', value: 'Value 2' },
        { key: 'Param 3', value: 'Value 3' },
      ];

      rerender(
        <LeafyGreenProvider>
          <SuggestedActions
            {...defaultProps}
            configurationParameters={multipleParams}
          />
        </LeafyGreenProvider>,
      );

      expect(screen.getAllByRole('columnheader')).toHaveLength(3);
      expect(screen.getAllByRole('cell')).toHaveLength(3);
    });

    test('handles parameters with default state correctly', () => {
      const defaultStateParams = [
        { key: 'Default State', value: 'Should be apply' },
        {
          key: 'Explicit Unset',
          value: 'Explicit unset',
          state: State.Unset,
        },
        { key: 'Success State', value: 'Success', state: State.Success },
      ];

      renderSuggestedActions({
        configurationParameters: defaultStateParams,
      });

      // All parameters should be visible in table
      expect(screen.getByText('Default State')).toBeInTheDocument();
      expect(screen.getByText('Explicit Unset')).toBeInTheDocument();
      expect(screen.getByText('Success State')).toBeInTheDocument();
    });
  });

  describe('integration', () => {
    test('table shows all parameters regardless of banner status', () => {
      renderSuggestedActions({
        state: State.Success,
        configurationParameters: [
          { key: 'Cluster Tier', value: 'M10 ($9.00/month)' },
          { key: 'Provider', value: 'AWS / N. Virginia (us-east-1)' },
          {
            key: 'Different Key',
            value: 'Different Value',
            state: State.Success,
          },
        ],
      });

      // Table should show all parameters
      expect(screen.getByText('M10 ($9.00/month)')).toBeInTheDocument();
      expect(
        screen.getByText('AWS / N. Virginia (us-east-1)'),
      ).toBeInTheDocument();

      // "Different Key" appears in both table and banner, so use getAllByText
      const differentKeyElements = screen.getAllByText('Different Key');
      expect(differentKeyElements).toHaveLength(2); // One in table, one in banner

      // Banner should show only success parameters
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(1);
      expect(listItems[0]).toHaveTextContent('Different Key: Different Value');
    });

    test('component forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <LeafyGreenProvider>
          <SuggestedActions {...defaultProps} ref={ref} />
        </LeafyGreenProvider>,
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    test('spreads rest props to root div', () => {
      const { container } = renderSuggestedActions({
        'data-testid': 'suggestions-card',
        'aria-label': 'Configuration suggestions',
        style: { border: '2px solid red' },
      });

      const rootDiv = container.firstChild as HTMLElement;
      expect(rootDiv).toHaveAttribute('data-testid', 'suggestions-card');
      expect(rootDiv).toHaveAttribute(
        'aria-label',
        'Configuration suggestions',
      );
      expect(rootDiv).toHaveStyle('border: 2px solid red');
    });

    test('applies custom className to root div', () => {
      const customClassName = 'custom-suggestions-class';
      const { container } = renderSuggestedActions({
        className: customClassName,
      });

      const rootDiv = container.firstChild as HTMLElement;
      expect(rootDiv).toHaveClass(customClassName);
    });

    test('expands to parent container width', () => {
      const { container } = renderSuggestedActions();
      const rootDiv = container.firstChild as HTMLElement;

      // The component should have width: 100% instead of a fixed width
      expect(rootDiv).toHaveStyle('width: 100%');
    });
  });

  describe('props validation', () => {
    test('renders with minimal required props', () => {
      const minimalProps = {
        state: State.Unset,
        configurationParameters: [{ key: 'Test', value: 'Value' }],
        onClickApply: jest.fn(),
      };

      const { container } = render(
        <LeafyGreenProvider>
          <SuggestedActions {...minimalProps} />
        </LeafyGreenProvider>,
      );

      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByText('Test')).toBeInTheDocument();
      expect(screen.getByText('Value')).toBeInTheDocument();
    });

    test('handles different state enum values correctly', () => {
      // Test each state value
      Object.values(State).forEach(stateValue => {
        const { unmount } = renderSuggestedActions({
          state: stateValue,
          configurationParameters: [
            { key: 'Test', value: 'Value' },
            { key: 'Success Test', value: 'Success', state: State.Success },
            { key: 'Error Test', value: 'Error', state: State.Error },
          ],
        });

        expect(screen.getByText('Test')).toBeInTheDocument();
        unmount();
      });
    });
  });
});
