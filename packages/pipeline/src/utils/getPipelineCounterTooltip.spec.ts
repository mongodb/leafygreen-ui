import getPipelineCounterTooltip from './getPipelineCounterTooltip';

describe('packages/pipeline/utils/getPipelineCounterTooltip', () => {
  test(`returns the correct tooltip text when given "undefined"`, () => {
    const result = getPipelineCounterTooltip(undefined);
    expect(result).toEqual('');
  });

  test(`returns the correct tooltip text when given "null"`, () => {
    const result = getPipelineCounterTooltip(null);
    expect(result).toEqual('');
  });

  test(`returns the correct tooltip text when given a "string"`, () => {
    const result = getPipelineCounterTooltip('$one');
    expect(result).toEqual('$one');
  });

  test(`returns the correct tooltip text when given an "array" of "strings"`, () => {
    const result = getPipelineCounterTooltip(['$one', '$two', '$three']);
    expect(result).toEqual('$one > $two > $three');
  });
});
