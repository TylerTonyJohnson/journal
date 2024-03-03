

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.5tn9hBPm.js","_app/immutable/chunks/scheduler.Cqv-prxa.js","_app/immutable/chunks/index.CfosSt4s.js","_app/immutable/chunks/entry.C6Xiuxf3.js","_app/immutable/chunks/index.sEEYBr4Z.js"];
export const stylesheets = [];
export const fonts = [];
