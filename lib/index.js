/**
 * @since 2016-11-22 13:29
 * @author vivaxy
 */

import path from 'path';
import { argv } from 'yargs';
import sh from 'shelljs';

const [command, ...restCommand] = argv._;

const getCommandMethod = (_command) => {
    const commandFile = path.join(__dirname, `..`, `commands`, `${_command}.js`);
    if (sh.test(`-f`, commandFile)) {
        return require(commandFile).default;
    } else {
        return null;
    }
};

const commandMethod = getCommandMethod(command);
if (commandMethod) {
    commandMethod(...restCommand);
} else {
    const help = getCommandMethod(`help`);
    help();
}
