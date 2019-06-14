/**
 * @since 2016-11-22 13:29
 * @author vivaxy
 */
const yargs = require('yargs');
const updateNotifier = require('update-notifier');

const pkg = require('../package.json');
const index = require('../commands/index.js');

const configureYargs = () => {
  return yargs
    .options({
      push: {
        alias: 'p',
        describe: 'run git push',
        default: true,
      },
      useEmoji: {
        alias: 'ue',
        describe: 'use emoji code',
        default: false,
      },
    })
    .help()
    .version().argv._;
};

configureYargs();
updateNotifier({ pkg }).notify();

const argv = yargs.argv;
index(argv).catch((ex) => {
  throw ex;
});
