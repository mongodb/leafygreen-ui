module.exports = {
  "stories": [
    "../**/*.story.@(mdx|js|jsx|ts|tsx)",
    "../**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-knobs"
  ],
  "framework": "@storybook/react"
}