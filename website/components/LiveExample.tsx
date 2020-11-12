import React from 'react';
import BadgeLiveExample from 'components/live-examples/BadgeLiveExample';
import BannerLiveExample from 'components/live-examples/BannerLiveExample';
import BoxLiveExample from 'components/live-examples/BoxLiveExample';
import ButtonLiveExample from 'components/live-examples/ButtonLiveExample';
import CalloutLiveExample from 'components/live-examples/CalloutLiveExample';
import CardLiveExample from 'components/live-examples/CardLiveExample';
import CheckboxLiveExample from 'components/live-examples/CheckboxLiveExample';
import CodeLiveExample from 'components/live-examples/CodeLiveExample';
import ConfirmationModalLiveExample from 'components/live-examples/ConfirmationModalLiveExample';
import CopyableLiveExample from 'components/live-examples/CopyableLiveExample';
import IconButtonLiveExample from 'components/live-examples/IconButtonLiveExample';
import IconLiveExample from 'components/live-examples/IconLiveExample';
import InlineDefinitionLiveExample from 'components/live-examples/InlineDefinitionLiveExample';
import LogoLiveExample from 'components/live-examples/LogoLiveExample';
import MarketingModalLiveExample from 'components/live-examples/MarketingModalLiveExample';
import MenuLiveExample from 'components/live-examples/MenuLiveExample';
import ModalLiveExample from 'components/live-examples/ModalLiveExample';
import MongoNavLiveExample from 'components/live-examples/MongoNavLiveExample';
import PaletteLiveExample from 'components/live-examples/PaletteLiveExample';
import PipelineLiveExample from 'components/live-examples/PipelineLiveExample';
import PopoverLiveExample from 'components/live-examples/PopoverLiveExample';
import PortalLiveExample from 'components/live-examples/PortalLiveExample';
import RadioBoxGroupLiveExample from 'components/live-examples/RadioBoxGroupLiveExample';
import RadioGroupLiveExample from 'components/live-examples/RadioGroupLiveExample';
import SideNavLiveExample from 'components/live-examples/SideNavLiveExample';
import StepperLiveExample from 'components/live-examples/StepperLiveExample';
import SyntaxLiveExample from 'components/live-examples/SyntaxLiveExample';
import TableLiveExample from 'components/live-examples/TableLiveExample';
import TabsLiveExample from 'components/live-examples/TabsLiveExample';
import TextAreaLiveExample from 'components/live-examples/TextAreaLiveExample';
import TextInputLiveExample from 'components/live-examples/TextInputLiveExample';
import ToastLiveExample from 'components/live-examples/ToastLiveExample';
import ToggleLiveExample from 'components/live-examples/ToggleLiveExample';
import TokensLiveExample from 'components/live-examples/TokensLiveExample';
import TooltipLiveExample from 'components/live-examples/TooltipLiveExample';
import TypographyLiveExample from 'components/live-examples/TypographyLiveExample';
import Components from 'utils/components';

const map: Record<Components, React.FC> = {
  badge: BadgeLiveExample,
  banner: BannerLiveExample,
  box: BoxLiveExample,
  button: ButtonLiveExample,
  callout: CalloutLiveExample,
  card: CardLiveExample,
  checkbox: CheckboxLiveExample,
  code: CodeLiveExample,
  ['confirmation-modal']: ConfirmationModalLiveExample,
  copyable: CopyableLiveExample,
  ['icon-button']: IconButtonLiveExample,
  icon: IconLiveExample,
  ['inline-definition']: InlineDefinitionLiveExample,
  logo: LogoLiveExample,
  ['marketing-modal']: MarketingModalLiveExample,
  menu: MenuLiveExample,
  modal: ModalLiveExample,
  ['mongo-nav']: MongoNavLiveExample,
  palette: PaletteLiveExample,
  pipeline: PipelineLiveExample,
  popover: PopoverLiveExample,
  portal: PortalLiveExample,
  ['radio-box-group']: RadioBoxGroupLiveExample,
  ['radio-group']: RadioGroupLiveExample,
  ['side-nav']: SideNavLiveExample,
  stepper: StepperLiveExample,
  syntax: SyntaxLiveExample,
  table: TableLiveExample,
  tabs: TabsLiveExample,
  ['text-area']: TextAreaLiveExample,
  ['text-input']: TextInputLiveExample,
  toast: ToastLiveExample,
  toggle: ToggleLiveExample,
  tokens: TokensLiveExample,
  tooltip: TooltipLiveExample,
  typography: TypographyLiveExample,
};

export default function LiveExample({ component }: { component: Components }) {
  const Component = map[component]; // Provide fallback if doesn't exist

  return <Component />;
}
