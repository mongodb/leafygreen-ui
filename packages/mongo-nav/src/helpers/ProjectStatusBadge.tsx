import React from 'react';
import Badge from '@leafygreen-ui/badge';
import { css } from '@leafygreen-ui/emotion';
import { ProjectStatus } from '../types';

const projectStatusBadgeMargin = css`
  margin-right: 20px;
`;

const Colors = {
  Yellow: 'yellow',
  Red: 'red',
  Green: 'green',
} as const;

const projectStatusBadgeVariant = {
  [ProjectStatus.Active]: Colors.Green,
  [ProjectStatus.Closing]: Colors.Yellow,
  [ProjectStatus.Closed]: Colors.Red,
  [ProjectStatus.Dead]: Colors.Red,
};

interface ProjectStatusBadgeProps {
  currentStatus: ProjectStatus;
}

export default function ProjectStatusBadge({
  currentStatus,
}: ProjectStatusBadgeProps) {
  return (
    <Badge
      variant={projectStatusBadgeVariant[currentStatus]}
      data-testid="project-nav-project-status-badge"
      className={projectStatusBadgeMargin}
    >
      {currentStatus}
    </Badge>
  );
}
