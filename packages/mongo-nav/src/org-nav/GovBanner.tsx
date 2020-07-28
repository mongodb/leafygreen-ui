import React from 'react';
import GovernmentBuildingIcon from '@leafygreen-ui/icon/dist/GovernmentBuilding';
import Tooltip from '@leafygreen-ui/tooltip';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { Body } from '@leafygreen-ui/typography';

const bannerContainer = css`
  margin-bottom: 10px;
  position: relative;
  z-index: 2;
  display: flex;
  flex-grow: 1;
  height: 5px;
  background-color: #edf5fa;
  align-items: flex-start;
  justify-content: center;
  cursor: pointer;
`;

const mobileContainer = css`
  width: 30px;
  height: 30px;
  background-color: #edf5fa;
  margin-left: 12px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const sharedTooltipContainerStyles = css`
  background-color: #edf5fa;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  border-radius: 0 0 100px 100px;
`;

const desktopTooltipContainer = css`
  height: 34px;
  width: 205px;
`;

const tabletTooltipContainer = css`
  height: 20px;
  width: 200px;
`;

const tooltipWidth = css`
  width: 315px;
`;

const iconColor = css`
  color: ${uiColors.blue.base};
`;

const bannerMargin = css`
  margin-bottom: 2px;
  margin-right: 2px;
`;

const mobileMargin = css`
  margin-bottom: 4px;
  margin-top: 4px;
`;

const bodyStyle = css`
  font-size: 11px;
  color: #0d324f;
`;

const tooltipContent = (
  <div className={tooltipWidth}>
    You are currently in the MongoDB Cloud for Government environment that is
    FedRAMP authorized.
  </div>
);

const sharedTooltipProps = {
  align: 'bottom',
  variant: 'dark',
} as const;

function FullWidthGovBanner({ isTablet = false }: { isTablet?: boolean }) {
  return (
    <div data-testid="org-nav-fedramp-banner" className={bannerContainer}>
      <Tooltip
        {...sharedTooltipProps}
        trigger={
          <div
            className={cx(sharedTooltipContainerStyles, {
              [desktopTooltipContainer]: !isTablet,
              [tabletTooltipContainer]: isTablet,
            })}
          >
            <GovernmentBuildingIcon
              size="small"
              className={cx(iconColor, bannerMargin)}
            />
            <Body className={bodyStyle}>MongoDB Cloud for Government</Body>
          </div>
        }
        justify="middle"
        triggerEvent={isTablet ? 'click' : 'hover'}
      >
        {tooltipContent}
      </Tooltip>
    </div>
  );
}

function MobileGovTooltip() {
  return (
    <Tooltip
      {...sharedTooltipProps}
      trigger={
        <div className={mobileContainer}>
          <GovernmentBuildingIcon className={cx(iconColor, mobileMargin)} />
        </div>
      }
      justify="end"
      triggerEvent="click"
    >
      {tooltipContent}
    </Tooltip>
  );
}

export { FullWidthGovBanner, MobileGovTooltip };
