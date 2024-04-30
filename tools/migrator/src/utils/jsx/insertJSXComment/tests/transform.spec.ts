import { transformCheck } from '../../../../utils/tests/transformCheck';

transformCheck(__dirname, {
  fixture: 'insert-jsx-comment',
  transform: 'insert-jsx-comment',
  level: 1,
});
