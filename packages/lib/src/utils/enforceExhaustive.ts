/**
 * Helper function to use the typechecker to catch when
 * not all cases of a type have been handled.
 *
 * Example 1:
 *   let color: 'red' | 'blue' | 'green';
 *   switch (color) {
 *      case 'red':
 *        ...
 *        break;
 *      case 'blue':
 *        ...
 *        break;
 *      default:
 *        enforceExhaustive(color);
 *                          ^^^^^
 *          Argument of type 'string' is not assignable to parameter of type 'never'.
 *   }
 *
 * Example 2:
 *   let key: number | string | symbol;
 *
 *   if (typeof key === 'string') {
 *     ...
 *     return;
 *   }
 *
 *   if (typeof key === 'number') {
 *      ...
 *      return;
 *   }
 *
 *   enforceExhaustive(key);
 *                     ^^^
 *     Argument of type 'symbol' is not assignable to parameter of type 'never'.
 */
export function enforceExhaustive(value: never): never {
  throw Error(`Received unhandled value: ${value}`);
}
