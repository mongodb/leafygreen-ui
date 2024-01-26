/** */
export interface Descendant<E extends HTMLElement = HTMLElement> {
  index: number;
  element: E; // Could also be a RefObject
}

// /** TODO: improve this data structure */
export type DescendantsList<E extends HTMLElement = HTMLElement> = Array<
  Descendant<E>
>;

// export class DescendantsList<T extends HTMLElement = HTMLElement> {
//   array: Array<Descendant<T>>;

//   constructor() {
//     this.array = [];
//   }

//   public register(element: T, index: number) {
//     console.log('Registering', element.innerHTML, 'at index', index);

//     // Refine this
//     this.array.push({
//       element,
//       index,
//     });
//   }

//   public findIndexOf(needle: HTMLElement | null) {
//     return this.array.findIndex(item => item.element === needle);
//   }
// }
