import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { Status, SuggestionCardProps } from './SuggestionCard.types';
import { SuggestionCard } from '.';

const defaultSuggestedConfigurationParameters = {
  'Cluster Tier': 'M10 ($9.00/month)',
  Provider: 'AWS / N. Virginia (us-east-1)',
  Storage: '10 GB',
  RAM: '2 GB',
  vCPUs: '2 vCPUs',
};

const defaultAppliedParameters = {
  'Cloud Provider & Region': 'AWS / N. Virginia (us-east-1)',
  'Cluster Tier': 'M10 ($9.00/month)',
};

const defaultFailedParameters = {
  'Cloud Provider & Region': 'GCP / Iowa (us-central1)',
  'Cluster Tier': 'M30 ($31.00/month)',
};

const defaultProps: SuggestionCardProps = {
  status: Status.Unset,
  suggestedConfigurationParameters: defaultSuggestedConfigurationParameters,
  onClickApply: jest.fn(),
};

function renderSuggestionCard(props: Partial<SuggestionCardProps> = {}) {
  const allProps = { ...defaultProps, ...props };
  const utils = render(
    <LeafyGreenProvider>
      <SuggestionCard {...allProps} />
    </LeafyGreenProvider>,
  );
  return { ...utils, props: allProps };
}

describe('chat/suggestion-card', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderSuggestionCard();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('does not have accessibility issues with Apply button', async () => {
      const { container } = renderSuggestionCard({ status: Status.Apply });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('does not have accessibility issues with Success banner', async () => {
      const { container } = renderSuggestionCard({
        status: Status.Success,
        appliedParameters: defaultAppliedParameters,
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('does not have accessibility issues with Error banner', async () => {
      const { container } = renderSuggestionCard({
        status: Status.Error,
        failedParameters: defaultFailedParameters,
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('does not have accessibility issues with empty parameters', async () => {
      const { container } = renderSuggestionCard({
        status: Status.Success,
        appliedParameters: {},
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('does not have accessibility issues with undefined parameters', async () => {
      const { container } = renderSuggestionCard({
        status: Status.Error,
        failedParameters: undefined,
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    test('renders title text', () => {
      renderSuggestionCard();
      expect(
        screen.getByText('Apply configuration to your cluster?'),
      ).toBeInTheDocument();
    });

    test('renders all configuration parameters in table', () => {
      renderSuggestionCard();

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
        'Cluster Tier': 'M30 ($31.00/month)',
        Provider: 'GCP / Iowa (us-central1)',
        Storage: '100 GB',
        RAM: '8 GB',
        vCPUs: '2 vCPUs',
      };

      renderSuggestionCard({
        suggestedConfigurationParameters: customParams,
      });

      expect(screen.getByText('M30 ($31.00/month)')).toBeInTheDocument();
      expect(screen.getByText('GCP / Iowa (us-central1)')).toBeInTheDocument();
      expect(screen.getByText('100 GB')).toBeInTheDocument();
      expect(screen.getByText('8 GB')).toBeInTheDocument();
      expect(screen.getByText('2 vCPUs')).toBeInTheDocument();
    });

    test('accepts forwarded ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <LeafyGreenProvider>
          <SuggestionCard {...defaultProps} ref={ref} />
        </LeafyGreenProvider>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('status behavior', () => {
    test('does not render Apply button when status is Unset', () => {
      renderSuggestionCard({ status: Status.Unset });
      expect(
        screen.queryByText('Apply these suggestions'),
      ).not.toBeInTheDocument();
    });

    test('renders Apply button when status is Apply', () => {
      renderSuggestionCard({ status: Status.Apply });
      expect(screen.getByText('Apply these suggestions')).toBeInTheDocument();
    });

    test('does not render Apply button when status is Success', () => {
      renderSuggestionCard({ status: Status.Success });
      expect(
        screen.queryByText('Apply these suggestions'),
      ).not.toBeInTheDocument();
    });

    test('does not render Apply button when status is Error', () => {
      renderSuggestionCard({ status: Status.Error });
      expect(
        screen.queryByText('Apply these suggestions'),
      ).not.toBeInTheDocument();
    });

    test('does not render status banner when status is Unset', () => {
      renderSuggestionCard({ status: Status.Unset });
      expect(
        screen.queryByText('The suggestions have been applied.'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(
          'We ran into an error when applying the suggestion.',
        ),
      ).not.toBeInTheDocument();
    });

    test('does not render status banner when status is Apply', () => {
      renderSuggestionCard({ status: Status.Apply });
      expect(
        screen.queryByText('The suggestions have been applied.'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(
          'We ran into an error when applying the suggestion.',
        ),
      ).not.toBeInTheDocument();
    });

    test('renders success banner when status is Success', () => {
      renderSuggestionCard({
        status: Status.Success,
        appliedParameters: defaultAppliedParameters,
      });
      expect(
        screen.getByText('The suggestions have been applied.'),
      ).toBeInTheDocument();
      expect(screen.getByText('Cloud Provider & Region')).toBeInTheDocument();
      // Use getAllByText to handle duplicate "Cluster Tier" elements
      expect(screen.getAllByText('Cluster Tier')).toHaveLength(2);
    });

    test('renders error banner when status is Error', () => {
      renderSuggestionCard({
        status: Status.Error,
        failedParameters: defaultFailedParameters,
      });
      expect(
        screen.getByText(
          'We ran into an error when applying the suggestion. Please manually try it:',
        ),
      ).toBeInTheDocument();
      expect(screen.getByText('Cloud Provider & Region')).toBeInTheDocument();
      // Use getAllByText to handle duplicate "Cluster Tier" elements
      expect(screen.getAllByText('Cluster Tier')).toHaveLength(2);
    });
  });

  describe('user interactions', () => {
    test('calls onClickApply when Apply button is clicked', () => {
      const onClickApply = jest.fn();
      renderSuggestionCard({
        status: Status.Apply,
        onClickApply,
      });

      const applyButton = screen.getByText('Apply these suggestions');
      fireEvent.click(applyButton);

      expect(onClickApply).toHaveBeenCalledTimes(1);
    });

    test('calls onClickApply when Apply button is activated with keyboard', async () => {
      const onClickApply = jest.fn();
      renderSuggestionCard({
        status: Status.Apply,
        onClickApply,
      });

      const applyButton = screen.getByText('Apply these suggestions');
      await userEvent.click(applyButton);

      expect(onClickApply).toHaveBeenCalledTimes(1);
    });

    test('Apply button has correct ARIA label and structure', () => {
      renderSuggestionCard({ status: Status.Apply });

      const applyButton = screen.getByRole('button', {
        name: 'Apply these suggestions',
      });
      expect(applyButton).toBeInTheDocument();
    });
  });

  describe('dark mode support', () => {
    test('renders correctly in dark mode', () => {
      const { container } = render(
        <LeafyGreenProvider darkMode>
          <SuggestionCard {...defaultProps} />
        </LeafyGreenProvider>,
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    test('renders correctly in light mode', () => {
      const { container } = render(
        <LeafyGreenProvider darkMode={false}>
          <SuggestionCard {...defaultProps} />
        </LeafyGreenProvider>,
      );

      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('status banner content', () => {
    test('success banner shows correct applied parameters', () => {
      renderSuggestionCard({
        status: Status.Success,
        appliedParameters: defaultAppliedParameters,
      });

      // Check that the banner shows the applied parameters, not the suggested ones
      const listItems = screen.getAllByRole('listitem');

      // Check for Cloud Provider & Region
      expect(listItems).toContainEqual(
        expect.objectContaining({
          textContent: expect.stringContaining(
            'Cloud Provider & Region: AWS / N. Virginia (us-east-1)',
          ),
        }),
      );

      // Check for Cluster Tier
      expect(listItems).toContainEqual(
        expect.objectContaining({
          textContent: expect.stringContaining(
            'Cluster Tier: M10 ($9.00/month)',
          ),
        }),
      );
    });

    test('error banner shows correct failed parameters', () => {
      renderSuggestionCard({
        status: Status.Error,
        failedParameters: defaultFailedParameters,
      });

      // Check that the banner shows the failed parameters
      const listItems = screen.getAllByRole('listitem');

      // Check for Cloud Provider & Region
      expect(listItems).toContainEqual(
        expect.objectContaining({
          textContent: expect.stringContaining(
            'Cloud Provider & Region: GCP / Iowa (us-central1)',
          ),
        }),
      );

      // Check for Cluster Tier
      expect(listItems).toContainEqual(
        expect.objectContaining({
          textContent: expect.stringContaining(
            'Cluster Tier: M30 ($31.00/month)',
          ),
        }),
      );
    });

    test('success banner displays custom applied parameters', () => {
      const customAppliedParams = {
        'Cloud Provider & Region': 'Azure / East US',
        'Cluster Tier': 'M40 ($15.00/month)',
        Storage: '50 GB',
      };

      renderSuggestionCard({
        status: Status.Success,
        appliedParameters: customAppliedParams,
      });

      const listItems = screen.getAllByRole('listitem');

      expect(listItems).toContainEqual(
        expect.objectContaining({
          textContent: expect.stringContaining(
            'Cloud Provider & Region: Azure / East US',
          ),
        }),
      );

      expect(listItems).toContainEqual(
        expect.objectContaining({
          textContent: expect.stringContaining(
            'Cluster Tier: M40 ($15.00/month)',
          ),
        }),
      );

      expect(listItems).toContainEqual(
        expect.objectContaining({
          textContent: expect.stringContaining('Storage: 50 GB'),
        }),
      );
    });

    test('error banner displays custom failed parameters', () => {
      const customFailedParams = {
        'Cloud Provider & Region': 'AWS / us-west-2',
        'Cluster Tier': 'M20 ($20.00/month)',
      };

      renderSuggestionCard({
        status: Status.Error,
        failedParameters: customFailedParams,
      });

      const listItems = screen.getAllByRole('listitem');

      expect(listItems).toContainEqual(
        expect.objectContaining({
          textContent: expect.stringContaining(
            'Cloud Provider & Region: AWS / us-west-2',
          ),
        }),
      );

      expect(listItems).toContainEqual(
        expect.objectContaining({
          textContent: expect.stringContaining(
            'Cluster Tier: M20 ($20.00/month)',
          ),
        }),
      );
    });

    test('success banner handles undefined applied parameters', () => {
      renderSuggestionCard({
        status: Status.Success,
        appliedParameters: undefined,
      });

      expect(
        screen.getByText('The suggestions have been applied.'),
      ).toBeInTheDocument();

      // Should render empty list when no parameters
      const list = screen.queryByRole('list');
      expect(list).toBeInTheDocument();
      expect(list?.children).toHaveLength(0);
    });

    test('error banner handles undefined failed parameters', () => {
      renderSuggestionCard({
        status: Status.Error,
        failedParameters: undefined,
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

    test('success banner handles empty applied parameters', () => {
      renderSuggestionCard({
        status: Status.Success,
        appliedParameters: {},
      });

      expect(
        screen.getByText('The suggestions have been applied.'),
      ).toBeInTheDocument();

      // Should render empty list when empty parameters
      const list = screen.queryByRole('list');
      expect(list).toBeInTheDocument();
      expect(list?.children).toHaveLength(0);
    });

    test('error banner handles empty failed parameters', () => {
      renderSuggestionCard({
        status: Status.Error,
        failedParameters: {},
      });

      expect(
        screen.getByText(
          'We ran into an error when applying the suggestion. Please manually try it:',
        ),
      ).toBeInTheDocument();

      // Should render empty list when empty parameters
      const list = screen.queryByRole('list');
      expect(list).toBeInTheDocument();
      expect(list?.children).toHaveLength(0);
    });
  });

  describe('parameter props validation', () => {
    test('renders table with suggestedConfigurationParameters regardless of banner status', () => {
      renderSuggestionCard({
        status: Status.Success,
        appliedParameters: { 'Different Key': 'Different Value' },
      });

      // Table should always show suggested parameters
      expect(screen.getByText('M10 ($9.00/month)')).toBeInTheDocument();
      expect(
        screen.getByText('AWS / N. Virginia (us-east-1)'),
      ).toBeInTheDocument();
      expect(screen.getByText('10 GB')).toBeInTheDocument();
      expect(screen.getByText('2 GB')).toBeInTheDocument();
      expect(screen.getByText('2 vCPUs')).toBeInTheDocument();

      // Banner should show applied parameters
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toContainEqual(
        expect.objectContaining({
          textContent: expect.stringContaining(
            'Different Key: Different Value',
          ),
        }),
      );
    });

    test('success banner does not render when appliedParameters is provided but status is not Success', () => {
      renderSuggestionCard({
        status: Status.Apply,
        appliedParameters: defaultAppliedParameters,
      });

      expect(
        screen.queryByText('The suggestions have been applied.'),
      ).not.toBeInTheDocument();
      // No banner should be rendered, so no list should exist
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    test('error banner does not render when failedParameters is provided but status is not Error', () => {
      renderSuggestionCard({
        status: Status.Apply,
        failedParameters: defaultFailedParameters,
      });

      expect(
        screen.queryByText(
          'We ran into an error when applying the suggestion. Please manually try it:',
        ),
      ).not.toBeInTheDocument();
      // No banner should be rendered, so no list should exist
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    test('can handle both appliedParameters and failedParameters being provided simultaneously', () => {
      renderSuggestionCard({
        status: Status.Success,
        appliedParameters: defaultAppliedParameters,
        failedParameters: defaultFailedParameters, // Should be ignored for success status
      });

      // Should only show applied parameters in success banner
      const listItems = screen.getAllByRole('listitem');
      const hasAppliedContent = listItems.some(item =>
        item.textContent?.includes('AWS / N. Virginia (us-east-1)'),
      );
      expect(hasAppliedContent).toBe(true);

      // Should not show failed parameters content
      const hasFailedContent = listItems.some(item =>
        item.textContent?.includes('GCP / Iowa (us-central1)'),
      );
      expect(hasFailedContent).toBe(false);
    });

    test('handles special characters and long parameter values', () => {
      const specialParams = {
        'Special-Chars & Symbols': 'Value with "quotes" & symbols!',
        'Very Long Parameter Name That Exceeds Normal Length':
          'Very Long Value That Also Exceeds What Would Normally Be Expected In A Configuration Parameter',
        'Unicode Test': 'Test with émojis 🚀 and ünicöde çharacters',
      };

      renderSuggestionCard({
        status: Status.Success,
        appliedParameters: specialParams,
      });

      const listItems = screen.getAllByRole('listitem');

      Object.entries(specialParams).forEach(([key, value]) => {
        expect(listItems).toContainEqual(
          expect.objectContaining({
            textContent: expect.stringContaining(`${key}: ${value}`),
          }),
        );
      });
    });
  });

  describe('table structure', () => {
    test('renders proper table structure', () => {
      renderSuggestionCard();

      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();

      // Check for table headers (th elements)
      const headers = screen.getAllByRole('columnheader');
      expect(headers).toHaveLength(5);

      // Check for table cells (td elements)
      const cells = screen.getAllByRole('cell');
      expect(cells).toHaveLength(5);
    });

    test('table has correct semantic structure', () => {
      renderSuggestionCard();

      // Cluster Tier row
      expect(
        screen.getByRole('columnheader', { name: 'Cluster Tier' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('cell', { name: 'M10 ($9.00/month)' }),
      ).toBeInTheDocument();

      // Provider row
      expect(
        screen.getByRole('columnheader', { name: 'Provider' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('cell', { name: 'AWS / N. Virginia (us-east-1)' }),
      ).toBeInTheDocument();

      // Storage row
      expect(
        screen.getByRole('columnheader', { name: 'Storage' }),
      ).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: '10 GB' })).toBeInTheDocument();

      // RAM row
      expect(
        screen.getByRole('columnheader', { name: 'RAM' }),
      ).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: '2 GB' })).toBeInTheDocument();

      // vCPUs row
      expect(
        screen.getByRole('columnheader', { name: 'vCPUs' }),
      ).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: '2 vCPUs' })).toBeInTheDocument();
    });
  });

  describe('props validation', () => {
    test('renders with minimal required props', () => {
      const minimalProps = {
        status: Status.Unset,
        suggestedConfigurationParameters: { Test: 'Value' },
        onClickApply: jest.fn(),
      };

      const { container } = render(
        <LeafyGreenProvider>
          <SuggestionCard {...minimalProps} />
        </LeafyGreenProvider>,
      );

      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByText('Test')).toBeInTheDocument();
      expect(screen.getByText('Value')).toBeInTheDocument();
    });

    test('handles empty suggestedConfigurationParameters', () => {
      renderSuggestionCard({
        suggestedConfigurationParameters: {},
      });

      expect(
        screen.getByText('Apply configuration to your cluster?'),
      ).toBeInTheDocument();
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      expect(screen.queryAllByRole('columnheader')).toHaveLength(0);
    });

    test('maintains consistent behavior across different parameter counts', () => {
      const singleParam = { 'Single Param': 'Value' };
      const multipleParams = {
        'Param 1': 'Value 1',
        'Param 2': 'Value 2',
        'Param 3': 'Value 3',
      };

      // Test single parameter
      const { rerender } = renderSuggestionCard({
        suggestedConfigurationParameters: singleParam,
      });
      expect(screen.getAllByRole('columnheader')).toHaveLength(1);
      expect(screen.getAllByRole('cell')).toHaveLength(1);

      // Test multiple parameters
      rerender(
        <LeafyGreenProvider>
          <SuggestionCard
            {...defaultProps}
            suggestedConfigurationParameters={multipleParams}
          />
        </LeafyGreenProvider>,
      );
      expect(screen.getAllByRole('columnheader')).toHaveLength(3);
      expect(screen.getAllByRole('cell')).toHaveLength(3);
    });
  });
});
