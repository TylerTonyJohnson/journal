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
		client: {"start":"_app/immutable/entry/start.C5wIa7Pg.js","app":"_app/immutable/entry/app.DSfsKTY6.js","imports":["_app/immutable/entry/start.C5wIa7Pg.js","_app/immutable/chunks/entry.C6Xiuxf3.js","_app/immutable/chunks/scheduler.Cqv-prxa.js","_app/immutable/chunks/index.sEEYBr4Z.js","_app/immutable/entry/app.DSfsKTY6.js","_app/immutable/chunks/preload-helper.BQ24v_F8.js","_app/immutable/chunks/scheduler.Cqv-prxa.js","_app/immutable/chunks/index.CfosSt4s.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
