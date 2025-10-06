const babelConfig = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-react'],
};

export default babelConfig;