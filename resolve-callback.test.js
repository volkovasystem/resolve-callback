"use strict";

const assert = require( "assert" );

const strictAssert = assert.strict;

const resolveCallback = require( "./resolve-callback.js" );

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
