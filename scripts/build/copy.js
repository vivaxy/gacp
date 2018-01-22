/**
 * @since 20180122 11:08
 * @author vivaxy
 */

import path from 'path';
import fse from 'fs-extra';

const files = ['configs/gitmojis.json'];
const projectRoot = path.join(__dirname, '..', '..');
const sourceRoot = path.join(projectRoot, 'src');
const buildRoot = path.join(projectRoot, 'build');

export default async() => {
    await Promise.all(files.map((file) => {
        return fse.copy(path.join(sourceRoot, file), path.join(buildRoot, file));
    }));
};
