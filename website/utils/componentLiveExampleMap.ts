import dynamic from 'next/dynamic';
const BadgeLiveExample = dynamic(() =>
  import('@leafygreen-ui/badge').then(mod => mod.BadgeLiveExample),
);
const BannerLiveExample = dynamic(() =>
  import('@leafygreen-ui/banner').then(mod => mod.BannerLiveExample),
);
const ButtonLiveExample = dynamic(() =>
  import('@leafygreen-ui/button').then(mod => mod.ButtonLiveExample),
);
const CalloutLiveExample = dynamic(() =>
  import('@leafygreen-ui/callout').then(mod => mod.CalloutLiveExample),
);
const CardLiveExample = dynamic(() =>
  import('@leafygreen-ui/card').then(mod => mod.CardLiveExample),
);
const CheckboxLiveExample = dynamic(() =>
  import('@leafygreen-ui/checkbox').then(mod => mod.CheckboxLiveExample),
);
const CodeLiveExample = dynamic(() =>
  import('@leafygreen-ui/code').then(mod => mod.CodeLiveExample),
);
const ConfirmationModalLiveExample = dynamic(() =>
  import('@leafygreen-ui/confirmation-modal').then(
    mod => mod.ConfirmationModalLiveExample,
  ),
);

const componentLiveExampleMap = {
  badge: BadgeLiveExample,
  banner: BannerLiveExample,
  button: ButtonLiveExample,
  callout: CalloutLiveExample,
  card: CardLiveExample,
  checkbox: CheckboxLiveExample,
  code: CodeLiveExample,
  ['confirmation-modal']: ConfirmationModalLiveExample,
};

export { componentLiveExampleMap };
