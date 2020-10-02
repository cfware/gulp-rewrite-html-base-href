import stream, {Readable} from 'stream';
import {promisify} from 'util';

import t from 'libtap';
import Vinyl from 'vinyl';
import concatStream from 'concat-stream';

import gulpRewriteHtmlBaseHref from 'gulp-rewrite-html-base-href';

const pipeline = promisify(stream.pipeline);

const htmlContents = '<base href="/app/"><base href="/bad/">';
const expected = '<base href="/built/"><base href="/bad/">';

t.type(gulpRewriteHtmlBaseHref, 'function');

function testFile(filename, sourceContents, resultContents) {
	t.test(filename, async t => {
		await pipeline(
			Readable.from([
				new Vinyl({
					cwd: '/',
					base: '/test/',
					path: `/test/${filename}`,
					contents: Buffer.from(sourceContents)
				})
			]),
			gulpRewriteHtmlBaseHref({
				'/app/': '/built/'
			}),
			concatStream(data => {
				t.equal(data.length, 1, 'output contains one file');
				t.equal(data[0].contents.toString(), resultContents, 'file contents');
			})
		);
	});
}

testFile('index.htm', htmlContents, expected);
testFile('index.html', htmlContents, expected);
testFile('index.xhtml', htmlContents, expected);
testFile('index.html.gz', htmlContents, htmlContents);
