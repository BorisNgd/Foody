import  firebase from 'firebase';

const fileModule = {
    state:{
        profile_image:
        "https://www.searchpng.com/wp-content/uploads/2019/02/Deafult-Profile-Pitcher.png",
        files:null
    },
    getters:{
        profile_image:state=>state.profile_image,
        files:state=>state.files,

    },
    mutations:{
        setImageURL(state , payload){
            state.profile_image = payload
        },
        setFiles(state , payload){
            state.files = payload
        }
    },
    actions:{
        readFile({commit}){
            const files = event.target.files;
            commit('setFiles' , files)
            const fileReader = new FileReader();
            let file = files[0]
            if(file['size'] < 200000){
                fileReader.readAsDataURL(file)
                fileReader.addEventListener('load',()=>{
                    let imageUrl = fileReader.result;
                    commit('setImageURL' , imageUrl)
                })
            }else{
                commit('setAlertMessage','The image size is greater than 200KB' )
                return 
            }

        },
        uploadFile({commit , state}){
            return new Promise((resolve , reject)=>{
                var file = state.files[0]
                var storageRef = firebase.storage().ref('profile/'+file.name)
                var task = storageRef.put(file)
                task.on('state_changed' , (snapshot)=>{
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes * 100);
                    console.log('Upload is ' + progress + '% done');
                    switch(snapshot.state){
                        case firebase.storage.TaskState.PAUSED:
                            console.log('Upload is paused');
                            break;
                            case firebase.storage.TaskState.RUNNING:
                            console.log('Upload is running');
                            break;
                    }
                },(error) =>{

                }, ()=>{

                    task.snapshot.ref.getDownloadURL().then((downloadURL) =>{
                        resolve(downloadURL)
                        console.log('File available at ' , downloadURL);
                    })
                })
            })
        }
    }
}

export default fileModule