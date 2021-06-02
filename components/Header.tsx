import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { login } from '../pages/api/login';
import { addUserToLocalStorage } from '../utils';

const Container = styled.header`
	padding: 0 40px;
	width: 100%;
	background: #6971e0;
	background: linear-gradient(90deg, #6971e0 12%, #5157ad 98%);
	display: flex;
	justify-content: space-around;
	align-items: center;
	font-size: 20px;
	color: white;
	font-weight: bold;
	z-index: 1;
	a {
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}
`;

const SelectBoardButton = styled.div.attrs({
	tabIndex: 0,
	role: 'button',
})`
	cursor: pointer;
	transition: all 200ms;

	&:hover {
		text-decoration: underline;
	}
`;

const LoginButton = styled.div`
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
`;

export default function Header({ setShowSelect, user, setUser, setShowProfile }) {
	const handleLogin = async () => {
		const loggedUser = await login();
		if (loggedUser) {
			const user = { name: loggedUser.displayName, id: loggedUser.uid };
			setUser(user);
			addUserToLocalStorage(user);
		}
	};

	const showSelect = typeof window !== 'undefined' && window.location.pathname !== '/create';
	return (
		<Container>
			<div>
				{showSelect && (
					<SelectBoardButton onClick={() => setShowSelect((prev) => !prev)}>🎲 בחירת לוח</SelectBoardButton>
				)}
			</div>

			<Link href="/">
				<a>🤓 פרופסור</a>
			</Link>

			{user && (
				<Link href="/create">
					<a>📝 יצירת לוח</a>
				</Link>
			)}

			<LoginButton
				onClick={!user ? handleLogin : () => setShowProfile((prev) => !prev)}
				style={{ position: user ? 'absolute' : 'relative', left: user ? '1vw' : null }}
			>
				{user ? `❖ היי ${user.name}` : ' התחברות'}
			</LoginButton>
		</Container>
	);
}
