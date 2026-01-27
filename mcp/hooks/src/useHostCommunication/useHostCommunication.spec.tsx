import { renderHook } from '@leafygreen-ui/testing-lib';

import { useHostCommunication } from './useHostCommunication';

jest.mock('@mcp-ui/server', () => ({
  postUIActionResult: jest.fn(),
  uiActionResultIntent: jest.fn((intent, data) => ({
    type: 'intent',
    intent,
    data,
  })),
  uiActionResultNotification: jest.fn(message => ({
    type: 'notification',
    message,
  })),
  uiActionResultPrompt: jest.fn(prompt => ({ type: 'prompt', prompt })),
  uiActionResultToolCall: jest.fn((tool, args) => ({
    type: 'tool',
    tool,
    args,
  })),
  uiActionResultLink: jest.fn(url => ({ type: 'link', url })),
}));

import {
  postUIActionResult,
  uiActionResultIntent,
  uiActionResultLink,
  uiActionResultNotification,
  uiActionResultPrompt,
  uiActionResultToolCall,
} from '@mcp-ui/server';

describe('mcp/hooks/useHostCommunication', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns all communication methods', () => {
    const { result } = renderHook(() => useHostCommunication());

    expect(result.current.intent).toBeInstanceOf(Function);
    expect(result.current.notify).toBeInstanceOf(Function);
    expect(result.current.prompt).toBeInstanceOf(Function);
    expect(result.current.tool).toBeInstanceOf(Function);
    expect(result.current.link).toBeInstanceOf(Function);
  });

  test('intent() creates and posts intent action', () => {
    const { result } = renderHook(() => useHostCommunication());

    result.current.intent('create-task', { title: 'Test' });

    expect(uiActionResultIntent).toHaveBeenCalledWith('create-task', {
      title: 'Test',
    });
    expect(postUIActionResult).toHaveBeenCalledWith({
      type: 'intent',
      intent: 'create-task',
      data: { title: 'Test' },
    });
  });

  test('notify() creates and posts notification action', () => {
    const { result } = renderHook(() => useHostCommunication());

    result.current.notify('Task created');

    expect(uiActionResultNotification).toHaveBeenCalledWith('Task created');
    expect(postUIActionResult).toHaveBeenCalledWith({
      type: 'notification',
      message: 'Task created',
    });
  });

  test('prompt() creates and posts prompt action', () => {
    const { result } = renderHook(() => useHostCommunication());

    result.current.prompt('What is your name?');

    expect(uiActionResultPrompt).toHaveBeenCalledWith('What is your name?');
    expect(postUIActionResult).toHaveBeenCalledWith({
      type: 'prompt',
      prompt: 'What is your name?',
    });
  });

  test('tool() creates and posts tool call action', () => {
    const { result } = renderHook(() => useHostCommunication());

    result.current.tool('search', { query: 'test' });

    expect(uiActionResultToolCall).toHaveBeenCalledWith('search', {
      query: 'test',
    });
    expect(postUIActionResult).toHaveBeenCalledWith({
      type: 'tool',
      tool: 'search',
      args: { query: 'test' },
    });
  });

  test('link() creates and posts link action', () => {
    const { result } = renderHook(() => useHostCommunication());

    result.current.link('https://example.com');

    expect(uiActionResultLink).toHaveBeenCalledWith('https://example.com');
    expect(postUIActionResult).toHaveBeenCalledWith({
      type: 'link',
      url: 'https://example.com',
    });
  });

  test('methods are memoized across rerenders', () => {
    const { result, rerender } = renderHook(() => useHostCommunication());

    const initialIntent = result.current.intent;
    const initialNotify = result.current.notify;

    rerender();

    expect(result.current.intent).toBe(initialIntent);
    expect(result.current.notify).toBe(initialNotify);
  });
});
