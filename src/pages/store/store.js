import Vue from 'vue';
import Vuex from 'vuex';
import authModule from './authModule';
import fileModule from './fileModule';

Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        auth: authModule,
        file: fileModule
    },
    state: {
        alert_message:null
    },
    getters:{
        alert_message:state=>state.alert_message
    },
    mutations:{
        setAlertMessage(state , payload){
            state.alert_message = payload
        }
    }

});