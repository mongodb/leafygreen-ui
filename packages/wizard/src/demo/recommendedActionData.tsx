import React from 'react';

import { Link } from '@leafygreen-ui/typography';

import { RecommendedActionCardProps } from './RecommendedActionCard';

export const recommendedActionsConfig: Array<RecommendedActionCardProps> = [
  {
    category: 'Data Retention',
    title: 'Export most recent Backup Snapshot',
    description:
      'To safeguard critical information, provide a recovery option to ensure you have access to your data after you delete your project.',
    link: (
      <Link href="TODO:" target="_blank">
        Learn how to export backup snapshots
      </Link>
    ),
  },

  {
    category: 'Compliance',
    title: 'Export audit logs',
    description:
      'Retain a record of essential data regarding changes and actions within your project for compliance, audits, and future reference.',
    link: (
      <Link href="TODO:" target="_blank">
        Learn how to export audit logs
      </Link>
    ),
  },
  {
    category: 'Auditing',
    title: 'Export Project Activity Feed events',
    description:
      'Ensure you have access to key details about project changes, actions, and events for audits, compliance, or future reference.',
    link: (
      <Link href="TODO:" target="_blank">
        {' '}
        Learn how to return events
      </Link>
    ),
  },

  {
    category: 'Security',
    title: 'Disconnect third-party integrations',
    description:
      'Remove API keys to secure of your data, prevent unauthorized access, and avoid any unintended interactions with external systems.',
    link: (
      <Link href="TODO:" target="_blank">
        Go to integrations
      </Link>
    ),
  },

  {
    category: 'Visualizations',
    title: 'Export Charts and Dashboards',
    description:
      'Retain critical insights and visualizations from dashboards, data sources, and charts associated with your project.',
    link: (
      <Link href="TODO:" target="_blank">
        Export charts dashboards
      </Link>
    ),
  },
];
