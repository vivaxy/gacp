/**
 * @since 2016-11-27 13:49
 * @author vivaxy
 */

import getInfoFromShell from './getInfoFromShell';

export default () => {
    return getInfoFromShell(`git status -s`) === ``;
};
