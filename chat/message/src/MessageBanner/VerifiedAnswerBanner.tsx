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
