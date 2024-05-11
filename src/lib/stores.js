import { writable } from 'svelte/store';

export const username = writable();
export const journalDatas = writable([]);
export const entryDatas = writable([]);

export const deskState = writable();

export const viewingShelf = writable([]);
export const namingShelf = writable([]);
export const stylingShelf = writable([]);
export const editingShelf = writable([]);
export const creatingShelf = writable([]);

export const currentJournal = writable({
	id: null,
	title: '',
	type: null,
});

export const currentEntry = writable({
	title: '',
	date: new Date().toLocaleDateString('en-CA'),
	text: '',
	username: '',
	journal: ''
});