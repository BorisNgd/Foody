import firebase from 'firebase';

const authModule = {
    state: {
        signed_up: false
    },
    getters: {
        signed_up: state => state.signed_up
    },
    mutations: {
        setSignedUp(state, payload) {
            state.signed_up = payload
        }
    },
    actions: {
        signUp({
            commit
        }, payload) {

            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(data => {
                    firebase.database().ref('users').child(data.user.uid).set({
                        uid: data.user.uid,
                        name: payload.name,
                        email: payload.email,
                        emailVerified: false,
                        photo_url: payload.profile_image
                    });
                    let newuser = data.user;
                    newuser.updateProfile({
                            displayName: payload.name,
                            profile_image: payload.profile_image,
                        })
                        .then(() => {
                            console.log('updated profile');
                        })
                        .catch(err => {
                            commit('setSignedUp', true)
                            console.log(err.message);
                            commit('setAlertMessage', err.message)
                        })
                }).catch(err => {
                    console.log(err.message);
                    commit('setAlertMessage', err.message)

                });
        }
    }
}

export default authModule