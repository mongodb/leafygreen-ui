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

  &:hover {
    & > svg {
      opacity: 1;
      transform: translate3d(3px, 0, 0px);
    }
  }
`;

const iconStyle = css`
  transform: translate3d(-3px, 0, 0px);
  transition: all 100ms ease-in;

  ${mq({
    opacity: [1, 1, 0, 0],
    marginLeft: [`${spacing[2]}px`, `${spacing[2]}px`, 0],
  })}
`;

const overlineMargin = css`
  margin-top: 28px;
`;

const overlineColor = css`
  color: ${uiColors.gray.dark1};
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
    <div className={overlineMargin}>
      <Overline className={overlineColor}>{date}</Overline>
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
