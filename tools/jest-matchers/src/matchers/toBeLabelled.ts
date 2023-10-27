import { isNull } from 'lodash';

import { createMatcher } from '../utils/createMatcher';

const isValidString = (str: any): str is string =>
  str && typeof str === 'string' && str.length > 0;

/**
 * Returns whether the provided element has at least one of the following:
 * - a `label` attribute
 * - an `aria-label` attribute
 * - an `aria-labelledby` attribute with a valid associated element
 * - an associated element `<label>` element with the appropriate `for` attribute
 */
export const toBeLabelled = createMatcher(function _toBeLabelled(
  element: Element,
) {
  const label = element.getAttribute('label');
  const ariaLabel = element.getAttribute('aria-label');
  const ariaLabelledBy = element.getAttribute('aria-labelledby');
  const elementId = element.getAttribute('id');

  // If at least one...
  const hasStaticLabel = [label, ariaLabel].some(isValidString);

  const hasLabelReference = isValidString(ariaLabelledBy);
  const doesAriaLabelledByReferenceExist =
    hasLabelReference && !isNull(document.querySelector(`#${ariaLabelledBy}`));
  const hasLabelForId =
    elementId && !isNull(document.querySelector(`label[for="${elementId}"]`));

  const pass = Boolean(
    hasStaticLabel || doesAriaLabelledByReferenceExist || hasLabelForId,
  );

  const message = () => {
    if (!pass && hasLabelReference) {
      return this.isNot
        ? `Expected to not find element with id ${ariaLabelledBy}`
        : `Could not find element referenced by \`aria-labelledby\`` +
            document.body.innerHTML;
    }

    if (!pass && elementId) {
      return this.isNot
        ? `Expected not to find label for ${elementId}`
        : `Could not find a label for the element with id ${elementId}`;
    }

    return `Expected the element ${this.isNot ? 'not ' : ''}to have a label`;
  };

  return {
    pass,
    message,
  };
});
