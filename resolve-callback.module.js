"use strict";

/*;
	@module-license:
		MIT License

		Copyright (c) 2020 Richeve S. Bebedor <richeve.bebedor@gmail.com>
		@copyright: Richeve S. Bebedor <@year: 2020> <@contact: richeve.bebedor@gmail.com>

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
	@end-module-license
*/

const resolveCallback = (
	function resolveCallback( callback ){
		/*;
			@parameter-definition:
				{
					"callback": "[@type: function]"
				}
			@end-parameter-definition

			@result-definition:
				{
					"result": "[@type: function]"
				}
			@end-result-definition
		*/

		if(
				typeof
				callback
			==	"function"
		){
			if(
					(
							(
											callback
											.$callData
								instanceof	WeakMap
							)
						===	true
					)

				&&	(
							typeof
							(
								callback
								.$callData
								.get(
									callback
								)
							)
							.$callPromise
						==	"function"
					)
			){
				return	callback;
			}
			else if(
					(
							(
											callback
											.$callData
								instanceof	WeakMap
							)
						===	true
					)
			){
				Object
				.defineProperty(
					(
						callback
						.$callData
						.get(
							callback
						)
					),

					"$callPromise",

					{
						"value": (
							function callPromise( result ){
								return	(
											new	Promise(
													function( resolve, reject ){
														if(
																(
																		(
																						result
																			instanceof	Error
																		)
																	===	true
																)
														){
															reject( result );
														}
														else{
															resolve( result );
														}
													}
												)
										);
							}
						),

						"configurable": false,
						"enumerable": false,
						"writable": false
					}
				);

				(
					callback
					.$callData
					.get(
						callback
					)
				)
				.$effectList
				.push(
					function	effect(
									procedure,
									parameterList,
									result,
									scope
								){
									return	(
												(
													callback
													.$callData
													.get(
														callback
													)
												)
												.$callPromise(
													result
												)
											);
								}
				);
			}
			else{
				const delegateCallback = (
					function delegateCallback( ){
						let result = undefined;

						try{
							result = (
								callback
								.apply(
									this,
									arguments
								)
							);
						}
						catch( error ){
							result = error;
						}
						finally{
							return	(
										delegateCallback
										.$callData
										.get(
											delegateCallback
										)
										.$callEffect(
											callback,
											arguments,
											result,
											this
										)
									);
						}
					}
				);

				Object
				.defineProperty(
					delegateCallback,

					"$callData",

					{
						"value": (
							(
								new	WeakMap( )
							)
							.set(
								delegateCallback,

								{ }
							)
						),

						"configurable": false,
						"enumerable": false,
						"writable": false
					}
				);

				Object
				.defineProperty(
					(
						delegateCallback
						.$callData
						.get(
							delegateCallback
						)
					),

					"$callEffect",

					{
						"value": (
							function	callEffect(
											procedure,
											parameterList,
											result,
											scope
										){
											return	(
														(
															delegateCallback
															.$callData
															.get(
																delegateCallback
															)
														)
														.$effectList
														.map(
															function( effect ){
																return	effect(
																			procedure,
																			parameterList,
																			result,
																			scope
																		);
															}
														)
														.pop( )
													);
										}
						),

						"configurable": false,
						"enumerable": false,
						"writable": false
					}
				);

				Object
				.defineProperty(
					(
						delegateCallback
						.$callData
						.get(
							delegateCallback
						)
					),

					"$effectList",

					{
						"value": [ ],

						"configurable": false,
						"enumerable": false,
						"writable": false
					}
				);

				Object
				.defineProperty(
					(
						delegateCallback
						.$callData
						.get(
							delegateCallback
						)
					),

					"$callPromise",

					{
						"value": (
							function callPromise( result ){
								return	(
											new	Promise(
													function( resolve, reject ){
														if(
																(
																		(
																						result
																			instanceof	Error
																		)
																	===	true
																)
														){
															reject( result );
														}
														else{
															resolve( result );
														}
													}
												)
										);
							}
						),

						"configurable": false,
						"enumerable": false,
						"writable": false
					}
				);

				(
					delegateCallback
					.$callData
					.get(
						delegateCallback
					)
				)
				.$effectList
				.push(
					function	effect(
									procedure,
									parameterList,
									result,
									scope
								){
									return	(
												(
													delegateCallback
													.$callData
													.get(
														delegateCallback
													)
												)
												.$callPromise(
													result
												)
											);
								}
				);

				return	delegateCallback;
			}
		}
		else{
			return	(
						resolveCallback(
							function callback( ){
								return	undefined;
							}
						)
					);
		}
	}
);

module.exports = resolveCallback;
