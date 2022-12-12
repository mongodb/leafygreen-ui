import React from 'react';
import { useRouter } from 'next/router';
import { transparentize } from 'polished';
import { pageContainerWidth } from 'styles/constants';
import { getAllUpdates, UpdateProps } from 'utils/fetchUpdates';
import { mq } from 'utils/mediaQuery';
import { CDN } from 'utils/routes';

import { GridContainer, GridItem } from 'components/Grid';
import News from 'components/News';

import { VisuallyHidden } from '@leafygreen-ui/a11y';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { uiColors } from '@leafygreen-ui/palette';
import {
  breakpoints,
  spacing,
  transitionDuration,
} from '@leafygreen-ui/tokens';
import { Overline } from '@leafygreen-ui/typography';

import { css, cx } from '@emotion/css';

const landingURL = `${CDN}/images/landing`;

const layoutProperties = css`
  margin-top: ${spacing[6]}px;
  margin-right: 0;

  ${mq({
    width: [
      'calc(100% + 48px)',
      '100%',
      '100%',
      `${pageContainerWidth.dataGraphic}px`,
    ],
    marginLeft: [`-${spacing[4]}px`, '0px', '0px', '0px'],
  })}
`;

const boxShadow = css`
  box-shadow: 0 0 0 1px ${uiColors.gray.light2};
`;

const container = css`
  ${boxShadow}
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white;
  border: unset;
  padding: unset;
  cursor: pointer;
  color: ${uiColors.gray.dark3};
`;

const sharedHoverInteraction = css`
  &:hover {
    background-color: ${uiColors.gray.light3};
    box-shadow: 0 0 0 1px ${uiColors.gray.light1},
      2px 16px 20px -10px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
    z-index: 99999;
    position: relative;
  }
`;

const previewWrapper = css`
  ${container}
  overflow: hidden;
  transition: all ${transitionDuration.default}ms ease-in-out;

  &:hover > div {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
    transition-delay: 200ms;
  }
`;

const overlineContainer = css`
  position: absolute;
  bottom: 0;
  left: 0;
  padding-left: ${spacing[3]}px;
  padding-bottom: ${spacing[3]}px;
  transition: all ${transitionDuration.default}ms ease-in-out;

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
  color: ${uiColors.gray.dark2};
  text-shadow: 0 1px 2px white, 0 1px 5px ${uiColors.gray.light3};
`;

const marketingWrapper = css`
  ${boxShadow}
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  transition: transform ${transitionDuration.slower}ms ease-in-out;
  color: white;
  text-shadow: 0 0 10px ${transparentize(0.2, uiColors.green.base)},
    0 2px 2px ${transparentize(0.2, uiColors.green.dark2)};
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

function backgroundImageCSS(backgroundURL): string {
  return css`
    background-image: url('${backgroundURL}');
    background-position: center;
    background-size: cover;
  `;
}

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
    <div className={cx(className, boxShadow)}>
      <button
        className={cx(
          previewWrapper,
          {
            [sharedHoverInteraction]: !isTouchDevice,
          },
          backgroundImageCSS(backgroundURL),
        )}
        onClick={() => push(route)}
      >
        <VisuallyHidden>{`Learn more about ${content} component`}</VisuallyHidden>

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
          className={cx(
            marketingWrapper,
            {
              [sharedHoverInteraction]: !isTouchDevice,
            },
            backgroundImageCSS(backgroundURL),
          )}
        >
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

  const sharedSmallComponentPreviewProps = {
    isTouchDevice,
    className: smallHeight,
  };

  return (
    <>
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
              className={cx(smallHeight, halfWidth)}
              isTouchDevice={isTouchDevice}
            />
            <ComponentPreview
              route="/component/text-input/example"
              backgroundURL={`${landingURL}/textInput-thumbnail.png`}
              content="Text input"
              className={cx(smallHeight, halfWidth)}
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
            {...sharedSmallComponentPreviewProps}
            route="/component/icon/example"
            backgroundURL={`${landingURL}/icons-thumbnail.png`}
            content="Icons"
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/card/example"
            backgroundURL={`${landingURL}/card-thumbnail.png`}
            content="Card"
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/tooltip/example"
            backgroundURL={`${landingURL}/tooltip-thumbnail.png`}
            content="Tooltip"
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/checkbox/example"
            backgroundURL={`${landingURL}/checkbox-thumbnail.png`}
            content="Checkbox"
          />
        </GridItem>

        {/* Fourth Row */}
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/badge/example"
            backgroundURL={`${landingURL}/badges-thumb.png`}
            content="Badge"
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/callout/example"
            backgroundURL={`${landingURL}/callout-thumb.png`}
            content="Callout"
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/inline-definition/example"
            backgroundURL={`${landingURL}/inlinedefinition-thumb.png`}
            content="Inline Definition"
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/button/example"
            backgroundURL={`${landingURL}/button-thumb.png`}
            content="Button"
          />
        </GridItem>

        {/* Fifth Row */}
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/toast/example"
            backgroundURL={`${landingURL}/toast-thumb.png`}
            content="Toast"
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/icon-button/example"
            backgroundURL={`${landingURL}/iconbutton-thumb.png`}
            content="Icon Button"
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/menu/example"
            backgroundURL={`${landingURL}/menu-thumb.png`}
            content="Menu"
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/text-area/example"
            backgroundURL={`${landingURL}/textarea-thumb.png`}
            content="Text Area"
          />
        </GridItem>

        {/* Sixth Row */}
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/copyable/example"
            backgroundURL={`${landingURL}/copyable-thumb.png`}
            content="Copyable"
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/tabs/example"
            backgroundURL={`${landingURL}/tabs-thumb.png`}
            content="Tabs"
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/marketing-modal/example"
            backgroundURL={`${landingURL}/marketingmodal-thumb.png`}
            content="Marketing Modal"
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/typography/example"
            backgroundURL={`${landingURL}/typography-thumb.png`}
            content="Typography"
          />
        </GridItem>

        {/* Seventh Row */}
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/code/example"
            backgroundURL={`${landingURL}/code-thumb.png`}
            content="Code"
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/toggle/example"
            backgroundURL={`${landingURL}/toggles-thumb.png`}
            content="Toggle"
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/table/example"
            backgroundURL={`${landingURL}/table-thumb.png`}
            content="Table"
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/confirmation-modal/example"
            backgroundURL={`${landingURL}/confirmationmodal-thumb.png`}
            content="Confirmation Modal"
          />
        </GridItem>

        {/* Eighth Row */}
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/modal/example"
            backgroundURL={`${landingURL}/modal-thumb.png`}
            content="Modal"
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/stepper/example"
            backgroundURL={`${landingURL}/stepper-thumb.png`}
            content="Stepper"
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/palette/example"
            backgroundURL={`${landingURL}/palette-thumb.png`}
            content="Palette"
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/side-nav/example"
            backgroundURL={`${landingURL}/sidenav-thumb.png`}
            content="Side Nav"
          />
        </GridItem>

        {/* Ninth Row */}
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/radio-group/example"
            backgroundURL={`${landingURL}/radiogroup-thumb.png`}
            content="Radio Group"
          />
        </GridItem>
        <GridItem sm={6} md={3} lg={3}>
          <ComponentPreview
            {...sharedSmallComponentPreviewProps}
            route="/component/select/example"
            backgroundURL={`${landingURL}/select-thumb.png`}
            content="Select"
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
