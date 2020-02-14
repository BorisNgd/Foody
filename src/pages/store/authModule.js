import  firebase from 'firebase';

const authModule = {
    actions:{
        signUp({commit} , payload) {

            firebase.auth().createUserWithEmailAndPassword(payload.email , payload.password)
                .then(data => {
                    firebase.database().ref('users').child(data.user.uid).set({
                        uid:data.user.uid,
                        name:payload.name,
                        email:payload.email,
                        emailVerified:false
                    });
                    let newuser = data.user;
                    newuser.updateProfile({
                        displayName:payload.name,
                        profile_image:payload.profile_image,
                    })
                        .then(()=>{
                            console.log('updated profile');
                        })
                        .catch(err =>{
                            console.log(err.message);
                        })
                }).catch(err => {
                    console.log(err.message);
            });
        }
    }
}

export default authModule