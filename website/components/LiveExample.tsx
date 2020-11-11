import React from 'react';
import BadgeLiveExample from './live-examples/BadgeLiveExample';
import BannerLiveExample from './live-examples/BannerLiveExample';
import BoxLiveExample from './live-examples/BoxLiveExample';
import ButtonLiveExample from './live-examples/ButtonLiveExample';
import CalloutLiveExample from './live-examples/CalloutLiveExample';
import CardLiveExample from './live-examples/CardLiveExample';
import CheckboxLiveExample from './live-examples/CheckboxLiveExample';
import CodeLiveExample from './live-examples/CodeLiveExample';
import ConfirmationModalLiveExample from './live-examples/ConfirmationModalLiveExample';
import CopyableLiveExample from './live-examples/CopyableLiveExample';
import IconButtonLiveExample from './live-examples/IconButtonLiveExample';
import IconLiveExample from './live-examples/IconLiveExample';
import InlineDefinitionLiveExample from './live-examples/InlineDefinitionLiveExample';
import LogoLiveExample from './live-examples/LogoLiveExample';
import MarketingModalLiveExample from './live-examples/MarketingModalLiveExample';
import MenuLiveExample from './live-examples/MenuLiveExample';
import ModalLiveExample from './live-examples/ModalLiveExample';
import MongoNavLiveExample from './live-examples/MongoNavLiveExample';
import PaletteLiveExample from './live-examples/PaletteLiveExample';
import PipelineLiveExample from './live-examples/PipelineLiveExample';
import PopoverLiveExample from './live-examples/PopoverLiveExample';
import RadioBoxGroupLiveExample from './live-examples/RadioBoxGroupLiveExample';
import RadioGroupLiveExample from './live-examples/RadioGroupLiveExample';
import SideNavLiveExample from './live-examples/SideNavLiveExample';
import StepperLiveExample from './live-examples/StepperLiveExample';
import SyntaxLiveExample from './live-examples/SyntaxLiveExample';
import TableLiveExample from './live-examples/TableLiveExample';
import TabsLiveExample from './live-examples/TabsLiveExample';
import TextAreaLiveExample from './live-examples/TextAreaLiveExample';
import TextInputLiveExample from './live-examples/TextInputLiveExample';
import ToastLiveExample from './live-examples/ToastLiveExample';
import ToggleLiveExample from './live-examples/ToggleLiveExample';
import TooltipLiveExample from './live-examples/TooltipLiveExample';
import TypographyLiveExample from './live-examples/TypographyLiveExample';
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
  tooltip: TooltipLiveExample,
  typography: TypographyLiveExample,
};

export default function LiveExample({ component }: { component: string }) {
  const Component = map?.[component] ? map[component] : <div>hi</div>;

  return <Component />;
}
