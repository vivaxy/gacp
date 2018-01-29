/**
 * @since 2016-11-22 16:16
 * @author vivaxy
 */

import chalk from 'chalk';
import logSymbols from 'log-symbols';

export const info = message => {
    console.log(chalk.blue(logSymbols.info), message);
};

export const error = message => {
    console.log(chalk.red(logSymbols.error), message);
};

export const command = command => {
    console.log('\n', chalk.yellow('>'), command, '\n');
};
