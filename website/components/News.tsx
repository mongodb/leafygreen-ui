import React from 'react';
import { useRouter } from 'next/router';
import ArrowRightIcon from '@leafygreen-ui/icon/dist/ArrowRight';
import { css } from 'emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { Overline, Subtitle, H2 } from '@leafygreen-ui/typography';

const newsContainer = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 24px;
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
  opacity: 0;
  transform: translate3d(-3px, 0, 0px);
  transition: all 100ms ease-in;
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
        date="December 8, 2020"
        story="Copyable v1.0.0 – @leafygreen-ui/copyable"
        path="/component/copyable/example"
      />
      <Update
        date="December 2, 2020"
        story="Support for React 17"
        href="https://github.com/mongodb/leafygreen-ui/commit/c18f16e6632a6688e771334fd1672c9ef7e0f9b4"
      />
      <Update
        date="November 29, 2020"
        story="Installing LeafyGreen in Figma"
        path=""
      />
    </div>
  );
}

News.displayName = 'News';

export default News;
