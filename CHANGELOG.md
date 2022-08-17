# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [3.0.3](https://github.com/vivaxy/gacp/compare/v3.0.2...v3.0.3) (2022-08-17)


### Bug Fixes

* :bug:  cannot push when multiple remotes ([002ecbd](https://github.com/vivaxy/gacp/commit/002ecbdef192439646103430b81dd8d6ae15374b)), closes [#92](https://github.com/vivaxy/gacp/issues/92)

### [3.0.2](https://github.com/vivaxy/gacp/compare/v3.0.1...v3.0.2) (2022-05-19)


### Bug Fixes

* :bug:  fix no-verify behaviour ([156c75b](https://github.com/vivaxy/gacp/commit/156c75bb7cc17398b6b285f2bfe22e2b50479d0e)), closes [#124](https://github.com/vivaxy/gacp/issues/124)

### [3.0.1](https://github.com/vivaxy/gacp/compare/v3.0.0...v3.0.1) (2022-05-05)


### Bug Fixes

* :bug:  revert default emoji config from none to code ([3000e9e](https://github.com/vivaxy/gacp/commit/3000e9e79e5caa8fe815ae8d7f4c1cbad4bfe625))

## [3.0.0](https://github.com/vivaxy/gacp/compare/v2.10.2...v3.0.0) (2022-05-04)


### ⚠ BREAKING CHANGES

* set gitmoji disabled by default. closes: #118
* gacp no longer push tags. closes #123

### Features

*  support disable gitmoji ([0b9e9dd](https://github.com/vivaxy/gacp/commit/0b9e9dd048e42e4f2e92c8097c49a78c6f71c4b3))
* **add `--no-verify` option`:** :sparkles: ([1d81dab](https://github.com/vivaxy/gacp/commit/1d81dabcba5a250b15cd99da6abd7293da9d67f4)), closes [#121](https://github.com/vivaxy/gacp/issues/121)
* remove `--follow-tags` when pushing ([f94879e](https://github.com/vivaxy/gacp/commit/f94879e392d00ca000b08cce9e900b2f38e1b0af))


### Bug Fixes

* **deps:** update dependency execa to v5 ([c8d39de](https://github.com/vivaxy/gacp/commit/c8d39defe4d2e81966368817b74d704b8ad577f0))
* **deps:** update dependency fs-extra to v10 ([69d3ace](https://github.com/vivaxy/gacp/commit/69d3acec47a02629943b44b41be3084cdc43cfac))
* **deps:** update dependency yargs to v17 ([78ea990](https://github.com/vivaxy/gacp/commit/78ea9902ff6b198deeb19a0240e81e54cf5c5028))

### [2.10.2](https://github.com/vivaxy/gacp/compare/v2.10.1...v2.10.2) (2020-10-13)


### Bug Fixes

* :bug:  fix history not cleared ([b7fb625](https://github.com/vivaxy/gacp/commit/b7fb625d2aca5fd7b5042d7bc1d885d9e4adde87))
* :bug:  fix history not cleared after a successfully commit ([c06e3e6](https://github.com/vivaxy/gacp/commit/c06e3e6fb07f9e73dd31f1c38fe48d8ba8070fbe))

### [2.10.1](https://github.com/vivaxy/gacp/compare/v2.10.0...v2.10.1) (2020-10-13)


### Bug Fixes

* :bug: fix history not working ([8cb774d](https://github.com/vivaxy/gacp/commit/8cb774d6ff11a40b0a5a6268e2a06a1fe57492ab))
* **deps:** update dependency cosmiconfig to v7 ([6cd362b](https://github.com/vivaxy/gacp/commit/6cd362b1eb54b005337d37af0f9f4801c04ddc78))
* **deps:** update dependency update-notifier to v5 ([781ce71](https://github.com/vivaxy/gacp/commit/781ce71eae1d656a59a2d4c019ff8dcd4902707c))
* **deps:** update dependency yargs to v16 ([98f5753](https://github.com/vivaxy/gacp/commit/98f57538a78e926080b4cd344c5ed95a1cfe0d6f))

## [2.10.0](https://github.com/vivaxy/gacp/compare/v2.9.0...v2.10.0) (2020-06-23)


### Features

* :sparkles:  support multi-line longer description ([42c431a](https://github.com/vivaxy/gacp/commit/42c431a73974b293df730731ffe75ccd46aec1e4)), closes [#40](https://github.com/vivaxy/gacp/issues/40) [#43](https://github.com/vivaxy/gacp/issues/43)


### Bug Fixes

* **deps:** update dependency chalk to v4 ([4dd27bd](https://github.com/vivaxy/gacp/commit/4dd27bd040488599c57089fb74fe472b2188b2a7))
* **deps:** update dependency conventional-commit-types to v3 ([44fe77d](https://github.com/vivaxy/gacp/commit/44fe77d06b988447d93d6e2d0f8ef31ef869cf6e))
* **deps:** update dependency cosmiconfig to v6 ([bf0168e](https://github.com/vivaxy/gacp/commit/bf0168e555953f412d3597bebbe2a3244c31d0b2))
* **deps:** update dependency execa to ^0.11.0 ([55e4b14](https://github.com/vivaxy/gacp/commit/55e4b147e640ae137151c39f465d094a9d255cce))
* **deps:** update dependency execa to v4 ([87a4dc4](https://github.com/vivaxy/gacp/commit/87a4dc48269ec443e259b3fa3dffcdf20036ec21))
* **deps:** update dependency fs-extra to v9 ([ada4c09](https://github.com/vivaxy/gacp/commit/ada4c092147eb0c65fa003d84f5808d0713345b5))
* **deps:** update dependency update-notifier to v4 ([2e1670f](https://github.com/vivaxy/gacp/commit/2e1670f3df1ae59ced7b06c390ee349a1d68298a))
* **deps:** update dependency yargs to v15 ([f8cde91](https://github.com/vivaxy/gacp/commit/f8cde91994068a23d5c4f77b1d450274c6a73059))

## [2.9.0](https://github.com/vivaxy/gacp/compare/v2.8.0...v2.9.0) (2020-05-05)


### Features

* :sparkles:  support run `gacp` in a git subdirectory ([9bad872](https://github.com/vivaxy/gacp/commit/9bad872))



## [2.8.0](https://github.com/vivaxy/gacp/compare/v2.7.2...v2.8.0) (2020-04-29)


### Bug Fixes

* :bug: fix commitlint rule when rule config is set to `never` ([6ffbe7c](https://github.com/vivaxy/gacp/commit/6ffbe7c))


### Build System

* :children_crossing:  add vscode debug config ([2aa6aaa](https://github.com/vivaxy/gacp/commit/2aa6aaa))


### Features

* :sparkles:  support run postpush hook ([d7bc7d8](https://github.com/vivaxy/gacp/commit/d7bc7d8)), closes [#45](https://github.com/vivaxy/gacp/issues/45) [#46](https://github.com/vivaxy/gacp/issues/46)
* :sparkles: add `--set-upstream` option when `git push` ([50d9258](https://github.com/vivaxy/gacp/commit/50d9258)), closes [#44](https://github.com/vivaxy/gacp/issues/44)



### [2.7.2](https://github.com/vivaxy/gacp/compare/v2.7.1...v2.7.2) (2020-02-25)


### Bug Fixes

* **typo:** :rewind:  revert last fix, `terse` to `tense` ([5aa6bc1](https://github.com/vivaxy/gacp/commit/5aa6bc1))



### [2.7.1](https://github.com/vivaxy/gacp/compare/v2.7.0...v2.7.1) (2020-02-25)


### Bug Fixes

* :pencil2:  `tense` to `terse` ([2bd14f5](https://github.com/vivaxy/gacp/commit/2bd14f5)), closes [#39](https://github.com/vivaxy/gacp/issues/39)



## [2.7.0](https://github.com/vivaxy/gacp/compare/v2.6.3...v2.7.0) (2020-02-19)


### Features

* :sparkles:  support `--no-add` ([bd5fb4f](https://github.com/vivaxy/gacp/commit/bd5fb4f))



### [2.6.3](https://github.com/vivaxy/gacp/compare/v2.6.2...v2.6.3) (2020-02-03)



### [2.6.2](https://github.com/vivaxy/gacp/compare/v2.6.1...v2.6.2) (2019-07-16)


### Bug Fixes

* **import:** :bug: remove useless import ([9ee670a](https://github.com/vivaxy/gacp/commit/9ee670a))
* **word wrap:** :bug: width value ([b5444a2](https://github.com/vivaxy/gacp/commit/b5444a2))



### [2.6.1](https://github.com/vivaxy/gacp/compare/v2.6.0...v2.6.1) (2019-07-16)


### Bug Fixes

* **format:** :bug: fix wrap body or footer at the right width ([1b62903](https://github.com/vivaxy/gacp/commit/1b62903))
* **format:** :bug: fix wrap body or footer at the right width ([#33](https://github.com/vivaxy/gacp/issues/33)) ([3f29a7c](https://github.com/vivaxy/gacp/commit/3f29a7c))


### Tests

* **nyc:** :white_check_mark: fix nyc coverage report ([89f1d02](https://github.com/vivaxy/gacp/commit/89f1d02))



## [2.6.0](https://github.com/vivaxy/gacp/compare/v2.5.8...v2.6.0) (2019-07-04)


### Bug Fixes

* **prompt:** :bug: Fix prompt ([0d83543](https://github.com/vivaxy/gacp/commit/0d83543))
* **prompt:** none ([369c88b](https://github.com/vivaxy/gacp/commit/369c88b))
* **remove:** :fire: remove lib/index.js ([65546ec](https://github.com/vivaxy/gacp/commit/65546ec))


### Features

* **commitlint config:** :sparkles: format commit message with local com ([3481762](https://github.com/vivaxy/gacp/commit/3481762))



### [2.5.8](https://github.com/vivaxy/gacp/compare/v2.5.7...v2.5.8) (2019-06-20)


### Bug Fixes

* **error output:** :bug: Improve uncaught error output ([dcb91fe](https://github.com/vivaxy/gacp/commit/dcb91fe))



### [2.5.7](https://github.com/vivaxy/gacp/compare/v2.5.6...v2.5.7) (2019-06-20)


### Bug Fixes

* **error output:** :bug: Improve uncaught error output ([9c2f3a9](https://github.com/vivaxy/gacp/commit/9c2f3a9))



### [2.5.6](https://github.com/vivaxy/gacp/compare/v2.5.5...v2.5.6) (2019-06-20)


### Bug Fixes

* **shebang:** :bug: Fix missing shebang ([9b72b9b](https://github.com/vivaxy/gacp/commit/9b72b9b))



### [2.5.5](https://github.com/vivaxy/gacp/compare/v2.5.4...v2.5.5) (2019-06-20)


### Bug Fixes

* **stdout:** :bug: Fix stdout without colors ([c4d959a](https://github.com/vivaxy/gacp/commit/c4d959a))



### [2.5.4](https://github.com/vivaxy/gacp/compare/v2.5.3...v2.5.4) (2019-06-19)


### Bug Fixes

* **update notifier:** :bug: Fix install command will be `yarn add gacp` ([3248e60](https://github.com/vivaxy/gacp/commit/3248e60))



### [2.5.3](https://github.com/vivaxy/gacp/compare/v2.5.2...v2.5.3) (2019-06-17)



<a name="2.5.2"></a>
## [2.5.2](https://github.com/vivaxy/gacp/compare/v2.5.1...v2.5.2) (2019-06-17)


### Bug Fixes

* **emoji:** :bug: Fix none in emoji ([98f6048](https://github.com/vivaxy/gacp/commit/98f6048))



<a name="2.5.1"></a>
## [2.5.1](https://github.com/vivaxy/gacp/compare/v2.5.0...v2.5.1) (2019-06-14)


### Bug Fixes

* **prompt:** :bug: Fix prompt default value ([4cfa76a](https://github.com/vivaxy/gacp/commit/4cfa76a))



<a name="2.5.0"></a>
# [2.5.0](https://github.com/vivaxy/gacp/compare/v2.4.0...v2.5.0) (2019-06-14)


### Features

* **prompt:** :sparkles: Use autocomplete to improve select experience ([b3af533](https://github.com/vivaxy/gacp/commit/b3af533))



<a name="2.4.0"></a>
# [2.4.0](https://github.com/vivaxy/gacp/compare/v2.3.3...v2.4.0) (2019-06-14)


### Bug Fixes

* **commitlint:** :bug:fix header-max-length to 72 ([c08b207](https://github.com/vivaxy/gacp/commit/c08b207))


### Features

* **config:** :sparkles: support .rc files ([5570d57](https://github.com/vivaxy/gacp/commit/5570d57))
* **options:** :sparkles:add whether to use emoji code option ([69ebe29](https://github.com/vivaxy/gacp/commit/69ebe29))



<a name="2.3.3"></a>
## [2.3.3](https://github.com/vivaxy/gacp/compare/v2.3.2...v2.3.3) (2019-06-13)


### Performance Improvements

* **history:** :zap:Optimize history performance ([c4850db](https://github.com/vivaxy/gacp/commit/c4850db))



<a name="2.3.2"></a>
## [2.3.2](https://github.com/vivaxy/gacp/compare/v2.3.1...v2.3.2) (2019-06-13)



<a name="2.3.1"></a>
## [2.3.1](https://github.com/vivaxy/gacp/compare/v2.3.0...v2.3.1) (2019-06-13)



<a name="2.3.0"></a>
# [2.3.0](https://github.com/vivaxy/gacp/compare/v2.2.1...v2.3.0) (2019-06-13)


### Bug Fixes

* **push:** :bug:argv ([e5b4abf](https://github.com/vivaxy/gacp/commit/e5b4abf))
* **push:** :bug:function ([df569f3](https://github.com/vivaxy/gacp/commit/df569f3))


### Features

* **add options:** :sparkles:add push option ([f94fc07](https://github.com/vivaxy/gacp/commit/f94fc07))



<a name="2.2.1"></a>
## [2.2.1](https://github.com/vivaxy/gacp/compare/v2.2.0...v2.2.1) (2019-06-13)


### Bug Fixes

* **history:** :bug:Keep history only when commit message fails ([1379167](https://github.com/vivaxy/gacp/commit/1379167))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/vivaxy/gacp/compare/v2.1.2...v2.2.0) (2019-06-13)


### Features

* **gitmoji:** :sparkles:Update gitmojis.json ([db727c5](https://github.com/vivaxy/gacp/commit/db727c5))
* **history:** :sparkles:Support history ([d515f60](https://github.com/vivaxy/gacp/commit/d515f60))



<a name="2.1.2"></a>
## [2.1.2](https://github.com/vivaxy/gacp/compare/v2.1.1...v2.1.2) (2019-04-01)



<a name="2.1.1"></a>
## [2.1.1](https://github.com/vivaxy/gacp/compare/v2.1.0...v2.1.1) (2019-01-10)


### Bug Fixes

* **push:** :bug:fix push with --follow-tags ([f0b9ef2](https://github.com/vivaxy/gacp/commit/f0b9ef2))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/vivaxy/gacp/compare/v2.0.1...v2.1.0) (2018-08-02)


### Features

* **gitmojis:** :sparkles:Add 3 more emoji ([cc7aa71](https://github.com/vivaxy/gacp/commit/cc7aa71))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/vivaxy/gacp/compare/v2.0.0...v2.0.1) (2018-01-29)



<a name="2.0.0"></a>
# [2.0.0](https://github.com/vivaxy/gacp/compare/v1.9.2...v2.0.0) (2018-01-29)


### Features

* **console:** :sparkles:Update console output, show more details. ([f7fb480](https://github.com/vivaxy/gacp/commit/f7fb480))
* **prettier:** :sparkles:Replace eslint with prettier ([f6a131c](https://github.com/vivaxy/gacp/commit/f6a131c))



<a name="1.9.2"></a>
## [1.9.2](https://github.com/vivaxy/gacp/compare/v1.9.1...v1.9.2) (2018-01-22)



<a name="1.9.1"></a>
## [1.9.1](https://github.com/vivaxy/gacp/compare/v1.9.0...v1.9.1) (2018-01-22)



<a name="1.9.0"></a>
# [1.9.0](https://github.com/vivaxy/gacp/compare/v1.8.0...v1.9.0) (2018-01-22)


### Features

* **gtimojis:** :sparkles:Update gitmojis ([58ee25b](https://github.com/vivaxy/gacp/commit/58ee25b))



<a name="1.8.0"></a>
# [1.8.0](https://github.com/vivaxy/gacp/compare/v1.7.0...v1.8.0) (2017-05-31)


### Features

* **update-notifier:** :sparkles:Add `update-notifier` ([545f95a](https://github.com/vivaxy/gacp/commit/545f95a))



<a name="1.7.0"></a>
# [1.7.0](https://github.com/vivaxy/gacp/compare/v1.6.1...v1.7.0) (2017-05-27)


### Features

* :sparkles: ([9a24f5c](https://github.com/vivaxy/gacp/commit/9a24f5c))
* :sparkles:Prompt when password needed ([a19c09e](https://github.com/vivaxy/gacp/commit/a19c09e))
* **listr:** :sparkles:Switching to VerboseRenderer ([ee4e91a](https://github.com/vivaxy/gacp/commit/ee4e91a))



<a name="1.6.1"></a>
## [1.6.1](https://github.com/vivaxy/gacp/compare/v1.6.1-0...v1.6.1) (2017-03-20)



<a name="1.6.0"></a>
# [1.6.0](https://github.com/vivaxy/gacp/compare/v1.5.1...v1.6.0) (2017-02-05)


### Features

* **commit types:** :sparkles:Select commit types with order ([8e95772](https://github.com/vivaxy/gacp/commit/8e95772))



<a name="1.5.1"></a>
## [1.5.1](https://github.com/vivaxy/gacp/compare/v1.5.0...v1.5.1) (2017-02-05)


### Bug Fixes

* **configManager:** :bug:Fix gitmoji stat order ([a21ffbe](https://github.com/vivaxy/gacp/commit/a21ffbe))



<a name="1.5.0"></a>
# [1.5.0](https://github.com/vivaxy/gacp/compare/v1.4.6...v1.5.0) (2017-02-04)


### Features

* :sparkles:Update gitmoji list; Use yarn; Sort gitmoji by usage count ([022b38e](https://github.com/vivaxy/gacp/commit/022b38e))



<a name="1.4.6"></a>
## [1.4.6](https://github.com/vivaxy/gacp/compare/v1.4.5...v1.4.6) (2017-01-27)


### Bug Fixes

* **checkGitRepository:** :bug:fix not a git repository ([8d37c6b](https://github.com/vivaxy/gacp/commit/8d37c6b))
* **push:** :bug:Fix push with tags ([0f06702](https://github.com/vivaxy/gacp/commit/0f06702))



<a name="1.4.5"></a>
## [1.4.5](https://github.com/vivaxy/gacp/compare/v1.4.4...v1.4.5) (2016-12-21)


### Reverts

* :bug:revert fix when user presses key, console output gets wired, preserve user input ([5dd304c](https://github.com/vivaxy/gacp/commit/5dd304c))



<a name="1.4.4"></a>
## [1.4.4](https://github.com/vivaxy/gacp/compare/v1.4.3...v1.4.4) (2016-12-04)


### Bug Fixes

* :bug:fix process not exiting after `listr` have done ([9710067](https://github.com/vivaxy/gacp/commit/9710067))



<a name="1.4.3"></a>
## [1.4.3](https://github.com/vivaxy/gacp/compare/v1.4.2...v1.4.3) (2016-12-03)


### Bug Fixes

* :bug:fix when user presses key, console output gets wired ([7301f00](https://github.com/vivaxy/gacp/commit/7301f00))



<a name="1.4.2"></a>
## [1.4.2](https://github.com/vivaxy/gacp/compare/v1.4.1...v1.4.2) (2016-11-28)


### Bug Fixes

* **push:** :bug:fix check push, when remote branch not exists, an error thrown ([8e7a70e](https://github.com/vivaxy/gacp/commit/8e7a70e))
* **push:** :bug:fix check push, when remote branch not exists, output errors ([d116891](https://github.com/vivaxy/gacp/commit/d116891))



<a name="1.4.1"></a>
## [1.4.1](https://github.com/vivaxy/gacp/compare/v1.4.0...v1.4.1) (2016-11-27)


### Bug Fixes

* **git:** :bug:fix check remote differ ([c8603cc](https://github.com/vivaxy/gacp/commit/c8603cc))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/vivaxy/gacp/compare/v1.3.3...v1.4.0) (2016-11-27)


### Bug Fixes

* **babel:** :bug:fix babel rest spread arguments ([9c8352b](https://github.com/vivaxy/gacp/commit/9c8352b))
* **git:** :bug:fetch before check need push ([68db649](https://github.com/vivaxy/gacp/commit/68db649))
* **prompt:** :bug:if nothing changed, prompt is not needed ([84498d0](https://github.com/vivaxy/gacp/commit/84498d0))
* **tasks:** :bug:fix no traking remote ([860f272](https://github.com/vivaxy/gacp/commit/860f272))


### Features

* **commit:** check if a git tree is clean ([707750d](https://github.com/vivaxy/gacp/commit/707750d))
* **exec:** :hammer:using `execa` instead of `shelljs` ([6dc5256](https://github.com/vivaxy/gacp/commit/6dc5256))
* **git:** :sparkles:check remote differ to info users to pull first; check local status to decide i ([7bca53c](https://github.com/vivaxy/gacp/commit/7bca53c))
* **git:** :sparkles:skip tasks or add task according to git status ([3793d68](https://github.com/vivaxy/gacp/commit/3793d68))
* **tasks:** :sparkles:skip git push when there is no tracking remote ([d4a6fe9](https://github.com/vivaxy/gacp/commit/d4a6fe9))



<a name="1.3.3"></a>
## [1.3.3](https://github.com/vivaxy/gacp/compare/v1.3.2...v1.3.3) (2016-11-27)


### Bug Fixes

* **commit:** :bug:fix: `"` string in commit message causes command spilt ([68206c5](https://github.com/vivaxy/gacp/commit/68206c5))



<a name="1.3.2"></a>
## [1.3.2](https://github.com/vivaxy/gacp/compare/v1.3.1...v1.3.2) (2016-11-26)


### Bug Fixes

* **commit:** :bug:fix commit when message contains '`', fix push when remote not exists ([f198c2c](https://github.com/vivaxy/gacp/commit/f198c2c))



<a name="1.3.1"></a>
## [1.3.1](https://github.com/vivaxy/gacp/compare/v1.3.0...v1.3.1) (2016-11-23)


### Bug Fixes

* **push:** :sparkles:push with tag ([64009d2](https://github.com/vivaxy/gacp/commit/64009d2))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/vivaxy/gacp/compare/v1.2.0...v1.3.0) (2016-11-23)


### Features

* **emoji:** add emoji support in commit ([b6f6233](https://github.com/vivaxy/gacp/commit/b6f6233))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/vivaxy/gacp/compare/v1.1.2...v1.2.0) (2016-11-23)


### Features

* **changelog:** :memo:test emoji on cz ([07c0707](https://github.com/vivaxy/gacp/commit/07c0707))



<a name="1.1.2"></a>
## [1.1.2](https://github.com/vivaxy/gacp/compare/v1.1.1...v1.1.2) (2016-11-23)



<a name="1.1.1"></a>
## [1.1.1](https://github.com/vivaxy/gacp/compare/v1.1.0...v1.1.1) (2016-11-23)



<a name="1.1.0"></a>
# [1.1.0](https://github.com/vivaxy/gacp/compare/v1.0.0...v1.1.0) (2016-11-22)


### Features

* add standard-version ([f493227](https://github.com/vivaxy/gacp/commit/f493227))
* **cz:** add cz support ([3d313c5](https://github.com/vivaxy/gacp/commit/3d313c5))
* **cz:** add up cz ([ecefae8](https://github.com/vivaxy/gacp/commit/ecefae8))

<a name="1.0.0"></a>
# [1.0.0](https://github.com/vivaxy/gacp/compare/546577...v1.0.0) (2016-11-22)

### Features

* check git repository ([ff0585a](https://github.com/vivaxy/gacp/commit/ff0585a))
* optimize help message

<a name="0.0.0"></a>
# [0.0.0](https://github.com/vivaxy/gacp/compare/d4b3c3...546577) (2016-11-22)

* first version
