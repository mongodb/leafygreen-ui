import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import { css, cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { storybookArgTypes, StoryMetaType, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { Option, Select, Size } from '@leafygreen-ui/select';
import { Body, H1 } from '@leafygreen-ui/typography';

import {
  CollapsedSideNavItem,
  SideNav,
  SideNavGroup,
  SideNavItem,
  type SideNavProps,
} from '.';

const meta: StoryMetaType<typeof SideNav> = {
  title: 'Components/SideNav',
  component: SideNav,
  parameters: {
    default: 'Basic',
    controls: {
      exclude: ['children', 'setCollapsed', 'collapsed'],
    },
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    baseFontSize: storybookArgTypes.baseFontSize,
  },
  args: {
    widthOverride: 200,
  },
};
export default meta;

const basicStyles = css`
  height: 50vh;
`;

export const Basic: StoryFn<SideNavProps> = ({
  className,
  ...args
}: SideNavProps) => {
  return <SideNav className={cx(basicStyles, className)} {...args} />;
};
Basic.args = {
  children: [
    <SideNavGroup
      key="header"
      glyph={<Icon glyph="Support" />}
      header="Header text"
    >
      <SideNavItem active>Active State</SideNavItem>
      <SideNavItem disabled>Disabled State</SideNavItem>
    </SideNavGroup>,
    <SideNavGroup key="test" header="Test">
      <SideNavItem>Default root element</SideNavItem>
      <SideNavItem href="#">Anchor root element</SideNavItem>
      <SideNavItem>Another item</SideNavItem>
    </SideNavGroup>,
  ],
};

const appContainer = css`
  display: grid;
  grid-template-areas: 'mongonav mongonav' 'nav content';
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  height: 100vh;
  width: 100%;
`;

const realmAppContainer = css`
  display: flex;
  flex-grow: 1;
`;

const mongoNavBaseStyles = css`
  grid-area: mongonav;
  width: 100%;
  height: 105px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const mongoNavThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.white};
    box-shadow: 0 2px 4px 0 ${palette.gray.light2};
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark4};
    box-shadow: 0 2px 4px 0 ${palette.black};
  `,
};

const sideNavStyles = css`
  grid-area: nav;
`;

const contentStyles = css`
  grid-area: content;
  padding: 24px 48px;
  margin: auto;
  max-width: 72ch;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
`;

const realmAppId = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MongoNavPlaceholder = ({ darkMode, ...props }: any) => (
  <header
    className={cx(
      mongoNavBaseStyles,
      mongoNavThemeStyles[darkMode ? Theme.Dark : Theme.Light],
    )}
    {...props}
  >
    <H1 darkMode={darkMode}>
      {'<'}MongoNav Placeholder{'>'}
    </H1>
  </header>
);

const loremIpsum = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius
et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam
alias dolorem distinctio debitis ipsam dolore vel molestiae. Lorem ipsum
dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus,
voluptas a consequatur odit commodi consequuntur accusantium ullam alias
dolorem distinctio debitis ipsam dolore vel molestiae.`;

const content = (
  <Body className={contentStyles}>
    {new Array(10).fill(<p>{loremIpsum}</p>)}
  </Body>
);

export const InLayout = ({
  isCollapsible,
  isDisabled,
  groupHeaderText,
  navItemText,
  hasActiveItem,
  darkMode,
  ...rest
}: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const textHeader = 'States';

  return (
    <LeafyGreenProvider>
      <div className={appContainer}>
        <MongoNavPlaceholder darkMode={darkMode} />
        <SideNav
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          className={sideNavStyles}
          aria-label="General example"
          darkMode={darkMode}
          {...rest}
        >
          <SideNavGroup glyph={<Icon glyph="Support" />} header={textHeader}>
            <SideNavItem active>Active State</SideNavItem>
            <SideNavItem disabled>Disabled State</SideNavItem>
          </SideNavGroup>

          <SideNavGroup header="Test">
            <SideNavItem>Default root element</SideNavItem>
            <SideNavItem href="/">Anchor root element</SideNavItem>
            <SideNavItem>Another item</SideNavItem>
          </SideNavGroup>

          <SideNavGroup
            hasActiveItem={hasActiveItem}
            glyph={<Icon glyph="Warning" />}
            header={groupHeaderText}
            collapsible={isCollapsible}
          >
            <SideNavItem disabled={isDisabled}>{navItemText}</SideNavItem>
            <SideNavItem indentLevel={10}>Dave</SideNavItem>
            <SideNavItem>Robert Arnold Audroue</SideNavItem>
            <SideNavItem>Adam Michael Thompson</SideNavItem>
            <SideNavItem>Shaneeza</SideNavItem>
            <SideNavItem>Sean</SideNavItem>
            <SideNavItem>Sooa</SideNavItem>
            <SideNavItem>Alven</SideNavItem>
            <SideNavItem>Kelsey</SideNavItem>
            <SideNavItem>Fred</SideNavItem>
          </SideNavGroup>

          <CollapsedSideNavItem>
            <Icon glyph="Favorite" />
          </CollapsedSideNavItem>
        </SideNav>
        {content}
      </div>
    </LeafyGreenProvider>
  );
};
InLayout.args = {
  isCollapsible: true,
  isDisabled: false,
  groupHeaderText: 'Header text',
  navItemText: 'Modify Me!',
  hasActiveItem: false,
};

export const Realm = ({ darkMode, ...rest }: SideNavProps) => {
  return (
    <LeafyGreenProvider>
      <MongoNavPlaceholder darkMode={darkMode} />
      <div className={realmAppContainer}>
        <SideNav
          className={sideNavStyles}
          aria-label="Realm app"
          darkMode={darkMode}
          {...rest}
        >
          <SideNavItem
            href="https://realm.mongodb.com"
            glyph={
              <Icon
                glyph="Apps"
                fill={darkMode ? palette.blue.light1 : palette.blue.base}
              />
            }
          >
            Realm Apps
          </SideNavItem>

          <SideNavItem active className={realmAppId}>
            <span id="arbitrary-1">App ID</span>
            <IconButton aria-label="copy arbitrary-1">
              <Icon glyph="Copy" />
            </IconButton>
          </SideNavItem>

          <SideNavGroup glyph={<CloudIcon />} header="Data Access">
            <SideNavItem href="/">Rules</SideNavItem>
            <SideNavItem href="/">Schema</SideNavItem>
            <SideNavItem href="/">App Users</SideNavItem>
            <SideNavItem href="/">Authentication</SideNavItem>
          </SideNavGroup>

          <SideNavGroup glyph={<Icon glyph="Laptop" />} header="Build">
            <SideNavItem>SDKs</SideNavItem>
            <SideNavItem>Sync</SideNavItem>
            <SideNavItem>GraphQL</SideNavItem>
            <SideNavItem>Functions</SideNavItem>
            <SideNavItem>Triggers</SideNavItem>
            <SideNavItem>HTTPS Endpoints</SideNavItem>
            <SideNavItem>Values</SideNavItem>
          </SideNavGroup>

          <SideNavGroup glyph={<Icon glyph="Settings" />} header="Manage">
            <SideNavItem>Linked Data Sources</SideNavItem>
            <SideNavItem>Deployment</SideNavItem>
            <SideNavItem>Hosting</SideNavItem>
            <SideNavItem>Logs</SideNavItem>
            <SideNavItem>App Settings</SideNavItem>
            <SideNavItem>Push Notifications</SideNavItem>
          </SideNavGroup>

          <SideNavGroup glyph={<Icon glyph="Support" />} header="Help">
            <SideNavItem>Documentation</SideNavItem>
            <SideNavItem>Feature Requests</SideNavItem>
          </SideNavGroup>

          <SideNavGroup header="Admin">
            <SideNavItem>Trigger State Console</SideNavItem>
          </SideNavGroup>
        </SideNav>

        {content}
      </div>
    </LeafyGreenProvider>
  );
};

export const OrgSettings = ({
  baseFontSize,
  widthOverride,
  darkMode,
  ...rest
}: SideNavProps) => {
  return (
    <LeafyGreenProvider>
      <div className={appContainer}>
        <MongoNavPlaceholder darkMode={darkMode} />
        <SideNav
          className={sideNavStyles}
          aria-label="Realm app"
          baseFontSize={baseFontSize}
          widthOverride={widthOverride}
          darkMode={darkMode}
          {...rest}
        >
          <SideNavGroup
            glyph={<Icon glyph="Cloud" />}
            header={<span id="context-label">Context</span>}
          >
            <li
              role="menuitem"
              className={css`
                padding: 0 16px;
                margin-bottom: 16px;
              `}
            >
              <Select
                defaultValue="greenery"
                aria-labelledby="context-label"
                size={Size.Small}
                className={css`
                  > div {
                    width: 100%;
                  }
                `}
              >
                <Option value="leafycorp">LeafyCorp</Option>
                <Option value="greenery">Greenery</Option>
                <Option value="3">3</Option>
              </Select>
            </li>
          </SideNavGroup>

          <SideNavGroup glyph={<Icon glyph="Building" />} header="Organization">
            <SideNavItem>Projects</SideNavItem>
            <SideNavItem>Activity Feed</SideNavItem>

            <SideNavItem active>
              Security
              <SideNavItem>
                Permissions
                <SideNavItem>Login</SideNavItem>
              </SideNavItem>
              <SideNavItem>
                Access
                <SideNavItem>Database Access</SideNavItem>
                <SideNavItem>Network Access</SideNavItem>
              </SideNavItem>
            </SideNavItem>
            <SideNavItem>
              Alerts
              <SideNavItem>Database Access</SideNavItem>
            </SideNavItem>
            <SideNavItem>Settings</SideNavItem>
          </SideNavGroup>

          <SideNavGroup glyph={<Icon glyph="Support" />} header="Help">
            <SideNavItem>Docs</SideNavItem>
          </SideNavGroup>
        </SideNav>

        {content}
      </div>
    </LeafyGreenProvider>
  );
};
OrgSettings.args = {
  baseFontSize: 14,
  widthOverride: 200,
};

export const Nested = ({ darkMode, ...rest }: SideNavProps) => {
  return (
    <LeafyGreenProvider>
      <div className={appContainer}>
        <MongoNavPlaceholder darkMode={darkMode} />
        <SideNav widthOverride={300} darkMode={darkMode} {...rest}>
          <SideNavItem>Overview</SideNavItem>
          <SideNavItem>Introduction</SideNavItem>
          <SideNavItem>
            Android SDK
            <SideNavItem>Install MongoDB Community Edition</SideNavItem>
            <SideNavGroup
              header="Fundamentals"
              collapsible
              glyph={<Icon glyph="Building" />}
            >
              <SideNavItem active>
                Upgrade MongoDB Community to MongoDB Enterprise
              </SideNavItem>
              <SideNavItem>Verify Integrity of MongoDB Packages</SideNavItem>
              <SideNavGroup header="Preferences">
                <SideNavItem>Privacy</SideNavItem>
                <SideNavItem>Security</SideNavItem>
              </SideNavGroup>
            </SideNavGroup>
          </SideNavItem>
        </SideNav>

        {content}
      </div>
    </LeafyGreenProvider>
  );
};

Nested.argTypes = {
  darkMode: storybookArgTypes.darkMode,
};
