import React from 'react';
import { useRouter } from 'next/router';
import facepaint from 'facepaint';
import ArrowRightIcon from '@leafygreen-ui/icon/dist/ArrowRight';
import { css } from 'emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { Overline, Subtitle, H2 } from '@leafygreen-ui/typography';
import { spacing, breakpoints } from '@leafygreen-ui/tokens';

const mq = facepaint(
  Object.values(breakpoints).map(bp => `@media (min-width: ${bp}px)`),
  { literal: true },
);

const newsContainer = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: ${spacing[4]}px;

  ${mq({
    marginTop: [`${spacing[4]}px`, 'unset'],
    marginBottom: [`${spacing[4]}px`, 'unset'],
    paddingLeft: [`${spacing[4]}px`, 'unset'],
  })}
`;

const subtitleStyle = css`
  cursor: pointer;
  text-decoration: none;
  font-weight: bolder;
  display: inline-flex;
  align-items: center;

  &:hover > svg {
    opacity: 1;
    transform: translate3d(3px, 0, 0px);
  }
`;

const iconStyle = css`
  transform: translate3d(-3px, 0, 0px);
  transition: all 100ms ease-in;

  ${mq({
    visibility: ['hidden', 'hidden', 'visible'],
    opacity: [1, 1, 0, 0],
    marginLeft: [`${spacing[2]}px`, `${spacing[2]}px`, 0],
  })}
`;

const updateMargin = css`
  margin-top: 28px;
`;

const overlineColor = css`
  color: ${uiColors.gray.dark1};
`;
interface UpdateProps {
  dateText: string;
  storyText: string;
  route?: string;
  updateURL?: string;
}

function Update({ dateText, storyText, route, updateURL }: UpdateProps) {
  const { push } = useRouter();

  const subtitleProps = route
    ? ({ onClick: () => push(route), as: 'p' } as const)
    : ({ href: updateURL, as: 'a' } as const);

  const displayedDate = new Date(dateText).toLocaleDateString();

  return (
    <div className={updateMargin}>
      <Overline className={overlineColor}>{displayedDate}</Overline>
      <Subtitle className={subtitleStyle} {...subtitleProps}>
        {storyText}
        <ArrowRightIcon className={iconStyle} />
      </Subtitle>
    </div>
  );
}

function News() {
  return (
    <div className={newsContainer}>
      <H2 as="h1">Whats New</H2>
      <Update
        dateText="2020-12-08"
        storyText="Copyable v1.0.0"
        route="/component/copyable/example"
      />
      <Update
        dateText="2020-12-02"
        storyText="Support for React 17"
        updateURL="https://github.com/mongodb/leafygreen-ui/commit/c18f16e6632a6688e771334fd1672c9ef7e0f9b4"
      />
      <Update
        dateText="2020-11-29"
        storyText="Installing LeafyGreen in Figma"
        route=""
      />
    </div>
  );
}

News.displayName = 'News';

export default News;
