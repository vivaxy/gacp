/**
 * @since 2017-03-18 10:56:54
 * @author vivaxy
 */

import babelFolder from '@vivaxy/babel-folder';

import { SOURCE_PATH, BUILD_PATH } from '../config';

export default async () => {
    return await babelFolder(SOURCE_PATH, BUILD_PATH);
};
