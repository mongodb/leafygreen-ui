import React, { useState } from 'react';
import { css, cx } from 'emotion';
import unified from 'unified';
import markdown from 'remark-parse';
import ActivityFeedIcon from '@leafygreen-ui/icon/dist/ActivityFeed';
import Button from '@leafygreen-ui/button';
import Card from '@leafygreen-ui/card';
import Code from '@leafygreen-ui/code';
import Copyable from '@leafygreen-ui/copyable';
import Modal from '@leafygreen-ui/modal';
import { Tabs, Tab } from '@leafygreen-ui/tabs';
import { Subtitle, Body } from '@leafygreen-ui/typography';
import { uiColors } from '@leafygreen-ui/palette';
import { spacing, breakpoints } from '@leafygreen-ui/tokens';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { BaseLayoutProps } from 'utils/types';
import { GridContainer, GridItem } from 'components/Grid';
import PropTable, { ReadmeMarkdown } from 'components/PropTable';
import TypeDefinition from 'components/TypeDefinition';

const topAlignment = css`
  margin-top: ${spacing[4]}px;
  padding-top: ${spacing[3]}px;
`;

const mt3 = css`
  margin-top: ${spacing[3]}px;
`;

const mb1 = css`
  margin-bottom: ${spacing[1]}px;
`;

const versionCard = css`
  min-height: 106px;
  padding: ${spacing[3]}px ${spacing[4]}px;
`;

const subtitlePadding = css`
  padding-bottom: ${spacing[3]}px;
`;

const tabsPadding = css`
  padding-top: ${spacing[4]}px;
`;

const mobileInstallMargin = css`
  margin-top: 50px;
`;

const changelogStyles = css`
  color: ${uiColors.gray.dark3};
  pointer-events: none;

  & > h2 {
    padding-top: ${spacing[3]}px;
    border-top: 1px solid ${uiColors.gray.light2};
  }

  a {
    color: ${uiColors.gray.dark3};
    text-decoration: none;
  }
`;

interface VersionCardProps {
  version?: string;
  changelog: string;
  isMobile?: boolean;
}

interface InstallProps {
  component: string;
  version?: string;
  changelog: string;
}

function VersionCard({
  version,
  changelog,
  isMobile = false,
}: VersionCardProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Card className={cx(topAlignment, versionCard)}>
      {/* TODO: Provide fallback if no version */}
      <Subtitle className={subtitlePadding}>Version {version}</Subtitle>
      <Button
        size={isMobile ? 'large' : 'normal'}
        glyph={<ActivityFeedIcon />}
        onClick={() => setOpenModal(curr => !curr)}
        className={cx({
          [css`
            width: 100%;
          `]: isMobile,
        })}
      >
        View Changelog
      </Button>
      <Modal open={openModal} setOpen={setOpenModal}>
        <div
          className={changelogStyles}
          dangerouslySetInnerHTML={{ __html: changelog }}
        ></div>
      </Modal>
    </Card>
  );
}

function MobileInstall({ component, version, changelog }: InstallProps) {
  return (
    <GridContainer>
      <GridItem sm={12}>
        <div className={mobileInstallMargin}>
          <Subtitle>Installation</Subtitle>
          <Body weight="medium" className={mt3}>
            Yarn
          </Body>
          <Copyable>{`yarn add @leafygreen-ui/${component}`}</Copyable>
          <Body weight="medium" className={mt3}>
            NPM
          </Body>
          <Copyable>{`npm install @leafygreen-ui/${component}`}</Copyable>
        </div>
      </GridItem>
      <GridItem sm={12}>
        <div>
          <VersionCard version={version} changelog={changelog} isMobile />
        </div>
      </GridItem>
    </GridContainer>
  );
}

function DesktopInstall({ component, changelog, version }: InstallProps) {
  return (
    <>
      <GridContainer justify="space-between" align="flex-start">
        <GridItem md={7} lg={7}>
          <div className={topAlignment}>
            <Subtitle
              className={css`
                margin-bottom: ${spacing[3]}px;
              `}
            >
              Installation
            </Subtitle>
            <Body weight="medium" className={mb1}>
              Yarn
            </Body>
            <Copyable>{`yarn add @leafygreen-ui/${component}`}</Copyable>
          </div>
        </GridItem>
        <GridItem md={5} lg={5}>
          <VersionCard changelog={changelog} version={version} />
        </GridItem>
      </GridContainer>
      <GridContainer align="flex-start" justify="flex-start">
        <GridItem md={7} lg={7}>
          <Body weight="medium" className={mb1}>
            NPM
          </Body>
          <Copyable>{`npm install @leafygreen-ui/${component}`}</Copyable>
        </GridItem>
      </GridContainer>
    </>
  );
}

function CodeDocs({ component, readme, changelog }: BaseLayoutProps) {
  const viewport = useViewportSize();
  const isMobile = viewport?.width
    ? viewport?.width < breakpoints.Tablet
    : false;

  const version = changelog?.split('h2')[1]?.replace(/[>/<]+/g, '');
  const example = readme?.split('js')[1]?.split('```')[0]?.trimStart();
  const outputHTML = readme?.split('html')[1]?.split('```')[0]?.trimStart();
  const markdownAst = (unified()
    .use(markdown)
    .parse(readme) as unknown) as ReadmeMarkdown;

  return (
    <>
      {isMobile ? (
        <MobileInstall
          component={component}
          version={version}
          changelog={changelog}
        />
      ) : (
        <DesktopInstall
          component={component}
          version={version}
          changelog={changelog}
        />
      )}
      <GridContainer align="flex-start" justify="flex-start">
        <GridItem sm={12} md={12} xl={12}>
          <Tabs className={tabsPadding}>
            {example && (
              <Tab default name="Example" className={mt3}>
                <Code showLineNumbers language="js">
                  {example}
                </Code>
              </Tab>
            )}

            {outputHTML && (
              <Tab name="Output HTML" className={mt3} default={!example}>
                <Code showLineNumbers language="xml">
                  {outputHTML}
                </Code>
              </Tab>
            )}
          </Tabs>
        </GridItem>
      </GridContainer>
      <GridContainer align="flex-start" justify="flex-start">
        <GridItem sm={12} md={12} xl={12}>
          <PropTable markdownAst={markdownAst} component={component} />
          <TypeDefinition markdownAst={markdownAst} readme={readme} />
        </GridItem>
      </GridContainer>
    </>
  );
}

export default CodeDocs;
