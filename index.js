import gulpIf from 'gulp-if';
import gulpTokenReplace from 'gulp-token-replace';

const prefix = 'href="';
const suffix = '"';

export default function gulpRewriteBaseURI(paths) {
	return gulpIf(/\.(?:html|htm|xhtml)$/u, gulpTokenReplace({
		prefix,
		preserveUnknownTokens: true,
		suffix,
		tokens: Object.fromEntries(
			Object.entries(paths)
				.map(([original, rewritten]) => [original, `${prefix}${rewritten}${suffix}`])
		)
	}));
}
