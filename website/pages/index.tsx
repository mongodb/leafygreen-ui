import React from 'react';
import { useRouter } from 'next/router';
import { css, cx } from 'emotion';
import { Overline } from '@leafygreen-ui/typography';
import { uiColors } from '@leafygreen-ui/palette';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { spacing, breakpoints } from '@leafygreen-ui/tokens';
import { GridContainer, GridItem } from 'components/Grid';
import { getAllUpdates, UpdateProps } from 'utils/fetchUpdates';
import { mq } from 'utils/mediaQuery';
import { CDN } from 'utils/routes';
import News from 'components/News';

const landingURL = `${CDN}/images/landing`;

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

  &:hover {
    & > div {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1);
    }
  }
`;

const overlineContainer = css`
  position: absolute;
  bottom: 0;
  left: 0;
  padding-left: ${spacing[3]}px;
  padding-bottom: ${spacing[3]}px;
  transition: all 300ms ease-in-out;

  ${mq({
    opacity: [1, 1, 0],
    transform: [
      'none',
      'none',
      `translate3d(0, ${spacing[3]}px, 0) scale(0.95)`,
    ],
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
`;

const textWrapper = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  font-weight: 600;
  text-align: left;
  overflow: hidden;

  ${mq({
    paddingTop: [`${spacing[3]}px`, `${spacing[4]}px`],
    paddingLeft: [`${spacing[3]}px`, `${spacing[4]}px`],
    paddingRight: [`${spacing[3]}px`, `${spacing[4]}px`],
    fontSize: ['24px', '60px', '60px', '60px'],
  })}
`;

const newsContainer = css`
  ${mq({
    height: ['unset', '350px'],
  })}
`;

const largeHeight = css`
  ${mq({
    height: ['50vw', '350px'],
  })}
`;

const smallHeight = css`
  ${mq({
    height: ['50vw', '175px'],
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
  route: string;
  backgroundURL: string;
  content?: string;
  children?: string;
  className?: string;
  isTouchDevice?: boolean;
}

function ComponentPreview({
  route,
  backgroundURL,
  content,
  className,
  isTouchDevice = false,
}: ComponentPreviewProps) {
  const { push } = useRouter();

  return (
    <div className={className}>
      <button
        className={cx(previewWrapper, {
          [sharedHoverInteraction]: isTouchDevice,
        })}
        onClick={() => push(route)}
      >
        <img
          src={backgroundURL}
          alt={`Learn more about ${content} component`}
          className={css`
            width: 100%;
          `}
        />
        <div className={overlineContainer}>
          <Overline className={overlineColor}>{content}</Overline>
        </div>
      </button>
    </div>
  );
}

interface MarketingPreview {
  marketingURL: string;
  children: string;
  backgroundURL: string;
  isTouchDevice?: boolean;
}

function MarketingPreview({
  marketingURL,
  children,
  backgroundURL,
  isTouchDevice,
}: MarketingPreview) {
  return (
    <div className={largeHeight}>
      <a
        href={marketingURL}
        className={container}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className={cx(marketingWrapper, {
            [sharedHoverInteraction]: !isTouchDevice,
          })}
        >
          <img
            src={backgroundURL}
            alt=""
            aria-hidden="true"
            className={css`
              min-width: 100%;
              height: 100%;
            `}
          />
          <div className={textWrapper}>{children}</div>
        </div>
      </a>
    </div>
  );
}

export default function Home({ updates }: { updates: Array<UpdateProps> }) {
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
          <div className={newsContainer}>
            <News updates={updates} />
          </div>
        </GridItem>
        <GridItem sm={6} md={6} lg={6}>
          <ComponentPreview
            route="/component/banner/example"
            backgroundURL={`${landingURL}/banner-thumbnail.png`}
            content="Banner"
            className={largeHeight}
            isTouchDevice={isTouchDevice}
          />
        </GridItem>

        {/* Second Row */}
        {isTouchDevice && (
          <GridItem sm={6} md={6} lg={6}>
            <div className={largeHeight}>
              <MarketingPreview
                marketingURL="https://www.mongodb.com/blog/post/meet-our-product-design-team-part-1"
                backgroundURL={`${landingURL}/team-thumbnail.png`}
                isTouchDevice={isTouchDevice}
              >
                Meet our Team
              </MarketingPreview>
            </div>
          </GridItem>
        )}
        <GridItem sm={12} md={6} lg={6}>
          <div className={secondRowContainer}>
            <ComponentPreview
              route="/component/radio-box-group/example"
              backgroundURL={`${landingURL}/radioBox-thumbnail.png`}
              content="Radio boxes"
              className={cx(smallHeight, halfWidth, boxShadow)}
              isTouchDevice={isTouchDevice}
            />
            <ComponentPreview
              route="/component/text-input/example"
              backgroundURL={`${landingURL}/textInput-thumbnail.png`}
              content="Text input"
              className={cx(smallHeight, halfWidth, boxShadow)}
              isTouchDevice={isTouchDevice}
            />
            <ComponentPreview
              route="/component/logo/example"
              backgroundURL={`${landingURL}/logos-thumbnail.png`}
              content="Logos"
              className={cx(smallHeight, halfWidth)}
              isTouchDevice={isTouchDevice}
            />
            <ComponentPreview
              route="/component/tokens/example"
              backgroundURL={`${landingURL}/spacers-thumbnail.png`}
              content="Tokens"
              className={cx(smallHeight, halfWidth)}
              isTouchDevice={isTouchDevice}
            />
          </div>
        </GridItem>
        {!isTouchDevice && (
          <GridItem sm={6} md={6} lg={6}>
            <MarketingPreview
              marketingURL="https://www.mongodb.com/blog/post/meet-our-product-design-team-part-1"
              backgroundURL={`${landingURL}/team-thumbnail.png`}
            >
              Meet our Team
            </MarketingPreview>
          </GridItem>
        )}

        {/* Third Row */}
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            route="/component/icon/example"
            backgroundURL={`${landingURL}/icons-thumbnail.png`}
            content="Icons"
            className={smallHeight}
            isTouchDevice={isTouchDevice}
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            route="/component/card/example"
            backgroundURL={`${landingURL}/card-thumbnail.png`}
            content="Card"
            className={smallHeight}
            isTouchDevice={isTouchDevice}
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            route="/component/tooltip/example"
            backgroundURL={`${landingURL}/tooltip-thumbnail.png`}
            content="Tooltip"
            className={smallHeight}
            isTouchDevice={isTouchDevice}
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            route="/component/checkbox/example"
            backgroundURL={`${landingURL}/checkbox-thumbnail.png`}
            content="Checkbox"
            className={smallHeight}
            isTouchDevice={isTouchDevice}
          />
        </GridItem>
      </GridContainer>
    </>
  );
}

export async function getStaticProps() {
  const updates = await getAllUpdates();
  return { props: { updates } };
}
