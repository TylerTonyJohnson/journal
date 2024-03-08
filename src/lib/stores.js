import { writable } from 'svelte/store';

export const username = writable();

export const currentJournal = writable({
	id: null,
	title: '',
	type: null,
});

export const currentEntry = writable({
	title: '',
	date: new Date().toLocaleDateString('en-CA'),
	text: ''
});