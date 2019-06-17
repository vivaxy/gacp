/**
 * @since 2016-11-22 13:29
 * @author vivaxy
 */
const yargs = require('yargs');
const updateNotifier = require('update-notifier');
const findUp = require('find-up');
const fs = require('fs');

const pkg = require('../package.json');
const index = require('../commands/index.js');

const configureYargs = () => {
  const configPath = findUp.sync(['.gacprc', '.gacprc.json']);
  const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : {};
  return yargs
    .options({
      push: {
        alias: 'p',
        describe: 'run git push',
        default: true,
      },
      emoji: {
        alias: 'e',
        describe: 'use emoji or code',
        choices: ['code', 'emoji'],
        default: 'code',
      },
    })
    .config(config)
    .help()
    .version().argv._;
};

configureYargs();
updateNotifier({ pkg }).notify();

const argv = yargs.argv;
index(argv).catch((ex) => {
  throw ex;
});
