import db, { getBoard, getIds, getLikes } from '../db';
import Board, { Props } from '../components/Board';
import { MOCK_BOARD } from '../mocks';

export default function Home({
	board,
	ids,
	showSelect,
	setShowSelect,
	likes,
	showProfile,
	setShowProfile,
	logout,
}: Props) {
	return (
		<Board
			board={board}
			ids={ids}
			showSelect={showSelect}
			setShowSelect={setShowSelect}
			likes={likes}
			showProfile={showProfile}
			setShowProfile={setShowProfile}
			logout={logout}
		/>
	);
}

export async function getServerSideProps({ params }) {
	// I tried creating a node script to seed the data, but had issues
	// If you feel like giving this a shot for a better solution then what I did here, feel free
	// Seed data - COMMENT THESE LINES OUT AFTER FIRST TIME RUNNING THE APP
	// const docRef = db.collection('boards').doc('testing-1');
	// await docRef.set(MOCK_BOARD);
	// Seed data - COMMENT THESE LINES OUT AFTER FIRST TIME RUNNING THE APP

	const ids = await getIds();
	const randomBoard = ids[Math.floor(Math.random() * ids.length)];
	const [board, likes] = await Promise.all([getBoard(randomBoard), getLikes()]);
	return {
		props: {
			board,
			ids,
			likes,
		},
	};
}

// Uncomment this instead of the existing function if you don't want to use firebase
// export async function getServerSideProps() {
// 	return {
// 		props: {
// 			board: MOCK_BOARD,
// 			ids: ['123-123'],
// 		},
// 	};
// }
