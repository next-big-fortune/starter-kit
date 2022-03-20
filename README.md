# starter-kit

## Editor :

---

**_Editor config_**:

create into root project directory .editorconfig file and add the configuration spacing that should be apply in the project

---

## NPM packages :

---

**Install _NodeJS:_ and Npm:**

Install the LTS version for the plateforme that will be used (windows nvm-windows/linux nvm)

**Security scanning:**

Audits are built into npm

install snyk

---

## Development Web Server :

---

**Express:** we use express as dev server to serve and test the app

**localtunnel**: to share the app with others (client for example).

## Automation :

---

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

---

## Transpiling : (Babel or TypeScript)

---

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

---

- **@babel/preset-env** : that allow you to use the latest JS without needing to micromenage

### Babel configuration style:

---

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

---

### Build Script JS Style

---

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

---

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

---

- **REQUIRE.JS:**
  - First popular bundler
  - Utilizes and helped popularize AMD pattern

### Bundlers:

---

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

---

### Configure webpack with express:

---

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

---

### Source Map:

---

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

---

## Watching file with ESLint:

---

- **eslint-loader:**
  - Re-lints all files upon save.
- **eslint-watch**
  - ESLint wrapper that adds file watch
  - Not tied to webpack
  - Better warning/error formatting
  - Displays clean message
  - Esily lint tests and buid scripts too

### Linting Experimental Features:

---

    - Run ESLint directly
      - Support current JS features
    - Babel-eslint
      - Also lints experimental features

### Why Lint via an Automated Build Process?

---

    1.  One place to check
    2.  Universal configuration
    3.  Part of continuous integration

### DEMO

---

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

---

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

---

### Deference between Unit Test & Integration Tests

---

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

---

## Continuous Integration:

---

    some reason why CI fail sometimes ?

    - Forgot to commit new file
    - Forgot to update package.json
    - Commit doesn't run cross-platform
    - Node version conflicts
    - Bad merge
    - Didn't run tests
    - Catch mistakes quickly

## What Does a CI Server DO ?

---

    - Run Automated build
    - Run your tests
    - Check code coverage
    - Automate deployment

### Servers CI:

---

**Travis linux env (use this)**

```yml
language: node_js
node_js:
  - "14"
```

**Appveyor windows env (windows support)**

```yml
# Test against this version of Node.js
environment:
  matrix:
    # node.js
    - nodejs_version: "14"

# Install scripts. (runs after repo cloning)
install:
  # Get the latest stable version of Node.js or io.js
  - ps: Install-Product node $env:nodejs_version
  # install modules
  - npm install

# Post-install test scripts.
test_script:
  # Output usefull info for debugging.
  - node --version
  - npm --version
  # run tests
  - npm test

# Don't actually build.
build: off
```

    - Jenkins
    - circleci
    - semaphore
    - snapCI

---

# HTTP and Mock APIs

## HTTP Call Approches

**Node:**

- http
- request

**Browser**

- XMLHttpRequest
- JQuery
- Framework-based
- Fetch

**Node & Browser**

- isomorphic-fetch
- xhr
- SuperAgent
- Axios **(use this)**

---

## Centralizing HTTP Requests:

---

**1 Spot**

- Configure all calls
- Handle preloader logic
- Handle errors
- Single seam for mocking

**Demo**

**src/api/userApi.js**

```js
import "whatwg-fetch";

export function getUsers() {
  return get("users");
}

function get(url) {
  return fetch(url).then(onSuccess, onError);
}

function onSuccess(response) {
  return response.json();
}

function onError(error) {
  console.log(error); // eslint-disable-line no-console
}
```

**builScripts/srcServer**

```js
app.get("/users", (req, res) => {
  res.json([
    {
      id: 1,
      firstName: "Ayoub",
      lastName: "BELGHAR",
      email: "ayoub.belghar@gmail.com",
    },
    {
      id: 2,
      firstName: "Mooad",
      lastName: "BELGHAR",
      email: "moaad.belghar@gmail.com",
    },
    {
      id: 3,
      firstName: "Driss",
      lastName: "BELGHAR",
      email: "driss.belghar@gmail.com",
    },
  ]);
});
```

---

## Mocking:

---

### Why Mock HTTP ?:

- Unit Testing
- Instant response
- Keep working when services are down
- Avoid inter-team bottlenecks
- Work offline

---

### How to Mock HTTP ?

---

- Nock
- Static JSON
- Creare development webserver
  - api-mock
  - JSON server
  - JSON Schema faker
  - Browsersync
  - Express ect..

---

### Plan for Mocking HTTP

---

1. Declare our schema:

   - JSON Schema Faker

2. Generate Random Data:

   - faker.js
   - chance.js
   - randexp.js

Example :

**mockDataSchema.js**

```js
export const schema = {
  type: "object",
  properties: {
    users: {
      type: "array",
      minItems: 3,
      maxItems: 5,
      items: {
        type: "object",
        properties: {
          id: {
            type: "integer",

            minimum: 1,
          },
          firstName: {
            type: "string",
            faker: "name.firstName",
          },
          lastName: {
            type: "string",
            faker: "name.lastName",
          },
          email: {
            type: "string",
            faker: "internet.email",
          },
        },
        required: ["id", "firstName", "lastName", "email"],
      },
    },
  },
  required: ["users"],
};
```

3. Serve Data via API

   - JSON Server

**genereteData.js**

```js
/* eslint-disable import/named */
/*
  This script generates mock data for local development.
  This way you don't have to point to an acual API,
  but you can enjoy realistic, but randomized data,
  and rapide page loads due to local, static data.
 */

/* eslint-disable no-console */
import { generate, extend } from "json-schema-faker";
import { schema } from "./mockDataSchema";
import fs from "fs";
import chalk from "chalk";

// Extend JSF with the faker libs you want to you use
extend("faker", () => require("faker"));
const json = JSON.stringify(generate(schema));

fs.writeFile("./src/api/db.json", json, function (err) {
  if (err) {
    return console.log(chalk.red(err));
  } else {
    console.log(chalk.green("Mock data generated"));
  }
});
```

**package.json**

```json
{
  "generate-mock-data": "babel-node buildScripts/generateMockData",
  "prestart-mockapi": "npm run generate-mock-data",
  "start-mockapi": "json-server --watch src/api/db.json --port 3001"
}
```

**BaseUrl:**

```js
export default function getBaseUrl() {
  const inDevelopment = window.location.hostname === "localhost";
  return inDevelopment ? "http://localhost:3001/" : "/";
}
```

**userApi.js**

```js
function del(url) {
  const request = new Request(baseUrl() + url, {
    method: "DELETE",
  });
  return fetch(request).then(onSuccess, onError);
}
```

**srcServer.js**

```js
// Must use array.from to create a real array from A DOM colelction
// getElementsByClassname only returns an "array like" object

Array.from(global.document.getElementsByClassName("deleteUser"), (link) => {
  link.onclick = function (event) {
    const element = event.target;
    event.preventDefault();
    deleteUser(element.attributes["data-id"].value);
    const row = element.parentNode.parentNode;
    row.parentNode.removeChild(row);
  };
});
```

---

## Project Structure

---

### Why Include a Demo App?

- Example of:
  - Directory structure and file naming
  - Framework usage
  - Testing
  - Mock API
  - Automated deployment
- Codifies decisions
- Interactive example of working with starter

**Project structure Tips:**

- Put JS in a .js file
- Organize by feature
- Extract logic into "POJOs"

---

## Production build:

---

### Minification

- Shortens variables and function names
- Removes comments
- Removes whitespace and new lines
- Dead code elimination / Tree-shaking
- Debug via sourcemap

---

### Production webpack and dist Server

---

**webpack.config.prod.js**

```js
import path from "path";

export default {
  mode: "production",
  devtool: "source-map", // recommanded for production
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
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

**build.js**

```js
/* eslint-disable no-console */
import webpack from "webpack";
import webpackConfig from "../webpack.config.prod";
import chalk from "chalk";

process.env.NODE_ENV = "production";

console.log(
  chalk.blue(
    "Generating minified bundle for production. this will take a moment ..."
  )
);

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    // fatal error stop here
    console.log(chalk.red(err));
    return 1;
  }
  const jsonStats = stats.toJson();
  const { hasErrors, hasWarnings } = jsonStats;
  if (hasErrors) {
    return jsonStats.errors.map((error) => console.log(chalk.red(error)));
  }
  if (hasWarnings) {
    console.log(chalk.yellow("Webpack generated the following warnings: "));
    hasWarnings.map((warning) => console.log(chalk.yellow(warning)));
  }

  console.log(`Webpack stats: ${stats}`);

  // If we got this far, the build succeeded.
  console.log(
    chalk.green(
      "Your app  has been built for production and written into /dist"
    )
  );

  return 0;
});
```

Create a dist server:
**distServer.js**

```js
import express from "express";
import path from "path";
import open from "open";
import compression from "compression";

/* eslint-disable no-console */

const app = express();
const port = 3000;

app.use(compression());
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});
```

---

### Toggle Mock API:

---

**baseUrl.js**

```js
export default function getBaseUrl() {
  return getQueryStringParameterByName("useMockApi")
    ? "http://localhost:3001/"
    : "/";
}

function getQueryStringParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
```

---

### Production build npm:

---

**build scripts:**

```json
{
  "clean-dist": "rimraf ./dist && mkdir dist",
  "prebuild": "npm-run-all clean-dist test lint",
  "build": "babel-node buildScripts/build.js",
  "postbuild": "babel-node buildScripts/distServer.js"
}
```

> **if you encounter an error just remove the target object from .babelrc file**

---

### Dynamic HTML

---

**Why MAnipulate HTML for Production ?**

- Reference bundles automatically
- Handle dynamic bundle names
- Inject Production only resources
- Minify

## **Add webpack html plugin**

---

## Bundle Splitting

---

**Why Bundle Splitting ?**

- Speed initial page load
- Avoid re-downloading all libraries

**Demo**

> change the webpack.config.prod.js

```js
entry: {
    main: path.resolve(__dirname, "src/index"),
    vendor: path.resolve(__dirname, "src/vendor"),
  },
```

> add vendor.js file

```js
/* eslint-disable import/default */
/*
  Thie file contains references to the vendor libraries
  we're using in this project. This is used by webpack
  in the production build only*, A separate bundle for vendor
  code is useful since it's unlikely to change as often
  as the application's code. So all the libraries we reference
  here will be written to vendor.js so they can be
  cahced until one of them change. So basically, this avoids
  customers having to download a huge JS file anytime a line
  of code changes. They only have to download vendor.js when
  a vendor library changes which should less frequent.
  Any files that aren't referenced here will be bundled into
  main.js for production build.
*/

/* eslint-disable no-unused-vars */
import fetch from "whatwg-fetch";
```

---

## Cache Busting

---

**Why Bust Cache ?**

- Save HTTP Requests
- Force request for latest version

> **add [chunkhash]**

```js
filename: "[name].[chunkhash].js",
```

---

### Extract and Minify CSS

---

> **add Mini Css Extract Plugin into webpack prod file**
>
> **Replace style-loader for css by : [MiniCssExtractPlugin.loader, "css-loader"]**

```js
plugins: [
   new MiniCssExtractPlugin({
     filename: "[name].[chunkhash].css",
   }),
 ],
```

---

### Error Logging:

---

- TrackJS **(use this)**
- Sentry
- new Relic
- Raygun

**JS Error Logginh: What to look for ?**

- Error Metadata
  - Browser
  - Stack Trace
  - Previous actions
  - Custom API for enchanced tracking
- Notifications & integratons
- Analytics and filtering
- Pricing

**Setup TrackJS**

> **add variable to htmlWebpackPlugin that will be accecible into generated page**

```js
new HtmlWebpackPlugin({
      template: "src/index.html",
      // Properties you define here are available in index.html
      // using htmlWebpackPlugin.options.varName
      trackJSToken: "7b274d95c75b489382b37ed571c5272e",
    }),
```

> **add this condition with esjs into template html page to include the bug tracker just for production build**

```html
<% if(htmlWebpackPlugin.options.trackJSToken){ %>
<script src="https://cdn.trackjs.com/agent/v3/latest/t.js"></script>
<script>
  window.TrackJS &&
    TrackJS.install({
      token: "<%=htmlWebpackPlugin.options.trackJSToken%>",
      // for more configuration options, see https://docs.trackjs.com
    });
</script>
<% } %>
```

## Production Deploy

---

### Separating the UI from the API

---

1. Simple, low-risk, UI only deploys
2. Seperates concerns
   - Separate teams
   - Less to understand
   - Scale back-end separately
3. Cheap UI hosting
4. Serve UI via a content delivery network
5. Use the API tech you like

---

### Automated Deployment

---

**cloud hosting**

- Amazon web services
- Azure
- Heroku **(use this for api)**
- Firebase
- Google Cloud Platform
- Static Files:
  - surge **(use this for UI)**
  - github page
  - netlify

**Automated API Deploy on heroku**

> use the example app for api hosted on this repo : https://github.com/next-big-fortune/js-dev-env-demo-api

- **install heroku-cli**

- **login into heroku**
- **heroku create**
- **heroku git:remote -a 'name of created app'**
- **heroku push heroku master**

---

### Automated UI Deployment

---

**The Path to Production**

- npm start **(development)**
- npm run build **(production build)**
- npm run deploy **(production deploy)**

**DeMo**

> we use surge to deploy our UI

> **add deploy script into package.json with this command 'surge ./dist'**

---

### Update Approaches

---

- Yeoman **(generator)**
  - commit
  - Scaffoled over the existing project
  - Resolve conflicts manualy **(yeoman course on pluralsight)**
- Github
  1. Host on github
  2. Fork the starter kit for new project
  3. Pull changes from master
- npm
  1. Encapsulate kit in npm package
  2. Update npm package to receive latest

**What Can We centralize?**

| **item**                     | **Approach**                |
| ---------------------------- | --------------------------- |
| buildScripts                 | npm package                 |
| npm scripts in packages.json | Call scripts in npm package |
| webpack.config files         | npm package                 |
| .eslintrc                    | Create preset               |

**What Did we Centralize ?**

| **Centralized**         | **Decentralized**                    |
| ----------------------- | ------------------------------------ |
| buildScripts            | .editorconfig                        |
| Scripts in package.json | .babelrc                             |
| webpack.config          | CI config (.travis.yml Appveyor.yml) |
| .eslintrc               | Package references in package.json   |

---

## Inspiration:

---

**https://javascriptstuff.com/react-starter-projects**

- Development environment
- Boilerplate
- Starter kit
- Starter project
- Seed

### Challenge:

---

**Send a meeting invite to your team.**

- Would we benefit from a starter-kit ?
- What are our JS pain point ?
- Would we benefit from a demo app ?
