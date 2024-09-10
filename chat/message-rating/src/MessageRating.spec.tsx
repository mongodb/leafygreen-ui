import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { MessageRating } from './MessageRating/MessageRating';
import { MessageRatingProps } from './MessageRating/MessageRating.types';

const onChange = jest.fn();
const descriptionText = 'How was the response?';

describe('packages/message-rating', () => {
  describe('props behave as expected', () => {
    test('description is "description text" by default', () => {
      render(<MessageRating onChange={onChange} />);
      expect(screen.getByText(descriptionText)).toBeInTheDocument();
    });

    test('description is "prop text" when value is supplied', () => {
      render(<MessageRating onChange={onChange} description="prop" />);
      expect(screen.getByText('prop')).toBeInTheDocument();
    });
  });

  describe('uncontrolled', () => {
    test('onChange receives change event when thumbs up button is clicked', () => {
      render(<MessageRating onChange={onChange} />);
      const thumbsUp = screen.getByLabelText('Thumbs up this message');
      fireEvent.click(thumbsUp);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: 'liked' }),
        }),
      );
    });

    test('onChange receives change event when thumbs down button is clicked', () => {
      render(<MessageRating onChange={onChange} />);
      const thumbsUp = screen.getByLabelText('Thumbs down this message');
      fireEvent.click(thumbsUp);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: 'disliked' }),
        }),
      );
    });

    test('when thumbs up is clicked, it is selected', () => {
      render(<MessageRating onChange={onChange} />);
      const thumbsUp = screen.getByLabelText('Thumbs up this message');
      expect(thumbsUp.getAttribute('aria-checked')).toBe('false');
      fireEvent.click(thumbsUp);
      expect(thumbsUp.getAttribute('aria-checked')).toBe('true');
    });

    test('when thumbs down is clicked, it is selected', () => {
      render(<MessageRating onChange={onChange} />);
      const thumbsDown = screen.getByLabelText('Thumbs down this message');
      expect(thumbsDown.getAttribute('aria-checked')).toBe('false');
      fireEvent.click(thumbsDown);
      expect(thumbsDown.getAttribute('aria-checked')).toBe('true');
    });
  });

  describe('controlled', () => {
    const ControlledRating = () => {
      const [value, _] = useState<MessageRatingProps['value']>('disliked');

      return <MessageRating onChange={onChange} value={value} />;
    };

    test('renders a button as checked based on the value prop', () => {
      render(<ControlledRating />);
      const thumbsDown = screen.getByLabelText('Thumbs down this message');
      expect(thumbsDown.getAttribute('aria-checked')).toBe('true');
      const thumbsUp = screen.getByLabelText('Thumbs up this message');
      expect(thumbsUp.getAttribute('aria-checked')).toBe('false');
    });

    test("clicking thumbs up does not select thumbs up when value is 'disliked''", () => {
      render(<ControlledRating />);
      const thumbsUp = screen.getByLabelText('Thumbs up this message');
      fireEvent.click(thumbsUp);
      expect(thumbsUp.getAttribute('aria-checked')).toBe('false');
      const thumbsDown = screen.getByLabelText('Thumbs down this message');
      expect(thumbsDown.getAttribute('aria-checked')).toBe('true');
    });

    test('onChange gets called with the appropriate event target when button is clicked', () => {
      render(<ControlledRating />);
      const thumbsUp = screen.getByLabelText('Thumbs up this message');
      fireEvent.click(thumbsUp);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: 'liked' }),
        }),
      );
    });
  });
});
