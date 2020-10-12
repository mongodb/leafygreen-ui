import React from 'react';
import Button from '@leafygreen-ui/button';
import DownloadIcon from '@leafygreen-ui/icon/dist/Download';
import { Tabs, Tab } from '@leafygreen-ui/tabs';
import { css } from 'emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { H2 } from '@leafygreen-ui/typography';
import { spacing } from '@leafygreen-ui/tokens';
import { BaseLayoutProps } from 'utils/types';
import CodeDocs from 'components/CodeDocs';
import ReactIcon from 'components/svgs/ReactIcon';
import SketchIcon from 'components/svgs/SketchIcon';

const componentsStyle = css`
  height: 16px;
  color: ${uiColors.gray.dark1};
  font-size: 12px;
  letter-spacing: 0.4px;
  line-height: 16px;
  text-transform: uppercase;
  font-weight: bold;
}
`;

const marginBotton = css`
  margin-bottom: 36px;
`;

const flexContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const caps = css`
  text-transform: capitalize;
`;

const tabNameContainer = css`
  display: flex;
  align-items: center;
`;

const iconMargin = css`
  margin-right: ${spacing[1]}px;
`;

function Header({ component, changelog, readme }: BaseLayoutProps) {
  if (!component) {
    return null;
  }

  return (
    <div>
      <div className={marginBotton}>
        <small className={componentsStyle}>Components</small>
        <div className={flexContainer}>
          <H2 className={caps}>{component.split('-').join(' ')}</H2>

          <Button glyph={<DownloadIcon />} variant="primary">
            Download Sketch Library
          </Button>
        </div>
      </div>
      <Tabs>
        <Tab name="Live Example">Live Example</Tab>
        <Tab
          name={
            <span className={tabNameContainer}>
              <SketchIcon className={iconMargin} />
              Design Guidelines
            </span>
          }
        >
          Design Guidelines
        </Tab>
        <Tab
          name={
            <span className={tabNameContainer}>
              <ReactIcon className={iconMargin} />
              Code Docs
            </span>
          }
          default
        >
          <CodeDocs
            component={component}
            changelog={changelog}
            readme={readme}
          />
        </Tab>
      </Tabs>
    </div>
  );
}

Header.displayName = 'Header';

export default Header;
