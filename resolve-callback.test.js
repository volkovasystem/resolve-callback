"use strict";

const assert = require( "assert" );

const strictAssert = assert.strict;

const resolveCallback = require( "./resolve-callback.js" );

(
	function( ){
		const testCallback = (
			resolveCallback(
				async	function testCallback( ){
							return	true;
						}
			)
		);

		strictAssert
		.equal(
			(
							testCallback( )
				instanceof	Promise
			),
			(
				true
			),
			(
				"Test callback must return a Promise object."
			)
		);
	}
)( );

(
	async	function( ){
				const testCallback = (
					resolveCallback(
						async	function testCallback( ){
									return	"Hello World";
								}
					)
				);

				strictAssert
				.equal(
					(
						await	testCallback( )
					),
					(
						"Hello World"
					),
					(
						"Test callback must return 'Hello World'."
					)
				);
			}
)( );
