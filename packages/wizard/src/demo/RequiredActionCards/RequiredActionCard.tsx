import React, { PropsWithChildren, ReactNode } from 'react';

import { css } from '@leafygreen-ui/emotion';
import {
  ExpandableCard,
  ExpandableCardProps,
} from '@leafygreen-ui/expandable-card';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  Size as SpinnerSize,
  Spinner,
} from '@leafygreen-ui/loading-indicator/spinner';
import { Skeleton } from '@leafygreen-ui/skeleton-loader';
import { color, spacing } from '@leafygreen-ui/tokens';

const requiredActionCardStyles = css`
  & h6 {
    display: block;
  }
`;

const expandableCardContentStyles = css`
  padding: unset;
`;

const cardContentWrapperStyles = css`
  padding-bottom: ${spacing[400]}px;
  overflow: hidden;
`;

export interface RequiredActionCardProps extends ExpandableCardProps {
  isLoading?: boolean;
  loadingTitle?: ReactNode;
  loadingDescription?: ReactNode;
}

export interface InheritedRequiredActionCardProps
  extends Omit<ExpandableCardProps, 'title' | 'description'> {}

export const TitleEm = ({ children }: PropsWithChildren<{}>) => {
  const { theme } = useDarkMode();
  return (
    <em
      className={css`
        font-style: unset;
        color: ${color[theme].text.error.default};
      `}
    >
      {children}
    </em>
  );
};

export const RequiredActionCard = ({
  title,
  description,
  isLoading,
  children,
  loadingTitle = (
    <Skeleton
      size="small"
      className={css`
        width: 50%;
      `}
    />
  ),
  loadingDescription = 'This may take a few moments',
  ...rest
}: RequiredActionCardProps) => {
  return (
    <ExpandableCard
      title={isLoading ? loadingTitle : title}
      description={
        isLoading ? (
          <div
            className={css`
              display: flex;
              align-items: center;
              gap: ${spacing[100]}px;
            `}
          >
            <Spinner size={SpinnerSize.XSmall} />
            {loadingDescription}
          </div>
        ) : (
          description
        )
      }
      className={requiredActionCardStyles}
      contentClassName={expandableCardContentStyles}
      defaultOpen={false}
      {...rest}
    >
      <div className={cardContentWrapperStyles}>{children}</div>
    </ExpandableCard>
  );
};
