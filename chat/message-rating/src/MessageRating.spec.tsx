import React, { useState } from 'react';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { fireEvent, render, screen } from '@testing-library/react';

import { MessageRating } from './MessageRating/MessageRating';
import { MessageRatingProps } from './MessageRating/MessageRating.types';

const onChange = jest.fn();
const descriptionText = 'How was the response?';

// Mock the ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const renderMessageRating = (
  props: MessageRatingProps,
  variant: Variant = Variant.Spacious,
) => {
  render(
    <LeafyGreenChatProvider variant={variant}>
      <MessageRating {...props} />
    </LeafyGreenChatProvider>,
  );
};

describe('packages/message-rating', () => {
  describe('props behave as expected', () => {
    test('description is "description text" by default', () => {
      renderMessageRating({ onChange });
      expect(screen.getByText(descriptionText)).toBeInTheDocument();
    });

    test('description is "prop text" when value is supplied', () => {
      renderMessageRating({ onChange, description: 'prop' });
      expect(screen.getByText('prop')).toBeInTheDocument();
    });

    test('description is not rendered when variant is compact', () => {
      renderMessageRating({ onChange }, Variant.Compact);
      expect(screen.queryByText(descriptionText)).toBeNull();
    });
  });

  describe.each([Variant.Compact, Variant.Spacious])(
    'in variant: %s',
    variant => {
      describe('uncontrolled', () => {
        test('onChange receives change event when thumbs up button is clicked', () => {
          renderMessageRating({ onChange }, variant);
          const thumbsUp = screen.getByLabelText('Thumbs up this message');
          fireEvent.click(thumbsUp);
          expect(onChange).toHaveBeenCalledWith(
            expect.objectContaining({
              target: expect.objectContaining({ value: 'liked' }),
            }),
          );
        });

        test('onChange receives change event when thumbs down button is clicked', () => {
          renderMessageRating({ onChange }, variant);
          const thumbsDown = screen.getByLabelText('Thumbs down this message');
          fireEvent.click(thumbsDown);
          expect(onChange).toHaveBeenCalledWith(
            expect.objectContaining({
              target: expect.objectContaining({ value: 'disliked' }),
            }),
          );
        });

        test('when thumbs up is clicked, it is selected', () => {
          renderMessageRating({ onChange }, variant);
          const thumbsUp = screen.getByLabelText('Thumbs up this message');
          expect(thumbsUp.getAttribute('aria-checked')).toBe('false');
          fireEvent.click(thumbsUp);
          expect(thumbsUp.getAttribute('aria-checked')).toBe('true');
        });

        test('when thumbs down is clicked, it is selected', () => {
          renderMessageRating({ onChange }, variant);
          const thumbsDown = screen.getByLabelText('Thumbs down this message');
          expect(thumbsDown.getAttribute('aria-checked')).toBe('false');
          fireEvent.click(thumbsDown);
          expect(thumbsDown.getAttribute('aria-checked')).toBe('true');
        });
      });

      describe('controlled', () => {
        const ControlledRating = () => {
          const [value, setValue] =
            useState<MessageRatingProps['value']>('disliked');

          return (
            <MessageRating
              onChange={e => {
                setValue(e.target.value);
                onChange(e);
              }}
              value={value}
            />
          );
        };

        const renderControlled = () => {
          render(
            <LeafyGreenChatProvider variant={variant}>
              <ControlledRating />
            </LeafyGreenChatProvider>,
          );
        };

        test('renders a button as checked based on the value prop', () => {
          renderControlled();
          const thumbsDown = screen.getByLabelText('Thumbs down this message');
          expect(thumbsDown.getAttribute('aria-checked')).toBe('true');
          const thumbsUp = screen.getByLabelText('Thumbs up this message');
          expect(thumbsUp.getAttribute('aria-checked')).toBe('false');
        });

        test("clicking thumbs up does not select thumbs up when value is 'disliked' and component is controlled", () => {
          const ControlledRatingValueHardcoded = () => {
            return <MessageRating onChange={onChange} value={'disliked'} />;
          };
          render(
            <LeafyGreenChatProvider variant={variant}>
              <ControlledRatingValueHardcoded />
            </LeafyGreenChatProvider>,
          );
          const thumbsUp = screen.getByLabelText('Thumbs up this message');
          fireEvent.click(thumbsUp);
          expect(thumbsUp.getAttribute('aria-checked')).toBe('false');
          const thumbsDown = screen.getByLabelText('Thumbs down this message');
          expect(thumbsDown.getAttribute('aria-checked')).toBe('true');
        });

        test('onChange gets called with the appropriate event target when button is clicked', () => {
          renderControlled();
          const thumbsUp = screen.getByLabelText('Thumbs up this message');
          fireEvent.click(thumbsUp);
          expect(onChange).toHaveBeenCalledWith(
            expect.objectContaining({
              target: expect.objectContaining({ value: 'liked' }),
            }),
          );
        });
      });
    },
  );
});
