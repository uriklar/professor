import { KeyboardEvent } from 'react';
import slugify from 'slugify';
import { AnswerState, IAnswer, IItem, IUser } from './types';

export function makeid(length: number) {
	const result = [];
	// Right now I just use numbers for ids as each board is under the
	// username path. To get more complex ids you can add letter here too
	const characters = '123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
	}
	return result.join('');
}

// Shuffles an array
export function shuffle(array) {
	let currentIndex = array.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

// Returns an array with the difference between two arrays
export function difference(arr1, arr2) {
	return arr1.filter((value) => !arr2.includes(value));
}

export function toChunks<T>(arr: any[], n: number): T[][] {
	return [...Array(Math.ceil(arr.length / n))].map((v, i) => arr.slice(i * n, (i + 1) * n));
}

// returns the id of the categroy if the selected items match a category
export function getConnectionCategory(selection: IItem[]) {
	const categories = selection.map((item) => item.categoryId);
	const uniqCategories = [...new Set(categories)];

	return uniqCategories.length === 1 ? uniqCategories[0] : null;
}

// adds or removes a value from the array
// according to weather it exists there or not
export function toggleSelection(arr: IItem[], item: IItem) {
	return arr.includes(item) ? arr.filter((i) => i.text !== item.text) : [...arr, item];
}

export function getSortedItems(items: IItem[], answers: IAnswer[]) {
	const matchedItems = answers.reduce((acc, answer) => {
		const categoryItems = items.filter((item) => item.categoryId === answer.categoryId);

		return [...acc, ...categoryItems];
	}, []);

	const remainingItems = difference(items, matchedItems);

	return {
		matchedItems: toChunks<IItem>(matchedItems, 4),
		remainingItems: toChunks<IItem>(remainingItems, 4),
	};
}

export function getItemState(item: IItem, selection: IItem[], answers: IAnswer[]) {
	if (selection.includes(item)) {
		// TODO: add another enum?
		return 'selected';
	}

	const itemAnswer = answers.find((answer) => answer.categoryId === item.categoryId);

	return itemAnswer?.state;
}

export const EMPTY_BOARD = {
	items: [
		{ text: '', categoryId: '1' },
		{ text: '', categoryId: '1' },
		{ text: '', categoryId: '1' },
		{ text: '', categoryId: '1' },
		{ text: '', categoryId: '2' },
		{ text: '', categoryId: '2' },
		{ text: '', categoryId: '2' },
		{ text: '', categoryId: '2' },
		{ text: '', categoryId: '3' },
		{ text: '', categoryId: '3' },
		{ text: '', categoryId: '3' },
		{ text: '', categoryId: '3' },
		{ text: '', categoryId: '4' },
		{ text: '', categoryId: '4' },
		{ text: '', categoryId: '4' },
		{ text: '', categoryId: '4' },
	],
	clues: {
		'1': '',
		'2': '',
		'3': '',
		'4': '',
	},
	answers: {
		'1': [],
		'2': [],
		'3': [],
		'4': [],
	},
	likes: 0,
	user: null,
};

export const isBrowser = () => typeof window !== 'undefined';

export const validateIsEnglish = (e: KeyboardEvent) => {
	const regex = new RegExp('^[a-zA-Z0-9 ]+$');
	const str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
	if (regex.test(str)) return true;
	e.preventDefault();
	return false;
};

export const generateBoardUrl = (username: string, id: string) =>
	isBrowser() ? `${window.location.origin}/${slugify(username)}/${id}` : '';

export const getBoardUrlFromId = (id: string) => {
	const splitId = id.split('-');
	const boardId = splitId[splitId.length - 1];
	splitId.splice(-1, 1);
	return `/${splitId.join('-')}/${boardId}`;
};

export function isFullySolved(answers: IAnswer[], state: AnswerState = AnswerState.Answered): boolean {
	const answeredCategories = answers.filter((answer) => answer.state === state);

	return answeredCategories.length === 4;
}

export const LOCAL_STORAGE_KEY = 'openprofessor';

export function getLocalStorage(boardId: number = null) {
	if (!isBrowser()) {
		return {};
	}
	const storage = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');

	return boardId ? storage[boardId] : storage;
}

export function clearBoardFromLocalStorage(boardId: string = null) {
	if (!boardId) {
		return;
	}

	const storedData = getLocalStorage();
	const cleanBoard = { ...storedData[boardId] };
	delete cleanBoard.answers;

	storedData[boardId] = cleanBoard;

	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ ...storedData }));

	return cleanBoard;
}

export function squareColorByState(state: AnswerState | 'selected') {
	switch (state) {
		case 'selected':
			return '#E0C353';
		case AnswerState.Matched:
			return '#5158AD';
		case AnswerState.Answered:
			return '#4B4C61';
		default:
			return '#64B5ED';
	}
}

export function stripCharsForStringCompare(string: string) {
	return string.replace("'", '');
}

export function getNextFreeId(username: string, ids: string[]) {
	const userIds = ids
		.reduce((acc, id) => {
			const splitId = id.split('-');
			const boardId = splitId[splitId.length - 1];
			splitId.splice(-1, 1);
			const boardUsername = splitId.join('-');

			return boardUsername === username ? [...acc, Number(boardId)] : acc;
		}, [])
		.sort((a, b) => a - b);
	let lowest = -1;
	for (let i = 1; i < userIds.length + 1; ++i) {
		if (userIds[i - 1] != i) {
			lowest = i;
			break;
		}
	}
	if (lowest == -1) {
		if (!userIds.length) {
			lowest = 1;
		} else {
			lowest = userIds[userIds.length - 1] + 1;
		}
	}

	return String(lowest);
}

export function sortBySolvedState(_a: IAnswer[], _b: IAnswer[], sortDir: 'asc' | 'desc') {
	let a, b;

	if (sortDir === 'asc') {
		a = _a;
		b = _b;
	} else {
		b = _a;
		a = _b;
	}

	if (!a && !b) {
		return 1;
	}

	if (a && !b) {
		return 1;
	}

	if (b && !a) {
		return -1;
	}

	if (a.length !== b.length) {
		return a.length - b.length;
	}

	const aAnswered = a.filter((answer) => answer.state === AnswerState.Answered);
	const bAnswered = b.filter((answer) => answer.state === AnswerState.Answered);

	return aAnswered.length - bAnswered.length;
}

export function addUserToLocalStorage(user: IUser) {
	if (!isBrowser()) {
		return;
	}

	const currentData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
	localStorage.setItem(
		LOCAL_STORAGE_KEY,
		JSON.stringify({
			...currentData,
			user: user,
		})
	);
}

export function getUserFromLocalStorage() {
	if (!isBrowser()) {
		return {};
	}
	const { user } = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');

	return user;
}

export function getIsLogoutPressed() {
	if (!isBrowser()) {
		return {};
	}
	const { logoutPressed } = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');

	return logoutPressed;
}

export function setLogoutPressed(value: boolean) {
	if (!isBrowser()) {
		return;
	}

	const currentData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
	localStorage.setItem(
		LOCAL_STORAGE_KEY,
		JSON.stringify({
			...currentData,
			logoutPressed: value,
		})
	);
}
