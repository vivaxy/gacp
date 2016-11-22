/**
 * @since 2016-11-22 21:20
 * @author vivaxy
 */

import sh from 'shelljs';

import * as console from '../lib/console';
import getInfoFromShell from '../lib/getInfoFromShell';

const getRemote = () => {
    return getInfoFromShell(`git remote`);
};

const getBranch = () => {
    return getInfoFromShell(`git symbolic-ref --short HEAD`);
};

export default (commitMessage) => {
    const addCommand = `git add .`;
    console.info(addCommand);
    sh.exec(addCommand);
    const commitCommand = `git commit -m "${commitMessage}"`;
    console.info(commitCommand);
    sh.exec(commitCommand);
    const pushCommand = `git push ${getRemote()} ${getBranch()}`;
    console.info(pushCommand);
    sh.exec(pushCommand);
};
