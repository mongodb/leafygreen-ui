import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { ParametersByStatus, Status } from '../shared.types';

import { SuggestedActions } from '.';

interface TestSuggestedActionsProps {
  status: Status;
  configurationParameters: ParametersByStatus;
  onClickApply: () => void;
  darkMode?: boolean;
}

const defaultConfigurationParameters: ParametersByStatus = {
  apply: {
    'Cluster Tier': 'M10 ($9.00/month)',
    Provider: 'AWS / N. Virginia (us-east-1)',
    Storage: '10 GB',
    RAM: '2 GB',
    vCPUs: '2 vCPUs',
  },
};

const successConfigurationParameters: ParametersByStatus = {
  apply: {
    'Cluster Tier': 'M10 ($9.00/month)',
    Provider: 'AWS / N. Virginia (us-east-1)',
  },
  success: {
    'Cloud Provider & Region': 'AWS / N. Virginia (us-east-1)',
    'Cluster Tier': 'M10 ($9.00/month)',
  },
};

const errorConfigurationParameters: ParametersByStatus = {
  apply: {
    'Cluster Tier': 'M30 ($31.00/month)',
    Provider: 'GCP / Iowa (us-central1)',
  },
  error: {
    'Cloud Provider & Region': 'GCP / Iowa (us-central1)',
    'Cluster Tier': 'M30 ($31.00/month)',
  },
};

const defaultProps: TestSuggestedActionsProps = {
  status: Status.Apply,
  configurationParameters: defaultConfigurationParameters,
  onClickApply: jest.fn(),
};

function renderSuggestedActions(
  props: Partial<TestSuggestedActionsProps> = {},
) {
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
      const { container } = renderSuggestedActions({ status: Status.Apply });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('does not have accessibility issues with Success banner', async () => {
      const { container } = renderSuggestedActions({
        status: Status.Success,
        configurationParameters: successConfigurationParameters,
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('does not have accessibility issues with Error banner', async () => {
      const { container } = renderSuggestedActions({
        status: Status.Error,
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
      const customParams = {
        apply: {
          'Cluster Tier': 'M30 ($31.00/month)',
          Provider: 'GCP / Iowa (us-central1)',
          Storage: '100 GB',
          RAM: '8 GB',
          vCPUs: '2 vCPUs',
        },
      };

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
        configurationParameters: { apply: {} },
      });

      expect(
        screen.getByText('Apply configuration to your cluster?'),
      ).toBeInTheDocument();
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      expect(screen.queryAllByRole('columnheader')).toHaveLength(0);
    });

    test('handles undefined apply parameters', () => {
      renderSuggestedActions({
        configurationParameters: {},
      });

      expect(
        screen.getByText('Apply configuration to your cluster?'),
      ).toBeInTheDocument();
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      expect(screen.queryAllByRole('columnheader')).toHaveLength(0);
    });
  });

  describe('Apply button', () => {
    test('renders when status is Apply', () => {
      renderSuggestedActions({ status: Status.Apply });
      const button = screen.getByRole('button', {
        name: /apply these suggestions/i,
      });
      expect(button).toBeInTheDocument();
    });

    test('does not render when status is Success', () => {
      renderSuggestedActions({ status: Status.Success });
      expect(
        screen.queryByRole('button', { name: /apply these suggestions/i }),
      ).not.toBeInTheDocument();
    });

    test('does not render when status is Error', () => {
      renderSuggestedActions({ status: Status.Error });
      expect(
        screen.queryByRole('button', { name: /apply these suggestions/i }),
      ).not.toBeInTheDocument();
    });

    test('calls onClickApply when clicked', () => {
      const onClickApply = jest.fn();
      renderSuggestedActions({ status: Status.Apply, onClickApply });

      const button = screen.getByRole('button', {
        name: /apply these suggestions/i,
      });
      userEvent.click(button);

      expect(onClickApply).toHaveBeenCalledTimes(1);
    });

    test('has correct button attributes', () => {
      renderSuggestedActions({ status: Status.Apply });
      const button = screen.getByRole('button', {
        name: /apply these suggestions/i,
      });

      expect(button).toHaveAttribute('type', 'button');
      expect(button).not.toBeDisabled();
    });
  });

  describe('Status banner', () => {
    test('does not render when status is Apply', () => {
      renderSuggestedActions({ status: Status.Apply });
      expect(
        screen.queryByText('The suggestions have been applied.'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/we ran into an error/i),
      ).not.toBeInTheDocument();
    });

    test('renders success banner when status is Success', () => {
      renderSuggestedActions({
        status: Status.Success,
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

    test('renders error banner when status is Error', () => {
      renderSuggestedActions({
        status: Status.Error,
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

    test('handles undefined success parameters', () => {
      renderSuggestedActions({
        status: Status.Success,
        configurationParameters: { apply: {} },
      });

      expect(
        screen.getByText('The suggestions have been applied.'),
      ).toBeInTheDocument();

      // Should render empty list when no parameters
      const list = screen.queryByRole('list');
      expect(list).toBeInTheDocument();
      expect(list?.children).toHaveLength(0);
    });

    test('handles undefined error parameters', () => {
      renderSuggestedActions({
        status: Status.Error,
        configurationParameters: { apply: {} },
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
  });

  describe('dark mode', () => {
    test('renders in light mode by default', () => {
      const { container } = renderSuggestedActions();
      // Check that the component renders without dark mode classes
      expect(container.firstChild).toBeInTheDocument();
    });

    test('renders in dark mode when darkMode prop is true', () => {
      const { container } = renderSuggestedActions({ darkMode: true });
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('parameter edge cases', () => {
    test('renders with special characters in parameter names and values', () => {
      const specialParams = {
        apply: {
          'Special-Chars & Symbols': 'Value with "quotes" & symbols!',
          'Unicode Test': 'Test with émojis 🚀 and ünicöde çharacters',
        },
      };

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
      const longParams = {
        apply: {
          'Very Long Parameter Name That Exceeds Normal Length':
            'Very Long Value That Also Exceeds What Would Normally Be Expected In A Configuration Parameter',
        },
      };

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
      const singleParam = {
        apply: { 'Single Param': 'Value' },
      };

      const { rerender } = renderSuggestedActions({
        configurationParameters: singleParam,
      });

      expect(screen.getAllByRole('columnheader')).toHaveLength(1);
      expect(screen.getAllByRole('cell')).toHaveLength(1);

      const multipleParams = {
        apply: {
          'Param 1': 'Value 1',
          'Param 2': 'Value 2',
          'Param 3': 'Value 3',
        },
      };

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
  });

  describe('integration', () => {
    test('table shows apply parameters regardless of banner status', () => {
      renderSuggestedActions({
        status: Status.Success,
        configurationParameters: {
          apply: {
            'Cluster Tier': 'M10 ($9.00/month)',
            Provider: 'AWS / N. Virginia (us-east-1)',
          },
          success: {
            'Different Key': 'Different Value',
          },
        },
      });

      // Table should always show apply parameters
      expect(screen.getByText('M10 ($9.00/month)')).toBeInTheDocument();
      expect(
        screen.getByText('AWS / N. Virginia (us-east-1)'),
      ).toBeInTheDocument();

      // Banner should show success parameters
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toContainEqual(
        expect.objectContaining({
          textContent: expect.stringContaining(
            'Different Key: Different Value',
          ),
        }),
      );
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
  });

  describe('props validation', () => {
    test('renders with minimal required props', () => {
      const minimalProps = {
        status: Status.Apply,
        configurationParameters: { apply: { Test: 'Value' } },
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
  });
});
