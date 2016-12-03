/**
 * @since 2016-12-03 18:44
 * @author vivaxy
 */

import keypress from 'keypress';

const stdin = process.stdin;

const hijackCtrlC = (ch, key) => {
    if (key && key.ctrl && key.name === 'c') {
        process.exit(0);
    }
};

export default {
    pause: () => {
        keypress(stdin);
        stdin.setRawMode(true);
        stdin.resume();
        stdin.setEncoding('utf8');
        stdin.on('keypress', hijackCtrlC);
    },
    resume: () => {
        stdin.setRawMode(false);
        stdin.removeListener('keypress', hijackCtrlC);
    },
};
