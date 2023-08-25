exports.process = svg => {
  return {
    code: `module.exports = ${JSON.stringify({ svg })};`,
  };
};
