import { GetPopoverRenderModeProps, RenderMode } from '../Popover';

import { getPopoverRenderModeProps } from './getPopoverRenderModeProps';

const testProps = {
  dismissMode: 'auto',
  onToggle: jest.fn(),
  portalClassName: 'portal-class',
  portalContainer: document.createElement('div'),
  portalRef: { current: null },
  scrollContainer: document.createElement('div'),
} as Partial<GetPopoverRenderModeProps>;

describe('getPopoverRenderModeProps', () => {
  test(`should return only renderMode when renderMode is ${RenderMode.Inline}`, () => {
    const props = getPopoverRenderModeProps({
      ...testProps,
      renderMode: RenderMode.Inline,
    });

    expect(props).toEqual({ renderMode: RenderMode.Inline });
  });

  test(`should return portal related props when renderMode is ${RenderMode.Portal}`, () => {
    const props = getPopoverRenderModeProps({
      ...testProps,
      renderMode: RenderMode.Portal,
    });

    expect(props).toEqual({
      renderMode: RenderMode.Portal,
      portalClassName: testProps.portalClassName,
      portalContainer: testProps.portalContainer,
      portalRef: testProps.portalRef,
      scrollContainer: testProps.scrollContainer,
    });
  });

  test(`should return top layer related props when renderMode is ${RenderMode.TopLayer}`, () => {
    const props = getPopoverRenderModeProps({
      ...testProps,
      renderMode: RenderMode.TopLayer,
    });

    expect(props).toEqual({
      renderMode: RenderMode.TopLayer,
      dismissMode: testProps.dismissMode,
      onToggle: testProps.onToggle,
    });
  });
});
