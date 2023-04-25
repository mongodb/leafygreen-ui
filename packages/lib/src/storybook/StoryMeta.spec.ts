import { storybookExcludedControlParams } from './storybookExcludedControlParams';
import { baseMeta, StoryMeta } from './StoryMeta';

describe('lib/StoryMeta', () => {
  test('defaults to the base', () => {
    const meta = StoryMeta();
    expect(meta.parameters.default).toEqual('Basic');
    expect(meta.argTypes).toStrictEqual(
      expect.objectContaining(baseMeta.argTypes),
    );
    expect(meta.parameters.controls.exclude).toStrictEqual(
      expect.arrayContaining(storybookExcludedControlParams),
    );
  });

  test('changes default name', () => {
    const meta = StoryMeta({
      parameters: {
        default: 'Demo',
      },
    });
    expect(meta.parameters.default).toEqual('Demo');
    expect(meta.argTypes).toStrictEqual(
      expect.objectContaining(baseMeta.argTypes),
    );
    expect(meta.parameters.controls.exclude).toStrictEqual(
      expect.arrayContaining(storybookExcludedControlParams),
    );
  });

  test('appends config objects', () => {
    const meta = StoryMeta({
      argTypes: {
        myProp: {
          control: 'boolean',
        },
      },
      parameters: {
        default: 'Demo',
        controls: {
          exclude: ['fooProp'],
        },
      },
    });

    expect(meta.parameters.default).toEqual('Demo');
    expect(meta.argTypes).toStrictEqual(
      expect.objectContaining({
        myProp: {
          control: 'boolean',
        },
        ...baseMeta.argTypes,
      }),
    );
    expect(meta.parameters.controls.exclude).toStrictEqual(
      expect.arrayContaining(['fooProp', ...storybookExcludedControlParams]),
    );
  });
});
