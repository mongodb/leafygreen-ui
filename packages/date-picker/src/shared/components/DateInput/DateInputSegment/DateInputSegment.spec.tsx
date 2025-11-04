import React from 'react';
import { jest } from '@jest/globals';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getValueFormatter } from '@leafygreen-ui/input-box';
import {
  InputBoxProvider,
  type InputBoxProviderProps,
} from '@leafygreen-ui/input-box';
import { Size } from '@leafygreen-ui/tokens';

import { charsPerSegment, defaultMax, defaultMin } from '../../../constants';
import {
  SharedDatePickerProvider,
  SharedDatePickerProviderProps,
} from '../../../context';
import { segmentRefsMock } from '../../../testutils';
import { DateSegment } from '../../../types';
import { DateInputBoxProvider } from '../DateInputBox/DateInputBoxContext';

import { DateInputSegmentChangeEventHandler } from './DateInputSegment.types';
import { DateInputSegment, type DateInputSegmentProps } from '.';

const renderSegment = ({
  props = {},
  sharedDatePickerProviderProps = {},
  inputBoxProviderProps = {},
}: {
  props?: Partial<DateInputSegmentProps>;
  sharedDatePickerProviderProps?: Partial<SharedDatePickerProviderProps>;
  inputBoxProviderProps?: Partial<InputBoxProviderProps<DateSegment>>;
}) => {
  const defaultSegmentProps = {
    value: '',
    onChange: () => {}, //TODO: remove this
    segment: 'day' as DateSegment,
  };

  const defaultInputBoxProviderProps = {
    onChange: () => {},
    onBlur: () => {},
    disabled: false,
    size: Size.Default,
    segmentRefs: segmentRefsMock,
    segments: {
      day: '',
      month: '',
      year: '',
    },
  };

  const result = render(
    <SharedDatePickerProvider label="label" {...sharedDatePickerProviderProps}>
      <InputBoxProvider
        charsPerSegment={charsPerSegment}
        segmentEnum={DateSegment}
        {...defaultInputBoxProviderProps}
        {...inputBoxProviderProps}
      >
        <DateInputBoxProvider>
          <DateInputSegment {...defaultSegmentProps} {...props} />
        </DateInputBoxProvider>
      </InputBoxProvider>
    </SharedDatePickerProvider>,
  );

  const rerenderSegment = ({
    newProps = {},
    newInputBoxProviderProps = {},
  }: {
    newProps?: Partial<DateInputSegmentProps>;
    newInputBoxProviderProps?: Partial<InputBoxProviderProps<DateSegment>>;
  }) =>
    result.rerender(
      <SharedDatePickerProvider
        label="label"
        {...sharedDatePickerProviderProps}
      >
        <InputBoxProvider
          charsPerSegment={charsPerSegment}
          segmentEnum={DateSegment}
          {...defaultInputBoxProviderProps}
          {...newInputBoxProviderProps}
        >
          <DateInputBoxProvider>
            <DateInputSegment
              {...defaultSegmentProps}
              {...props}
              {...newProps}
            />
          </DateInputBoxProvider>
        </InputBoxProvider>
        ,
      </SharedDatePickerProvider>,
    );

  const getInput = () =>
    result.getByTestId('lg-date_picker_input-segment') as HTMLInputElement;

  return {
    ...result,
    rerenderSegment,
    getInput,
    input: getInput(),
  };
};

describe('packages/date-picker/shared/date-input-segment', () => {
  const onChangeHandler = jest.fn<DateInputSegmentChangeEventHandler>();

  afterEach(() => {
    onChangeHandler.mockClear();
  });

  describe('rendering', () => {
    describe('day segment', () => {
      test('Rendering with undefined sets the value to empty string', () => {
        const { input } = renderSegment({ props: { segment: 'day' } });
        expect(input.value).toBe('');
      });

      test('Rendering with a value sets the input value', () => {
        const { input } = renderSegment({
          props: { segment: 'day' },
          inputBoxProviderProps: {
            segments: { day: '12', month: '', year: '' },
          },
        });
        expect(input.value).toBe('12');
      });

      test('rerendering updates the value', () => {
        const { getInput, rerenderSegment } = renderSegment({
          props: { segment: 'day' },
          inputBoxProviderProps: {
            segments: { day: '12', month: '', year: '' },
          },
        });

        rerenderSegment({
          newInputBoxProviderProps: {
            segments: { day: '08', month: '', year: '' },
          },
        });
        expect(getInput().value).toBe('08');
      });
    });

    describe('month segment', () => {
      test('Rendering with undefined sets the value to empty string', () => {
        const { input } = renderSegment({ props: { segment: 'month' } });
        expect(input.value).toBe('');
      });

      test('Rendering with a value sets the input value', () => {
        const { input } = renderSegment({
          props: { segment: 'month' },
          inputBoxProviderProps: {
            segments: { day: '', month: '26', year: '' },
          },
        });
        expect(input.value).toBe('26');
      });

      test('rerendering updates the value', () => {
        const { getInput, rerenderSegment } = renderSegment({
          props: { segment: 'month' },
          inputBoxProviderProps: {
            segments: { day: '', month: '26', year: '' },
          },
        });

        rerenderSegment({
          newInputBoxProviderProps: {
            segments: { day: '', month: '08', year: '' },
          },
        });
        expect(getInput().value).toBe('08');
      });
    });

    describe('year segment', () => {
      test('Rendering with undefined sets the value to empty string', () => {
        const { input } = renderSegment({ props: { segment: 'year' } });
        expect(input.value).toBe('');
      });

      test('Rendering with a value sets the input value', () => {
        const { input } = renderSegment({
          props: { segment: 'year' },
          inputBoxProviderProps: {
            segments: { day: '', month: '', year: '2023' },
          },
        });
        expect(input.value).toBe('2023');
      });

      test('rerendering updates the value', () => {
        const { getInput, rerenderSegment } = renderSegment({
          props: { segment: 'year' },
          inputBoxProviderProps: {
            segments: { day: '', month: '', year: '2023' },
          },
        });
        rerenderSegment({
          newInputBoxProviderProps: {
            segments: { day: '', month: '', year: '1993' },
          },
        });
        expect(getInput().value).toBe('1993');
      });
    });
  });

  describe('Keyboard', () => {
    describe('Arrow Keys', () => {
      describe('day input', () => {
        const formatter = getValueFormatter(charsPerSegment['day']);

        describe('Up arrow', () => {
          test('calls handler with value +1 if value is less than max', () => {
            const { input } = renderSegment({
              props: { segment: 'day' },
              inputBoxProviderProps: {
                segments: { day: formatter(15), month: '', year: '' },
                onChange: onChangeHandler,
              },
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(16) }),
            );
          });

          test('calls handler with min if value is undefined', () => {
            const { input } = renderSegment({
              props: { segment: 'day' },
              inputBoxProviderProps: {
                segments: { day: '', month: '', year: '' },
                onChange: onChangeHandler,
              },
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(defaultMin['day']) }),
            );
          });

          test('rolls value over to min value if value exceeds `max`', () => {
            const { input } = renderSegment({
              props: { segment: 'day' },
              inputBoxProviderProps: {
                segments: {
                  day: formatter(defaultMax['day']),
                  month: '',
                  year: '',
                },
                onChange: onChangeHandler,
              },
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(defaultMin['day']) }),
            );
          });
        });

        describe('Down arrow', () => {
          test('calls handler with value -1 if value is greater than min', () => {
            const { input } = renderSegment({
              props: { segment: 'day' },
              inputBoxProviderProps: {
                segments: { day: formatter(15), month: '', year: '' },
                onChange: onChangeHandler,
              },
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(14),
              }),
            );
          });

          test('calls handler with max if value is undefined', () => {
            const { input } = renderSegment({
              props: { segment: 'day' },
              inputBoxProviderProps: {
                segments: { day: '', month: '', year: '' },
                onChange: onChangeHandler,
              },
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(defaultMax['day']) }),
            );
          });

          test('rolls value over to max value if value is less than min', () => {
            const { input } = renderSegment({
              props: { segment: 'day' },
              inputBoxProviderProps: {
                segments: {
                  day: formatter(defaultMin['day']),
                  month: '',
                  year: '',
                },
                onChange: onChangeHandler,
              },
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({ value: formatter(defaultMax['day']) }),
            );
          });
        });
      });

      describe('month input', () => {
        const formatter = getValueFormatter(charsPerSegment['month']);

        describe('Up arrow', () => {
          test('calls handler with value +1 if value is less than max', () => {
            const { input } = renderSegment({
              props: { segment: 'month' },
              inputBoxProviderProps: {
                segments: { day: '', month: formatter(6), year: '' },
                onChange: onChangeHandler,
              },
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(7),
              }),
            );
          });

          test('calls handler with min if value is undefined', () => {
            const { input } = renderSegment({
              props: { segment: 'month' },
              inputBoxProviderProps: {
                segments: { day: '', month: '', year: '' },
                onChange: onChangeHandler,
              },
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMin['month']),
              }),
            );
          });

          test('rolls value over to min value if value exceeds max', () => {
            const { input } = renderSegment({
              props: { segment: 'month' },
              inputBoxProviderProps: {
                segments: {
                  day: '',
                  month: formatter(defaultMax['month']),
                  year: '',
                },
                onChange: onChangeHandler,
              },
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMin['month']),
              }),
            );
          });
        });

        describe('Down arrow', () => {
          test('calls handler with value -1 if value is greater than min', () => {
            const { input } = renderSegment({
              props: { segment: 'month' },
              inputBoxProviderProps: {
                segments: { day: '', month: formatter(6), year: '' },
                onChange: onChangeHandler,
              },
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(5),
              }),
            );
          });

          test('calls handler with max if value is undefined', () => {
            const { input } = renderSegment({
              props: { segment: 'month' },
              inputBoxProviderProps: {
                segments: { day: '', month: '', year: '' },
                onChange: onChangeHandler,
              },
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMax['month']),
              }),
            );
          });

          test('rolls value over to max value if value is less than min', () => {
            const { input } = renderSegment({
              props: { segment: 'month' },
              inputBoxProviderProps: {
                segments: {
                  day: '',
                  month: formatter(defaultMin['month']),
                  year: '',
                },
                onChange: onChangeHandler,
              },
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMax['month']),
              }),
            );
          });
        });
      });

      describe('year input', () => {
        const formatter = getValueFormatter(charsPerSegment['year']);

        describe('Up arrow', () => {
          test('calls handler with value +1 if value is less than max', () => {
            const { input } = renderSegment({
              props: { segment: 'year' },
              inputBoxProviderProps: {
                segments: { day: '', month: '', year: formatter(1993) },
                onChange: onChangeHandler,
              },
            });
            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(1994),
              }),
            );
          });

          test('calls handler with min if value is undefined', () => {
            const { input } = renderSegment({
              props: { segment: 'year' },
              inputBoxProviderProps: {
                segments: { day: '', month: '', year: '' },
                onChange: onChangeHandler,
              },
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMin['year']),
              }),
            );
          });

          test('does _not_ rollover if value exceeds max', () => {
            const { input } = renderSegment({
              props: { segment: 'year' },
              inputBoxProviderProps: {
                segments: {
                  day: '',
                  month: '',
                  year: formatter(defaultMax['year']),
                },
                onChange: onChangeHandler,
              },
            });

            userEvent.type(input, '{arrowup}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMax['year'] + 1),
              }),
            );
          });
        });

        describe('Down arrow', () => {
          test('calls handler with value -1 if value is greater than min', () => {
            const { input } = renderSegment({
              props: { segment: 'year' },
              inputBoxProviderProps: {
                segments: { day: '', month: '', year: formatter(1993) },
                onChange: onChangeHandler,
              },
            });
            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(1992),
              }),
            );
          });

          test('calls handler with max if value is undefined', () => {
            const { input } = renderSegment({
              props: { segment: 'year' },
              inputBoxProviderProps: {
                segments: { day: '', month: '', year: '' },
                onChange: onChangeHandler,
              },
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMax['year']),
              }),
            );
          });

          test('does _not_ rollover if value exceeds min', () => {
            const { input } = renderSegment({
              props: { segment: 'year' },
              inputBoxProviderProps: {
                segments: {
                  day: '',
                  month: '',
                  year: formatter(defaultMin['year']),
                },
                onChange: onChangeHandler,
              },
            });

            userEvent.type(input, '{arrowdown}');
            expect(onChangeHandler).toHaveBeenCalledWith(
              expect.objectContaining({
                value: formatter(defaultMin['year'] - 1),
              }),
            );
          });
        });
      });
    });
  });
});
