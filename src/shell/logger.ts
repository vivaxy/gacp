/**
 * @since 2016-11-22 16:16
 * @author vivaxy
 */
import chalk = require('chalk');
import * as figures from 'figures';
import { createLogger, levels } from 'log-util';

export const command = createLogger(levels.info, chalk.yellow(figures.pointer));
