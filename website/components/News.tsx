import React, { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import { UpdateProps } from 'utils/fetchUpdates';
import { mq } from 'utils/mediaQuery';

import { uiColors } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import { H2,Overline, Subtitle } from '@leafygreen-ui/typography';

import { css } from '@emotion/css';

const newsContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: top;
  // Baseline alignment for news header with side navigation header.
  padding-top: ${spacing[2] - 1}px;

  ${mq({
    height: ['auto', '100%'],
    marginTop: ['48px', 'unset'],
    marginBottom: ['40px', 'unset'],
    marginLeft: [`${spacing[4]}px`, 'unset'],
  })}
`;

const subtitleStyle = css`
  cursor: pointer;
  text-decoration: none;
  font-weight: bolder;
  padding-right: ${spacing[5]}px;
`;

const updateMargin = css`
  margin-top: 28px;
`;

const overlineColor = css`
  color: ${uiColors.gray.dark1};
`;

function Update({ date, story, route, updateURL }: UpdateProps) {
  const [displayedDate, setDisplayedDate] = useState('');

  const { push } = useRouter();

  const subtitleProps = route
    ? ({ onClick: () => push(route), as: 'p' } as const)
    : ({
        href: updateURL,
        as: 'a',
        target: '_blank',
        rel: 'noopener noreferrer',
      } as const);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setDisplayedDate(
        new Date(date).toLocaleString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      );
    }
  }, [date]);

  return (
    <div className={updateMargin}>
      <Overline className={overlineColor}>{displayedDate}</Overline>
      <Subtitle className={subtitleStyle} {...subtitleProps}>
        {story}
      </Subtitle>
    </div>
  );
}

function News({ updates }: { updates: Array<UpdateProps> }) {
  return (
    <div className={newsContainer}>
      <H2 as="h1">What&rsquo;s New</H2>
      {updates.map(update => (
        <Update
          key={update.story}
          date={update.date}
          story={update.story}
          route={update.route}
          updateURL={update.updateURL}
        />
      ))}
    </div>
  );
}

News.displayName = 'News';

export default News;
