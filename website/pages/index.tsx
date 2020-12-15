import React from 'react';
import { useRouter } from 'next/router';
import { css, cx } from 'emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { spacing, breakpoints } from '@leafygreen-ui/tokens';
import { GridContainer, GridItem } from 'components/Grid';
import News from 'components/News';

const container = css`
  width: 100%;
  height: 100%;
  background-color: white;
  border: unset;
  padding: unset;
  cursor: pointer;
  box-shadow: 0 0 0 1px ${uiColors.gray.light1};
  position: relative;
  color: ${uiColors.gray.dark3};
`;

const previewWrapper = css`
  ${container}

  &:before {
    position: absolute;
    bottom: 0;
    left: 0;
    padding-left: ${spacing[3]}px;
    padding-bottom: ${spacing[3]}px;
    transition: content 150ms ease-in-out;
    font-weight: bolder;
    opacity: 0;
    color: ${uiColors.gray.dark3};
    transition: opacity 300ms ease-in-out;
  }

  &:hover {
    &:before {
      opacity: 1;
    }
  }
`;

const previewImageWrapper = css`
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 100%;
  height: 100%;
`;

const marketingImageWrapper = css`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0 0 0 1px ${uiColors.gray.light1};
`;

const textWrapper = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  font-size: 60px;
  padding-top: ${spacing[4]}px;
  padding-left: ${spacing[4]}px;
  text-align: left;
`;

const lgHeight = css`
  height: 350px;
`;

const smHeight = css`
  height: 175px;
`;

const halfWidth = css`
  width: 50%;
`;

interface ComponentPreviewProps {
  path: string;
  background: string;
  content?: string;
  children?: string;
}

function ComponentPreview({
  path,
  background,
  content,
  children,
}: ComponentPreviewProps) {
  const { push } = useRouter();
  return (
    <button
      className={cx(
        previewWrapper,
        css`
        &:before {
          content: '${content}';
      `,
      )}
      onClick={() => push(path)}
    >
      <div
        className={cx(
          previewImageWrapper,
          css`
            background-image: url(${background});
          `,
        )}
      />
      {children}
    </button>
  );
}

interface MarketingPreview {
  href: string;
  children: string;
  background: string;
}

function MarketingPreview({ href, children, background }: MarketingPreview) {
  return (
    <a
      href={href}
      className={container}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className={cx(
          marketingImageWrapper,
          css`
            background-image: url(${background});
          `,
        )}
      />
      <div className={textWrapper}>{children}</div>
    </a>
  );
}

export default function Home() {
  const viewport = useViewportSize();
  const isTouchDevice = viewport?.width
    ? viewport?.width < breakpoints.Tablet
    : false;

  return (
    <GridContainer wrap="wrap" align="flex-start" justify="flex-start">
      {/* First Row */}
      <GridItem sm={12} md={6} lg={6}>
        <div className={lgHeight}>
          <News />
        </div>
      </GridItem>
      <GridItem sm={6} md={6} lg={6}>
        <div className={lgHeight}>
          <ComponentPreview
            path="/component/banner/example"
            background="/images/banner-thumbnail.png"
            content="Banner"
          />
        </div>
      </GridItem>

      {/* Second Row */}
      {isTouchDevice && (
        <GridItem sm={6} md={6} lg={6}>
          <div className={lgHeight}>
            <ComponentPreview
              path="/component/banner/example"
              background="/images/banner-thumbnail.png"
              content="Banner"
            />
          </div>
        </GridItem>
      )}
      <GridItem sm={12} md={6} lg={6}>
        <div
          className={css`
            display: flex;
            flex-wrap: wrap;
            box-shadow: 0 0 0 1px ${uiColors.gray.light1};
          `}
        >
          <div
            className={cx(
              smHeight,
              halfWidth,
              css`
                overflow: hidden;
              `,
            )}
          >
            <ComponentPreview
              path="/component/radio-box/example"
              background="/images/radioBox-thumbnail.png"
              content="Radio boxes"
            />
          </div>
          <div className={cx(smHeight, halfWidth)}>
            <ComponentPreview
              path="/component/text-input/example"
              background="images/textInput-thumbnail.png"
              content="Text input"
            />
          </div>
          <div className={cx(smHeight, halfWidth)}>
            <ComponentPreview
              path="/component/logo/example"
              background="images/logos-thumbnail.png"
              content="Logos"
            />
          </div>
          <div className={cx(smHeight, halfWidth)}>
            <ComponentPreview
              path="/component/tokens/example"
              background="images/spacers-thumbnail.png"
              content="Tokens"
            />
          </div>
        </div>
      </GridItem>
      {!isTouchDevice && (
        <GridItem sm={6} md={6} lg={6}>
          <div className={lgHeight}>
            <MarketingPreview background="images/personas-thumbnail.png">
              Meet our Personas
            </MarketingPreview>
          </div>
        </GridItem>
      )}

      {/* Third Row */}
      <GridItem sm={6} md={6} lg={3}>
        <div className={smHeight}>
          <ComponentPreview
            path="/component/icon/example"
            background="images/icons-thumbnail.png"
            content="Icons"
          />
        </div>
      </GridItem>
      <GridItem sm={6} md={6} lg={3}>
        <div className={smHeight}>
          <ComponentPreview
            path="/component/card/example"
            background="images/card-thumbnail.png"
            content="Card"
          />
        </div>
      </GridItem>
      <GridItem sm={6} md={6} lg={3}>
        <div className={smHeight}>
          <ComponentPreview
            path="/component/tooltip/example"
            background="images/tooltip-thumbnail.png"
            content="Tooltip"
          />
        </div>
      </GridItem>
      <GridItem sm={6} md={6} lg={3}>
        <div className={smHeight}>
          <ComponentPreview />
        </div>
      </GridItem>

      {/* Fourth Row */}
      <GridItem sm={6} md={6} lg={6}>
        <div className={lgHeight}>
          <MarketingPreview
            href="https://www.mongodb.com/blog/post/meet-our-product-design-team-part-1"
            background="images/team-thumbnail.png"
          >
            Meet our Team
          </MarketingPreview>
        </div>
      </GridItem>
    </GridContainer>
  );
}
