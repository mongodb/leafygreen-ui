exports.process = svg => {
  return `module.exports = ${JSON.stringify({ svg })};`;
};
