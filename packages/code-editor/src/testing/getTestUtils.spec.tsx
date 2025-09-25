import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { act } from '@leafygreen-ui/testing-lib';

import { CodeEditor, CodeEditorProps } from '../CodeEditor';

import { getTestUtils } from './getTestUtils';

// MutationObserver not supported in JSDOM
global.MutationObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  takeRecords: jest.fn().mockReturnValue([]),
}));

const DEFAULT_LGID = 'lg-code-editor';

const TestComponent = ({
  children,
  ...props
}: Partial<CodeEditorProps> & { children?: React.ReactNode }) => {
  return (
    <div>
      <h1>Code Editor</h1>
      <CodeEditor data-lgid={DEFAULT_LGID} {...props}>
        {children}
      </CodeEditor>
    </div>
  );
};

describe('getTestUtils', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.show = jest.fn(function mock(
      this: HTMLDialogElement,
    ) {
      this.open = true;
    });

    HTMLDialogElement.prototype.close = jest.fn(function mock(
      this: HTMLDialogElement,
    ) {
      this.open = false;
    });
  });

  test('`getEditor` returns correct element', async () => {
    await act(() => {
      render(<TestComponent />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    await utils.waitForLoadingToComplete();
    const editor = utils.getEditor();
    expect(editor).toBeInTheDocument();
  });

  test('`findEditor` returns correct element', async () => {
    await act(() => {
      render(<TestComponent />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    await utils.waitForLoadingToComplete();
    const editor = await utils.findEditor();
    expect(editor).toBeInTheDocument();
  });

  test('`queryEditor` returns correct element', async () => {
    await act(() => {
      render(<TestComponent />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    await utils.waitForLoadingToComplete();
    const editor = utils.queryEditor();
    expect(editor).toBeInTheDocument();
  });

  test('`queryEditor` returns `null` when editor is not present', async () => {
    render(<div />);
    const utils = getTestUtils(DEFAULT_LGID);
    await utils.waitForLoadingToComplete();
    const editor = utils.queryEditor();
    expect(editor).toBeNull();
  });

  test('`getCopyButton` returns correct element when appearance is "hover"', async () => {
    await act(() => {
      render(<TestComponent copyButtonAppearance="hover" />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    await utils.waitForLoadingToComplete();
    const copyButton = utils.getCopyButton();
    expect(copyButton).toBeInTheDocument();
  });

  test('`queryCopyButton` returns correct element when appearance is "hover"', async () => {
    await act(() => {
      render(<TestComponent copyButtonAppearance="hover" />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    await utils.waitForLoadingToComplete();
    const copyButton = utils.queryCopyButton();
    expect(copyButton).toBeInTheDocument();
  });

  test('`findCopyButton` returns correct element when appearance is "hover"', async () => {
    await act(() => {
      render(<TestComponent copyButtonAppearance="hover" />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    await utils.waitForLoadingToComplete();
    const copyButton = await utils.findCopyButton();
    expect(copyButton).toBeInTheDocument();
  });

  test('`getCopyButton` returns correct element when appearance is "persist"', async () => {
    await act(() => {
      render(<TestComponent copyButtonAppearance="persist" />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    await utils.waitForLoadingToComplete();
    const copyButton = utils.getCopyButton();
    expect(copyButton).toBeInTheDocument();
  });

  test('`findCopyButton` returns correct element when appearance is "persist"', async () => {
    await act(() => {
      render(<TestComponent copyButtonAppearance="persist" />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    await utils.waitForLoadingToComplete();
    const copyButton = await utils.findCopyButton();
    expect(copyButton).toBeInTheDocument();
  });

  test('`queryCopyButton` returns correct element when appearance is "persist"', async () => {
    await act(() => {
      render(<TestComponent copyButtonAppearance="persist" />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    await utils.waitForLoadingToComplete();
    const copyButton = utils.queryCopyButton();
    expect(copyButton).toBeInTheDocument();
  });

  test('`queryCopyButton` returns `null` when appearance is "none"', async () => {
    await act(() => {
      render(<TestComponent copyButtonAppearance="none" />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    await utils.waitForLoadingToComplete();
    const copyButton = utils.queryCopyButton();
    expect(copyButton).toBeNull();
  });

  describe('getPanelUtils', () => {
    test('`getPanelElement` returns correct element when panel is present', async () => {
      await act(() => {
        render(
          <TestComponent>
            <CodeEditor.Panel />
          </TestComponent>,
        );
      });
      const utils = getTestUtils(DEFAULT_LGID);
      const panelUtils = utils.getPanelUtils();
      await utils.waitForLoadingToComplete();
      expect(panelUtils.getPanelElement()).toBeInTheDocument();
    });

    test('`findPanelElement` returns correct element when panel is present', async () => {
      await act(() => {
        render(
          <TestComponent>
            <CodeEditor.Panel />
          </TestComponent>,
        );
      });
      const utils = getTestUtils(DEFAULT_LGID);
      const panelUtils = utils.getPanelUtils();
      await utils.waitForLoadingToComplete();
      const panelElement = await panelUtils.findPanelElement();
      expect(panelElement).toBeInTheDocument();
    });

    test('`queryPanelElement` returns correct element when panel is present', async () => {
      await act(() => {
        render(
          <TestComponent>
            <CodeEditor.Panel />
          </TestComponent>,
        );
      });
      const utils = getTestUtils(DEFAULT_LGID);
      const panelUtils = utils.getPanelUtils();
      await utils.waitForLoadingToComplete();
      expect(panelUtils.queryPanelElement()).toBeInTheDocument();
    });

    test('`queryPanelElement` returns `null` when panel is not present', async () => {
      await act(() => {
        render(<TestComponent />);
      });
      const utils = getTestUtils(DEFAULT_LGID);
      const panelUtils = utils.getPanelUtils();
      await utils.waitForLoadingToComplete();
      expect(panelUtils.queryPanelElement()).toBeNull();
    });

    test('`getFormatButton` returns correct element when format button is present', async () => {
      await act(() => {
        render(
          <TestComponent>
            <CodeEditor.Panel showFormatButton />
          </TestComponent>,
        );
      });
      const utils = getTestUtils(DEFAULT_LGID);
      const panelUtils = utils.getPanelUtils();
      await utils.waitForLoadingToComplete();
      expect(panelUtils.getFormatButton()).toBeInTheDocument();
    });

    test('`findFormatButton` returns correct element when format button is present', async () => {
      await act(() => {
        render(
          <TestComponent>
            <CodeEditor.Panel showFormatButton />
          </TestComponent>,
        );
      });
      const utils = getTestUtils(DEFAULT_LGID);
      const panelUtils = utils.getPanelUtils();
      await utils.waitForLoadingToComplete();
      const formatButton = await panelUtils.findFormatButton();
      expect(formatButton).toBeInTheDocument();
    });

    test('`queryFormatButton` returns correct element when format button is present', async () => {
      await act(() => {
        render(
          <TestComponent>
            <CodeEditor.Panel showFormatButton />
          </TestComponent>,
        );
      });
      const utils = getTestUtils(DEFAULT_LGID);
      const panelUtils = utils.getPanelUtils();
      await utils.waitForLoadingToComplete();
      expect(panelUtils.queryFormatButton()).toBeInTheDocument();
    });

    test('`queryFormatButton` returns `null` when format button is not present', async () => {
      await act(() => {
        render(
          <TestComponent>
            <CodeEditor.Panel showFormatButton={false} />
          </TestComponent>,
        );
      });
      const utils = getTestUtils(DEFAULT_LGID);
      const panelUtils = utils.getPanelUtils();
      await utils.waitForLoadingToComplete();
      expect(panelUtils.queryFormatButton()).toBeNull();
    });

    test('`getPanelCopyButton` returns correct element when copy button is present', async () => {
      await act(() => {
        render(
          <TestComponent>
            <CodeEditor.Panel showCopyButton />
          </TestComponent>,
        );
      });
      const utils = getTestUtils(DEFAULT_LGID);
      const panelUtils = utils.getPanelUtils();
      await utils.waitForLoadingToComplete();
      expect(panelUtils.getPanelCopyButton()).toBeInTheDocument();
    });

    test('`findPanelCopyButton` returns correct element when copy button is present', async () => {
      await act(() => {
        render(
          <TestComponent>
            <CodeEditor.Panel showCopyButton />
          </TestComponent>,
        );
      });
      const utils = getTestUtils(DEFAULT_LGID);
      const panelUtils = utils.getPanelUtils();
      await utils.waitForLoadingToComplete();
      const panelCopyButton = await panelUtils.findPanelCopyButton();
      expect(panelCopyButton).toBeInTheDocument();
    });

    test('`queryPanelCopyButton` returns correct element when copy button is present', async () => {
      await act(() => {
        render(
          <TestComponent>
            <CodeEditor.Panel showCopyButton />
          </TestComponent>,
        );
      });
      const utils = getTestUtils(DEFAULT_LGID);
      const panelUtils = utils.getPanelUtils();
      await utils.waitForLoadingToComplete();
      expect(panelUtils.queryPanelCopyButton()).toBeInTheDocument();
    });

    test('`queryPanelCopyButton` returns `null` when copy button is not present', async () => {
      await act(() => {
        render(
          <TestComponent>
            <CodeEditor.Panel showCopyButton={false} />
          </TestComponent>,
        );
      });
      const utils = getTestUtils(DEFAULT_LGID);
      const panelUtils = utils.getPanelUtils();
      await utils.waitForLoadingToComplete();
      expect(panelUtils.queryPanelCopyButton()).toBeNull();
    });

    test('`getSecondaryMenuButton` returns correct element when secondary menu button is present', async () => {
      await act(() => {
        render(
          <TestComponent>
            <CodeEditor.Panel showSecondaryMenuButton />
          </TestComponent>,
        );
      });
      const utils = getTestUtils(DEFAULT_LGID);
      const panelUtils = utils.getPanelUtils();
      await utils.waitForLoadingToComplete();
      expect(panelUtils.getSecondaryMenuButton()).toBeInTheDocument();
    });

    test('`findSecondaryMenuButton` returns correct element when secondary menu button is present', async () => {
      await act(() => {
        render(
          <TestComponent>
            <CodeEditor.Panel showSecondaryMenuButton />
          </TestComponent>,
        );
      });
      const utils = getTestUtils(DEFAULT_LGID);
      const panelUtils = utils.getPanelUtils();
      await utils.waitForLoadingToComplete();
      const secondaryMenuButton = await panelUtils.findSecondaryMenuButton();
      expect(secondaryMenuButton).toBeInTheDocument();
    });

    test('`querySecondaryMenuButton` returns correct element when secondary menu button is present', async () => {
      await act(() => {
        render(
          <TestComponent>
            <CodeEditor.Panel showSecondaryMenuButton />
          </TestComponent>,
        );
      });
      const utils = getTestUtils(DEFAULT_LGID);
      const panelUtils = utils.getPanelUtils();
      await utils.waitForLoadingToComplete();
      expect(panelUtils.querySecondaryMenuButton()).toBeInTheDocument();
    });

    test('`querySecondaryMenuButton` returns `null` when secondary menu button is not present', async () => {
      await act(() => {
        render(
          <TestComponent>
            <CodeEditor.Panel showSecondaryMenuButton={false} />
          </TestComponent>,
        );
      });
      const utils = getTestUtils(DEFAULT_LGID);
      const panelUtils = utils.getPanelUtils();
      await utils.waitForLoadingToComplete();
      expect(panelUtils.querySecondaryMenuButton()).toBeNull();
    });

    test('`getSecondaryMenu` returns correct element when secondary menu is present', async () => {
      await act(() => {
        render(
          <TestComponent>
            <CodeEditor.Panel showSecondaryMenuButton />
          </TestComponent>,
        );
      });
      const utils = getTestUtils(DEFAULT_LGID);
      const panelUtils = utils.getPanelUtils();
      await utils.waitForLoadingToComplete();
      await userEvent.click(panelUtils.getSecondaryMenuButton() as HTMLElement);
      await waitFor(() => {
        expect(panelUtils.getSecondaryMenuButton()).toBeInTheDocument();
      });
    });

    test('`findSecondaryMenu` returns correct element when secondary menu is present', async () => {
      await act(() => {
        render(
          <TestComponent>
            <CodeEditor.Panel showSecondaryMenuButton />
          </TestComponent>,
        );
      });
      const utils = getTestUtils(DEFAULT_LGID);
      const panelUtils = utils.getPanelUtils();
      await utils.waitForLoadingToComplete();
      await userEvent.click(panelUtils.getSecondaryMenuButton() as HTMLElement);
      await waitFor(() => {
        expect(panelUtils.getSecondaryMenu()).toBeInTheDocument();
      });
    });

    test('`querySecondaryMenu` returns correct element when secondary menu is present', async () => {
      await act(() => {
        render(
          <TestComponent>
            <CodeEditor.Panel showSecondaryMenuButton />
          </TestComponent>,
        );
      });
      const utils = getTestUtils(DEFAULT_LGID);
      const panelUtils = utils.getPanelUtils();
      await utils.waitForLoadingToComplete();
      await userEvent.click(panelUtils.getSecondaryMenuButton() as HTMLElement);
      await waitFor(() => {
        expect(panelUtils.getSecondaryMenu()).toBeInTheDocument();
      });
    });

    test('`querySecondaryMenu` returns `null` when secondary menu is not present', async () => {
      await act(() => {
        render(
          <TestComponent>
            <CodeEditor.Panel showSecondaryMenuButton={false} />
          </TestComponent>,
        );
      });
      const utils = getTestUtils(DEFAULT_LGID);
      const panelUtils = utils.getPanelUtils();
      await utils.waitForLoadingToComplete();
      expect(panelUtils.querySecondaryMenu()).toBeNull();
    });
  });
});
