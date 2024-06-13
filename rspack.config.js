const rspack = require('@rspack/core');
const ReactRefreshPlugin = require('@rspack/plugin-react-refresh');
const { resolve } = require('node:path');

/** @type {import('@rspack/cli').Configuration} */
const config = {
  entry: {
    main: './src/index.tsx',
  },
  resolve: {
    extensions: ['...', '.jsx', '.tsx', '.ts'],
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        include: resolve(__dirname, 'src'),
        /** @type {import('@rspack/core').RuleSetUse} */
        use: [
          {
            loader: 'builtin:swc-loader',
            /** @type {import('@rspack/core').SwcLoaderOptions} */
            options: {
              sourceMap: true,
              env: {
                targets: 'defaults and fully supports es6-module',
              },
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                  dynamicImport: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    refresh: true,
                    development: true,
                  },
                },
              },
            },
          },
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                ['babel-plugin-react-compiler', { runtimeModule: 'react-compiler-runtime' }], // must run first!
                ['@babel/plugin-syntax-typescript', { isTSX: true }],
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    new ReactRefreshPlugin(),
  ],
};

module.exports = config;
