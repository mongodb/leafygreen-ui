import React, { useState } from 'react';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
  afterEach(() => jest.clearAllMocks());

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
      renderMessageRating(
        { onChange, description: 'Description not used' },
        Variant.Compact,
      );
      expect(screen.queryByText(descriptionText)).toBeNull();
    });
  });

  describe.each([Variant.Compact, Variant.Spacious])(
    'in variant: %s',
    variant => {
      describe('uncontrolled', () => {
        test('is unselected by default', () => {
          renderMessageRating({ onChange }, variant);
          const thumbsUp = screen.getByLabelText('Like this message');
          const thumbsDown = screen.getByLabelText('Dislike this message');
          expect(thumbsUp.getAttribute('aria-checked')).toBe('false');
          expect(thumbsDown.getAttribute('aria-checked')).toBe('false');
        });

        test('onChange receives change event when thumbs up button is clicked', () => {
          renderMessageRating({ onChange }, variant);
          const thumbsUp = screen.getByLabelText('Like this message');
          userEvent.click(thumbsUp);
          expect(onChange).toHaveBeenCalledTimes(1);
          expect(onChange).toHaveBeenCalledWith(
            expect.objectContaining({
              target: expect.objectContaining({ value: 'liked' }),
            }),
          );
        });

        test('onChange receives change event when thumbs down button is clicked', () => {
          renderMessageRating({ onChange }, variant);
          const thumbsDown = screen.getByLabelText('Dislike this message');
          userEvent.click(thumbsDown);
          expect(onChange).toHaveBeenCalledTimes(1);
          expect(onChange).toHaveBeenCalledWith(
            expect.objectContaining({
              target: expect.objectContaining({ value: 'disliked' }),
            }),
          );
        });

        test('when thumbs up is clicked, it is selected', () => {
          renderMessageRating({ onChange }, variant);
          const thumbsUp = screen.getByLabelText('Like this message');
          expect(thumbsUp.getAttribute('aria-checked')).toBe('false');
          userEvent.click(thumbsUp);
          expect(thumbsUp.getAttribute('aria-checked')).toBe('true');
        });

        test('when thumbs down is clicked, it is selected', () => {
          renderMessageRating({ onChange }, variant);
          const thumbsDown = screen.getByLabelText('Dislike this message');
          expect(thumbsDown.getAttribute('aria-checked')).toBe('false');
          userEvent.click(thumbsDown);
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
          const thumbsDown = screen.getByLabelText('Dislike this message');
          expect(thumbsDown.getAttribute('aria-checked')).toBe('true');
          const thumbsUp = screen.getByLabelText('Like this message');
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
          const thumbsUp = screen.getByLabelText('Like this message');
          userEvent.click(thumbsUp);
          expect(thumbsUp.getAttribute('aria-checked')).toBe('false');
          const thumbsDown = screen.getByLabelText('Dislike this message');
          expect(thumbsDown.getAttribute('aria-checked')).toBe('true');
        });

        test('onChange gets called with the appropriate event target when button is clicked', () => {
          renderControlled();
          const thumbsUp = screen.getByLabelText('Like this message');
          userEvent.click(thumbsUp);
          expect(onChange).toHaveBeenCalledTimes(1);
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
