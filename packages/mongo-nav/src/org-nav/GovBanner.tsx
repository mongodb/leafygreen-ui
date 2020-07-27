import React from 'react';
import GovBuildingIcon from '@leafygreen-ui/icon/dist/GovBuilding';
import Tooltip from '@leafygreen-ui/tooltip';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { Body } from '@leafygreen-ui/typography';

const desktopContainer = css`
  margin-bottom: 10px;
  position: relative;
  z-index: 2;
  display: flex;
  flex-grow: 1;
  height: 5px;
  background-color: #edf5fa;
  align-items: flex-start;
  justify-content: center;
`;

const tabletContainer = css`
  position: relative;
  z-index: 2;
  display: flex;
  flex-grow: 1;
  align-items: flex-start;
  justify-content: center;
  height: 0;
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

const sharedBannerContainerStyles = css`
  background-color: #edf5fa;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
`;

const desktopTooltipContainer = css`
  height: 34px;
  width: 205px;
  border-radius: 0 0 17px 17px;
`;

const tabletTooltipContainer = css`
  height: 20px;
  width: 200px;
  border-radius: 0 0 15px 15px;
`;

const tooltipWidth = css`
  width: 315px;
`;

const iconColor = css`
  color: ${uiColors.blue.base};
  margin-bottom: 4px;
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
    <div
      data-testid="org-nav-fedramp-banner"
      className={cx({
        [tabletContainer]: isTablet,
        [desktopContainer]: !isTablet,
      })}
    >
      <Tooltip
        {...sharedTooltipProps}
        trigger={
          <div
            className={cx(sharedBannerContainerStyles, {
              [desktopTooltipContainer]: !isTablet,
              [tabletTooltipContainer]: isTablet,
            })}
          >
            <GovBuildingIcon size="small" className={iconColor} />
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
          <GovBuildingIcon className={iconColor} />
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
