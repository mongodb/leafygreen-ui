import React, { useMemo } from 'react';

import { Disclaimer, Link } from '@leafygreen-ui/typography';

import { VerificationInfo } from '../Message';
import { MessageBanner } from '../MessageBanner';

import { textStyles } from './VerifiedAnswerBanner.styles';

export function VerifiedAnswerBanner({
  verifier,
  verifiedAt,
  learnMoreUrl,
}: VerificationInfo) {
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
    <MessageBanner variant="success">
      <Disclaimer className={textStyles}>{text}</Disclaimer>
      {learnMoreUrl ? (
        <>
          {' | '}
          <Link href={learnMoreUrl}>
            <Disclaimer className={textStyles}>Learn More</Disclaimer>
          </Link>
        </>
      ) : null}
    </MessageBanner>
  );
}
