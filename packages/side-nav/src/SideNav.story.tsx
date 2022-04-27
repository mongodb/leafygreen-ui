import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text, number } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Select, Option, Size } from '@leafygreen-ui/select';
import { palette } from '@leafygreen-ui/palette';
import IconButton from '@leafygreen-ui/icon-button';
import { SideNav, SideNavItem, SideNavGroup } from '.';
import { Body, H1 } from '@leafygreen-ui/typography';

const appContainer = css`
  display: grid;
  grid-template-areas: 'mongonav mongonav' 'nav content';
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  height: 100vh;
  width: 100%;
  outline: 1px solid ${palette.red.base};
`;

const realmAppContainer = css`
  display: flex;
  flex-grow: 1;
`;

const mongoNavStyles = css`
  grid-area: mongonav;
  width: 100%;
  height: 105px;
  background-color: ${palette.white};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px 0 ${palette.gray.light2};
  z-index: 1;
`;

const sideNavStyles = css`
  grid-area: nav;
`;

const contentStyles = css`
  grid-area: content;
  padding: 24px 48px;
  margin: auto;
  max-width: 72ch;
  max-height: 100%;
  overflow-y: auto;
`;

const realmAppId = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MongoNavPlaceholder = ({ ...props }) => (
  <header className={mongoNavStyles} {...props}>
    <H1>
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
    {new Array(6).fill(<p>{loremIpsum}</p>)}
  </Body>
);

function RealmSideNav() {
  return (
    <LeafyGreenProvider>
      <MongoNavPlaceholder />
      <div className={realmAppContainer}>
        <SideNav className={sideNavStyles} aria-label="Realm app">
          <SideNavItem
            href="https://realm.mongodb.com"
            glyph={<Icon glyph="Apps" fill={palette.blue.base} />}
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
}

function OrgSettingsSideNav() {
  return (
    <LeafyGreenProvider>
      <div className={appContainer}>
        <MongoNavPlaceholder />
        <SideNav
          className={sideNavStyles}
          aria-label="Realm app"
          baseFontSize={select('baseFontSize', [14, 16], 14)}
          widthOverride={number('widthOverride', 200)}
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
}

function MockSideNav() {
  const [collapsed, setCollapsed] = useState(false);
  const textHeader = 'States';
  const hasActiveItem = boolean('hasActiveItem', false);

  return (
    <LeafyGreenProvider>
      <div className={appContainer}>
        <MongoNavPlaceholder />
        <SideNav
          collapsed={collapsed}
          setCollapsed={setCollapsed}
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
            hasActiveItem={hasActiveItem}
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

function NestedGroups() {
  return (
    <LeafyGreenProvider>
      <div className={appContainer}>
        <MongoNavPlaceholder />
        <SideNav widthOverride={300}>
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
}

storiesOf('Packages/SideNav', module)
  .add('Simple Navigation', () => <MockSideNav />)
  .add('Realm', () => <RealmSideNav />)
  .add('Org Settings', () => <OrgSettingsSideNav />)
  .add('NestedGroups', () => <NestedGroups />)
  .add('Nested Repro', () => {
    const [active, setActive] = useState('gala');

    const onClick = useCallback(e => {
      setActive(e.target.dataset.id);
    }, []);

    return (
      <LeafyGreenProvider>
        <div className={appContainer}>
          <SideNav widthOverride={300} aria-label="nav">
            <SideNavItem
              data-id="apple"
              onClick={onClick}
              active={active === 'apple'}
            >
              Apple
              <SideNavItem
                data-id="mcintosh"
                onClick={onClick}
                active={active === 'mcintosh'}
              >
                McIntosh
              </SideNavItem>
              <SideNavItem
                data-id="reddelicious"
                onClick={onClick}
                active={active === 'reddelicious'}
              >
                Red delicious
              </SideNavItem>
              <SideNavItem
                data-id="gala"
                onClick={onClick}
                active={active === 'gala'}
              >
                Gala
              </SideNavItem>
            </SideNavItem>
            <SideNavItem
              data-id="banana"
              onClick={onClick}
              active={active === 'banana'}
            >
              Banana
              <SideNavItem
                data-id="yellow"
                onClick={onClick}
                active={active === 'yellow'}
              >
                Yellow
              </SideNavItem>
              <SideNavItem
                data-id="green"
                onClick={onClick}
                active={active === 'green'}
              >
                Green
              </SideNavItem>
              <SideNavItem
                data-id="plantain"
                onClick={onClick}
                active={active === 'plantain'}
              >
                Plantain
              </SideNavItem>
            </SideNavItem>
            <SideNavItem
              data-id="carrot"
              onClick={onClick}
              active={active === 'carrot'}
            >
              Carrot
              <SideNavItem
                data-id="orange"
                onClick={onClick}
                active={active === 'orange'}
              >
                Orange
              </SideNavItem>
              <SideNavItem
                data-id="turnip"
                onClick={onClick}
                active={active === 'turnip'}
              >
                Turnip
              </SideNavItem>
              <SideNavItem
                data-id="parsnip"
                onClick={onClick}
                active={active === 'parsnip'}
              >
                Parsnip
              </SideNavItem>
            </SideNavItem>
          </SideNav>

          {content}
        </div>
      </LeafyGreenProvider>
    );
  });
