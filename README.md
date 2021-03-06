# rhyme-detector

🕵 Find all the rhymes in any poem, fast.

## Dependencies

Uses the [CMU pronouncing dictionary](https://www.npmjs.com/package/cmu-pronouncing-dictionary)

## Install

Using npm:

```console
npm install rhyme-detector --save
# or
yarn add rhyme-detector
```

## Usage

```js

const detectRyhmes = require("detect-rhymes");

let rhymes = detectRyhmes("overnight delight intertwine emboss mine loss shine boss refine incline");

/*
Returns:

[ [ 'overnight', 'delight' ],
[ 'intertwine', 'mine', 'shine', 'incline' ],
[ 'emboss', 'loss', 'boss' ] ]
*/

```

[LICENSE (WTFPL)](/LICENSE)