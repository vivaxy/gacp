/**
 * @since 2016-11-27 17:57
 * @author vivaxy
 */

import execa from 'execa';

export default async(...args) => {
    return await new Promise((resolve, reject) => {
        execa(...args).then((result) => {
            resolve(result);
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
};
