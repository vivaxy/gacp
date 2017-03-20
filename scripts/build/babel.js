/**
 * @since 2017-03-18 10:56:54
 * @author vivaxy
 */

import path from 'path';

import glob from 'glob-promise';
import fsp from 'fs-promise';
import { transformFile } from 'babel-core';

import { SOURCE_PATH, BUILD_PATH } from '../config';

export default async() => {
    const sourceFiles = path.join(SOURCE_PATH, `**`, `*.js`);
    const files = await glob(sourceFiles);

    const transformJobs = files.map((file) => {
        return new Promise((resolve, reject) => {
            transformFile(file, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const relativeFilename = path.relative(SOURCE_PATH, file);
                    resolve({
                        relativeFilename,
                        ...result,
                    });
                }
            });
        });
    });

    const results = await Promise.all(transformJobs);

    const writeJobs = results.map(({ relativeFilename, code }) => {
        const outputFilename = path.join(BUILD_PATH, relativeFilename);
        return fsp.outputFile(outputFilename, code);
    });

    return await Promise.all(writeJobs);

};
