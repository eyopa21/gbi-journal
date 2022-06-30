<template id="q-app">

  <router-view />
  {{showLoading}}
  {{showAlert}}
  
  <q-dialog v-model="showAlert" persistent>
      <q-card style="width: 500px;">
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{error}}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn @click="clearError" flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
 
</template>
<script>
import { defineComponent, computed, onMounted, ref } from 'vue';
import { useQuasar } from "quasar";
import {useStore} from 'vuex';
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup(){
    const $q = useQuasar();
    const store = useStore();
    const route = useRoute()
    const error = ref("");
    const showLoading =  computed(() => {
      
      if(store.state.myStore.loading ){
        $q.loading.show({
          message: 'Loading Pdfs. Please wait...',
          boxClass: 'bg-grey-2 text-grey-9',
          spinnerColor: 'primary'
        });
      }else{
        $q.loading.hide()
      }

      
    });
    const showAlert =  computed(() => {
      
      console.log("report",store.state.myStore.report);

      if(store.state.myStore.report !== ""){
        error.value = store.state.myStore.report;
        return true;
      }else{
        return false;
      }
    });


    onMounted(() =>{
      console.log("route", route);
    })
    return{
      showLoading,
      showAlert,
      error,
      clearError(){
         store.commit("myStore/addReport", "");
      }
    }
  }
})
</script>
