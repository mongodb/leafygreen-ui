import { type FormElements, type FormUtils } from '@lg-tools/test-harnesses';

type SelectElements = Omit<FormElements, 'getInput'>;
type SelectUtils = Omit<FormUtils, 'isValid' | 'getInputValue' | 'isOptional'>;

// TODO: move these to the test-harnesses package
export interface LGSelectTestUtilsReturnType {
  elements: SelectElements & {
    /**
     * Returns the `Select` trigger
     */
    getSelect: () => HTMLButtonElement;

    /**
     * Returns an array of `Select` options
     */
    getOptions: () => Array<HTMLLIElement>;

    /**
     * Returns an individual `Select` option
     */
    getOptionByValue: (value: string) => HTMLLIElement | null;

    getPopover: () => HTMLDivElement | null;
  };
  utils: SelectUtils & {
    /**
     * Returns the `Select` value
     */
    getSelectValue: () => string;

    /**
     * clicks on a `Select` option
     */
    clickOption: (value: string) => void;

    /**
     * clicks on the `Select` trigger
     */
    clickTrigger: () => void;
  };
}
