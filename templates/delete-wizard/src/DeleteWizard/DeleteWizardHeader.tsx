import { CanvasHeader } from '@leafygreen-ui/canvas-header';
import { CompoundSubComponent } from '@leafygreen-ui/compound-component';

export const DeleteWizardHeaderKey = 'Header' as const;

/**
 * A wrapper around the {@link CanvasHeader} component for embedding into a DeleteWizard
 */
export const DeleteWizardHeader = CompoundSubComponent(CanvasHeader, {
  displayName: 'DeleteWizardHeader',
  key: DeleteWizardHeaderKey,
});
