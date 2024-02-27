

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.8LIoqHTi.js","_app/immutable/chunks/scheduler.DLG9q3ft.js","_app/immutable/chunks/index.mC_JGRml.js"];
export const stylesheets = [];
export const fonts = [];
