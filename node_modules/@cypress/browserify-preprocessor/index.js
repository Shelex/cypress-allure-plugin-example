'use strict'

const path = require('path')
const Promise = require('bluebird')
const fs = require('./fs')

const cloneDeep = require('lodash.clonedeep')
const browserify = require('browserify')
const watchify = require('watchify')

const debug = require('debug')('cypress:browserify')

const bundles = {}

// by default, we transform JavaScript (including some proposal features),
// JSX, & CoffeeScript
const defaultOptions = {
  browserifyOptions: {
    extensions: ['.js', '.jsx', '.coffee'],
    transform: [
      [
        require.resolve('coffeeify'),
        {},
      ],
      [
        require.resolve('babelify'),
        {
          ast: false,
          babelrc: false,
          plugins: [
            ...[
              'babel-plugin-add-module-exports',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
            ].map(require.resolve),
            [require.resolve('@babel/plugin-transform-runtime'), {
              absoluteRuntime: path.dirname(require.resolve('@babel/runtime/package')),
            }],
          ],
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ].map(require.resolve),
        },
      ],
    ],
    plugin: [],
  },
  watchifyOptions: {
    // ignore watching the following or the user's system can get bogged down
    // by watchers
    ignoreWatch: [
      '**/.git/**',
      '**/.nyc_output/**',
      '**/.sass-cache/**',
      '**/bower_components/**',
      '**/coverage/**',
      '**/node_modules/**',
    ],
  },
}

const getBrowserifyOptions = (entry, userBrowserifyOptions = {}) => {
  let browserifyOptions = cloneDeep(defaultOptions.browserifyOptions)

  // allow user to override default options
  browserifyOptions = Object.assign(browserifyOptions, userBrowserifyOptions, {
    // these must always be new objects or 'update' events will not fire
    cache: {},
    packageCache: {},
  })

  // unless user has explicitly turned off source map support, always enable it
  // so we can use it to point user to the source code
  if (userBrowserifyOptions.debug !== false) {
    browserifyOptions.debug = true
  }

  // we need to override and control entries
  Object.assign(browserifyOptions, {
    entries: [entry],
  })

  debug('browserifyOptions: %o', browserifyOptions)

  return browserifyOptions
}

// export a function that returns another function, making it easy for users
// to configure like so:
//
// on('file:preprocessor', browserify(options))
//
const preprocessor = (options = {}) => {
  debug('received user options: %o', options)

  // we return function that accepts the arguments provided by
  // the event 'file:preprocessor'
  //
  // this function will get called for the support file when a project is loaded
  // (if the support file is not disabled)
  // it will also get called for a spec file when that spec is requested by
  // the Cypress runner
  //
  // when running in the GUI, it will likely get called multiple times
  // with the same filePath, as the user could re-run the tests, causing
  // the supported file and spec file to be requested again
  return (file) => {
    const filePath = file.filePath

    debug('get:', filePath)

    // since this function can get called multiple times with the same
    // filePath, we return the cached bundle promise if we already have one
    // since we don't want or need to re-initiate browserify/watchify for it
    if (bundles[filePath]) {
      debug('already have bundle for:', filePath)

      return bundles[filePath]
    }

    // we're provided a default output path that lives alongside Cypress's
    // app data files so we don't have to worry about where to put the bundled
    // file on disk
    const outputPath = file.outputPath

    debug('input:', filePath)
    debug('output:', outputPath)

    const browserifyOptions = getBrowserifyOptions(filePath, options.browserifyOptions)
    const watchifyOptions = Object.assign({}, defaultOptions.watchifyOptions, options.watchifyOptions)

    const bundler = browserify(browserifyOptions)

    if (file.shouldWatch) {
      debug('watching')
      bundler.plugin(watchify, watchifyOptions)
    }

    // yield the bundle if onBundle is specified so the user can modify it
    // as need via `bundle.external()`, `bundle.plugin()`, etc
    const onBundle = options.onBundle

    if (typeof onBundle === 'function') {
      onBundle(bundler)
    }

    // this kicks off the bundling and wraps it up in a promise. the promise
    // is what is ultimately returned from this function
    // it resolves with the outputPath so Cypress knows where to serve
    // the file from
    const bundle = () => {
      return new Promise((resolve, reject) => {
        debug(`making bundle ${outputPath}`)

        const onError = (err) => {
          err.filePath = filePath
          // backup the original stack before its
          // potentially modified from bluebird
          err.originalStack = err.stack
          debug(`errored bundling: ${outputPath}`, err)
          reject(err)
        }

        const ws = fs.createWriteStream(outputPath)

        ws.on('finish', () => {
          debug('finished bundling:', outputPath)
          resolve(outputPath)
        })
        ws.on('error', onError)

        bundler
        .bundle()
        .on('error', onError)
        .pipe(ws)
      })
    }

    // when we're notified of an update via watchify, signal for Cypress to
    // rerun the spec
    bundler.on('update', () => {
      debug('update:', filePath)
      // we overwrite the cached bundle promise, so on subsequent invocations
      // it gets the latest bundle
      const bundlePromise = bundle().finally(() => {
        debug('- update finished for:', filePath)
        file.emit('rerun')
      })

      bundles[filePath] = bundlePromise
      // we suppress unhandled rejections so they don't bubble up to the
      // unhandledRejection handler and crash the app. Cypress will eventually
      // take care of the rejection when the file is requested
      bundlePromise.suppressUnhandledRejections()
    })

    const bundlePromise = fs
    .ensureDirAsync(path.dirname(outputPath))
    .then(bundle)

    // cache the bundle promise, so it can be returned if this function
    // is invoked again with the same filePath
    bundles[filePath] = bundlePromise

    // when the spec or project is closed, we need to clean up the cached
    // bundle promise and stop the watcher via `bundler.close()`
    file.on('close', () => {
      debug('close:', filePath)
      delete bundles[filePath]
      if (file.shouldWatch) {
        bundler.close()
      }
    })

    // return the promise, which will resolve with the outputPath or reject
    // with any error encountered
    return bundlePromise
  }
}

// provide a clone of the default options
preprocessor.defaultOptions = JSON.parse(JSON.stringify(defaultOptions))

module.exports = preprocessor
