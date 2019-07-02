/**
 * @since 2016-11-22 16:16
 * @author vivaxy
 */

const chalk = require('chalk');
const figures = require('figures');
const { createLogger, levels } = require('log-util');

exports.command = createLogger(levels.info, chalk.yellow(figures.pointer));
