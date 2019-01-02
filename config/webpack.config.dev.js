'use strict';

const fs = require('fs');
const path = require('path');
const resolve = require('resolve');
const webpack = require('webpack');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const getClientEnvironment = require('./env');
const paths = require('./paths');
const ManifestPlugin = require('webpack-manifest-plugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin-alt');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



const publicPath = '/';

const publicUrl = '';

const env = getClientEnvironment(publicUrl);


const routeEntries = {
    root: path.resolve(__dirname, '../src/js/index.js'),
    table: path.resolve(__dirname, '../src/js/components/List/List.js'),
    addForm: path.resolve(__dirname, '../src/js/components/AddWorkerForm/AddWorkerForm.js'),
    fireForm: path.resolve(__dirname, '../src/js/components/FireWorkerForm/FireWorkerForm.js'),
};



const cssRegex = /\.css$/;
const stylusRegex = /\.styl$/;

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    MiniCssExtractPlugin.loader,
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ],
      },
    },
  ];
  if (preProcessor) {
    loaders.push(require.resolve(preProcessor));
  }
  return loaders;
};

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    main: [require.resolve('react-dev-utils/webpackHotDevClient'), routeEntries.root],
    table: [require.resolve('react-dev-utils/webpackHotDevClient'), routeEntries.table],
  },
  output: {

    pathinfo: true,

    filename: 'static/js/[name].js',

    chunkFilename: 'static/js/[name].chunk.js',

    publicPath: publicPath,

    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  optimization: {

    splitChunks: {
      chunks: 'all',
      name: true,
      // cacheGroups: {
      //   commons: {
      //     name: 'commons',
      //     chunks: 'initial',
      //     minChunks: 2
      //   },
      //   default: false,
      //   vendors: false,
      // }
    },

    runtimeChunk: false,
  },
  resolve: {

    modules: [
        paths.appJs,
        paths.appFonts,
        paths.appComponents,
        'node_modules'].concat(

      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),

    // extensions: paths.moduleFileExtensions
    //   .map(ext => `.${ext}`)
      // .filter(ext => useTypeScript || !ext.includes('ts')),
    alias: {

      'react-native': 'react-native-web',
      'js' : paths.appJs,
      'fonts': paths.appFonts,
      'components': paths.appComponents
    },
    plugins: [
      // Adds support for installing with Plug'n'Play, leading to faster installs and adding
      // guards against forgotten dependencies and such.
      PnpWebpackPlugin,
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
  resolveLoader: {
    plugins: [
      // Also related to Plug'n'Play, but this time it tells Webpack to load its loaders
      // from the current package.
      PnpWebpackPlugin.moduleLoader(module),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [

      { parser: { requireEnsure: false } },

      {
        test: /\.(js|mjs|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: require.resolve('react-dev-utils/eslintFormatter'),
              eslintPath: require.resolve('eslint'),

            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {

        oneOf: [

          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },

          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve(
                'babel-preset-react-app/webpack-overrides'
              ),

              plugins: [
                [
                  require.resolve('babel-plugin-named-asset-import'),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
                      },
                    },
                  },
                ],
              ],

              cacheDirectory: true,
              cacheCompression: false,
            },
          },

          {
            test: /\.(js|mjs)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              presets: [
                [
                  require.resolve('babel-preset-react-app/dependencies'),
                  { helpers: true },
                ],
              ],
              cacheDirectory: true,
              cacheCompression: false,

              sourceMaps: false,
            },
          },
          // {
          //   test: cssRegex,
          //   exclude: cssModuleRegex,
          //   use: getStyleLoaders({
          //     importLoaders: 1,
          //   }),
          // },
          {
              test: stylusRegex,
              use: getStyleLoaders({ importLoaders: 2 }, 'stylus-loader', 'resolve-url-loader')
          },

          {
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /\.ttf$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css"
    }),

    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      title: 'Meow',
      chunks: ['main', 'table']
    }),

    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),

    new ModuleNotFoundPlugin(paths.appPath),

    new webpack.DefinePlugin(env.stringified),

    new webpack.HotModuleReplacementPlugin(),

    new CaseSensitivePathsPlugin(),

    new WatchMissingNodeModulesPlugin(paths.appNodeModules),

    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: publicPath,
    }),
  ].filter(Boolean),

  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  // Turn off performance processing because we utilize
  // our own hints via the FileSizeReporter
  performance: false,
};


