import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RichLink, type RichLinkVariantName } from '.';

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

    it('renders as a basic rich link (no variant) if the variant prop is an invalid value', () => {
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

    it('renders as a basic rich link (no variant) if the variant prop is explicitly undefined', () => {
      render(
        <div>
          <RichLink href="javascript:;" variant={undefined}>
            Undefined Variant Link
          </RichLink>
        </div>,
      );

      expect(screen.queryByText('Undefined Variant Link')).toBeInTheDocument();
    });

    it('calls the onLinkClick prop when the link is clicked', () => {
      const onLinkClick = jest.fn();
      render(
        <>
          <RichLink
            href="https://mongodb.design/built-in"
            onLinkClick={onLinkClick}
            variant="Website"
          >
            Built-in Variant Link
          </RichLink>
          <RichLink
            href="https://mongodb.design/custom"
            onLinkClick={onLinkClick}
            badgeGlyph="ArrowRight"
            badgeLabel="Custom Label"
            badgeColor="blue"
          >
            Custom Link
          </RichLink>
        </>,
      );
      const link = screen.getByText('Built-in Variant Link');
      userEvent.click(link);
      expect(onLinkClick).toHaveBeenCalledWith({
        href: 'https://mongodb.design/built-in',
        children: 'Built-in Variant Link',
        variant: 'Website',
      });

      const customLink = screen.getByText('Custom Link');
      userEvent.click(customLink);
      expect(onLinkClick).toHaveBeenCalledWith({
        href: 'https://mongodb.design/custom',
        children: 'Custom Link',
        badgeGlyph: 'ArrowRight',
        badgeLabel: 'Custom Label',
        badgeColor: 'blue',
      });
    });
  });
});
