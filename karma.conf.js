/* eslint no-console: "off" */

const path = require('path');

const getTestFiles = (config) => {
  if (config.file) {
    return config.file.split(',');
  }

  return ['test/specs/index.js'];
};

module.exports = function karma(config) {
  const localBrowsers = ['Chrome'];
  const githubBrowsers = ['Chrome', 'Firefox'];

  let browsers;

  if (process.env.GITHUB_ACTIONS) {
    // This is a CI run on GitHub.

    console.log('Running on GitHub.');

    browsers = githubBrowsers;
  } else {
    // This is a local run.

    console.log('Running locally.');

    const localBrowsersEnv = process.env.KARMA_BROWSERS;

    browsers = localBrowsersEnv ? localBrowsersEnv.split(',') : localBrowsers;
  }

  config.set({
    browsers,
    concurrency: 1,

    files: getTestFiles(config),

    frameworks: [
      'mocha',
      'chai',
      'webpack',
    ],

    reporters: [
      'mocha',
      'coverage',
    ],

    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true,
    },

    client: {
      mocha: {
        timeout: 4000,
      },
    },

    autoWatch: true,
    singleRun: config.singleRun === 'true',

    preprocessors: {
      'test/**/*.+(js|jsx)': [
        'webpack',
        'sourcemap',
      ],
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: path.resolve(__dirname, 'node_modules'),
            use: [
              {
                loader: 'babel-loader',
              },
            ],
          },
          {
            test: /\.css$/,
            exclude: path.resolve(__dirname, 'node_modules'),
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[folder]-[name]--[local]',
                  },
                },
              },
            ],
          },
          {
            test: /\.css$/,
            include: path.resolve(__dirname, 'node_modules'),
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
              },
            ],
          },
          {
            test: /\.(png|jpg|svg)$/,
            type: 'asset/inline',
          },
        ],
      },
      resolve: {
        extensions: ['.js', '.jsx'],
      },
    },

    // Make webpack output less verbose.

    webpackMiddleware: {
      stats: {
        chunks: false,
      },
    },

    port: 9876,
    colors: true,

    // Code will have been instrumented via Babel and babel-plugin-istanbul
    // when NODE_ENV is 'test' (see .babelrc).

    coverageReporter: {
      type: 'json',
      dir: 'coverage/',
    },

    // Add middleware to fall back to the base path.
    // This allows running React Router with browser history.

    beforeMiddleware: ['fallbackMiddleware'],

    plugins: [
      ...config.plugins,

      {
        'middleware:fallbackMiddleware': ['factory', function create() {
          const contextPath = '/context.html';
          const debugPath = '/debug.html';

          return function fallback(req, res, next) {
            let basePath = null;

            if (req.url.startsWith(contextPath)) {
              basePath = contextPath;
            } else if (req.url.startsWith(debugPath)) {
              basePath = debugPath;
            }

            if (basePath) {
              const rest = req.url.substring(basePath.length);

              if (rest.indexOf('.') >= 0) {
                const parts = rest.split('/');
                const last = parts.pop();

                req.url = `/${last}`; // eslint-disable-line no-param-reassign
              } else {
                req.url = basePath; // eslint-disable-line no-param-reassign
              }
            }

            next();
          };
        }],
      },
    ],
  });
};
