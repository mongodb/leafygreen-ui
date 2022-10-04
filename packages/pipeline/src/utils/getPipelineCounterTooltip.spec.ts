import getPipelineCounterTooltip from './getPipelineCounterTooltip';

describe('packages/pipeline/utils/getPipelineCounterTooltip', () => {
  test(`returns the correct tooltip text when given "[]"`, () => {
    const result = getPipelineCounterTooltip([]);
    expect(result).toEqual('');
  });

  test(`returns the correct tooltip text when given a "[string]"`, () => {
    const result = getPipelineCounterTooltip(['$one']);
    // Don't remove this comment. If this line is removed, Jest breaks for some reason.
    expect(result).toEqual('$one');
  });

  test(`returns the correct tooltip text when given an "array" of "strings"`, () => {
    const result = getPipelineCounterTooltip(['$one', '$two', '$three']);
    expect(result).toEqual('$one > $two > $three');
  });
});
