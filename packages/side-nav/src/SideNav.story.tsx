import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import MongoNav from '@leafygreen-ui/mongo-nav';
import { Select, Option } from '@leafygreen-ui/select';
import { uiColors } from '@leafygreen-ui/palette';
import IconButton from '@leafygreen-ui/icon-button';
import { SideNav, SideNavItem, SideNavGroup } from '.';

const gridStyles = css`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  width: 100%;
`;

const topNavStyles = css`
  grid-column-start: 1;
  grid-column-end: 3;
  z-index: 1;
`;

const sideNavStyles = css`
  grid-row-start: 2;
  grid-column-start: 1;
  grid-column-end: 2;
`;

const contentStyles = css`
  grid-row-start: 2;
  grid-column-start: 2;
  grid-column-end: 3;
  padding: 48px;
  overflow-y: auto;
`;

const arbitraryContent = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${uiColors.gray.dark2};
  margin: 8px 16px;
  padding: 2px 8px;
  border: 1px solid ${uiColors.gray.light2};
  background-color: ${uiColors.white};
  border-radius: 4px;
`;

const content = (
  <div className={contentStyles}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius
    et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam
    alias dolorem distinctio debitis ipsam dolore vel molestiae. Lorem ipsum
    dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus,
    voluptas a consequatur odit commodi consequuntur accusantium ullam alias
    dolorem distinctio debitis ipsam dolore vel molestiae.
    <br />
    <br />
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius
    et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam
    alias dolorem distinctio debitis ipsam dolore vel molestiae. Lorem ipsum
    dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus,
    voluptas a consequatur odit commodi consequuntur accusantium ullam alias
    dolorem distinctio debitis ipsam dolore vel molestiae.
    <br />
    <br />
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius
    et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam
    alias dolorem distinctio debitis ipsam dolore vel molestiae. Lorem ipsum
    dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus,
    voluptas a consequatur odit commodi consequuntur accusantium ullam alias
    dolorem distinctio debitis ipsam dolore vel molestiae.
    <br />
    <br />
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius
    et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam
    alias dolorem distinctio debitis ipsam dolore vel molestiae. Lorem ipsum
    dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus,
    voluptas a consequatur odit commodi consequuntur accusantium ullam alias
    dolorem distinctio debitis ipsam dolore vel molestiae.
    <br />
    <br />
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius
    et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam
    alias dolorem distinctio debitis ipsam dolore vel molestiae. Lorem ipsum
    dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus,
    voluptas a consequatur odit commodi consequuntur accusantium ullam alias
    dolorem distinctio debitis ipsam dolore vel molestiae.
    <br />
    <br />
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius
    et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam
    alias dolorem distinctio debitis ipsam dolore vel molestiae. Lorem ipsum
    dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus,
    voluptas a consequatur odit commodi consequuntur accusantium ullam alias
    dolorem distinctio debitis ipsam dolore vel molestiae.
    <br />
    <br />
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius
    et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam
    alias dolorem distinctio debitis ipsam dolore vel molestiae. Lorem ipsum
    dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus,
    voluptas a consequatur odit commodi consequuntur accusantium ullam alias
    dolorem distinctio debitis ipsam dolore vel molestiae.
    <br />
    <br />
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius
    et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam
    alias dolorem distinctio debitis ipsam dolore vel molestiae. Lorem ipsum
    dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus,
    voluptas a consequatur odit commodi consequuntur accusantium ullam alias
    dolorem distinctio debitis ipsam dolore vel molestiae.
  </div>
);

function RealmSideNav() {
  return (
    <LeafyGreenProvider>
      <div className={gridStyles}>
        <MongoNav className={topNavStyles} mode="dev" />
        <SideNav
          className={sideNavStyles}
          aria-label="Realm app"
        >
          <SideNavItem
            active
            glyph={<Icon glyph="Apps" fill={uiColors.blue.base} />}
          >
            Realm Apps
          </SideNavItem>

          <li className={arbitraryContent}>
            <span id="arbitrary-1">App ID</span>
            <IconButton aria-label="copy arbitrary-1">
              <Icon glyph="Copy" />
            </IconButton>
          </li>

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
            <SideNavItem>3rd Party Services</SideNavItem>
            <SideNavItem>Values & Secrets</SideNavItem>
          </SideNavGroup>

          <SideNavGroup glyph={<Icon glyph="Settings" />} header="Manage">
            <SideNavItem>Linked Data Sources</SideNavItem>
            <SideNavItem>Deploy</SideNavItem>
            <SideNavItem>Hosting</SideNavItem>
            <SideNavItem>Logs</SideNavItem>
            <SideNavItem>App Settings</SideNavItem>
            <SideNavItem>Push Notifications</SideNavItem>
          </SideNavGroup>

          <SideNavGroup glyph={<Icon glyph="Support" />} header="Help">
            <SideNavItem>Documentation</SideNavItem>
            <SideNavItem>Feature Requests</SideNavItem>
          </SideNavGroup>
        </SideNav>

        {content}
      </div>
    </LeafyGreenProvider>
  );
}

function OrgSettingsSideNav() {
  return (
    <LeafyGreenProvider>
      <div className={gridStyles}>
        <MongoNav className={topNavStyles} mode="dev" />
        <SideNav
          className={sideNavStyles}
          aria-label="Realm app"
        >
          <SideNavGroup glyph={<Icon glyph="Cloud" />} header="Context">
            <li
              role="menuitem"
              className={css`
                padding: 0 16px;
                margin-bottom: 16px;
              `}
            >
              <Select label="" size="xsmall" defaultValue="1">
                <Option value="1">LeafyCorp</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
              </Select>
            </li>
          </SideNavGroup>

          <SideNavGroup glyph={<Icon glyph="Building" />} header="Organization">
            <SideNavItem>Projects</SideNavItem>
            <SideNavItem>Activity Feed</SideNavItem>
            <SideNavItem active>Access</SideNavItem>
            <SideNavItem>Alerts</SideNavItem>
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
}

function MockSideNav() {
  const textHeader = 'States';

  return (
    <LeafyGreenProvider>
      <div className={gridStyles}>
        <MongoNav className={topNavStyles} mode="dev" />

        <SideNav
          className={sideNavStyles}
          aria-label="General example"
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
            glyph={<Icon glyph="Warning" />}
            header={text('Header Text', 'With Knobs!')}
            collapsible={boolean('collapsible', true)}
          >
            <SideNavItem disabled={boolean('Disabled', false)}>
              {text('Nav Item Text', 'Modify Me!')}
            </SideNavItem>
            <SideNavItem href={text('href', 'https://google.com/')}>
              Dave
            </SideNavItem>
            <SideNavItem>Brooke</SideNavItem>
            <SideNavItem>Rob</SideNavItem>
            <SideNavItem>Michael</SideNavItem>
            <SideNavItem>Fred</SideNavItem>
            <SideNavItem>Harry</SideNavItem>
          </SideNavGroup>
        </SideNav>

        {content}
      </div>
    </LeafyGreenProvider>
  );
}

storiesOf('SideNav', module)
  .add('Simple Navigation', () => <MockSideNav />)
  .add('Realm', () => <RealmSideNav />)
  .add('Org Settings', () => <OrgSettingsSideNav />);
