import React from 'react';
import { jest } from '@jest/globals';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SupportedLocales } from '@leafygreen-ui/date-utils';
import { getValueFormatter } from '@leafygreen-ui/input-box';

import {
  defaultPlaceholder,
  getDefaultMax,
  getDefaultMin,
  getTimeSegmentRules,
} from '../constants';
import { TimeInputDisplayContextProps } from '../Context/TimeInputDisplayContext';
import { TimeInputDisplayProvider } from '../Context/TimeInputDisplayContext';
import { TimeSegment } from '../shared.types';

import { TimeInputSegment } from './TimeInputSegment';
import {
  TimeInputSegmentChangeEventHandler,
  TimeInputSegmentProps,
} from './TimeInputSegment.types';

const renderSegment = (
  props?: Partial<TimeInputSegmentProps>,
  ctx?: Partial<TimeInputDisplayContextProps>,
) => {
  const is12HourFormat = !!ctx?.is12HourFormat;
  const defaultSegmentProps = {
    value: '',
    onChange: () => {},
    segment: 'hour' as TimeSegment,
    disabled: false,
    segmentEnum: TimeSegment,
    charsCount: getTimeSegmentRules({ is12HourFormat })['hour'].maxChars,
    minSegmentValue: getDefaultMin({ is12HourFormat })['hour'],
    maxSegmentValue: getDefaultMax({ is12HourFormat })['hour'],
    placeholder: defaultPlaceholder['hour'],
    shouldWrap: true,
    shouldValidate: true,
    step: 1,
  };

  const result = render(
    <TimeInputDisplayProvider label="label" {...ctx}>
      <TimeInputSegment {...defaultSegmentProps} {...props} />
    </TimeInputDisplayProvider>,
  );

  const rerenderSegment = (newProps: Partial<TimeInputSegmentProps>) =>
    result.rerender(
      <TimeInputDisplayProvider label="label" {...ctx}>
        <TimeInputSegment {...defaultSegmentProps} {...props} {...newProps} />
      </TimeInputDisplayProvider>,
    );

  const getInput = () =>
    result.getByTestId('lg-time_input_input-segment') as HTMLInputElement;

  return {
    ...result,
    rerenderSegment,
    getInput,
    input: getInput(),
  };
};

describe('packages/time-input/time-input-segment', () => {
  describe('rendering', () => {
    describe('segment', () => {
      test('renders with an empty value sets the value to empty string', () => {
        const { input } = renderSegment({
          value: '',
        });
        expect(input.value).toBe('');
      });

      test('renders with a value sets the value to the value', () => {
        const { input } = renderSegment({
          value: '12',
        });
        expect(input.value).toBe('12');
      });

      test('rerendering updates the value', () => {
        const { input, getInput, rerenderSegment } = renderSegment({
          value: '12',
        });
        expect(input.value).toBe('12');
        rerenderSegment({
          value: '08',
        });
        expect(getInput().value).toBe('08');
      });
    });
  });

  describe('Keyboard', () => {
    describe('Arrow Keys', () => {
      describe('hour input', () => {
        describe('Up arrow', () => {
          const formatter = getValueFormatter({
            charsCount: getTimeSegmentRules({ is12HourFormat: true })['hour']
              .maxChars,
          });
          test('calls handler with value +1 if value is less than max', () => {
            const onChangeHandler =
              jest.fn<TimeInputSegmentChangeEventHandler>();
            const { input } = renderSegment({
              segment: 'hour',
              value: formatter(15),
              onChange: onChangeHandler,
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(16) }),
            );
          });

          describe('12 hour format', () => {
            const formatter = getValueFormatter({
              charsCount: getTimeSegmentRules({ is12HourFormat: true })['hour']
                .maxChars,
            });

            test('calls handler with min if value is undefined', () => {
              const onChangeHandler =
                jest.fn<TimeInputSegmentChangeEventHandler>();
              const { input } = renderSegment(
                {
                  segment: 'hour',
                  value: '',
                  onChange: onChangeHandler,
                },
                {
                  locale: SupportedLocales.en_US,
                },
              );

              userEvent.type(input, '{arrowup}');
              expect(onChangeHandler).toHaveBeenCalledWith(
                expect.objectContaining({
                  value: formatter(
                    getDefaultMin({ is12HourFormat: true })['hour'],
                  ),
                }),
              );
            });

            test('rolls value over to min value if value exceeds `max`', () => {
              const onChangeHandler =
                jest.fn<TimeInputSegmentChangeEventHandler>();
              const { input } = renderSegment(
                {
                  segment: 'hour',
                  value: formatter(
                    getDefaultMax({ is12HourFormat: true })['hour'],
                  ),
                  onChange: onChangeHandler,
                },
                {
                  locale: SupportedLocales.en_US,
                },
              );

              userEvent.type(input, '{arrowup}');
              expect(onChangeHandler).toHaveBeenCalledWith(
                expect.objectContaining({
                  value: formatter(
                    getDefaultMin({ is12HourFormat: true })['hour'],
                  ),
                }),
              );
            });
          });

          describe('24 hour format', () => {
            const formatter = getValueFormatter({
              charsCount: getTimeSegmentRules({ is12HourFormat: false })['hour']
                .maxChars,
              allowZero: true,
            });

            test('calls handler with min if value is undefined', () => {
              const onChangeHandler =
                jest.fn<TimeInputSegmentChangeEventHandler>();
              const { input } = renderSegment(
                {
                  segment: 'hour',
                  value: '',
                  onChange: onChangeHandler,
                },
                {
                  locale: SupportedLocales.ISO_8601,
                },
              );

              userEvent.type(input, '{arrowup}');
              expect(onChangeHandler).toHaveBeenCalledWith(
                expect.objectContaining({
                  value: formatter(
                    getDefaultMin({ is12HourFormat: false })['hour'],
                  ),
                }),
              );
            });

            test('rolls value over to min value if value exceeds `max`', () => {
              const onChangeHandler =
                jest.fn<TimeInputSegmentChangeEventHandler>();
              const { input } = renderSegment(
                {
                  segment: 'hour',
                  value: formatter(
                    getDefaultMax({ is12HourFormat: false })['hour'],
                  ),
                  onChange: onChangeHandler,
                },
                {
                  locale: SupportedLocales.ISO_8601,
                },
              );

              userEvent.type(input, '{arrowup}');
              expect(onChangeHandler).toHaveBeenCalledWith(
                expect.objectContaining({
                  value: formatter(
                    getDefaultMin({ is12HourFormat: false })['hour'],
                  ),
                }),
              );
            });
          });
        });

        describe('Down arrow', () => {
          const formatter = getValueFormatter({
            charsCount: getTimeSegmentRules({ is12HourFormat: true })['hour']
              .maxChars,
          });
          test('calls handler with value -1 if value is greater than min', () => {
            const onChangeHandler =
              jest.fn<TimeInputSegmentChangeEventHandler>();
            const { input } = renderSegment({
              segment: 'hour',
              value: formatter(12),
              onChange: onChangeHandler,
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(11) }),
            );
          });

          describe('12 hour format', () => {
            test('calls handler with max if value is undefined', () => {
              const onChangeHandler =
                jest.fn<TimeInputSegmentChangeEventHandler>();
              const { input } = renderSegment(
                {
                  segment: 'hour',
                  value: '',
                  onChange: onChangeHandler,
                },
                {
                  locale: SupportedLocales.en_US,
                },
              );

              userEvent.type(input, '{arrowdown}');
              expect(onChangeHandler).toHaveBeenCalledWith(
                expect.objectContaining({
                  value: formatter(
                    getDefaultMax({ is12HourFormat: true })['hour'],
                  ),
                }),
              );
            });

            test('rolls value over to max value if value exceeds `min`', () => {
              const onChangeHandler =
                jest.fn<TimeInputSegmentChangeEventHandler>();
              const { input } = renderSegment(
                {
                  segment: 'hour',
                  value: formatter(
                    getDefaultMin({ is12HourFormat: true })['hour'],
                  ),
                  onChange: onChangeHandler,
                },
                {
                  locale: SupportedLocales.en_US,
                },
              );

              userEvent.type(input, '{arrowdown}');
              expect(onChangeHandler).toHaveBeenCalledWith(
                expect.objectContaining({
                  value: formatter(
                    getDefaultMax({ is12HourFormat: true })['hour'],
                  ),
                }),
              );
            });
          });

          describe('24 hour format', () => {
            const formatter = getValueFormatter({
              charsCount: getTimeSegmentRules({ is12HourFormat: false })['hour']
                .maxChars,
              allowZero: true,
            });

            test('calls handler with max if value is undefined', () => {
              const onChangeHandler =
                jest.fn<TimeInputSegmentChangeEventHandler>();
              const { input } = renderSegment(
                {
                  segment: 'hour',
                  value: '',
                  onChange: onChangeHandler,
                },
                {
                  locale: SupportedLocales.ISO_8601,
                },
              );

              userEvent.type(input, '{arrowdown}');
              expect(onChangeHandler).toHaveBeenCalledWith(
                expect.objectContaining({
                  value: formatter(
                    getDefaultMax({ is12HourFormat: false })['hour'],
                  ),
                }),
              );
            });

            test('rolls value over to max value if value exceeds `min`', () => {
              const onChangeHandler =
                jest.fn<TimeInputSegmentChangeEventHandler>();
              const { input } = renderSegment(
                {
                  segment: 'hour',
                  value: formatter(
                    getDefaultMin({ is12HourFormat: false })['hour'],
                  ),
                  onChange: onChangeHandler,
                },
                {
                  locale: SupportedLocales.ISO_8601,
                },
              );

              userEvent.type(input, '{arrowdown}');
              expect(onChangeHandler).toHaveBeenCalledWith(
                expect.objectContaining({
                  value: formatter(
                    getDefaultMax({ is12HourFormat: false })['hour'],
                  ),
                }),
              );
            });
          });
        });
      });

      describe.each(['minute', 'second'] as Array<TimeSegment>)(
        '%p input',
        segment => {
          const formatter = getValueFormatter({
            charsCount: getTimeSegmentRules({ is12HourFormat: true })[segment]
              .maxChars,
            allowZero: true,
          });

          describe('Up arrow', () => {
            test('calls handler with value +1 if value is less than max', () => {
              const onChangeHandler =
                jest.fn<TimeInputSegmentChangeEventHandler>();
              const { input } = renderSegment({
                segment,
                value: formatter(15),
                onChange: onChangeHandler,
              });

              userEvent.type(input, '{arrowup}');
              expect(onChangeHandler).toHaveBeenCalledWith(
                expect.objectContaining({ value: formatter(16) }),
              );
            });

            test('calls handler with min if value is undefined', () => {
              const onChangeHandler =
                jest.fn<TimeInputSegmentChangeEventHandler>();
              const { input } = renderSegment({
                segment,
                value: '',
                onChange: onChangeHandler,
              });

              userEvent.type(input, '{arrowup}');
              expect(onChangeHandler).toHaveBeenCalledWith(
                expect.objectContaining({
                  value: formatter(
                    getDefaultMin({ is12HourFormat: true })[segment],
                  ),
                }),
              );
            });

            test('rolls value over to min value if value exceeds `max`', () => {
              const onChangeHandler =
                jest.fn<TimeInputSegmentChangeEventHandler>();
              const { input } = renderSegment({
                segment,
                value: formatter(
                  getDefaultMax({ is12HourFormat: true })[segment],
                ),
                onChange: onChangeHandler,
              });

              userEvent.type(input, '{arrowup}');
              expect(onChangeHandler).toHaveBeenCalledWith(
                expect.objectContaining({
                  value: formatter(
                    getDefaultMin({ is12HourFormat: true })[segment],
                  ),
                }),
              );
            });
          });
          describe('Down arrow', () => {
            test('calls handler with value -1 if value is greater than min', () => {
              const onChangeHandler =
                jest.fn<TimeInputSegmentChangeEventHandler>();
              const { input } = renderSegment({
                segment,
                value: formatter(12),
                onChange: onChangeHandler,
              });

              userEvent.type(input, '{arrowdown}');
              expect(onChangeHandler).toHaveBeenCalledWith(
                expect.objectContaining({ value: formatter(11) }),
              );
            });

            test('calls handler with max if value is undefined', () => {
              const onChangeHandler =
                jest.fn<TimeInputSegmentChangeEventHandler>();
              const { input } = renderSegment({
                segment,
                value: '',
                onChange: onChangeHandler,
              });

              userEvent.type(input, '{arrowdown}');
              expect(onChangeHandler).toHaveBeenCalledWith(
                expect.objectContaining({
                  value: formatter(
                    getDefaultMax({ is12HourFormat: true })[segment],
                  ),
                }),
              );
            });

            test('rolls value over to max value if value exceeds `min`', () => {
              const onChangeHandler =
                jest.fn<TimeInputSegmentChangeEventHandler>();
              const { input } = renderSegment({
                segment: 'minute',
                value: formatter(
                  getDefaultMin({ is12HourFormat: true })[segment],
                ),
                onChange: onChangeHandler,
              });

              userEvent.type(input, '{arrowdown}');
              expect(onChangeHandler).toHaveBeenCalledWith(
                expect.objectContaining({
                  value: formatter(
                    getDefaultMax({ is12HourFormat: true })[segment],
                  ),
                }),
              );
            });
          });
        },
      );
    });
  });
});
