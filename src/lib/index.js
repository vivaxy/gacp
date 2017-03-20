/**
 * @since 2016-11-22 13:29
 * @author vivaxy
 */

import 'babel-polyfill';

import yargs from 'yargs';
import index from '../commands/index';

const configureYargs = () => {
    return yargs
        .help()
        .version()
        .argv._;
};

configureYargs();
index().catch((ex) => {
    throw ex;
});
