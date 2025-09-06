import React, { useMemo } from 'react';

import { Disclaimer, Link } from '@leafygreen-ui/typography';

import { MessageBanner } from '../MessageBanner';

import { textStyles } from './MessageVerifiedBanner.styles';
import { MessageVerifiedBannerProps } from './MessageVerifiedBanner.types';

export function MessageVerifiedBanner({
  verifier,
  verifiedAt,
  learnMoreUrl,
  ...rest
}: MessageVerifiedBannerProps) {
  const text = useMemo(() => {
    const textParts = [`Verified`];

    if (verifier) {
      textParts.push(`by ${verifier}`);
    }

    if (verifiedAt) {
      const formattedDate = verifiedAt.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      textParts.push(`on ${formattedDate}`);
    }

    return textParts.join(' ');
  }, [verifier, verifiedAt]);

  return (
    <MessageBanner variant="success" {...rest}>
      <Disclaimer className={textStyles}>
        {text}
        {learnMoreUrl && (
          <>
            {' | '}
            <Link href={learnMoreUrl}>Learn More</Link>
          </>
        )}
      </Disclaimer>
    </MessageBanner>
  );
}
