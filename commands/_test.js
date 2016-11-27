/**
 * @since 2016-11-27 20:05
 * @author vivaxy
 */

import check from '../git/status/checkRemoteDiffer';

export default async() => {
    const r = await check();
    console.log(r);
};
