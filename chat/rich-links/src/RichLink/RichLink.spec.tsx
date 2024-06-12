import React from 'react';
import { render, screen } from '@testing-library/react';

import { RichLinkVariantName } from '../../dist';

import { RichLink } from '.';

describe('@lg-chat/rich-links', () => {
  describe('RichLink', () => {
    it('renders a basic RichLink component', () => {
      render(<RichLink href="javascript:;">Basic rich link</RichLink>);

      const richLink = screen.getByText('Basic rich link');
      expect(richLink).toBeInTheDocument();
    });

    it('renders a RichLink component with a custom badge', () => {
      render(
        <RichLink
          href="javascript:;"
          badgeLabel="Test label"
          badgeGlyph="ArrowRight"
          badgeColor="blue"
        >
          Regular rich link with a test badge
        </RichLink>,
      );

      const richLink = screen.getByText('Regular rich link with a test badge');
      expect(richLink).toBeInTheDocument();
      const label = screen.getByText('Test label');
      expect(label).toBeInTheDocument();
      expect(label.parentElement?.querySelector('svg')).toBeInTheDocument();
    });

    it('renders the built-in RichLink component variants', () => {
      render(
        <div>
          <RichLink href="javascript:;" variant="Docs">
            Link to Docs
          </RichLink>
          <RichLink href="javascript:;" variant="Code">
            Link to Code
          </RichLink>
          <RichLink href="javascript:;" variant="Blog">
            Link to Blog
          </RichLink>
          <RichLink href="javascript:;" variant="Book">
            Link to Book
          </RichLink>
          <RichLink href="javascript:;" variant="Learn">
            Link to Learn
          </RichLink>
          <RichLink href="javascript:;" variant="Video">
            Link to Video
          </RichLink>
          <RichLink href="javascript:;" variant="Website">
            Link to Website
          </RichLink>
        </div>,
      );

      expect(screen.getByText('Link to Docs')).toBeInTheDocument();
      expect(screen.getByText('Link to Code')).toBeInTheDocument();
      expect(screen.getByText('Link to Blog')).toBeInTheDocument();
      expect(screen.getByText('Link to Book')).toBeInTheDocument();
      expect(screen.getByText('Link to Learn')).toBeInTheDocument();
      expect(screen.getByText('Link to Video')).toBeInTheDocument();
      expect(screen.getByText('Link to Website')).toBeInTheDocument();
    });

    it('ignores unknown variants', () => {
      render(
        <div>
          <RichLink
            href="javascript:;"
            variant={'NotARichLinkVariant' as RichLinkVariantName}
          >
            Invalid Variant Link
          </RichLink>
        </div>,
      );

      expect(screen.queryByText('Invalid Variant Link')).toBeInTheDocument();
    });

    it('ignores explicitly undefined variants', () => {
      render(
        <div>
          <RichLink href="javascript:;" variant={undefined}>
            Undefined Variant Link
          </RichLink>
        </div>,
      );

      expect(screen.queryByText('Undefined Variant Link')).toBeInTheDocument();
    });
  });
});
