import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
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
import { pageContainerWidth } from 'styles/constants';
import { GridContainer, GridItem } from 'components/Grid';
import PropTable, { ReadmeMarkdown } from 'components/PropTable';
import TypeDefinition from 'components/TypeDefinition';

const topAlignment = css`
  margin-top: ${spacing[4]}px;
  padding-top: ${spacing[3]}px;
  margin-bottom: ${spacing[3]}px;
`;

const versionCardDesktopMargin = css`
  margin-left: 20px;
`;

const mt3 = css`
  margin-top: ${spacing[3]}px;
`;

const mb1 = css`
  margin-bottom: ${spacing[1]}px;
`;

const copyableStyles = css`
  width: 100%;
  max-width: 400px;
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
  margin-bottom: ${spacing[3]}px;
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

const maxWidth = css`
  max-width: ${pageContainerWidth.default}px;
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
      <Subtitle as="h2" className={subtitlePadding}>
        Version {version}
      </Subtitle>
      <Button
        size={isMobile ? 'large' : 'default'}
        leftGlyph={<ActivityFeedIcon />}
        onClick={() => setOpenModal(curr => !curr)}
        className={cx({
          [css`
            width: 100%;
          `]: isMobile,
        })}
      >
        View Changelog
      </Button>
      <Modal
        className={css`
          z-index: 1;
        `}
        open={openModal}
        setOpen={setOpenModal}
      >
        <div
          className={changelogStyles}
          dangerouslySetInnerHTML={{ __html: changelog }}
        ></div>
      </Modal>
    </Card>
  );
}

VersionCard.displayName = 'VersionCard';

function MobileInstall({ component, version, changelog }: InstallProps) {
  return (
    <GridContainer>
      <GridItem sm={12}>
        <div className={mobileInstallMargin}>
          <Subtitle as="h2">Installation</Subtitle>
          <Body weight="medium" className={mt3}>
            Yarn
          </Body>
          <Copyable
            className={copyableStyles}
          >{`yarn add @leafygreen-ui/${component}`}</Copyable>
          <Body weight="medium" className={mt3}>
            NPM
          </Body>
          <Copyable
            className={copyableStyles}
          >{`npm install @leafygreen-ui/${component}`}</Copyable>
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

MobileInstall.displayName = 'MobileInstall';

function DesktopInstall({ component, changelog, version }: InstallProps) {
  return (
    <>
      <GridContainer
        justify="space-between"
        align="flex-start"
        className={maxWidth}
      >
        <GridItem md={7} lg={7}>
          <div className={topAlignment}>
            <Subtitle
              as="h2"
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
          <div className={versionCardDesktopMargin}>
            <VersionCard changelog={changelog} version={version} />
          </div>
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

DesktopInstall.displayName = 'DesktopInstall';

function CodeDocs({ component, readme, changelog }: BaseLayoutProps) {
  const viewport = useViewportSize();
  const isMobile = viewport?.width
    ? viewport?.width < breakpoints.Tablet
    : false;

  const version = changelog?.split('h2')[1]?.replace(/[>/<]+/g, '');
  const example = readme?.split('js')[1]?.split('```')[0]?.trimStart();
  const outputHTML = readme?.split('```html')[1]?.split('```')[0]?.trimStart();
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
      <GridContainer
        align="flex-start"
        justify="flex-start"
        className={maxWidth}
      >
        <GridItem sm={12} md={12} xl={12}>
          <Tabs
            className={tabsPadding}
            aria-label={`View source code for ${component} component`}
          >
            {example && (
              <Tab default name="Example" className={mt3}>
                <Code language="js">{example}</Code>
              </Tab>
            )}

            {outputHTML && (
              <Tab name="Output HTML" className={mt3} default={!example}>
                <Code language="xml">{outputHTML}</Code>
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

CodeDocs.displayName = 'CodeDocs';

export default CodeDocs;
