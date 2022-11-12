!function(f){"function"==typeof define&&define.amd?define(f):f()}((function(){"use strict";
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
*/const RESOLVE_CALLBACK=Symbol("resolve-callback"),CALLBACK_RESOLVED=Symbol("callback-resolved"),CALLBACK_SCOPE=Symbol("callback-scope"),CALLBACK_PARAMETER_LIST=Symbol("callback-parameter-list"),resolveCallback=function resolveCallback(callback){try{if("function"!=typeof callback)throw new Error(["#invalid-callback-parameter;","invalid callback parameter;","@callback:",`${callback};`]);if(!0===callback[RESOLVE_CALLBACK])return callback;if(!0===callback[CALLBACK_RESOLVED])throw new Error(["#invalid-callback-parameter;","invalid callback parameter;","callback resolved;","@callback:",`${callback};`]);let revocableStatus=!0;"object"==typeof this&&null!==this&&"revocableStatus"in this==!0&&"boolean"==typeof this.revocableStatus&&(revocableStatus=this.revocableStatus);const{proxy:callbackResolve,revoke:revokeCallback}=Proxy.revocable(callback,{apply:function apply(targetCallback,scope,parameterList){try{return Object.defineProperty(targetCallback,CALLBACK_SCOPE,{value:scope,configurable:!1,enumerable:!1,writable:!1}),Object.defineProperty(targetCallback,CALLBACK_PARAMETER_LIST,{value:parameterList,configurable:!1,enumerable:!1,writable:!1}),callbackResolve}finally{!0===revocableStatus&&(Object.defineProperty(targetCallback,CALLBACK_RESOLVED,{value:!0,configurable:!1,enumerable:!1,writable:!1}),revokeCallback())}},get:function get(targetCallback,property,value,proxyCallback){if(property===RESOLVE_CALLBACK)return!0;if("then"===property){if(void 0===targetCallback[CALLBACK_SCOPE]&&void 0===targetCallback[CALLBACK_PARAMETER_LIST])throw new Error(["#cannot-call-callback;","undefined scope or parameter list;"]);return async function(resolve,reject){try{resolve(await targetCallback.apply(targetCallback[CALLBACK_SCOPE],targetCallback[CALLBACK_PARAMETER_LIST]))}catch(error){reject(error)}}}return targetCallback[property]},getPrototypeOf:function getPrototypeOf(targetCallback){return Promise.prototype}});return Object.defineProperty(callback,"targetCallback",{value:callback,configurable:!1,enumerable:!1,writable:!1}),callbackResolve}catch(error){throw new Error(["#cannot-resolve-callback;","cannot resolve callback;","cannot execute resolve callback;","@error-data:",`${error.stack};`])}};resolveCallback.configure=function configureResolveCallback(option){return resolveCallback.bind(option)},module.exports=resolveCallback}));