/**
 * @since 2016-11-22 14:55
 * @author vivaxy
 */

import isAGitRepository from '../lib/isAGitRepository';
import * as console from '../lib/console';
import acp from '../lib/acp';
import richPromopt from '../lib/richPrompt';

export default async(...restArgs) => {
    if (!isAGitRepository()) {
        console.error(`not a git repository`);
        process.exit(1);
    }
    let commitMessage = null;
    if (restArgs.length === 0) {
        commitMessage = await richPromopt();
    } else {
        commitMessage = restArgs.join(` `);
    }
    acp(commitMessage);
};
