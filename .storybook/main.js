module.exports = {
  "stories": [
    "../**/*.story.mdx",
    "../**/*.story.@(js|jsx|ts|tsx)",
    "../**/*.stories.mdx",
    "../**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-knobs"
  ],
  "framework": "@storybook/react"
}