export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","Wood Texture.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.DVQ3bxee.js","app":"_app/immutable/entry/app.0IcpGKHQ.js","imports":["_app/immutable/entry/start.DVQ3bxee.js","_app/immutable/chunks/entry.bU5K0NFK.js","_app/immutable/chunks/scheduler.A3c16UKH.js","_app/immutable/chunks/index.DjQ3m4wq.js","_app/immutable/entry/app.0IcpGKHQ.js","_app/immutable/chunks/preload-helper.BQ24v_F8.js","_app/immutable/chunks/scheduler.A3c16UKH.js","_app/immutable/chunks/index.D-KNYlao.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
