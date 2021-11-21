"use strict";

/*;
	@license:module:
		MIT License

		Copyright (c) 2020-present Richeve S. Bebebdor <richeve.bebedor@gmail.com>

		@license:copyright:
			Richeve S. Bebebdor

			<@license:year-range:2020-present;>

			<@license:contact-detail:richeve.bebedor@gmail.com;>
		@license:copyright;

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@license:module;
*/

const RESOLVE_CALLBACK = (
	Symbol( "resolve-callback" )
);

const resolveCallback = (
	function resolveCallback( callback, reference ){
		/*;
			@definition:
				@procedure:#resolveCallback
					@description:
						Callback with promise.
					@description;
				@procedure;

				@parameter:#callback
					@type:
							function
					@type;

					@description:
					@description;
				@parameter;

				@parameter:#reference
					@type:
							function
					@type;

					@description:
					@description;
				@parameter;

				@result:#result
					@type:
							function
					@type;

					@description:
					@description;
				@result;

				@trigger:#trigger
					@type:
							object:as:Error
					@type;

					@description:
					@description;

					@tag:#invalid-callback-parameter;
					@tag:#cannot-resolve-callback;
				@trigger;
			@definition;
		*/

		const EventEmitter = require( "events" );

		try{
			(
					callback
				=	(
							(
								callback
							)
						||
							(
								function( ){
									return	(
												Array
												.from(
													(
														arguments
													)
												)
											);
								}
							)
					)
			);

			if(
					(
							typeof
							callback
						!=	"function"
					)
			){
				throw	(
							new	Error(
									(
										[
											"#invalid-callback-parameter;",

											"invalid callback parameter;",

											"@callback:",
											`${ callback };`
										]
									)
								)
						);
			}

			if(
					(
							callback[ RESOLVE_CALLBACK ]
						===	true
					)
			){
				return	(
							callback
						);
			}

			(
					reference
				=	(
							(
								Array
								.from(
									(
										arguments
									)
								)
								.find(
									(
										( parameter ) => (
												(
														typeof
														parameter
													==	"string"
												)
										)
									)
								)
							)
						||
							(
								`[@temporary-reference:${ Date.now( ) }-${ Math.random( ) }]`
							)
					)
			);

			const self = (
				this
			);

			const callbackPromiseEmitter = (
				new	EventEmitter( )
			);

			const callbackPromise = (
				new	Promise(
						function( resolveHandler, rejectHandler ){
							callbackPromiseEmitter
							.once(
								(
									`resolve-callback-${ reference }`
								),

								function( ){
									resolveHandler
									.call(
										(
											self
										),

										(
											Array
											.from(
												(
													arguments
												)
											)
										)
									);
								}
							);

							callbackPromiseEmitter
							.once(
								(
									`reject-callback-${ reference }`
								),

								function( ){
									rejectHandler
									.call(
										(
											self
										),

										(
											Array
											.from(
												(
													arguments
												)
											)
										)
									);
								}
							);
						}
					)
			);

			const	{
						proxy: revocableCallback,
						revoke: revokeCallback
					}
				=	(
						Proxy
						.revocable(
							(
								callback
							),

							(
								{
									"apply": (
										function apply( callback, scope, parameterList ){
											try{
												const result = (
													callback
													.apply(
														(
																(
																	scope
																)
															||
																(
																	self
																)
														),

														(
															parameterList
														)
													)
												);

												EventEmitter
												.prototype
												.emit
												.apply(
													(
														callbackPromiseEmitter
													),

													(
														[
															(
																`resolve-callback-${ reference }`
															)
														]
														.concat(
															(
																	(
																		result
																	)
																||
																	(
																		parameterList
																	)
															)
														)
													)
												);

												return	(
																(
																	result
																)
															||
																(
																	parameterList
																)
														);
											}
											catch( error ){
												const result = (
													[
														error,
													]
													.concat(
														(
															parameterList
														)
													)
												);

												EventEmitter
												.prototype
												.emit
												.apply(
													(
														callbackPromiseEmitter
													),

													(
														[
															(
																`reject-callback-${ reference }`
															)
														]
														.concat(
															(
																result
															)
														)
													)
												);

												return	(
															result
														);
											}
										}
									),

									"get": (
										function get( callback, property, value, target ){
											if(
													(
															property
														===	RESOLVE_CALLBACK
													)
											){
												return	(
															true
														);
											}
											else if(
													(
															property
														===	"promise"
													)
											){
												return	(
															callbackPromise
														);
											}
											else if(
													(
															property
														===	"once"
													)
											){
												callbackPromiseEmitter
												.once(
													(
														`resolve-callback-${ reference }`
													),

													function( ){
														setImmediate( revokeCallback );
													}
												);

												callbackPromiseEmitter
												.once(
													(
														`reject-callback-${ reference }`
													),

													function( ){
														setImmediate( revokeCallback );
													}
												);

												return	(
															revocableCallback
														);
											}
											else{
												return	(
															callback[ property ]
														);
											}
										}
									)
								}
							)
						)
					);

			return	(
						revocableCallback
					);
		}
		catch( error ){
			throw	(
						new	Error(
								(
									[
										"#cannot-resolve-callback;",

										"cannot resolve callback;",
										"cannot execute resolve callback;",

										"@error-data:",
										`${ error };`
									]
								)
							)
					);
		}
	}
);

(
		module
		.exports
	=	(
			resolveCallback
		)
);
