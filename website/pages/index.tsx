import React from 'react';
import { useRouter } from 'next/router';
import { css, cx } from 'emotion';
import facepaint from 'facepaint';
import { Overline } from '@leafygreen-ui/typography';
import { uiColors } from '@leafygreen-ui/palette';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { spacing, breakpoints } from '@leafygreen-ui/tokens';
import { GridContainer, GridItem } from 'components/Grid';
import News from 'components/News';

const mq = facepaint(
  Object.values(breakpoints).map(bp => `@media (min-width: ${bp}px)`),
  { literal: true },
);

const backdrop = css`
  background-color: ${uiColors.gray.light3};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

const layoutProperties = css`
  ${mq({
    width: ['calc(100% + 48px)', '100%', '100%', '1077px'],
    paddingRight: [0, `${spacing[4]}px`, `${spacing[4]}px`, `${spacing[4]}px`],
    marginLeft: ['-24px', 'unset', 'unset', 'unset'],
  })}
`;

const boxShadow = css`
  box-shadow: 0 0 0 1px ${uiColors.gray.light1};
`;

const container = css`
  ${boxShadow}
  width: 100%;
  height: 100%;
  background-color: white;
  border: unset;
  padding: unset;
  cursor: pointer;
  position: relative;
  color: ${uiColors.gray.dark3};
`;

const sharedHoverInteraction = css`
  &:hover {
    background-color: ${uiColors.gray.light3};
    border: 1px solid ${uiColors.gray.light1};
    box-shadow: 0 0 0 0px ${uiColors.gray.light1},
      2px 16px 20px -10px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
    z-index: 99999;
  }
`;

const previewWrapper = css`
  ${container}
  overflow: hidden;
  transition: transform 300ms ease-in-out;
  ${sharedHoverInteraction}

  &:hover {
    & > div {
      opacity: 1;
    }
  }
`;

const overlineContainer = css`
  position: absolute;
  bottom: 0;
  left: 0;
  padding-left: ${spacing[3]}px;
  padding-bottom: ${spacing[3]}px;
  transition: opacity 300ms ease-in-out;

  ${mq({
    opacity: [1, 1, 0, 0],
  })}
`;

const overlineColor = css`
  color: ${uiColors.gray.dark1};
`;

const marketingWrapper = css`
  ${boxShadow}
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  transition: transform 300ms ease-in-out;
  ${sharedHoverInteraction}
`;

const textWrapper = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  font-weight: medium;
  padding-top: ${spacing[4]}px;
  padding-left: ${spacing[4]}px;
  text-align: left;
  overflow: hidden;

  ${mq({
    fontSize: ['24px', '60px', '60px', '60px'],
  })}
`;

const lgHeight = css`
  ${mq({
    height: ['calc(100vw / 2)', '350px', '350px', '350px'],
  })}
`;

const smHeight = css`
  ${mq({
    height: ['calc(100vw / 2)', '175px', '175px', '175px'],
  })}
`;

const halfWidth = css`
  width: 50%;
`;

const secondRowContainer = css`
  display: flex;
  flex-wrap: wrap;
`;

interface ComponentPreviewProps {
  path: string;
  background: string;
  content?: string;
  children?: string;
  className?: string;
}

function ComponentPreview({
  path,
  background,
  content,
  className,
}: ComponentPreviewProps) {
  const { push } = useRouter();
  return (
    <div className={className}>
      <button className={previewWrapper} onClick={() => push(path)}>
        <img
          src={background}
          alt={`Learn more about ${content} component`}
          width="100%"
        />
        <div className={overlineContainer}>
          <Overline className={overlineColor}>{content}</Overline>
        </div>
      </button>
    </div>
  );
}

interface MarketingPreview {
  href: string;
  children: string;
  background: string;
}

function MarketingPreview({ href, children, background }: MarketingPreview) {
  return (
    <div className={lgHeight}>
      <a
        href={href}
        className={container}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={marketingWrapper}>
          <img
            src={background}
            alt=""
            aria-hidden="true"
            height="100%"
            className={css`
              min-width: 100%;
            `}
          />
          <div className={textWrapper}>{children}</div>
        </div>
      </a>
    </div>
  );
}

export default function Home() {
  const viewport = useViewportSize();
  const isTouchDevice = viewport?.width
    ? viewport?.width < breakpoints.Tablet
    : false;

  return (
    <>
      <div className={backdrop} />
      <GridContainer
        role="main"
        wrap="wrap"
        align="flex-start"
        justify="flex-start"
        className={layoutProperties}
      >
        {/* First Row */}
        <GridItem sm={12} md={6} lg={6}>
          <div className={lgHeight}>
            <News />
          </div>
        </GridItem>
        <GridItem sm={6} md={6} lg={6}>
          <ComponentPreview
            path="/component/banner/example"
            background="/images/banner-thumbnail.png"
            content="Banner"
            className={lgHeight}
          />
        </GridItem>

        {/* Second Row */}
        {isTouchDevice && (
          <GridItem sm={6} md={6} lg={6}>
            <div className={lgHeight}>
              {/* @ts-expect-error, awaiting URL for marketing page */}
              <MarketingPreview background="/images/personas-thumbnail.png">
                Meet our Personas
              </MarketingPreview>
            </div>
          </GridItem>
        )}
        <GridItem sm={12} md={6} lg={6}>
          <div className={secondRowContainer}>
            <ComponentPreview
              path="/component/radio-box-group/example"
              background="/images/radioBox-thumbnail.png"
              content="Radio boxes"
              className={cx(smHeight, halfWidth, boxShadow)}
            />
            <ComponentPreview
              path="/component/text-input/example"
              background="/images/textInput-thumbnail.png"
              content="Text input"
              className={cx(smHeight, halfWidth, boxShadow)}
            />
            <ComponentPreview
              path="/component/logo/example"
              background="/images/logos-thumbnail.png"
              content="Logos"
              className={cx(smHeight, halfWidth)}
            />
            <ComponentPreview
              path="/component/tokens/example"
              background="/images/spacers-thumbnail.png"
              content="Tokens"
              className={cx(smHeight, halfWidth)}
            />
          </div>
        </GridItem>
        {!isTouchDevice && (
          <GridItem sm={6} md={6} lg={6}>
            {/* @ts-expect-error, awaiting URL for marketing page */}
            <MarketingPreview background="/images/personas-thumbnail.png">
              Meet our Personas
            </MarketingPreview>
          </GridItem>
        )}

        {/* Third Row */}
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            path="/component/icon/example"
            background="/images/icons-thumbnail.png"
            content="Icons"
            className={smHeight}
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            path="/component/card/example"
            background="/images/card-thumbnail.png"
            content="Card"
            className={smHeight}
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            path="/component/tooltip/example"
            background="/images/tooltip-thumbnail.png"
            content="Tooltip"
            className={smHeight}
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            path="/component/checkbox/example"
            background="/images/checkbox-thumbnail.png"
            content="Checkbox"
            className={smHeight}
          />
        </GridItem>

        {/* Fourth Row */}
        <GridItem sm={6} md={6} lg={6}>
          <MarketingPreview
            href="https://www.mongodb.com/blog/post/meet-our-product-design-team-part-1"
            background="/images/team-thumbnail.png"
          >
            Meet our Team
          </MarketingPreview>
        </GridItem>
      </GridContainer>
    </>
  );
}
