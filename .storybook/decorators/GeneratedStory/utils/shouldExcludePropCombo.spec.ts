import { GeneratedStoryConfig } from 'packages/lib/src/storybook/GeneratedStoryDecorator.types';
import { shouldExcludePropCombo } from './shouldExcludePropCombo';

describe('storybook/shouldExcludePropCombo', () => {
  describe('Mutually exclusive props', () => {
    const exclude: GeneratedStoryConfig<any>['excludeCombinations'] = [
      ['children', 'title'],
    ];

    test('same order', () => {
      expect(
        shouldExcludePropCombo<any>({
          exclude,
          propName: 'children',
          val: 'Lorem',
          props: {
            title: 'Ipsum',
          },
        }),
      ).toBeTruthy();
    });

    test('inverse order', () => {
      expect(
        shouldExcludePropCombo<any>({
          exclude,
          propName: 'title',
          val: 'Lorem',
          props: {
            children: 'Ipsum',
          },
        }),
      ).toBeTruthy();
    });
  });

  describe('Conditional props', () => {
    // Exclude the description prop if label is undefined
    const exclude: GeneratedStoryConfig<any>['excludeCombinations'] = [
      [
        'description',
        {
          label: undefined,
        },
      ],
    ];

    test('condition in props', () => {
      expect(
        shouldExcludePropCombo({
          exclude,
          propName: 'description',
          val: 'Lorem',
          props: {
            label: undefined,
          },
        }),
      ).toBeTruthy();
    });

    test('condition is current', () => {
      expect(
        shouldExcludePropCombo({
          exclude,
          propName: 'label',
          val: undefined,
          props: {
            description: 'Lorem',
          },
        }),
      ).toBeTruthy();
    });

    test('not satisfied', () => {
      expect(
        shouldExcludePropCombo({
          exclude,
          propName: 'description',
          val: 'Lorem',
          props: {
            label: 'Ipsum,',
          },
        }),
      ).toBeFalsy();
    });
  });

  describe('Specific combinations', () => {
    const exclude: GeneratedStoryConfig<any>['excludeCombinations'] = [
      {
        propA: 'lorem',
        propB: 'ipsum',
        propC: 'dolor',
      },
    ];

    test('Case A', () => {
      expect(
        shouldExcludePropCombo<any>({
          exclude,
          propName: 'propA',
          val: 'lorem',
          props: {
            propB: 'ipsum',
            propC: 'dolor',
          },
        }),
      ).toBeTruthy();
    });

    test('Case B', () => {
      expect(
        shouldExcludePropCombo<any>({
          exclude,
          propName: 'propB',
          val: 'ipsum',
          props: {
            propA: 'lorem',
            propC: 'dolor',
          },
        }),
      ).toBeTruthy();
    });

    test('Case C', () => {
      expect(
        shouldExcludePropCombo<any>({
          exclude,
          propName: 'propC',
          val: 'dolor',
          props: {
            propA: 'lorem',
            propB: 'ipsum',
          },
        }),
      ).toBeTruthy();
    });

    test('not satisfied', () => {
      expect(
        shouldExcludePropCombo<any>({
          exclude,
          propName: 'propC',
          val: 'something else',
          props: {
            propA: 'lorem',
            propB: 'ipsum',
          },
        }),
      ).toBeFalsy();
    });
  });
});
