import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { act } from '@leafygreen-ui/testing-lib';

import { CodeEditor, CodeEditorProps } from '../CodeEditor';
import { Panel } from '../Panel';

import { getTestUtils } from './getTestUtils';

// MutationObserver not supported in JSDOM
global.MutationObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  takeRecords: jest.fn().mockReturnValue([]),
}));

// Mock Modal component because HTMLDialogElement not supported in JSDOM
jest.mock('@leafygreen-ui/modal', () => {
  return function MockModal({ children, open, ...props }: any) {
    return open ? (
      <div data-testid="mock-modal" {...props}>
        {children}
      </div>
    ) : null;
  };
});

const DEFAULT_LGID = 'lg-code-editor';

const TestComponent = (props: Partial<CodeEditorProps>) => {
  return (
    <div>
      <h1>Code Editor</h1>
      <CodeEditor data-lgid={DEFAULT_LGID} {...props} />
    </div>
  );
};

describe('getTestUtils', () => {
  test('`getIsLoading` returns correct value when`waitForLoadingToComplete` resolves', async () => {
    // Not awaiting act because we want to test the loading state
    render(<TestComponent defaultValue="test" />);
    const utils = getTestUtils(DEFAULT_LGID);
    expect(utils.getIsLoading()).toBe(true);
    await utils.waitForLoadingToComplete();
    expect(utils.getIsLoading()).toBe(false);
  });

  test('`getContent` returns the correct content', async () => {
    await act(() => {
      render(<TestComponent defaultValue="test" />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    await utils.waitForLoadingToComplete();
    const content = await utils.getContent();
    expect(content).toBe('test');
  });

  test('`typeContent` types the correct text', async () => {
    await act(() => {
      render(<TestComponent />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    await utils.waitForLoadingToComplete();
    await act(async () => {
      await utils.typeContent('new content');
    });
    const content = await utils.getContent();
    expect(content).toBe('new content');
  });

  test('`getIsReadOnly` returns correct value when readOnly is true', async () => {
    await act(() => {
      render(<TestComponent readOnly />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    await utils.waitForLoadingToComplete();
    expect(utils.getIsReadOnly()).toBe(true);
  });

  test('`getIsReadOnly` returns correct value when readOnly is false', async () => {
    await act(() => {
      render(<TestComponent />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    await utils.waitForLoadingToComplete();
    expect(utils.getIsReadOnly()).toBe(false);
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

  test('`getCopyButton` returns correct element when appearance is "persist"', async () => {
    await act(() => {
      render(<TestComponent copyButtonAppearance="persist" />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    await utils.waitForLoadingToComplete();
    const copyButton = utils.getCopyButton();
    expect(copyButton).toBeInTheDocument();
  });

  test('`getCopyButton` returns `null` when appearance is "none"', async () => {
    await act(() => {
      render(<TestComponent copyButtonAppearance="none" />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    await utils.waitForLoadingToComplete();
    const copyButton = utils.getCopyButton();
    expect(copyButton).toBeNull();
  });

  test('`getPanelElement` returns correct element when panel is present', async () => {
    await act(() => {
      render(<TestComponent panel={<Panel />} />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    const panelUtils = utils.getPanelUtils();
    await utils.waitForLoadingToComplete();
    expect(panelUtils.getPanelElement()).toBeInTheDocument();
  });

  test('`getPanelElement` returns `null` when panel is not present', async () => {
    await act(() => {
      render(<TestComponent />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    const panelUtils = utils.getPanelUtils();
    await utils.waitForLoadingToComplete();
    expect(panelUtils.getPanelElement()).toBeNull();
  });

  test('`getPanelTitle` returns correct title when present', async () => {
    await act(() => {
      render(<TestComponent panel={<Panel title="Test Panel" />} />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    const panelUtils = utils.getPanelUtils();
    await utils.waitForLoadingToComplete();
    expect(panelUtils?.getPanelTitle()).toBe('Test Panel');
  });

  test('`getPanelTitle` returns `null` when panel is not present', async () => {
    await act(() => {
      render(<TestComponent />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    const panelUtils = utils.getPanelUtils();
    await utils.waitForLoadingToComplete();
    expect(panelUtils.getPanelTitle()).toBeNull();
  });

  test('`getPanelTitle` returns `null` when title is not present', async () => {
    await act(() => {
      render(<TestComponent panel={<Panel />} />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    const panelUtils = utils.getPanelUtils();
    await utils.waitForLoadingToComplete();
    expect(panelUtils.getPanelTitle()).toBeNull();
  });

  test('`getPanelFormatButton` returns correct element when format button is present', async () => {
    await act(() => {
      render(<TestComponent panel={<Panel showFormatButton />} />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    const panelUtils = utils.getPanelUtils();
    await utils.waitForLoadingToComplete();
    expect(panelUtils.getFormatButton()).toBeInTheDocument();
  });

  test('`getPanelFormatButton` returns `null` when format button is not present', async () => {
    await act(() => {
      render(<TestComponent panel={<Panel showFormatButton={false} />} />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    const panelUtils = utils.getPanelUtils();
    await utils.waitForLoadingToComplete();
    expect(panelUtils.getFormatButton()).toBeNull();
  });

  test('`getPanelCopyButton` returns correct element when copy button is present', async () => {
    await act(() => {
      render(<TestComponent panel={<Panel showCopyButton />} />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    const panelUtils = utils.getPanelUtils();
    await utils.waitForLoadingToComplete();
    expect(panelUtils.getPanelCopyButton()).toBeInTheDocument();
  });

  test('`getPanelCopyButton` returns `null` when copy button is not present', async () => {
    await act(() => {
      render(<TestComponent panel={<Panel showCopyButton={false} />} />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    const panelUtils = utils.getPanelUtils();
    await utils.waitForLoadingToComplete();
    expect(panelUtils.getPanelCopyButton()).toBeNull();
  });

  test('`getPanelSecondaryMenuButton` returns correct element when secondary menu button is present', async () => {
    await act(() => {
      render(<TestComponent panel={<Panel showSecondaryMenuButton />} />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    const panelUtils = utils.getPanelUtils();
    await utils.waitForLoadingToComplete();
    expect(panelUtils.getSecondaryMenuButton()).toBeInTheDocument();
  });

  test('`getPanelSecondaryMenuButton` returns `null` when secondary menu button is not present', async () => {
    await act(() => {
      render(
        <TestComponent panel={<Panel showSecondaryMenuButton={false} />} />,
      );
    });
    const utils = getTestUtils(DEFAULT_LGID);
    const panelUtils = utils.getPanelUtils();
    await utils.waitForLoadingToComplete();
    expect(panelUtils.getSecondaryMenuButton()).toBeNull();
  });

  test('`getPanelSecondaryMenu` returns correct element when secondary menu is present', async () => {
    await act(() => {
      render(<TestComponent panel={<Panel showSecondaryMenuButton />} />);
    });
    const utils = getTestUtils(DEFAULT_LGID);
    const panelUtils = utils.getPanelUtils();
    await utils.waitForLoadingToComplete();
    expect(panelUtils.getSecondaryMenu()).toBeNull();
    await userEvent.click(panelUtils.getSecondaryMenuButton() as HTMLElement);
    expect(panelUtils.getSecondaryMenu()).toBeInTheDocument();
  });
});
