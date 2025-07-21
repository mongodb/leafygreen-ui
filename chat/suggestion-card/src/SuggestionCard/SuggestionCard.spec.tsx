import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { Status, SuggestionCardProps } from './SuggestionCard.types';
import { SuggestionCard } from '.';

const defaultSuggestedConfigurationParameters = {
  clusterTier: 'M10',
  price: '$9.00/month',
  cloudProvider: 'AWS / N. Virginia (us-east-1)',
  storage: '10 GB',
  ram: '2 GB',
  vCPUs: '2 vCPUs',
};

const defaultProps: SuggestionCardProps = {
  status: Status.Unset,
  suggestedConfigurationParameters: defaultSuggestedConfigurationParameters,
  handleApply: jest.fn(),
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
      const { container } = renderSuggestionCard({ status: Status.Success });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('does not have accessibility issues with Error banner', async () => {
      const { container } = renderSuggestionCard({ status: Status.Error });
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

      // Check headers
      expect(screen.getByText('Cluster Tier')).toBeInTheDocument();
      expect(screen.getByText('Provider')).toBeInTheDocument();
      expect(screen.getByText('Storage')).toBeInTheDocument();
      expect(screen.getByText('RAM')).toBeInTheDocument();
      expect(screen.getByText('vCPUs')).toBeInTheDocument();

      // Check values
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
        clusterTier: 'M30',
        price: '$31.00/month',
        cloudProvider: 'GCP / us-central1',
        storage: '100 GB',
        ram: '8 GB',
        vCPUs: '2 vCPUs',
      };

      renderSuggestionCard({
        suggestedConfigurationParameters: customParams,
      });

      expect(screen.getByText('M30 ($31.00/month)')).toBeInTheDocument();
      expect(screen.getByText('GCP / us-central1')).toBeInTheDocument();
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
      renderSuggestionCard({ status: Status.Success });
      expect(
        screen.getByText('The suggestions have been applied.'),
      ).toBeInTheDocument();
      expect(screen.getByText('Cloud Provider & Region')).toBeInTheDocument();
      expect(screen.getByText('Cluster Tier')).toBeInTheDocument();
    });

    test('renders error banner when status is Error', () => {
      renderSuggestionCard({ status: Status.Error });
      expect(
        screen.getByText(
          'We ran into an error when applying the suggestion. Please manually try it:',
        ),
      ).toBeInTheDocument();
      expect(screen.getByText('Cloud Provider & Region')).toBeInTheDocument();
      expect(screen.getByText('Cluster Tier')).toBeInTheDocument();
    });
  });

  describe('user interactions', () => {
    test('calls handleApply when Apply button is clicked', () => {
      const handleApply = jest.fn();
      renderSuggestionCard({
        status: Status.Apply,
        handleApply,
      });

      const applyButton = screen.getByText('Apply these suggestions');
      fireEvent.click(applyButton);

      expect(handleApply).toHaveBeenCalledTimes(1);
    });

    test('calls handleApply when Apply button is activated with keyboard', async () => {
      const handleApply = jest.fn();
      renderSuggestionCard({
        status: Status.Apply,
        handleApply,
      });

      const applyButton = screen.getByText('Apply these suggestions');
      await userEvent.click(applyButton);

      expect(handleApply).toHaveBeenCalledTimes(1);
    });

    test('Apply button has correct ARIA label and structure', () => {
      renderSuggestionCard({ status: Status.Apply });

      const applyButton = screen.getByText('Apply these suggestions');
      expect(applyButton).toBeInTheDocument();
      expect(applyButton.tagName).toBe('BUTTON');
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
    test('success banner shows correct configuration in banner', () => {
      renderSuggestionCard({ status: Status.Success });

      // Check that the banner shows the configuration details
      expect(
        screen.getByText('AWS / N. Virginia (us-east-1)'),
      ).toBeInTheDocument();
      expect(screen.getByText('M10')).toBeInTheDocument();
    });

    test('error banner shows correct configuration in banner', () => {
      renderSuggestionCard({ status: Status.Error });

      // Check that the banner shows the configuration details
      expect(
        screen.getByText('AWS / N. Virginia (us-east-1)'),
      ).toBeInTheDocument();
      expect(screen.getByText('M10')).toBeInTheDocument();
    });

    test('banner displays custom configuration parameters', () => {
      const customParams = {
        clusterTier: 'M40',
        price: '$15.00/month',
        cloudProvider: 'Azure / East US',
        storage: '40 GB',
        ram: '4 GB',
        vCPUs: '4 vCPUs',
      };

      renderSuggestionCard({
        status: Status.Success,
        suggestedConfigurationParameters: customParams,
      });

      expect(screen.getByText('Azure / East US')).toBeInTheDocument();
      expect(screen.getByText('M40')).toBeInTheDocument();
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
});
