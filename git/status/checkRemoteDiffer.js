/**
 * @since 2016-11-27 14:52
 * @author vivaxy
 */

import getInfoFromShell from '../../lib/getInfoFromShell';

export default async() => {
    return await getInfoFromShell(`git`, [`rev-list`, `--count`, `--left-only`, `@{u}...HEAD`]) !== `0`;
};
