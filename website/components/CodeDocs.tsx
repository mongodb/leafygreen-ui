import React, { useState } from 'react';
import { css, cx } from 'emotion';
import unified from 'unified';
import markdown from 'remark-parse';
import ActivityFeedIcon from '@leafygreen-ui/icon/dist/ActivityFeed';
import Button from '@leafygreen-ui/button';
import Card from '@leafygreen-ui/card';
import Code from '@leafygreen-ui/code';
import Modal from '@leafygreen-ui/modal';
import { Tabs, Tab } from '@leafygreen-ui/tabs';
import { Subtitle, Body } from '@leafygreen-ui/typography';
import { breakpoints } from '@leafygreen-ui/tokens';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { BaseLayoutProps } from 'utils/types';
import { GridContainer, GridItem } from 'components/Grid';
import PropTable from 'components/PropTable';
import { m, p } from 'styles/spacing';

const topAlignment = css`
  ${m.t4}
  ${p.t3}
`;

const versionCard = css`
  min-height: 106px;
  ${p.y3}
  ${p.x4}
`;

const mobileInstallMargin = css`
  margin-top: 50px;
`;

interface VersionCardProps {
  version: string;
  changelog: string;
  isMobile?: boolean;
}

interface InstallProps {
  component: string;
  version: string;
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
      <Subtitle className={p.b3}>Version {version}</Subtitle>
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
        <div dangerouslySetInnerHTML={{ __html: changelog }}></div>
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
          <Body weight="medium" className={m.t3}>
            Yarn
          </Body>
          <Code language="js">{`yarn add @leafygreen-ui/${component}`}</Code>
          <Body weight="medium" className={m.t3}>
            NPM
          </Body>
          <Code language="js">{`npm install @leafygreen-ui/${component}`}</Code>
        </div>
      </GridItem>
      <GridItem sm={12}>
        <div
          className={css`
            margin-bottom: 70px;
          `}
        >
          <VersionCard version={version} changelog={changelog} isMobile />
        </div>
      </GridItem>
    </GridContainer>
  );
}

function DesktopInstall({ component, changelog, version }: InstallProps) {
  return (
    <>
      <GridContainer justify="flex-start" align="flex-start">
        <GridItem md={7} lg={7}>
          <div className={topAlignment}>
            <Subtitle className={m.b3}>Installation</Subtitle>
            <Body weight="medium" className={m.b1}>
              Yarn
            </Body>
            <Code language="js">{`yarn add @leafygreen-ui/${component}`}</Code>
          </div>
        </GridItem>
        <GridItem md={5} lg={5}>
          <VersionCard changelog={changelog} version={version} />
        </GridItem>
      </GridContainer>
      <GridContainer align="flex-start" justify="flex-start">
        <GridItem md={7} lg={7}>
          <Body weight="medium" className={m.b1}>
            NPM
          </Body>
          <Code language="js">{`npm install @leafygreen-ui/${component}`}</Code>
        </GridItem>
      </GridContainer>
    </>
  );
}

function CodeDocs({ component, readme, changelog }: BaseLayoutProps) {
  const viewport = useViewportSize();
  const isMobile = viewport?.width < breakpoints.Tablet;

  const version = changelog.match(/(?<=<h2>)(.+?)(?=<\/h2>)/s)?.[1];
  const example = readme.match(/(?<=js).*?(?=```)/s)?.[0];
  const outputHTML = readme.match(/(?<=html).*?(?=```)/s)?.[0];
  const mdAst = unified().use(markdown).parse(readme);

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
          <Tabs className={p.t2}>
            {example && (
              <Tab default name="Example" className={m.t3}>
                <Code showLineNumbers language="js">
                  {example}
                </Code>
              </Tab>
            )}
            {outputHTML && (
              <Tab name="Output HTML" className={m.t3} default={!example}>
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
          <PropTable mdAst={mdAst} component={component} />
        </GridItem>
      </GridContainer>
    </>
  );
}

export default CodeDocs;
