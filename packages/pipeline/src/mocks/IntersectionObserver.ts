import { act } from 'react-dom/test-utils';
import { IntersectionOptions } from 'react-intersection-observer';

const observerMap = new Map();
const instanceMap = new Map();

function IntersectionObserver(
  cb: IntersectionObserverCallback,
  options: IntersectionOptions,
) {
  const instance = {
    thresholds: Array.isArray(options.threshold)
      ? options.threshold
      : [options.threshold],
    root: options.root,
    rootMargin: options.rootMargin,
    observe: (element: Element) => {
      instanceMap.set(element, instance);
      observerMap.set(element, cb);
    },
    unobserve: (element: Element) => {
      instanceMap.delete(element);
      observerMap.delete(element);
    },
    disconnect: () => null,
  };

  return instance;
}

/**
 * Set the `isIntersecting` on all current IntersectionObserver instances
 * @param isIntersecting {boolean}
 */
function mockAllIsIntersecting(isIntersecting: boolean) {
  observerMap.forEach((onChange, element) => {
    mockIsIntersecting(element, isIntersecting);
  });
}

/**
 * Set the `isIntersecting` for the IntersectionObserver of a specific element.
 * @param element {Element}
 * @param isIntersecting {boolean}
 */
function mockIsIntersecting(element: Element, isIntersecting: boolean) {
  const cb = observerMap.get(element);

  if (cb) {
    const entry = [
      {
        isIntersecting,
        target: element,
        intersectionRatio: isIntersecting ? 1 : 0,
      },
    ];
    if (act) act(() => cb(entry));
    else cb(entry);
  } else {
    throw new Error(
      'No IntersectionObserver instance found for element. Is it still mounted in the DOM?',
    );
  }
}

/**
 * Call the `intersectionMockInstance` method with an element, to get the (mocked)
 * `IntersectionObserver` instance. You can use this to spy on the `observe` and
 * `unobserve` methods.
 * @param element {Element}
 * @return IntersectionObserver
 */
function intersectionMockInstance(element: Element): IntersectionObserver {
  return instanceMap.get(element);
}

/**
 * Provide our mock implementation of the IntersectionObserver API to the window object
 **/
window.IntersectionObserver = jest
  .fn()
  .mockImplementation(IntersectionObserver);

export {
  instanceMap,
  intersectionMockInstance,
  IntersectionObserver,
  mockAllIsIntersecting,
  mockIsIntersecting,
  observerMap,
};
