# starter-kit

## Editor :

**_Editor config_**:

create into root project directory .editorconfig file and add the configuration spacing that should be apply in the project

## NPM packages :

**Install _NodeJS:_ and Npm:**

Install the LTS version for the plateforme that will be used (windows nvm-windows/linux nvm)

**Security scanning:**

Audits are built into npm

install snyk

---

## Development Web Server :

**Express:** we use express as dev server to serve and test the app

**localtunnel**: to share the app with others (client for example).

## Automation :

**Npm Scripts:**

- Declared in packages.json
- Leverage your OS' command line
- Directly use npm packages
- Call separete Node scripts
- Convention-based pre/post hooks
- Leverage world's larget package manager
- Better docs
- Easy to learn
- simple

demo:

```json
"scripts": {
  "prestart": "node buildScripts/startMessage.js",
  "start": "node buildScripts/srcServer.js",
  "localtunnel": "lt --subdomain belgo --port 3000",
  "share": "npm-run-all --parallel start localtunnel"
}
```

## Transpiling : (Babel or TypeScript)

**Important:** _we can use babel to transpile typescript_

**TypeScript:**

- Enhanced Autocomplete
- Enhanced readability
- Safer refactoring
- Additional non-standard features

**Babel:**

- Write standarized JS
- Leverage full JS Ecosystem
- use experimental features earlier
- No Type defs, annotaions required

### Setup:

- **@babel/preset-env** : that allow you to use the latest JS without needing to micromenage

### Babel configuration style:

**.babelrc**:

- Not npm specific
- Easier to read since isolated

**packages.json**

- One less file in your project

Example:

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "babel": {
    // my babel config here
  }
}
```

### Build Script JS Style

**Plain JS:**

- No waiting for transpile = faster
- No transpiler dependency

**Transpiled:**

- Enjoy the latest features
- Consistent coding style
- Use the same linting rules everywhere
- Can eventually remove transpiler

**.babelrc example**:

**important:** start the script with babel-node

```json
{
  "presets": ["@babel/preset-env"],
  "env": {
    "production": {
      "presets": [
        "@babel/preset-env",
        {
          "targets": " 0.25%, not dead"
        }
      ]
    }
  }
}
```

# Bundling:

**Why Bundle:**

    - CommnJS doesn't work in web browsers
    - Package project into files
    - Improve Node performance

**5 module Formats:**

- IIFE (Immediatly invok function expression) **old**
- Asynchronous Module Definition (AMD) **old**
- Universal Module Definition (UMD) **old**
- CommonJS (CJS) **= nodejs**
- ES6 Modules **= es6 syntax**

**Why Use ES6 Modules?**

    - Standardized
    - Statically analyzable
      - Improved autocomplete
      - Itelligent refactoring
      - Fails fast
      - Tree shaking
    - Esay to read
      - Named imports
      - Default exports

## Choosing a Bundler:

- **REQUIRE.JS:**
  - First popular bundler
  - Utilizes and helped popularize AMD pattern

### Bundlers:

- **Browserify:** **_(Simple)_**
  - The First bundler to reach mass adoption
  - Bundle npm packages for the web
  - Large plugin ecosystem
- **Webpack:** **_(Comprehensive, Mature, Popular)_**
  - Bundle more than just JS
  - Import CSS, images, etc like JS
  - Built in hot-reloading web server
- **Rollup:** **_(Performant libraries)_**
  - Tree shaking
  - Faster loading production code
  - Great for library authors
- **Parcel:** **_(No config)_**
  - Logical defaults
  - Get started quickly
  - Code splitting
  - Asset bundling
  - Fast
- **Snowpack:** **_(Instant front-end builds)_**
  - Near instant startup
  - Instant refresh on save
  - Build once, cache forever
  - Built in support for TS, React, CSS, etc...
  - Plugin ecosystem
  - Frontend focused

**_Why Webpack?:_**

- Much more than just JS:

  - CSS
  - Images
  - Fonts
  - HTML

- Bundle splittinh
- Hot Module reloading

Setup **_webpack.config.dev.js_**:

```js
import path from "path";

export default {
  mode: "development",
  devtool: "eval-source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "src"),
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

### Configure webpack with express:

```js
import webpack from "webpack";
import config from "../webpack.config.dev.js";

const compiler = webpack(config);
app.use(
  require("webpack-dev-middleware")(compiler, {
    publicPath: config.output.publicPath,
  })
);
```

### Source Map:

- Maps code back to original source
- Part of our build
- Downloaded if you open developer tools **(So only downloaded when you need it!)**

# Linting:

**_Why Lint ?:_**

    - Enforce Consistency :
      - Curly brace position
      - confirm / alert
      - Trailing commas
      - Globals
      - eval
    - Avoid Mistakes
      - Extra parenthesis
      - Overwriting function
      - Assignement in conditional
      - Missing default case in switch
      - debugger / console.log

**Pick a Liner:**

- JSLint
- JSHint
- ESLint **(use this)**

**Core Decisions:**

1.  Config format?
    - Dedicated config file:
      - Not tied to npm
    - package.json:
      - One less file

Configuring ESLint via package.json example:

```json
{
  "name": "mypackage",
  "version": "0.0.1",
  "eslintConfig": {
    "plugins": ["exapmle"],
    "env": {
      "example/custom": true
    }
  }
}
```

2.  Which built-in rules?
    - look at documentation rules page
3.  Warnings or errors?
    - Warning
      - Can continue development
      - Can be ignored
      - Team must agree: Fix warnings
    - Error
      - Breaks the build
      - Cannot be ignored
      - Team is forced to comply
4.  Which plugins?

    - eslint-plugin-react
    - eslint-plugin-node
    - eslint-plugin-angular

5.  Use preset instead ?
    - From scratch **(New)**
    - Recommanded
    - Presets **(airbnb, standardJS)**

## Watching file with ESLint:

- **eslint-loader:**
  - Re-lints all files upon save.
- **eslint-watch**
  - ESLint wrapper that adds file watch
  - Not tied to webpack
  - Better warning/error formatting
  - Displays clean message
  - Esily lint tests and buid scripts too

### Linting Experimental Features:

    - Run ESLint directly
      - Support current JS features
    - Babel-eslint
      - Also lints experimental features

### Why Lint via an Automated Build Process?

    1.  One place to check
    2.  Universal configuration
    3.  Part of continuous integration

### DEMO

    setup ESLint:

    - ESLint Recommanded
    - eslint-watch

**eslintrc.json:**

```json
{
  "root": true,
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module"
  },
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  "rules": {}
}
```

# Testing and Continuous Integration:

    Unit Testing Decisions:

    1. Framework
      - Mocha
      - Jasmine
      - Tape
      - QUnit
      - AVA
      - Jest
    2. Assertion Library : **Declare what you expect**
      - **chai** / shouldJS, expect
    3. Helper Libraries
      - JSDOM
        - Simulate the browser's DOM
        - Run DOM-related tests without a browser
      - Cheerio
        - JQuery for the server
        - Query virtual DOM using JQuery selectors
    4. Where to run tests
      - Browser
        - Karma, Testem
      - Headless Browser
        - Headless Chrome
      - In-memory DOM
        - JSDOM **(use this)**
    5. Where to place tests
      - Centralized
        - Les "noise" in src folder
        - Deployment confusion
        - Inertia
      - Alongside **(use this)**
        - Easy imports
        - Clear visibility
        - Convenient to open
        - No recreating folder structure
        - Easy file moves
    6. When to run tests **(Unit Test Should Run When You Hit Save)**
      - Rapid feedback
      - Facilitates TDD
      - Automatic = Low friction
      - Increase test visibility

### Deference between Unit Test & Integration Tests

     - Unit Tests
       - Test a small unit
       - Often single function
       - Fast
       - Run upon save
     - Integration Tests
       - Test multiple units
       - Often involves clocking and waiting
       - Slow
       - Often run demand, or inQA

**testSetup.js:**

```js
// This file isn't transpiled, so must use CommonJS and ES5

// Register babel to transpile before our tests run.
require("@babel/register")();

// Disable webpack features that Mocha doesn't understand.
require.extensions[".css"] = function () {};
```

**First test with mocka & chai :**

```js
import { expect } from "chai";

describe("Our first test", () => {
  it("should pass", () => {
    expect(true).to.equal(true);
  });
});
```

**package.json:**

```json
{
  "test": "mocha --reporter progress buildScripts/testSetup.js \"src/**/*.test.js\""
}
```

**example dom test:**

```js
describe("index.html", () => {
  it("should say hello", () => {
    const index = fs.readFileSync("./src/index.html", "utf-8");
    const { JSDOM } = jsdom;
    const dom = new JSDOM(index);
    const h1 = dom.window.document.getElementsByTagName("h1")[0];

    expect(h1.innerHTML).to.equal("Hello");
    dom.window.close();
  });
});
```

## Continuous Integration:

    some reason why CI fail sometimes ?

    - Forgot to commit new file
    - Forgot to update package.json
    - Commit doesn't run cross-platform
    - Node version conflicts
    - Bad merge
    - Didn't run tests
    - Catch mistakes quickly

## What Does a CI Server DO ?

    - Run Automated build
    - Run your tests
    - Check code coverage
    - Automate deployment

Servers CI:

    - Travis (use this)
    - Appveyor (windows support)
    - Jenkins
    - circleci
    - semaphore
    - snapCI
