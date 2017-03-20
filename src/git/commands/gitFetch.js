/**
 * @since 2016-11-27 20:07
 * @author vivaxy
 */

import execa from 'execa';

export default async() => {
    return await execa('git', ['fetch', '-p']);
};
