import React from 'react';
import slugify from 'slugify';
import BoardForm from '../components/BoardForm';
import db from '../db';
import { IBoard } from '../types';
import { makeid, getUserFromLocalStorage } from '../utils';

const ID = makeid(4);

const onSubmit = async (e: React.FormEvent<HTMLFormElement>, username: string, board: IBoard, boardUrl: string) => {
	e.preventDefault();
	try {
		const response = await fetch('/api/create', {
			method: 'POST',
			body: JSON.stringify({
				board: { ...board, id: slugify(`${username} ${board.id}`), user: getUserFromLocalStorage() },
			}),
		});
		const responseJson = await response.json();

		if (typeof window !== 'undefined') {
			window.location.href = `${boardUrl}?toast=new`;
		}
	} catch {}
};

export default function Create({ ids }) {
	return <BoardForm onSubmit={onSubmit} ids={ids} />;
}

export async function getServerSideProps({ params }) {
	const querySnapshot = await db.collection('boards').select().get();
	const ids = querySnapshot.docs.map((doc) => doc.id);

	return {
		props: {
			ids,
		},
	};
}
