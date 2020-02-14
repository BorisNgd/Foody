import Vue from 'vue';
import Vuex from 'vuex';
import authModule from './authModule';

Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        auth: authModule
    },
    state: {
        count:0,
        message:'message from vue',
    },
    mutations:{

    }

});