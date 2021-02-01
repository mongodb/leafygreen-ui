import React, { useCallback, useState } from 'react';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { css } from '@leafygreen-ui/emotion';
import AppsIcon from '@leafygreen-ui/icon/dist/Apps';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import HomeIcon from '@leafygreen-ui/icon/dist/Home';
import LaptopIcon from '@leafygreen-ui/icon/dist/Laptop';
import SettingsIcon from '@leafygreen-ui/icon/dist/Settings';
import SupportIcon from '@leafygreen-ui/icon/dist/Support';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import MongoNav from '@leafygreen-ui/mongo-nav';
import { GlyphVisibility, SideNav, SideNavGroup, SideNavItem } from '.';

const mongoNavStyle = css`
  display: block;
  z-index: 1;
`;

const appStyle = css`
  position: relative;
  display: flex;
`;

const contentStyle = css`
  margin: 64px;
  margin-right: 500px;
  line-height: 40px;
`;

interface WithPathProps {
  children: React.ReactElement;
  path: string;
  setPath: (path: string) => void;
}

function WithPath({ children, path, setPath }: WithPathProps) {
  const onSelect = useCallback(() => {
    setPath(path);
  }, [path, setPath]);
  return React.cloneElement(children, {
    path,
    onSelect,
  });
}

storiesOf('SideNav', module)
  .add('Realm Example', () => {
    const [currentPath, setCurrentPath] = useState<string>('/investments');

    const createItemProps = useCallback(
      (path: string) => ({
        path,
        setPath: setCurrentPath,
      }),
      [],
    );

    const showLink = boolean('Show link', true);
    const showTopLevel = boolean('Show top-level item', true);

    return (
      <LeafyGreenProvider>
        <div>
          <MongoNav className={mongoNavStyle} mode="dev" />
          <div className={appStyle}>
            <SideNav
              currentPath={currentPath}
              collapsible={boolean('Collapsible', true)}
            >
              {showLink && (
                <SideNavItem
                  glyph={<AppsIcon />}
                  glyphVisibility={GlyphVisibility.Visible}
                  href="https://www.mongodb.com/realm"
                >
                  Realm Apps
                </SideNavItem>
              )}
              {showTopLevel && (
                <WithPath {...createItemProps('/investments')}>
                  <SideNavItem glyph={<HomeIcon />}>Investments</SideNavItem>
                </WithPath>
              )}
              <SideNavGroup
                label="Data Access"
                glyph={<CloudIcon />}
                collapsible
                initialCollapsed={false}
              >
                <WithPath {...createItemProps('/rules')}>
                  <SideNavItem>Rules</SideNavItem>
                </WithPath>
                <WithPath {...createItemProps('/schema')}>
                  <SideNavItem>Schema</SideNavItem>
                </WithPath>
                <WithPath {...createItemProps('/app_users')}>
                  <SideNavItem>App Users</SideNavItem>
                </WithPath>
                <WithPath {...createItemProps('/auth')}>
                  <SideNavItem>Authentication</SideNavItem>
                </WithPath>
              </SideNavGroup>
              <SideNavGroup
                label="Build"
                glyph={<LaptopIcon />}
                collapsible
                initialCollapsed
              >
                <WithPath {...createItemProps('/sdks')}>
                  <SideNavItem>SDKs</SideNavItem>
                </WithPath>
                <WithPath {...createItemProps('/sync')}>
                  <SideNavItem>Sync</SideNavItem>
                </WithPath>
                <WithPath {...createItemProps('/graphql')}>
                  <SideNavItem>GraphQL</SideNavItem>
                </WithPath>
                <WithPath {...createItemProps('/functions')}>
                  <SideNavItem>Functions</SideNavItem>
                </WithPath>
                <WithPath {...createItemProps('/triggers')}>
                  <SideNavItem>Triggers</SideNavItem>
                </WithPath>
                <WithPath {...createItemProps('/services')}>
                  <SideNavItem>3rd Party Services</SideNavItem>
                </WithPath>
                <WithPath {...createItemProps('/secrets')}>
                  <SideNavItem>Values & Secrets</SideNavItem>
                </WithPath>
              </SideNavGroup>
              <SideNavGroup label="Manage" glyph={<SettingsIcon />} collapsible>
                <WithPath {...createItemProps('/sources')}>
                  <SideNavItem>Linked Data Sources</SideNavItem>
                </WithPath>
                <WithPath {...createItemProps('/deploy')}>
                  <SideNavItem>Deploy</SideNavItem>
                </WithPath>
                <WithPath {...createItemProps('/hosting')}>
                  <SideNavItem>Hosting</SideNavItem>
                </WithPath>
                <WithPath {...createItemProps('/logs')}>
                  <SideNavItem>Logs</SideNavItem>
                </WithPath>
                <WithPath {...createItemProps('/settings')}>
                  <SideNavItem>App Settings</SideNavItem>
                </WithPath>
                <WithPath {...createItemProps('/notifications')}>
                  <SideNavItem>Push Notifications</SideNavItem>
                </WithPath>
              </SideNavGroup>
              <SideNavGroup label="Help" glyph={<SupportIcon />}>
                <WithPath {...createItemProps('/docs')}>
                  <SideNavItem>Documentation</SideNavItem>
                </WithPath>
                <WithPath {...createItemProps('/requests')}>
                  <SideNavItem>Feature Requests</SideNavItem>
                </WithPath>
              </SideNavGroup>
            </SideNav>
            <div className={contentStyle}>
              <h1>Title for path &quot;{currentPath}&quot;</h1>
              <h2>Section</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </p>
              <h2>Section</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </p>
              <h2>Section</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </p>
              <h2>Section</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </div>
      </LeafyGreenProvider>
    );
  })
  .add('Glyph behavior', () => {
    return (
      <LeafyGreenProvider>
        <div>
          <MongoNav className={mongoNavStyle} mode="dev" />
          <div className={appStyle}>
            <SideNav>
              <SideNavItem>No Glyph</SideNavItem>
              <SideNavItem glyph={<AppsIcon />}>Only Nav Collapsed</SideNavItem>
              <SideNavItem
                glyph={<SupportIcon />}
                glyphVisibility={GlyphVisibility.NavExpanded}
              >
                Only Nav Expanded
              </SideNavItem>
              <SideNavItem
                glyph={<LaptopIcon />}
                glyphVisibility={GlyphVisibility.Visible}
              >
                Always Visible
              </SideNavItem>
              <SideNavGroup label="Group" collapsible initialCollapsed={false}>
                <SideNavItem>No Glyph</SideNavItem>
                <SideNavItem
                  glyph={<SettingsIcon />}
                  glyphVisibility={GlyphVisibility.Visible}
                >
                  Always Visible
                </SideNavItem>
              </SideNavGroup>
              <SideNavGroup label="Group with Glyph" glyph={<CloudIcon />}>
                <SideNavItem>No Glyph</SideNavItem>
                <SideNavItem
                  glyph={<HomeIcon />}
                  glyphVisibility={GlyphVisibility.Visible}
                >
                  Always Visible
                </SideNavItem>
              </SideNavGroup>
            </SideNav>
            <div className={contentStyle}>
              <h1>Title</h1>
              <h2>Section</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </p>
              <h2>Section</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </p>
              <h2>Section</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </p>
              <h2>Section</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </div>
      </LeafyGreenProvider>
    );
  });
