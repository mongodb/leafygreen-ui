import * as queries from '../../queries';

export type BoundFunction<T> = T extends (
  container: HTMLElement,
  ...args: infer P
) => infer R
  ? (...args: P) => R
  : never;

export type BoundFunctions<Q> = Q extends typeof queries
  ? {
      getByTestId<T extends HTMLElement = HTMLElement>(
        ...args: Parameters<BoundFunction<queries.GetByBoundAttribute<T>>>
      ): ReturnType<queries.GetByBoundAttribute<T>>;
      findByTestId<T extends HTMLElement = HTMLElement>(
        ...args: Parameters<BoundFunction<queries.FindByBoundAttribute<T>>>
      ): ReturnType<queries.FindByBoundAttribute<T>>;
    } & {
      [P in keyof Q]: BoundFunction<Q[P]>;
    }
  : {
      [P in keyof Q]: BoundFunction<Q[P]>;
    };

export type Query = (
  container: HTMLElement,
  ...args: Array<any>
) =>
  | Error
  | HTMLElement
  | Array<HTMLElement>
  | Promise<Array<HTMLElement>>
  | Promise<HTMLElement>
  | null;

export interface Queries {
  [T: string]: Query;
}

export function getQueriesForElement<
  QueriesToBind extends Queries = typeof queries,
  // Extra type parameter required for reassignment.
  T extends QueriesToBind = QueriesToBind,
>(element: HTMLElement, queriesToBind?: T): BoundFunctions<T>;
