import { writable } from 'svelte/store';

export const username = writable();

export const currentEntry = writable({
	title: '',
	date: new Date().toLocaleDateString('en-CA'),
	text: ''
});