"use strict";

/*;
	@license:module:
		MIT License

		Copyright (c) 2020-present Richeve S. Bebedor <richeve.bebedor@gmail.com>

		@license:copyright:
			Richeve S. Bebedor

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

const CALLBACK_RESOLVED = (
	Symbol( "callback-resolved" )
);

const CALLBACK_SCOPE = (
	Symbol( "callback-scope" )
);

const CALLBACK_PARAMETER_LIST = (
	Symbol( "callback-parameter-list" )
);

const CALLBACK_RESULT = (
	Symbol( "callback-result" )
);

const CALLBACK_ERROR = (
	Symbol( "callback-error" )
);

const THEN_FIELD_PROCEDURE = (
	"then"
);

const ONCE_FIELD_PROCEDURE = (
	"once"
);

const TARGET_CALLBACK_FIELD_PROCEDURE = (
	"targetCallback"
);

const resolveCallback = (
	function resolveCallback( callback ){
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
					@tag:#cannot-call-callback;
					@tag:#restricted-flow;
					@tag:#cannot-resolve-callback;
				@trigger;
			@definition;
		*/

		try{
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

			if(
					(
							callback[ CALLBACK_RESOLVED ]
						===	true
					)
			){
				throw	(
							new	Error(
									(
										[
											"#invalid-callback-parameter;",

											"invalid callback parameter;",
											"callback resolved;",

											"@callback:",
											`${ callback };`
										]
									)
								)
						);
			}

			let revocableStatus = (
				true
			);
			if(
					(
							typeof
							this
						==	"object"
					)
				&&
					(
							this
						!==	null
					)
			){
				if(
						(
								(
										"revocableStatus"
									in	this
								)
							===	true
						)
					&&
						(
								typeof
								this.revocableStatus
							==	"boolean"
						)
				){
					(
							revocableStatus
						=	(
								this.revocableStatus
							)
					);
				}
			}

			let eventTargetStatus = (
				false
			);
			if(
					(
							typeof
							this
						==	"object"
					)
				&&
					(
							this
						!==	null
					)
			){
				if(
						(
								(
										"eventTargetStatus"
									in	this
								)
							===	true
						)
					&&
						(
								typeof
								this.eventTargetStatus
							==	"boolean"
						)
				){
					(
							eventTargetStatus
						=	(
								this.eventTargetStatus
							)
					);
				}
			}

			let eventTarget = (
				undefined
			);
			if(
					(
							eventTargetStatus
						===	true
					)
			){
				(
						eventTarget
					=	(
							new	EventTarget( )
						)
				);
			}

			const	{
						proxy: callbackResolve,
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
										function apply(
											targetCallback,
											scope,
											parameterList
										){
											try{
												Object.defineProperty(
													(
														targetCallback
													),

													(
														CALLBACK_SCOPE
													),

													(
														{
															"value": (
																scope
															),

															"configurable": (
																false
															),

															"enumerable": (
																false
															),

															"writable": (
																false
															),
														}
													)
												);

												Object.defineProperty(
													(
														targetCallback
													),

													(
														CALLBACK_PARAMETER_LIST
													),

													(
														{
															"value": (
																parameterList
															),

															"configurable": (
																false
															),

															"enumerable": (
																false
															),

															"writable": (
																false
															),
														}
													)
												);

												return	(
															callbackResolve
														);
											}
											finally{
												if(
														(
																revocableStatus
															===	true
														)
												){
													Object.defineProperty(
														(
															targetCallback
														),

														(
															CALLBACK_RESOLVED
														),

														(
															{
																"value": (
																	true
																),

																"configurable": (
																	false
																),

																"enumerable": (
																	false
																),

																"writable": (
																	false
																),
															}
														)
													);

													revokeCallback( );
												}
											}
										}
									),

									"get": (
										function get(
											targetCallback,
											property,
											value,
											proxyCallback
										){
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
											else
											if(
													(
															property
														===	THEN_FIELD_PROCEDURE
													)
											){
												if(
														(
																typeof
																targetCallback[ CALLBACK_SCOPE ]
															==	"undefined"
														)
													&&
														(
																typeof
																targetCallback[ CALLBACK_PARAMETER_LIST ]
															==	"undefined"
														)
												){
													throw	(
																new	Error(
																		(
																			[
																				"#cannot-call-callback;",

																				"undefined scope or parameter list;",
																			]
																		)
																	)
															);
												}

												return	(
															async	function( resolve, reject ){
																		try{
																			Object.defineProperty(
																				(
																					targetCallback
																				),

																				(
																					CALLBACK_RESULT
																				),

																				(
																					{
																						"value": (
																							await	(
																										targetCallback
																										.apply(
																											(
																												targetCallback[ CALLBACK_SCOPE ]
																											),

																											(
																												targetCallback[ CALLBACK_PARAMETER_LIST ]
																											)
																										)
																									)
																						),

																						"configurable": (
																							false
																						),

																						"enumerable": (
																							false
																						),

																						"writable": (
																							false
																						),
																					}
																				)
																			);

																			resolve(
																				(
																					targetCallback[ CALLBACK_RESULT ]
																				)
																			);

																			if(
																					(
																							eventTargetStatus
																						===	true
																					)
																			){
																				eventTarget.dispatchEvent(
																					(
																						new	CustomEvent(
																								(
																									"done"
																								),

																								(
																									{
																										"detail": (
																											{
																												"scope": (
																													targetCallback[ CALLBACK_SCOPE ]
																												),

																												"parameterList": (
																													targetCallback[ CALLBACK_PARAMETER_LIST ]
																												),

																												"result": (
																													targetCallback[ CALLBACK_RESULT ]
																												),
																											}
																										)
																									}
																								)
																							)
																					)
																				);
																			}
																		}
																		catch( error ){
																			Object.defineProperty(
																				(
																					targetCallback
																				),

																				(
																					CALLBACK_ERROR
																				),

																				(
																					{
																						"value": (
																							error
																						),

																						"configurable": (
																							false
																						),

																						"enumerable": (
																							false
																						),

																						"writable": (
																							false
																						),
																					}
																				)
																			);

																			reject( error );

																			if(
																					(
																							eventTargetStatus
																						===	true
																					)
																			){
																				eventTarget.dispatchEvent(
																					(
																						new	CustomEvent(
																								(
																									"error"
																								),

																								(
																									{
																										"detail": (
																											{
																												"scope": (
																													targetCallback[ CALLBACK_SCOPE ]
																												),

																												"parameterList": (
																													targetCallback[ CALLBACK_PARAMETER_LIST ]
																												),

																												"error": (
																													targetCallback[ CALLBACK_ERROR ]
																												),
																											}
																										)
																									}
																								)
																							)
																					)
																				);
																			}
																		}
																		finally{
																			if(
																					(
																							eventTargetStatus
																						===	true
																					)
																			){
																				eventTarget.dispatchEvent(
																					(
																						new	CustomEvent(
																								(
																									"end"
																								),

																								(
																									{
																										"detail": (
																											{
																												"scope": (
																													targetCallback[ CALLBACK_SCOPE ]
																												),

																												"parameterList": (
																													targetCallback[ CALLBACK_PARAMETER_LIST ]
																												),

																												"result": (
																													targetCallback[ CALLBACK_RESULT ]
																												),

																												"error": (
																													targetCallback[ CALLBACK_ERROR ]
																												),
																											}
																										)
																									}
																								)
																							)
																					)
																				);
																			}
																		}
																	}
														);
											}
											else
											if(
													(
															property
														===	ONCE_FIELD_PROCEDURE
													)
											){
												if(
														(
																eventTargetStatus
															===	true
														)
												){
													return	(
																function once( eventType, eventHandler ){
																	eventTarget.addEventListener(
																		(
																			eventType
																		),

																		function( event ){
																			(
																					(
																							typeof
																							eventHandler
																						==	"function"
																					)
																			)	&&
																			(
																				eventHandler(
																					(
																						event
																					),

																					(
																						event.detail
																					)
																				)
																			);
																		},

																		(
																			{
																				"once": (
																					true
																				)
																			}
																		)
																	);

																	return	(
																				proxyCallback
																			);
																}
															)
												}
												else{
													throw	(
																new Error(
																		[
																			"#restricted-flow;",

																			"restricted flow;",
																			"event target disabled;",
																		]
																	)
															);
												}
											}
											else
											if(
													(
															property
														===	TARGET_CALLBACK_FIELD_PROCEDURE
													)
											){
												return	(
															targetCallback
														);
											}
											else{
												return	(
															targetCallback[ property ]
														);
											}
										}
									),

									"getPrototypeOf": (
										function getPrototypeOf( targetCallback ){
											return	(
														Promise.prototype
													);
										}
									),
								}
							)
						)
					);

			return	(
						callbackResolve
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
										`${ error.stack };`
									]
								)
							)
					);
		}
	}
);

const configureResolveCallback = (
	function configureResolveCallback( option ){
		return	(
					resolveCallback.bind( option )
				);
	}
);
(
		resolveCallback
		.configure
	=	(
			configureResolveCallback
		)
);

(
		module
		.exports
	=	(
			resolveCallback
		)
);
