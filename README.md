# gulp-rewrite-html-base-href [![NPM Version][npm-image]][npm-url]

Rewrite the base href of HTML documents.

## Usage

```js
import stream from 'stream';
import {promisify} from 'util';

import gulp from 'gulp';
import gulpRewriteHtmlBaseHref from 'gulp-rewrite-html-base-href';

const pipeline = promisify(stream.pipeline);

export default () => pipeline(
	gulp.src('html/**'),
	gulpRewriteHtmlBaseHref({
		'/dev-prefix/': '/production-prefix/'
	})
	gulp.dest('build')
);
```

## WARNING

This performs simple string replacement on `.htm`, `.html` and `.xhtml` files, no HTML
parsing is attempted.  In the above example any match of `href="/dev-prefix/"` will be
replaced with `href="/produciton-prefix/"`.

This plugin should be used before HTML minification occurs, removal of the quotes is
enough to prevent this module from working.

[npm-image]: https://img.shields.io/npm/v/gulp-rewrite-html-base-href.svg
[npm-url]: https://npmjs.org/package/gulp-rewrite-html-base-href
