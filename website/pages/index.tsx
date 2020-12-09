import React from 'react';
import { useRouter } from 'next/router';
import { css } from 'emotion';
import Banner from '@leafygreen-ui/banner';
import { uiColors } from '@leafygreen-ui/palette';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { breakpoints } from '@leafygreen-ui/tokens';
import { GridContainer, GridItem } from 'components/Grid';
import News from 'components/News';
import { RadioBoxGroup, RadioBox } from '@leafygreen-ui/radio-box-group';
import TextInput from '@leafygreen-ui/text-input/dist';

function Preview({ children, path }) {
  const { push } = useRouter();
  return (
    <button
      className={css`
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: unset;
        cursor: pointer;
        border: 1px solid ${uiColors.gray.light1};
      `}
      onClick={() => push(path)}
    >
      {children}
    </button>
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
        <div
          className={css`
            height: 350px;
          `}
        >
          <News />
        </div>
      </GridItem>
      <GridItem sm={6} md={6} lg={6}>
        <div
          className={css`
            height: 350px;
          `}
        >
          <Preview path="/component/banner/example">
            <Banner>
              This is an example of a banner, it spans a single line.
            </Banner>
          </Preview>
        </div>
      </GridItem>

      {/* Second Row */}
      {isTouchDevice && (
        <GridItem sm={6} md={6} lg={6}>
          <div
            className={css`
              height: 350px;
              background-color: pink;
            `}
          ></div>

        </GridItem>
      )}
      <GridItem sm={12} md={6} lg={6}>
        <div
          className={css`
            display: flex;
            flex-wrap: wrap;
          `}
        >
          <div
            className={css`
              height: 175px;
              width: 50%;
              overflow: hidden;
            `}
          >
            <Preview path="/component/radio-box/example">
              <RadioBoxGroup size="compact" name="radio-box-group-default" value="1">
                <RadioBox value="1">Selected</RadioBox>
                <RadioBox value="2">Deselected</RadioBox>
              </RadioBoxGroup>
            </Preview>
          </div>
          <div
            className={css`
              height: 175px;
              width: 50%;
            `}
          >
            <Preview path="/component/text-input/example">
              <TextInput label="Label" description="Description" optional className={css`align-items: flex-start`} />
            </Preview>
          </div>
          <div
            className={css`
              height: 175px;
              width: 50%;
              background-color: blue;
            `}
          ></div>
          <div
            className={css`
              height: 175px;
              width: 50%;
              background-color: purple;
            `}
          ></div>
        </div>
      </GridItem>
      {!isTouchDevice && (
        <GridItem sm={6} md={6} lg={6}>
          <div
            className={css`
              height: 350px;
              background-color: pink;
            `}
          ></div>
        </GridItem>
      )}

      {/* Third Row */}
      <GridItem sm={6} md={6} lg={3}>
        <div
          className={css`
            height: 175px;
            background-color: black;
          `}
        ></div>
      </GridItem>
      <GridItem sm={6} md={6} lg={3}>
        <div
          className={css`
            height: 175px;
            background-color: aliceblue;
          `}
        ></div>
      </GridItem>
      <GridItem sm={6} md={6} lg={3}>
        <div
          className={css`
            height: 175px;
            background-color: brown;
          `}
        ></div>
      </GridItem>
      <GridItem sm={6} md={6} lg={3}>
        <div
          className={css`
            height: 175px;
            background-color: gray;
          `}
        ></div>
      </GridItem>

      {/* Fourth Row */}
      <GridItem sm={6} md={6} lg={6}>
        <div
          className={css`
            height: 350px;
            background-color: pink;
          `}
        ></div>
      </GridItem>
    </GridContainer>
  );
}
