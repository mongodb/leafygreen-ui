import React from 'react';
import { render, screen } from '@testing-library/react';

import { RichLink } from '.';

describe('@lg-chat/rich-links', () => {
  describe('RichLink', () => {
    it('renders a basic RichLink component', () => {
      render(<RichLink text="Basic rich link" />);

      const richLink = screen.getByText('Basic rich link');
      expect(richLink).toBeInTheDocument();
    });

    it('renders a RichLink component with a custom badge', () => {
      render(
        <RichLink
          text="Regular rich link with a test badge"
          badgeLabel="Test label"
          badgeGlyph="ArrowRight"
          badgeVariant="blue"
        />,
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
          <RichLink text="Link to Docs" variant="Docs" />
          <RichLink text="Link to Code" variant="Code" />
          <RichLink text="Link to Blog" variant="Blog" />
          <RichLink text="Link to Book" variant="Book" />
          <RichLink text="Link to Learn" variant="Learn" />
          <RichLink text="Link to Video" variant="Video" />
          <RichLink text="Link to Website" variant="Website" />
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
  });
});
