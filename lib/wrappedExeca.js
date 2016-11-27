/**
 * @since 2016-11-27 17:57
 * @author vivaxy
 */

import execa from 'execa';

export default async(file, args) => {
    return await execa(file, args);
};
