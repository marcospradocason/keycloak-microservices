"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
  throw err;
});

// Ensure environment variables are read.
require("../config/env");

const fs = require("fs");
const path = require('path');
const fsExtra = require('fs-extra');
const webpack = require("webpack");
const checkRequiredFiles = require("react-dev-utils/checkRequiredFiles");
const {
  createCompiler,
} = require("./WebpackDevServerUtils");
const paths = require("../config/paths");
const configFactory = require("../config/webpack.config");

const useYarn = fs.existsSync(paths.yarnLockFile);

// Warn and crash if required files are missing
// if (!checkRequiredFiles([
//   ...Object.values(paths.appHtml), 
//   ...Object.values(paths.appIndexJs)])
//   ) {
//   process.exit(1);
// }

const config = configFactory("development");
const appName = require(paths.appPackageJson).name;

const useTypeScript = fs.existsSync(paths.appTsConfig);
const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === "true";
// Create a webpack compiler that is configured with custom messages.
createCompiler({
  appName,
  config,
  devSocket: { errors: () => {}, warnings: () => {} },
  urls: {
    localUrlForTerminal: 'Only compiled'
  },
  useYarn,
  useTypeScript,
  tscCompileOnError,
  webpack,
}).watch({}, (err, stats) => {
  if (err) {
      console.error(err)
  }
  console.error(
      stats.toString({
          chunks: false,
          colors: true,
      })
  )

  if(err){
    return;
  }

  var themesDir = fs.readdirSync(paths.appBuild);
  for(const themeDir of themesDir){
    const jsDir = path.join(paths.appBuild, themeDir, 'js');
    if(fs.existsSync(jsDir)){
      fsExtra.copySync(
        path.join(paths.appBuild, themeDir, 'js'),
        path.join(paths.appBuild, themeDir, 'common', 'resources','js'),
      );
    }

    const cssDir = path.join(paths.appBuild, themeDir, 'css');
    if(fs.existsSync(cssDir)){
      fsExtra.copySync(
        cssDir,
        path.join(paths.appBuild, themeDir, 'common', 'resources','css'),
      )
    }
  }
});
