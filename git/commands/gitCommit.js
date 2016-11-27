/**
 * @since 2016-11-27 14:28
 * @author vivaxy
 */

import sh from 'shelljs';

import * as console from '../../lib/console';

export default (commitMessage) => {
    const commitCommand = `git commit -m "${commitMessage}"`;
    console.info(commitCommand);
    sh.exec(commitCommand);
};
