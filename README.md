# starter-kit

## Editor :

**_Editor config_**:

> create into root project directory .editorconfig file and add the configuration spacing that should be apply in the project

## NPM packages :

**Install _NodeJS:_ and Npm:**

> Install the LTS version for the plateforme that will be used (windows nvm-windows/linux nvm)

**Security scanning:**

> Audits are built into npm
>
> install snyk

---

## Development Web Server :

> **Express:** we use express as dev server to serve and test the app
>
> **localtunnel**: to share the app with others (client for example).

## Automation :

> **Npm Scripts:**
>
> - Declared in packages.json
> - Leverage your OS' command line
> - Directly use npm packages
> - Call separete Node scripts
> - Convention-based pre/post hooks
> - Leverage world's larget package manager
> - Better docs
> - Easy to learn
> - simple

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

> **TypeScript:**
>
> - Enhanced Autocomplete
> - Enhanced readability
> - Safer refactoring
> - Additional non-standard features

> **Babel:**
>
> - Write standarized JS
> - Leverage full JS Ecosystem
> - use experimental features earlier
> - No Type defs, annotaions required

### Setup:

> - **@babel/preset-env** : that allow you to use the latest JS without needing to micromenage

### Babel configuration style:

> **.babelrc**:
>
> - Not npm specific
> - Easier to read since isolated

> **packages.json**
>
> - One less file in your project

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

> **Plain JS:**
>
> - No waiting for transpile = faster
> - No transpiler dependency

> **Transpiled:**
>
> - Enjoy the latest features
> - Consistent coding style
> - Use the same linting rules everywhere
> - Can eventually remove transpiler

**.babelrc example**:

> **important:** start the script with babel-node

```json
{
  "presets": ["@babel/preset-env"],
  "env": {
    "production": {
      "presets": [
        "@babel/preset-env",
        {
          "targets": "> 0.25%, not dead"
        }
      ]
    }
  }
}
```
