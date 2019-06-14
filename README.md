# GACP

![GACP](./assets/images/gacp.png)

[![Build Status][travis-image]][travis-url]
[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]
[![Standard Version][standard-version-image]][standard-version-url]
[![Codecov][codecov-image]][codecov-url]

Git add, commit, push with conventional-changelog and gitmoji.

![GACP](./assets/images/gacp.gif)

## Installation

`sudo npm i -g gacp`

## Usage

`gacp`

`gacp help`

`gacp --no-push`

`gacp --emoji emoji`

## Configuration File

you can configure gacp via:

- A .gacprc file, written JSON, with optional extensions: .json.

### Basic Configuration
```json
{
  "emoji": "emoji"
}
```

## Change log

[Change log](CHANGELOG.md)

## Contributing

[Contributing](CONTRIBUTING.md)

## Prior Art

- [gcmt](https://github.com/vivaxy/gcmt)
- [commitizen](https://github.com/commitizen/cz-cli)
- [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)
- [gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli)

[travis-image]: https://img.shields.io/travis/vivaxy/gacp.svg?style=flat-square
[travis-url]: https://travis-ci.org/vivaxy/gacp
[npm-version-image]: http://img.shields.io/npm/v/gacp.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/gacp
[npm-downloads-image]: https://img.shields.io/npm/dt/gacp.svg?style=flat-square
[license-image]: https://img.shields.io/npm/l/gacp.svg?style=flat-square
[license-url]: LICENSE
[standard-version-image]: https://img.shields.io/badge/release-standard%20version-brightgreen.svg?style=flat-square
[standard-version-url]: https://github.com/conventional-changelog/standard-version
[codecov-image]: https://img.shields.io/codecov/c/github/vivaxy/gacp.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/vivaxy/gacp
