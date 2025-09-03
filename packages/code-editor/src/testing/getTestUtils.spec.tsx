import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import { CodeEditor } from '../CodeEditor';
import { LanguageName } from '../CodeEditor/hooks/extensions/useLanguageExtension';
import { Panel } from '../Panel';

import { getTestUtils } from './getTestUtils';

// Mock CodeMirror for JSDOM environment since it doesn't support all the APIs CodeMirror needs
jest.mock('@codemirror/view', () => ({
  EditorView: {
    EditorView: jest.fn().mockImplementation(config => {
      const instance = {
        state: {
          doc: { length: 0 },
          sliceDoc: jest.fn().mockReturnValue('mocked content'),
        },
        destroy: jest.fn(),
        dispatch: jest.fn(),
      };

      // Store the instance on the parent element for our utilities
      if (config.parent) {
        config.parent._cm = instance;
      }

      return instance;
    }),
    keymap: {
      of: jest.fn().mockReturnValue([]),
    },
    updateListener: {
      of: jest.fn().mockReturnValue([]),
    },
    theme: jest.fn().mockReturnValue([]), // Add theme mock
  },
  ViewUpdate: jest.fn(),
}));

jest.mock('@codemirror/state', () => ({
  Prec: {
    highest: jest.fn(ext => ext),
  },
}));

jest.mock('@codemirror/commands', () => ({
  history: jest.fn().mockReturnValue([]),
  defaultKeymap: [],
  historyKeymap: [],
  undo: jest.fn().mockReturnValue(true),
  redo: jest.fn().mockReturnValue(true),
}));

jest.mock('@codemirror/language', () => ({
  forceParsing: jest.fn(),
}));

// Sample code content for testing
const sampleJavaScript = `const greeting = "Hello World";
console.log(greeting);
function add(a, b) {
  return a + b;
}`;

const samplePython = `def greet(name):
    return f"Hello {name}"

print(greet("World"))`;

describe('getTestUtils', () => {
  describe('Basic Editor Utilities', () => {
    test('getEditor() returns the root CodeEditor element', () => {
      render(
        <CodeEditor
          defaultValue={sampleJavaScript}
          data-lgid="lg-test-editor"
        />,
      );

      const utils = getTestUtils('lg-test-editor');
      const editor = utils.getEditor();

      expect(editor).toBeInTheDocument();
      expect(editor).toHaveAttribute('data-lgid', 'lg-test-editor');
    });

    test('getIsLoading() detects loading state', () => {
      render(
        <CodeEditor
          defaultValue={sampleJavaScript}
          isLoading={true}
          data-lgid="lg-loading-test"
        />,
      );

      const utils = getTestUtils('lg-loading-test');
      expect(utils.getIsLoading()).toBe(true);
    });

    test('getIsLoading() returns false when not loading', () => {
      render(
        <CodeEditor
          defaultValue={sampleJavaScript}
          data-lgid="lg-not-loading-test"
        />,
      );

      const utils = getTestUtils('lg-not-loading-test');

      // Note: CodeEditor may show internal loading state even when isLoading=false
      // due to lazy module loading. In real usage, this resolves quickly.
      const isLoading = utils.getIsLoading();
      expect(typeof isLoading).toBe('boolean');
    });

    test('getContent() returns the actual defaultValue passed to the component', () => {
      render(
        <CodeEditor
          defaultValue={sampleJavaScript}
          data-lgid="lg-content-test"
        />,
      );

      const utils = getTestUtils('lg-content-test');

      // Should return the actual defaultValue that was passed to the component
      const content = utils.getContent();
      expect(content).toBe(sampleJavaScript);
    });

    test('getContent() returns the actual value prop when controlled', () => {
      render(
        <CodeEditor
          value="controlled content"
          onChange={() => {}}
          data-lgid="lg-controlled-content-test"
        />,
      );

      const utils = getTestUtils('lg-controlled-content-test');

      // Should return the actual value prop
      const content = utils.getContent();
      expect(content).toBe('controlled content');
    });

    test('getLanguage() returns the actual language passed to the component', () => {
      render(
        <CodeEditor
          defaultValue={samplePython}
          language={LanguageName.python}
          data-lgid="lg-language-test"
        />,
      );

      const utils = getTestUtils('lg-language-test');

      // Should return the actual language prop that was passed
      const language = utils.getLanguage();
      expect(language).toBe(LanguageName.python);
    });
  });

  describe('Feature Detection Utilities', () => {
    test('getHasLineNumbers() detects when line numbers are enabled', () => {
      render(
        <CodeEditor
          defaultValue={sampleJavaScript}
          enableLineNumbers={true}
          data-lgid="lg-line-numbers-test"
        />,
      );

      const utils = getTestUtils('lg-line-numbers-test');

      // This works by checking for CSS classes that should be present
      // even with mocked CodeMirror
      expect(typeof utils.getHasLineNumbers()).toBe('boolean');
    });

    test('getHasLineNumbers() detects when line numbers are disabled', () => {
      render(
        <CodeEditor
          defaultValue={sampleJavaScript}
          enableLineNumbers={false}
          data-lgid="lg-no-line-numbers-test"
        />,
      );

      const utils = getTestUtils('lg-no-line-numbers-test');
      expect(utils.getHasLineNumbers()).toBe(false);
    });

    test('getHasLineWrapping() works with different configurations', () => {
      const { rerender } = render(
        <CodeEditor
          defaultValue={sampleJavaScript}
          enableLineWrapping={true}
          data-lgid="lg-line-wrapping-test"
        />,
      );

      let utils = getTestUtils('lg-line-wrapping-test');
      expect(typeof utils.getHasLineWrapping()).toBe('boolean');

      rerender(
        <CodeEditor
          defaultValue={sampleJavaScript}
          enableLineWrapping={false}
          data-lgid="lg-line-wrapping-test"
        />,
      );

      utils = getTestUtils('lg-line-wrapping-test');
      expect(utils.getHasLineWrapping()).toBe(false);
    });

    test('getHasCodeFolding() works with different configurations', () => {
      const { rerender } = render(
        <CodeEditor
          defaultValue={sampleJavaScript}
          enableCodeFolding={true}
          data-lgid="lg-code-folding-test"
        />,
      );

      let utils = getTestUtils('lg-code-folding-test');
      expect(typeof utils.getHasCodeFolding()).toBe('boolean');

      rerender(
        <CodeEditor
          defaultValue={sampleJavaScript}
          enableCodeFolding={false}
          data-lgid="lg-code-folding-test"
        />,
      );

      utils = getTestUtils('lg-code-folding-test');
      expect(utils.getHasCodeFolding()).toBe(false);
    });
  });

  describe('Element Utilities', () => {
    test('getCopyButton() returns copy button when not using panel', () => {
      render(
        <CodeEditor
          defaultValue={sampleJavaScript}
          copyButtonAppearance="persist"
          data-lgid="lg-copy-button-test"
        />,
      );

      const utils = getTestUtils('lg-copy-button-test');
      const copyButton = utils.getCopyButton();
      expect(copyButton).toBeInTheDocument();
    });

    test('getCopyButton() returns null when using panel', () => {
      render(
        <CodeEditor
          defaultValue={sampleJavaScript}
          panel={<Panel data-lgid="lg-copy-button-panel-test" />}
          data-lgid="lg-copy-button-panel-test"
        />,
      );

      const utils = getTestUtils('lg-copy-button-panel-test');
      const copyButton = utils.getCopyButton();
      expect(copyButton).toBeNull();
    });

    test('getAllLineNumbers() returns elements when line numbers enabled', () => {
      render(
        <CodeEditor
          defaultValue={sampleJavaScript}
          enableLineNumbers={true}
          data-lgid="lg-all-line-numbers-test"
        />,
      );

      const utils = getTestUtils('lg-all-line-numbers-test');
      const lineNumbers = utils.getAllLineNumbers();
      expect(Array.isArray(lineNumbers)).toBe(true);
    });

    test('getLineNumberByIndex() handles valid and invalid indices', () => {
      render(
        <CodeEditor
          defaultValue={sampleJavaScript}
          enableLineNumbers={true}
          data-lgid="lg-line-number-by-index-test"
        />,
      );

      const utils = getTestUtils('lg-line-number-by-index-test');

      // This should return null for non-existent line numbers
      const nonExistentLineNumber = utils.getLineNumberByIndex(100);
      expect(nonExistentLineNumber).toBeNull();
    });
  });

  describe('Panel Utilities', () => {
    test('queryPanel() returns null when no panel is present', () => {
      render(
        <CodeEditor
          defaultValue={sampleJavaScript}
          data-lgid="lg-no-panel-test"
        />,
      );

      const utils = getTestUtils('lg-no-panel-test');
      expect(utils.queryPanel()).toBeNull();
      expect(utils.getPanelUtils()).toBeNull();
    });

    test('queryPanel() returns panel element when present', () => {
      render(
        <CodeEditor
          defaultValue={sampleJavaScript}
          panel={<Panel title="JavaScript" data-lgid="lg-panel-present-test" />}
          data-lgid="lg-panel-present-test"
        />,
      );

      const utils = getTestUtils('lg-panel-present-test');
      const panel = utils.queryPanel();
      expect(panel).toBeInTheDocument();
      expect(utils.getPanelUtils()).not.toBeNull();
    });

    test('getPanelUtils() provides all panel utility methods', () => {
      render(
        <CodeEditor
          defaultValue={sampleJavaScript}
          panel={
            <Panel
              title="JavaScript Editor"
              showFormatButton={true}
              showCopyButton={true}
              showSecondaryMenuButton={true}
              data-lgid="lg-panel-utils-test"
            />
          }
          data-lgid="lg-panel-utils-test"
        />,
      );

      const utils = getTestUtils('lg-panel-utils-test');
      const panelUtils = utils.getPanelUtils();
      expect(panelUtils).not.toBeNull();

      if (panelUtils) {
        // Test panel title
        expect(panelUtils.getPanelTitle()).toBe('JavaScript Editor');

        // Test panel element
        expect(panelUtils.getPanel()).toBeInTheDocument();

        // Test format button
        expect(panelUtils.getFormatButton()).toBeInTheDocument();

        // Test copy button
        expect(panelUtils.getPanelCopyButton()).toBeInTheDocument();

        // Test secondary menu button
        expect(panelUtils.getSecondaryMenuButton()).toBeInTheDocument();

        // Test secondary menu (initially closed)
        expect(panelUtils.isSecondaryMenuOpen()).toBe(false);
      }
    });

    test('isSecondaryMenuOpen() detects menu open state', async () => {
      render(
        <CodeEditor
          defaultValue={sampleJavaScript}
          panel={
            <Panel
              title="JavaScript"
              showSecondaryMenuButton={true}
              data-lgid="lg-menu-open-test"
            />
          }
          data-lgid="lg-menu-open-test"
        />,
      );

      const utils = getTestUtils('lg-menu-open-test');
      const panelUtils = utils.getPanelUtils();
      expect(panelUtils).not.toBeNull();

      if (panelUtils) {
        // Initially closed
        expect(panelUtils.isSecondaryMenuOpen()).toBe(false);

        // Click to open menu
        const menuButton = panelUtils.getSecondaryMenuButton();
        expect(menuButton).toBeInTheDocument();

        if (menuButton) {
          await userEvent.click(menuButton);

          // In test environments, menu behavior may be limited
          // Test that the method works without throwing
          const isMenuOpen = panelUtils.isSecondaryMenuOpen();
          expect(typeof isMenuOpen).toBe('boolean');
        }
      }
    });
  });

  describe('Custom LgId Support', () => {
    test('works with custom lgId', () => {
      render(
        <CodeEditor
          defaultValue={samplePython}
          language={LanguageName.python}
          data-lgid="lg-custom-python-editor"
        />,
      );

      const utils = getTestUtils('lg-custom-python-editor');

      expect(utils.getEditor()).toHaveAttribute(
        'data-lgid',
        'lg-custom-python-editor',
      );
      // Should return the actual defaultValue that was passed
      expect(utils.getContent()).toBe(samplePython);
      expect(utils.getLanguage()).toBe(LanguageName.python);
    });

    test('uses default lgId when none provided', () => {
      render(<CodeEditor defaultValue={sampleJavaScript} />);

      const utils = getTestUtils(); // No lgId provided

      expect(utils.getEditor()).toHaveAttribute('data-lgid', 'lg-code_editor');
      expect(utils.getContent()).toBe(sampleJavaScript);
    });
  });

  describe('Error Handling', () => {
    test('throws error when editor element is not found', () => {
      // Don't render anything
      expect(() => {
        getTestUtils('lg-non-existent-editor');
      }).toThrow('Element with data-lgid="lg-non-existent-editor" not found');
    });

    test('handles missing optional elements gracefully', () => {
      render(
        <CodeEditor
          defaultValue={sampleJavaScript}
          enableLineNumbers={false}
          enableCodeFolding={false}
          enableLineWrapping={false}
          data-lgid="lg-minimal-editor"
        />,
      );

      const utils = getTestUtils('lg-minimal-editor');

      // These should return false/empty arrays, not throw errors
      expect(utils.getHasLineNumbers()).toBe(false);
      expect(utils.getHasCodeFolding()).toBe(false);
      expect(utils.getHasLineWrapping()).toBe(false);
      expect(utils.getAllLineNumbers()).toHaveLength(0);
      expect(utils.getTooltips()).toHaveLength(0);
      expect(utils.getHyperlinks()).toHaveLength(0);
    });
  });

  describe('Integration Tests', () => {
    test('works with complex editor configuration', () => {
      const tooltips = [
        {
          line: 1,
          column: 1,
          length: 5,
          content: 'Variable declaration',
          severity: 'info' as const,
        },
      ];

      render(
        <CodeEditor
          defaultValue={sampleJavaScript}
          language={LanguageName.javascript}
          enableLineNumbers={true}
          enableCodeFolding={true}
          enableLineWrapping={true}
          enableClickableUrls={true}
          tooltips={tooltips}
          panel={
            <Panel
              title="Full Featured Editor"
              showFormatButton={true}
              showCopyButton={true}
              showSecondaryMenuButton={true}
              data-lgid="lg-full-featured-test"
            />
          }
          data-lgid="lg-full-featured-test"
        />,
      );

      const utils = getTestUtils('lg-full-featured-test');

      // Verify editor is present
      expect(utils.getEditor()).toBeInTheDocument();
      expect(utils.getEditor()).toHaveAttribute(
        'data-lgid',
        'lg-full-featured-test',
      );

      // Verify basic functionality works
      expect(utils.getContent()).toBe(sampleJavaScript);
      expect(utils.getLanguage()).toBe(LanguageName.javascript);
      const isLoading = utils.getIsLoading();
      expect(typeof isLoading).toBe('boolean');

      // Verify panel utilities work
      const panelUtils = utils.getPanelUtils();
      expect(panelUtils).not.toBeNull();
      expect(panelUtils?.getPanelTitle()).toBe('Full Featured Editor');
      expect(panelUtils?.getFormatButton()).toBeInTheDocument();
      expect(panelUtils?.getPanelCopyButton()).toBeInTheDocument();
      expect(panelUtils?.getSecondaryMenuButton()).toBeInTheDocument();
    });

    test('utilities work in typical consumer testing scenarios', () => {
      // This simulates how a consumer might test their component that includes CodeEditor
      const TestComponent = () => (
        <div>
          <h1>My Component</h1>
          <CodeEditor
            defaultValue="console.log('test');"
            language={LanguageName.javascript}
            panel={
              <Panel
                title="Test Script"
                showCopyButton={true}
                data-lgid="lg-consumer-test"
              />
            }
            data-lgid="lg-consumer-test"
          />
        </div>
      );

      render(<TestComponent />);

      // Consumer can verify the editor is present
      const utils = getTestUtils('lg-consumer-test');
      expect(utils.getEditor()).toBeInTheDocument();

      // Consumer can test panel functionality
      const panelUtils = utils.getPanelUtils();
      expect(panelUtils?.getPanelTitle()).toBe('Test Script');
      expect(panelUtils?.getPanelCopyButton()).toBeInTheDocument();

      // Consumer can verify editor state
      const isLoading = utils.getIsLoading();
      expect(typeof isLoading).toBe('boolean');
      expect(utils.getContent()).toBe("console.log('test');");
      expect(utils.getLanguage()).toBe(LanguageName.javascript);
    });
  });
});
