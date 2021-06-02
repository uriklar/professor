import firebase from 'firebase';

export const login = async () => {
	var provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope('profile');
	provider.addScope('email');
	return firebase
		.auth()
		.signInWithPopup(provider)
		.then(function (result) {
			// This gives you a Google Access Token.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var user = result.user;
			return user;
			//change to response object
		})
		.catch(() => {
			return null;
		});
};
