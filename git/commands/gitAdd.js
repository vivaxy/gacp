/**
 * @since 2016-11-27 14:28
 * @author vivaxy
 */

import execa from '../../lib/wrappedExeca';

export default async() => {
    return await execa(`git`, [`add`, `.`]);
};
