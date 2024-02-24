import { render } from './utils/testutils';

describe('tools/jest-matchers/.toBeLabelled', () => {
  test('unlabelled', () => {
    const { queryByTestId } = render(`
      <input type="text" data-testid="unlabelled" />
    `);
    expect(queryByTestId('unlabelled')).not.toBeLabelled();
  });

  test('`label` attribute', () => {
    const { queryByTestId } = render(`
      <input label="label" type="text" data-testid="labelled" />
    `);

    expect(queryByTestId('labelled')).toBeLabelled();
  });

  test('`aria-label` attribute', () => {
    const { queryByTestId } = render(`
      <input aria-label="label" type="text" data-testid="labelled" />
    `);

    expect(queryByTestId('labelled')).toBeLabelled();
  });

  test('`aria-labelledby` attribute', () => {
    const { queryByTestId } = render(`
      <label id="label-id">Text</label>
      <input aria-labelledby="label-id" type="text" data-testid="labelled" />
      <input aria-labelledby="invalid" type="text" data-testid="unlabelled" />
    `);

    expect(queryByTestId('labelled')).toBeLabelled();
    expect(queryByTestId('unlabelled')).not.toBeLabelled();
  });

  test('`for` attribute', () => {
    const { queryByTestId } = render(`
      <label for="input-id">Text</label>
      <input id="input-id" type="text" data-testid="labelled" />
      <input id="invalid" type="text" data-testid="unlabelled" />
    `);

    expect(queryByTestId('labelled')).toBeLabelled();
    expect(queryByTestId('unlabelled')).not.toBeLabelled();
  });
});
