

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.nJBev4MR.js","_app/immutable/chunks/scheduler.Cqv-prxa.js","_app/immutable/chunks/index.CfosSt4s.js"];
export const stylesheets = [];
export const fonts = [];
