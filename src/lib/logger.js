/**
 * @since 2016-11-22 16:16
 * @author vivaxy
 */

import chalk from 'chalk';
import logSymbols from 'log-symbols';

export const info = message => {
    console.log(chalk.blue(logSymbols.info), message);
};

export const gacpError = message => {
    console.log(chalk.red(logSymbols.error), message);
};

export const command = command => {
    console.log(chalk.yellow('>'), command);
};

export const success = message => {
    console.log(chalk.green(logSymbols.success), message);
};

export const uncaughtError = error => {
    console.log(chalk.red(error.stack));
};
