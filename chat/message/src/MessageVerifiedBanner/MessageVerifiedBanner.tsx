import React, { forwardRef, useMemo } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { Disclaimer, Link } from '@leafygreen-ui/typography';

import { MessageSubcomponentProperty } from '../shared.types';

import { MessageBanner } from './MessageBanner';
import { textStyles } from './MessageVerifiedBanner.styles';
import { MessageVerifiedBannerProps } from './MessageVerifiedBanner.types';

export const MessageVerifiedBanner = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, MessageVerifiedBannerProps>(
    ({ verifier, verifiedAt, learnMoreUrl, ...rest }, fwdRef) => {
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
        <MessageBanner ref={fwdRef} variant="success" {...rest}>
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
    },
  ),
  {
    displayName: 'MessageVerifiedBanner',
    key: MessageSubcomponentProperty.VerifiedBanner,
  },
);
