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
