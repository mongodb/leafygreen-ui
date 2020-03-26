import React from 'react';
import Badge, { Variant } from '@leafygreen-ui/badge';
import { css } from '@leafygreen-ui/emotion';
import { ProjectStatus } from '../types';

const projectStatusBadgeMargin = css`
  margin-right: 20px;
`;

const projectStatusBadgeVariant = {
  [ProjectStatus.Active]: Variant.Green,
  [ProjectStatus.Closing]: Variant.Yellow,
  [ProjectStatus.Closed]: Variant.Red,
  [ProjectStatus.Dead]: Variant.Red,
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
