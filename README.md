# beautify-lint

A linter for code styling. Ensures code is written in a beautiful way.

## Usage

``` text
npm install beautify-lint --save-dev
```

This package comes with two binaries:

* `beautify-lint`: Checks if code is beautified according to the `.jsbeautifyrc`. Exits with non-zero exit code when any file is not beautified. Prints diff about required changes.
* `beautify-rewrite`: Rewrittes code according to `.jsbeautifyrc`.

Both binaries take globs as params.

Example:

``` text
beautify-lint lib/**.js bin/*.js test/*.js
```

Checks javascript in lib, bin and test directory.

## Use cases

* Let the CI validate code style: `"pretest": "beautify-lint lib/**.js"`
* Provide a helper to beautify the code: `"beautify": "beautify-rewrite lib/**.js"`

## License

MIT Copyright (c) 2015 Tobias Koppers
