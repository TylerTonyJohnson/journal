

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.B9J9jUbJ.js","_app/immutable/chunks/scheduler.A3c16UKH.js","_app/immutable/chunks/index.D-KNYlao.js"];
export const stylesheets = [];
export const fonts = [];
