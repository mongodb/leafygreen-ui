import { transformTest } from '../../../tests/transformTest';

transformTest(__dirname, {
  fixture: 'insert-jsx-comment',
  transform: 'insert-jsx-comment',
});
