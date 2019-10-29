import { act } from 'react-dom/test-utils';

const observerMap = new Map();
const instanceMap = new Map();

function IntersectionObserver(cb, options) {
  const instance = {
    thresholds: Array.isArray(options.threshold)
      ? options.threshold
      : [options.threshold],
    root: options.root,
    rootMargin: options.rootMargin,
    observe: element => {
      instanceMap.set(element, instance);
      observerMap.set(element, cb);
    },
    unobserve: element => {
      instanceMap.delete(element);
      observerMap.delete(element);
    },
    disconnect: () => null,
  };

  return instance;
}

/**
 * Set the `isIntersecting` for the IntersectionObserver of a specific element.
 *
 * @param {HTMLElement} element
 * @param {boolean} isIntersecting
 */
function mockIsIntersecting(element, isIntersecting) {
  const cb = observerMap.get(element);

  if (cb) {
    const entry = [
      {
        isIntersecting,
        target: element,
        intersectionRatio: isIntersecting ? 1 : 0,
      },
    ];

    if (act) {
      act(() => cb(entry));
    } else {
      cb(entry); // eslint-disable-line callback-return
    }
  } else {
    throw new Error(
      'No IntersectionObserver instance found for element. Is it still mounted in the DOM?',
    );
  }
}

/**
 * Set the `isIntersecting` on all current IntersectionObserver instances
 *
 * @param {Boolean} isIntersecting
 */
function mockAllIsIntersecting(isIntersecting) {
  observerMap.forEach((onChange, element) => {
    mockIsIntersecting(element, isIntersecting);
  });
}

/**
 * Call the `intersectionMockInstance` method with an element, to get the (mocked)
 * `IntersectionObserver` instance. You can use this to spy on the `observe` and
 * `unobserve` methods.
 *
 * @param {HTMLElement} element
 * @return {Object} IntersectionObserver
 */
function intersectionMockInstance(element) {
  return instanceMap.get(element);
}

/**
 * Provide our mock implementation of the IntersectionObserver API to the window object
 **/
window.IntersectionObserver = jest
  .fn()
  .mockImplementation(IntersectionObserver);

export {
  IntersectionObserver,
  mockAllIsIntersecting,
  mockIsIntersecting,
  intersectionMockInstance,
  observerMap,
  instanceMap,
};
