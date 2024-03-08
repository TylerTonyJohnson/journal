export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.CB0wKpkN.js","app":"_app/immutable/entry/app.Ba3Iv805.js","imports":["_app/immutable/entry/start.CB0wKpkN.js","_app/immutable/chunks/entry.BFmtz1vx.js","_app/immutable/chunks/scheduler.vMvKFjkb.js","_app/immutable/chunks/index.QUhB6F9E.js","_app/immutable/entry/app.Ba3Iv805.js","_app/immutable/chunks/preload-helper.BQ24v_F8.js","_app/immutable/chunks/scheduler.vMvKFjkb.js","_app/immutable/chunks/index.BjiATntE.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
