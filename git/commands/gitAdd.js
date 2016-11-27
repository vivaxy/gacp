/**
 * @since 2016-11-27 14:28
 * @author vivaxy
 */

import sh from 'shelljs';

import * as console from '../../lib/console';

export default () => {
    const addCommand = `git add .`;
    console.info(addCommand);
    sh.exec(addCommand);
};
