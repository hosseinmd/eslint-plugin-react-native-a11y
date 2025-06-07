const defaultParserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true,
  },
};

export default function parserOptionsMapper({
  code,
  errors,
  options = [],
  output = null,
  parserOptions = {},
}) {
  return {
    code,
    errors,
    options,
    output,
    parserOptions: {
      ...defaultParserOptions,
      ...parserOptions,
    },
  };
}
