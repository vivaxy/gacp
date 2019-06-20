/**
 * @since 2016-11-22 16:16
 * @author vivaxy
 */

const chalk = require('chalk');
const logSymbols = require('log-symbols');

exports.info = (message) => {
  console.log(chalk.blue(logSymbols.info), message);
};

exports.gacpError = (message) => {
  console.log(chalk.red(logSymbols.error), message);
};

exports.command = (command) => {
  console.log(chalk.yellow('>'), command);
};

exports.success = (message) => {
  console.log(chalk.green(logSymbols.success), message);
};

exports.uncaughtError = (error) => {
  console.log(chalk.red(error.message));
};
