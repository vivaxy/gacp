/**
 * @since 2016-11-22 13:29
 * @author vivaxy
 */

import path from 'path';
import { argv } from 'yargs';

import fileExists from '../lib/fileExists';

const allArgs = argv._;
const [command, ...restArgs] = allArgs;

const getCommandMethod = async(_command) => {
    const commandFile = path.join(__dirname, `..`, `commands`, `${_command}.js`);
    if (await fileExists(commandFile)) {
        return require(commandFile).default;
    } else {
        return null;
    }
};

const doIndex = async() => {
    const index = await getCommandMethod(`index`);
    return await index(...restArgs);
};

const doHelp = async() => {
    const help = await getCommandMethod(`help`);
    return await help(...restArgs);
};

const doCommand = async() => {
    const commandMethod = await getCommandMethod(command);
    if (commandMethod) {
        return await commandMethod(...restArgs);
    } else {
        return await doHelp();
    }
};

if (allArgs.length === 0) {
    doIndex();
} else {
    doCommand();
}
