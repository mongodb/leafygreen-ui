import { codeSnippets } from './codeSnippets';
import { renderCodeEditor } from './testUtils';

export { codeSnippets, renderCodeEditor };

// Extension testing utilities
export {
  createComprehensiveFakeModules,
  createDefaultTestProps,
  createFakeAutoCompleteModule,
  createFakeExtension,
  createFakeHyperLinkModule,
  createFakeLanguageModule,
  createFakeLezerHighlightModule,
  createFakeLintModule,
  createFakeStateModule,
  createFakeViewModule,
  createLanguageModuleFactory,
  FakeCompartment,
} from './extensionTestUtils';
