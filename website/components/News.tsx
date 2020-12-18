import React from 'react';
import { useRouter } from 'next/router';
import facepaint from 'facepaint';
import ArrowRightIcon from '@leafygreen-ui/icon/dist/ArrowRight';
import { css } from 'emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { Overline, Subtitle, H2 } from '@leafygreen-ui/typography';
import { breakpoints } from '@leafygreen-ui/tokens';

const mq = facepaint(
  Object.values(breakpoints).map(bp => `@media (min-width: ${bp}px)`),
  { literal: true },
);

const newsContainer = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 24px;

  ${mq({
    marginTop: ['24px', 'unset', 'unset', 'unset'],
    marginBottom: ['24px', 'unset', 'unset', 'unset'],
    paddingLeft: ['24px', 'unset', 'unset', 'unset'],
  })}
`;

const subtitleStyle = css`
  cursor: pointer;
  text-decoration: none;
  font-weight: bolder;
  display: inline-flex;
  align-items: center;

  &:hover {
    & > svg {
      opacity: 1;
      transform: translate3d(3px, 0, 0px);
    }
  }
`;

const iconStyle = css`
  transition: all 100ms ease-in;
  margin-left: 2px;

  ${mq({
    opacity: [1, 1, 0, 0],
    transform: [
      'transform: translate3d(3px, 0, 0px)',
      'transform: translate3d(3px, 0, 0px)',
      'transform: translate3d(-3px, 0, 0px)',
    ],
  })}
`;

interface UpdateProps {
  date: string;
  story: string;
  path?: string;
  href?: string;
}

function Update({ date, story, path, href }: UpdateProps) {
  const { push } = useRouter();
  let renderedStory: React.ReactElement | null;

  if (path) {
    renderedStory = (
      <Subtitle as="p" className={subtitleStyle} onClick={() => push(path)}>
        {story}
        <ArrowRightIcon className={iconStyle} />
      </Subtitle>
    );
  } else {
    renderedStory = (
      <Subtitle as="a" className={subtitleStyle} href={href}>
        {story}
        <ArrowRightIcon className={iconStyle} />
      </Subtitle>
    );
  }

  return (
    <div
      className={css`
        margin-top: 28px;
      `}
    >
      <Overline
        className={css`
          color: ${uiColors.gray.dark1};
        `}
      >
        {date}
      </Overline>
      {renderedStory}
    </div>
  );
}

function News() {
  return (
    <div className={newsContainer}>
      <H2 as="h1">Whats New</H2>
      <Update
        date="Dec 8, 2020"
        story="Copyable v1.0.0"
        path="/component/copyable/example"
      />
      <Update
        date="Dec 2, 2020"
        story="Support for React 17"
        href="https://github.com/mongodb/leafygreen-ui/commit/c18f16e6632a6688e771334fd1672c9ef7e0f9b4"
      />
      <Update
        date="Nov 29, 2020"
        story="Installing LeafyGreen in Figma"
        path=""
      />
    </div>
  );
}

News.displayName = 'News';

export default News;
