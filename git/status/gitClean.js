/**
 * @since 2016-11-27 13:49
 * @author vivaxy
 */

import getInfoFromShell from '../../lib/getInfoFromShell';

export default getInfoFromShell(`git status -s`) === ``;
