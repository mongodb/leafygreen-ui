import createGlyphComponent from '../createGlyphComponent';
import { LGGlyph } from '../types';

// Glyphs
import ActivityFeed from './ActivityFeed.svg';
import ArrowDown from './ArrowDown.svg';
import ArrowLeft from './ArrowLeft.svg';
import ArrowRight from './ArrowRight.svg';
import ArrowUp from './ArrowUp.svg';
import Copy from './Copy.svg';
import Beaker from './Beaker.svg';
import Bell from './Bell.svg';
import Bulb from './Bulb.svg';
import Building from './Building.svg';
import CaretUp from './CaretUp.svg';
import CaretDown from './CaretDown.svg';
import CaretRight from './CaretRight.svg';
import CaretLeft from './CaretLeft.svg';
import Checkmark from './Checkmark.svg';
import CheckmarkWithCircle from './CheckmarkWithCircle.svg';
import ChevronUp from './ChevronUp.svg';
import ChevronDown from './ChevronDown.svg';
import ChevronRight from './ChevronRight.svg';
import ChevronLeft from './ChevronLeft.svg';
import Charts from './Charts.svg';
import Cloud from './Cloud.svg';
import CreditCard from './CreditCard.svg';
import Download from './Download.svg';
import Edit from './Edit.svg';
import Ellipsis from './Ellipsis.svg';
import Folder from './Folder.svg';
import GovernmentBuilding from './GovernmentBuilding.svg';
import ImportantWithCircle from './ImportantWithCircle.svg';
import InfoWithCircle from './InfoWithCircle.svg';
import InviteUser from './InviteUser.svg';
import Laptop from './Laptop.svg';
import Lock from './Lock.svg';
import MagnifyingGlass from './MagnifyingGlass.svg';
import Megaphone from './Megaphone.svg';
import Menu from './Menu.svg';
import NotAllowed from './NotAllowed.svg';
import OpenNewTab from './OpenNewTab.svg';
import Person from './Person.svg';
import PersonWithLock from './PersonWithLock.svg';
import Plus from './Plus.svg';
import PlusWithCircle from './PlusWithCircle.svg';
import QuestionMarkWithCircle from './QuestionMarkWithCircle.svg';
import Refresh from './Refresh.svg';
import Save from './Save.svg';
import Settings from './Settings.svg';
import SortAscending from './SortAscending.svg';
import SortDescending from './SortDescending.svg';
import Stitch from './Stitch.svg';
import Support from './Support.svg';
import Trash from './Trash.svg';
import University from './University.svg';
import Unsorted from './Unsorted.svg';
import UpDownCarets from './UpDownCarets.svg';
import VerticalEllipsis from './VerticalEllipsis.svg';
import Warning from './Warning.svg';
import X from './X.svg';
import XWithCircle from './XWithCircle.svg';

const glyphs = {
  ActivityFeed,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Copy,
  Beaker,
  Bell,
  Building,
  Bulb,
  CaretUp,
  CaretDown,
  CaretRight,
  CaretLeft,
  Checkmark,
  CheckmarkWithCircle,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Charts,
  Cloud,
  CreditCard,
  Download,
  Edit,
  Ellipsis,
  Folder,
  GovernmentBuilding,
  ImportantWithCircle,
  InfoWithCircle,
  InviteUser,
  Laptop,
  Lock,
  MagnifyingGlass,
  Megaphone,
  Menu,
  NotAllowed,
  OpenNewTab,
  Person,
  PersonWithLock,
  Plus,
  PlusWithCircle,
  QuestionMarkWithCircle,
  Refresh,
  Save,
  Settings,
  SortAscending,
  SortDescending,
  Stitch,
  Support,
  Trash,
  University,
  Unsorted,
  UpDownCarets,
  VerticalEllipsis,
  Warning,
  X,
  XWithCircle,
} as const;

type GlyphName = keyof typeof glyphs;

const glyphKeys = Object.keys(glyphs) as Array<GlyphName>;

const processedGlyphs = glyphKeys.reduce((acc, name) => {
  acc[name] = createGlyphComponent(name, glyphs[name]);

  return acc;
}, {} as Record<GlyphName, LGGlyph.Component>);

export default processedGlyphs;
