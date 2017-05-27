/**
 * @since 2017-05-27 15:19:55
 * @author vivaxy
 */

const execa = require('execa');
const readline = require('readline');

// const std = execa('git', ['push']);
const std = execa('sh', ['./test/git/commands/prompt.sh']);

std.stdout.on('message', (msg) => {
    console.log('msg', msg);
});
