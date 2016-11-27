/**
 * @since 2016-11-27 14:28
 * @author vivaxy
 */

import execa from '../../lib/wrappedExeca';

export default async(commitMessage) => {
    return await execa(`git`, [`commit`, `-m`, commitMessage]);
};
