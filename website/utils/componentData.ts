import { Component } from 'utils/types';

interface ComponentData {
  figmaLink?: string;
  metaTagDescription?: string;
}

const componentData: Partial<Record<Component, ComponentData>> = {
  [Component.Badge]: {
    metaTagDescription: 'Badges are great to highlight the state of something.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=5821%3A44825',
  },
  [Component.Banner]: {
    metaTagDescription:
      'Banners are a type of contextual notification, which can show information (blue), success (green), a warning (yellow), or danger (red).',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=5821%3A44400',
  },
  [Component.Button]: {
    metaTagDescription:
      'Buttons are a type of call to action (CTA) that can be either neutral (gray), affirmative (green), desctructive (red), or outlined for less emphasis.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=5313%3A26845',
  },
  [Component.Callout]: {
    metaTagDescription:
      'Callouts are great for calling out a tip, warning, or an important piece of information, to a customer in our docs.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=5821%3A44855',
  },
  [Component.Card]: {
    metaTagDescription:
      'Cards are a great way to emphasize and contain similar information together.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=5471%3A39129',
  },
  [Component.Checkbox]: {
    metaTagDescription:
      "Checkboxes are a type of form element that's great for presenting selectable options.",
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=5821%3A44058',
  },
  [Component.Code]: {
    metaTagDescription:
      'Code components are a great way to show snippets or reference code.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=5475%3A39133',
  },
  [Component.Combobox]: {
    metaTagDescription:
      'Comboboxes enable the user to select items from the list or enter a new value.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=7579%3A51225',
  },
  [Component.ConfirmationModal]: {
    metaTagDescription:
      'Modals are great way to add a speedbump before a user takes an action.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=5620%3A44056',
  },
  [Component.Copyable]: {
    metaTagDescription:
      'Copyables are great for presenting a single line string, like a serial number, that needs to be copied.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=5475%3A43535',
  },
  [Component.ExpandableCard]: {
    metaTagDescription:
      'Expandable Cards are useful when you want to toggle between hiding and showing large amount of content.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=7724%3A52717',
  },
  [Component.FormFooter]: {
    metaTagDescription:
      'Form Footers provide a standardized layout for displaying form errors and actions.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=7725%3A55511',
  },
  [Component.Icon]: {
    metaTagDescription:
      'Icons can work together with text, or can serve as a standalone straightforward way of communicating actions or information to a user.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=7%3A13274',
  },
  [Component.IconButton]: {
    metaTagDescription:
      'Icon buttons are great alternative to regular buttons. They allow the user to trigger an action via an icon and are less visually prominent than a button.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=5475%3A43824',
  },
  [Component.InlineDefinition]: {
    metaTagDescription:
      'Inline Definitions allow tooltips to display additional information on inline content.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=6384%3A45462',
  },
  [Component.Logo]: {
    metaTagDescription:
      'Logos are a great way to promote the MongoDB brands throughout our product ecosystem.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=3495%3A19095',
  },
  [Component.MarketingModal]: {
    metaTagDescription:
      "Marketing modals are a great way to showcase a new service or feature to the user, but make sure they'll be interested in it.",
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=5620%3A44640',
  },
  [Component.Menu]: {
    metaTagDescription:
      'Menus are the perfect component for presenting a set of actions to a user like “Edit”, “Delete”, or any number of other actions.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=5376%3A30635',
  },
  [Component.Modal]: {
    metaTagDescription:
      'Modals are great way to add a speedbump before a user takes an action.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=5620%3A39495',
  },
  [Component.Palette]: {
    metaTagDescription:
      "Palette features all of MondoDB's UI colors. These have been carefully crafter to align with our brands and accessibility constraints.",
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=4477%3A19388',
  },
  [Component.RadioBoxGroup]: {
    metaTagDescription:
      "Radio boxes are a type of form element. They're similar in function to radio inputs but larger, to add emphasis to a selection.",
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=5341%3A38167',
  },
  [Component.RadioGroup]: {
    metaTagDescription: 'Radio inputs are a type of form element.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=5821%3A43576',
  },
  [Component.SegmentedControl]: {
    metaTagDescription:
      'Segmented Controls are linear sets of two or more segments, each of which functions as a mutually exclusive button',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=6232%3A41248',
  },
  [Component.Select]: {
    metaTagDescription:
      'Select inputs are a a type of form element used to allow users to make a selection from a list of items.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=5341%3A34211',
  },
  [Component.SideNav]: {
    metaTagDescription:
      'This side navigation is used throughout the MongoDB product suite.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=6969%3A50533',
  },
  [Component.Stepper]: {
    metaTagDescription:
      'Steppers are a great way to show flow with several steps.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=5872%3A39741',
  },
  [Component.Table]: {
    metaTagDescription:
      'Tables are great way to show static, or non-editable, tabular data.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=6232%3A42867',
  },
  [Component.Tabs]: {
    metaTagDescription:
      'Tabs are a great way to separate content within a page.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=5475%3A43877',
  },
  [Component.TextArea]: {
    metaTagDescription:
      'Text areas are great to show an editable paragraph of text, or a long editable snippet of code.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=5341%3A33822',
  },
  [Component.TextInput]: {
    metaTagDescription:
      "Text inputs are a type of form element that's used to capture a string, like a user's first name or email.",
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=5341%3A31367',
  },
  [Component.Toast]: {
    metaTagDescription:
      'Toasts are a type of notification. They should be used fairly sparingly, since they animate and can become overwhelming to users if used to confirm every action. ',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=5821%3A44975',
  },
  [Component.Toggle]: {
    metaTagDescription:
      'Toggles are a great way to show something that can be turned on or off, like a feature, or whether to include certain data or not.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=5821%3A43347',
  },
  [Component.Tokens]: {
    metaTagDescription:
      'Tokens cover spacers, font family and grid breakpoints.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=9%3A4183',
  },
  [Component.Tooltip]: {
    metaTagDescription:
      'Tooltips should be used to show supplementary information only. They can be triggered when the user hovers over an element, say an info sprinkle or button. ',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=6378%3A45104',
  },
  [Component.Typography]: {
    metaTagDescription:
      'Typograpaphy covers everything you need to know to set type successfully in MongoDB products.',
    figmaLink:
      'https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=6321%3A42840',
  },
};

export default componentData;
