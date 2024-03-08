

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DWdS0aQZ.js","_app/immutable/chunks/scheduler.vMvKFjkb.js","_app/immutable/chunks/index.BjiATntE.js"];
export const stylesheets = [];
export const fonts = [];
