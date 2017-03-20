/**
 * @since 2016-12-04 16:28
 * @author vivaxy
 */

import path from 'path';

// file => absolute
// filename => relative
// folder => absolute
// folderName => relative

export const SOURCE_FOLDER_NAME = 'src';
export const BUILD_FOLDER_NAME = 'build';
export const LOG_FILENAME = 'build.log';

export const PROJECT_BASE_FOLDER = path.join(__dirname, '..');
export const SOURCE_PATH = path.join(PROJECT_BASE_FOLDER, SOURCE_FOLDER_NAME);
export const BUILD_PATH = path.join(PROJECT_BASE_FOLDER, BUILD_FOLDER_NAME);
