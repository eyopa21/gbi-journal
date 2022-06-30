import { firebaseAuth, firebaseDb, storage, fireStore } from "boot/firebase"

import { addDoc, collection } from "firebase/firestore"
// import Vue from 'vue'   // in Vue 2
import * as Vue from 'vue' // in Vue 3
import axios from 'axios'




const state = {
    pdfs: {},
    loading: false,
    report: '',
}
const mutations = {
    addPdfs(state, payload) {
        state.pdfs = payload;
    },
    toggleLoading(state, payload) {
        state.loading = payload;
    },
    addReport(state, payload) {
        state.report = payload;
    }
}

const actions = {
    async addData({ commit }, payload) {

        commit('toggleLoading', true)


        axios.get('http://localhost:3000/', {
                params: {
                    product: payload
                }
            })
            .then(response => {

                console.log("get request sent");
                console.log("responseeee", response);
                commit('addPdfs', response.data)
                commit('toggleLoading', false)
                this.$router.push('/');


            }).catch((e) => {
                console.log(e);
                commit('toggleLoading', false)
            })



    },


    async postRequest({ commit }, payload) {

        commit('toggleLoading', true)

        console.log('paylod', payload);



        let formData = new FormData();
        formData.append("title", payload.title);
        formData.append("description", payload.description);
        formData.append("category", payload.category);
        formData.append("file", payload.file.theFile);
        formData.append("base64", payload.file.base64);
        //formData.append("base64", payload.file.metaInfo);

        console.log("fileeee", formData.getAll('file').toString());



        axios.post('http://localhost:3000/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                console.log("post request sent");
                console.log("ressss", response.data);
                if (response.data == "added successfully") {
                    console.log("we are good to go");
                }
                this.$router.push('/')
                commit('toggleLoading', false);
                commit('addReport', response.data)
            }).catch(e => {
                console.log("post error", e.message);
                commit('addReport', e.message)
                commit('toggleLoading', false)
            })

    },



}

const getters = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}