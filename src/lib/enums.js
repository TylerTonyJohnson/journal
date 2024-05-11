export class DeskStates {
	constructor(value) {
		this.value = value;
	}
	static Entering = new DeskStates('entering');
	static Creating = new DeskStates('creating');
	static Viewing = new DeskStates('viewing');
	static Styling = new DeskStates('styling');
	static Naming = new DeskStates('naming');
	static Editing = new DeskStates('editing');
}

export class JournalStates {
	constructor(value) {
		this.value = value;
	}
	static Viewing = new JournalStates('viewing');
	static Naming = new JournalStates('naming');
	static Editing = new JournalStates('editing');
}

export class JournalTypes {
	constructor(value) {
		this.value = value;
	}
	static Legal = new JournalTypes('legal');
	static Bullet = new JournalTypes('bullet');
	static Composition = new JournalTypes('composition');
}
