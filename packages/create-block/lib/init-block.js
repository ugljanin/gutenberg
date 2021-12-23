/**
 * External dependencies
 */
const { omitBy } = require( 'lodash' );
const { dirname, join } = require( 'path' );
const makeDir = require( 'make-dir' );
const { writeFile } = require( 'fs' ).promises;

/**
 * Internal dependencies
 */
const { info } = require( './log' );
const { writeOutputTemplate } = require( './output' );

async function initBlockJSON(
	outputFolder,
	{
		$schema,
		apiVersion,
		slug,
		namespace,
		title,
		version,
		description,
		category,
		attributes,
		supports,
		dashicon,
		textdomain,
		editorScript,
		editorStyle,
		style,
	}
) {
	info( '' );
	info( 'Creating a "block.json" file.' );

	const outputFile = join( process.cwd(), slug, outputFolder, 'block.json' );
	await makeDir( dirname( outputFile ) );
	await writeFile(
		outputFile,
		JSON.stringify(
			omitBy(
				{
					$schema,
					apiVersion,
					name: namespace + '/' + slug,
					version,
					title,
					category,
					icon: dashicon,
					description,
					attributes,
					supports,
					textdomain,
					editorScript,
					editorStyle,
					style,
				},
				( value ) => ! value
			),
			null,
			'\t'
		)
	);
}

module.exports = async function ( { outputTemplates, outputFolder }, view ) {
	await Promise.all(
		Object.keys( outputTemplates ).map(
			async ( outputFile ) =>
				await writeOutputTemplate(
					outputTemplates[ outputFile ],
					join( outputFolder, outputFile ),
					view
				)
		)
	);

	await initBlockJSON( outputFolder, view );
};
