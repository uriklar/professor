import Dialog from '@reach/dialog';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '@reach/dialog/styles.css';
import Button from './common/Button';
import { getIsLogoutPressed, setLogoutPressed } from '../utils';

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function useDialog() {
	const logoutPressed = getIsLogoutPressed();
	const [showDialog, setShowDialog] = useState(false);
	const closeDialog = () => {
		setShowDialog(false);
		setLogoutPressed(false);
	};

	useEffect(() => {
		if (logoutPressed) {
			setShowDialog(true);
		}
	}, [logoutPressed]);

	return {
		showDialog,
		closeDialog,
	};
}

interface Props {
	logout: () => void;
}

export default function LogoutDialog({ logout }: Props) {
	const { showDialog, closeDialog } = useDialog();

	const handleLogout = () => {
		closeDialog();
		logout();
	};

	return (
		<Dialog isOpen={showDialog} onDismiss={closeDialog}>
			<ContentContainer>
				<p>
					אתה בטוח שאתה רוצה להתנתק? <br /> לא תוכל ליצור לוחות חדשים או לערוך לוחות שיצרת
				</p>
				<Button onClick={handleLogout} style={{ marginBottom: 10 }}>
					כן, התנתק
				</Button>
				<Button onClick={closeDialog}>לא, הישאר</Button>
			</ContentContainer>
		</Dialog>
	);
}
