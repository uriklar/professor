import React, { useRef } from 'react';
import styled from 'styled-components';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { setLogoutPressed } from '../utils';

const Container = styled.div<{ open: boolean }>`
	position: absolute;
	bottom: 100%;
	left: 0;
	overflow: auto;
	padding: 16px 50px 16px 50px;
	background-color: white;
	box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
	transition: transform 200ms ease-in;
	transform: ${({ open }) => (open ? 'translateY(100%)' : 'translateY(0%)')};
	z-index: 0;
`;

const LogoutButton = styled.div.attrs({
	role: 'button',
})`
	font-weight: bold;
	cursor: pointer;
	&:hover {
		color: red;
		text-decoration: underline;
	}
`;

interface Props {
	open: boolean;
	onClose: () => void;
}

export default function ProfileOverlay({ open, onClose }: Props) {
	const ref = useRef();
	useOnClickOutside(ref, onClose);

	const handleLogout = () => {
		onClose();
		setLogoutPressed(true);
	};

	return (
		<Container open={open} ref={ref}>
			<LogoutButton onClick={handleLogout}>התנתק</LogoutButton>
		</Container>
	);
}
