// eslint-disable-next-line import/no-commonjs
const path = require('path');

// eslint-disable-next-line import/no-commonjs
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {},
  mini: {},
  h5: {},
  sass: {
    resource: [path.resolve(__dirname, '..', 'src/_mixin.scss')]
  },
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/common': path.resolve(__dirname, '..', 'src/common'),
    '@/custom-tab-bar': path.resolve(__dirname, '..', 'src/custom-tab-bar'),
    '@/api': path.resolve(__dirname, '..', 'src/api'),
    '@/lang': path.resolve(__dirname, '..', 'src/lang'),
    '@/pages': path.resolve(__dirname, '..', 'src/pages'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
  }
};
