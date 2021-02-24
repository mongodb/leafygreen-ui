import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import MongoNav from '@leafygreen-ui/mongo-nav';
import {uiColors} from '@leafygreen-ui/palette';
import { SideNav, SideNavItem, SideNavGroup } from '.';
import IconButton from '@leafygreen-ui/icon-button';

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

function RealmSideNav() {
  return (
    <LeafyGreenProvider>
      <div className={gridStyles}>
        <MongoNav className={topNavStyles} mode="dev" />
        <SideNav className={sideNavStyles} currentPath='https://google.com/' aria-label="Realm app">
          <SideNavItem active glyph={<Icon glyph="Apps" fill={uiColors.blue.base} />}>Realm Apps</SideNavItem>

          <div className={arbitraryContent}>
            <span id="arbitrary-1">App ID</span>
            <IconButton aria-labelledby="arbitrary-1"><Icon glyph="Copy" /></IconButton>
          </div>

          <SideNavGroup glyph={<Icon glyph="Cloud" />} header='Data Access'>
            <SideNavItem>Rules</SideNavItem>
            <SideNavItem>Schema</SideNavItem>
            <SideNavItem>App Users</SideNavItem>
            <SideNavItem>Authentication</SideNavItem>
          </SideNavGroup>

          <SideNavGroup glyph={<Icon glyph="Laptop" />} header='Build'>
            <SideNavItem>SDKs</SideNavItem>
            <SideNavItem>Sync</SideNavItem>
            <SideNavItem>GraphQL</SideNavItem>
            <SideNavItem>Functions</SideNavItem>
            <SideNavItem>Triggers</SideNavItem>
            <SideNavItem>3rd Party Services</SideNavItem>
            <SideNavItem>Values & Secrets</SideNavItem>
          </SideNavGroup>

          <SideNavGroup glyph={<Icon glyph="Settings" />} header='Manage'>
            <SideNavItem>Linked Data Sources</SideNavItem>
            <SideNavItem>Deploy</SideNavItem>
            <SideNavItem>Hosting</SideNavItem>
            <SideNavItem>Logs</SideNavItem>
            <SideNavItem>App Settings</SideNavItem>
            <SideNavItem>Push Notifications</SideNavItem>
          </SideNavGroup>

          <SideNavGroup glyph={<Icon glyph="Support" />} header='Help'>
            <SideNavItem>Documentation</SideNavItem>
            <SideNavItem>Feature Requests</SideNavItem>
          </SideNavGroup>
        </SideNav>
      </div>
    </LeafyGreenProvider>
  )
}

function MockSideNav() {
  const textHeader = 'States';

  return (
    <LeafyGreenProvider>
      <div className={gridStyles}>
        <MongoNav className={topNavStyles} mode="dev" />

        <SideNav className={sideNavStyles} currentPath='https://google.com/' aria-label="General example">
          <SideNavGroup glyph={<Icon glyph="Support" />} header={textHeader}>
            <SideNavItem active>Active State</SideNavItem>
            <SideNavItem disabled>Disabled State</SideNavItem>
          </SideNavGroup>

          <SideNavGroup header='Test'>
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
            <SideNavItem href={text('href', 'https://google.com/')}>Dave</SideNavItem>
            <SideNavItem>Brooke</SideNavItem>
            <SideNavItem>Rob</SideNavItem>
            <SideNavItem>Michael</SideNavItem>
            <SideNavItem>Fred</SideNavItem>
            <SideNavItem>Harry</SideNavItem>
          </SideNavGroup>
        </SideNav>

        <div className={contentStyles}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam alias dolorem distinctio debitis ipsam dolore vel molestiae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam alias dolorem distinctio debitis ipsam dolore vel molestiae.
          <br /><br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam alias dolorem distinctio debitis ipsam dolore vel molestiae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam alias dolorem distinctio debitis ipsam dolore vel molestiae.
          <br /><br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam alias dolorem distinctio debitis ipsam dolore vel molestiae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam alias dolorem distinctio debitis ipsam dolore vel molestiae.
          <br /><br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam alias dolorem distinctio debitis ipsam dolore vel molestiae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam alias dolorem distinctio debitis ipsam dolore vel molestiae.
          <br /><br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam alias dolorem distinctio debitis ipsam dolore vel molestiae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam alias dolorem distinctio debitis ipsam dolore vel molestiae.
          <br /><br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam alias dolorem distinctio debitis ipsam dolore vel molestiae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam alias dolorem distinctio debitis ipsam dolore vel molestiae.
          <br /><br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam alias dolorem distinctio debitis ipsam dolore vel molestiae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam alias dolorem distinctio debitis ipsam dolore vel molestiae.
          <br /><br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam alias dolorem distinctio debitis ipsam dolore vel molestiae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eum ut, eius et minus, voluptas a consequatur odit commodi consequuntur accusantium ullam alias dolorem distinctio debitis ipsam dolore vel molestiae.
        </div>
      </div>
    </LeafyGreenProvider>
  );
}

function MockSideNavComplex() {
  const textHeader = 'States (text header)';
  const contentHeader = (
    <div>
      <strong>Polymorphism</strong>
      <br />
      <small>(content header)</small>
    </div>
  );

  return (
    <LeafyGreenProvider>
      <div className={css`display: flex; height: 100vh`}>
        <SideNav currentPath='https://google.com/' aria-label="Complex example">
          <SideNavGroup header={textHeader}>
            <SideNavItem href='https://google.com/' disabled>Active State</SideNavItem>
            <SideNavItem disabled>Disabled State</SideNavItem>
          </SideNavGroup>

          <SideNavGroup header={contentHeader}>
            <SideNavItem>Default root element (button)</SideNavItem>
            <SideNavItem href="/">Anchor root element</SideNavItem>
            <SideNavItem as="label" htmlFor="docs-input">
              <div>Custom root element (label)</div>
              <input
                id="docs-input"
                type="text"
                placeholder="placeholder text"
              />
            </SideNavItem>
          </SideNavGroup>

          <SideNavGroup
            header={text('Header Text', 'With Knobs!')}
            collapsible={boolean('collapsible', true)}
          >
            <SideNavItem
              active={boolean('Active', false)}
              disabled={boolean('Disabled', false)}
              href={text('href', '')}
            >
              {text('Nav Item Text', 'Modify Me!')}
            </SideNavItem>
            <SideNavItem>Dave</SideNavItem>
            <SideNavItem>Brooke</SideNavItem>
            <SideNavItem>Rob</SideNavItem>
            <SideNavItem>Michael</SideNavItem>
            <SideNavItem>Fred</SideNavItem>
            <SideNavItem>Harry</SideNavItem>
          </SideNavGroup>
        </SideNav>
      </div>
    </LeafyGreenProvider>
  );
}

storiesOf('SideNav', module)
  .add('Simple Navigation', () => <MockSideNav />)
  .add('Complex Navigation', () => <MockSideNavComplex />)
  .add('Realm', () => <RealmSideNav />);
