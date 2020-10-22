import { cache, mqcss } from './';

test('mqcss output', () => {
  const className = mqcss`
  background-color: hotpink;
  text-align: center;
  width: ${[25, 50, 75, 100]}%;

  & .foo {
    color: ${['red', 'green', 'blue', 'darkorchid']};

    & img {
      height: ${[10, 15, 20]}px;
    }
  }
`;

  expect(cache.registered[className]).toMatchInlineSnapshot(`
    "
      background-color: hotpink;
      text-align: center;
      width: 100%;

      & .foo {
        color: darkorchid;

        & img {
          height: 20px;
        }
      }
    @media only screen and (max-width: 1024px){
      background-color: hotpink;
      text-align: center;
      width: 75%;

      & .foo {
        color: blue;

        & img {
          height: 20px;
        }
      }
    }@media only screen and (max-width: 768px){
      background-color: hotpink;
      text-align: center;
      width: 50%;

      & .foo {
        color: green;

        & img {
          height: 15px;
        }
      }
    }@media only screen and (max-width: 320px){
      background-color: hotpink;
      text-align: center;
      width: 25%;

      & .foo {
        color: red;

        & img {
          height: 10px;
        }
      }
    }"
  `);
});
