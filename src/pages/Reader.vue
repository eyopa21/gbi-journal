<template>
  <q-page class="flex flex-center">

    <div class="row">
      <div class="col-12">
        <q-card  class="q-ma-lg">
          <iframe :src="getPdfs.url" class="full-width" style="height: 250px; border: none"></iframe>
          
          <q-card-section>
            <div class="text-h6">Title: {{ getPdfs.title }}</div>
            <div class="text-subtitle2">Author: {{ getPdfs.pdfInfo.Author }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Description: {{ getPdfs.url }}
          </q-card-section>
          <q-card-section class="q-pt-none">
            Number of pages: {{ getPdfs.pdfPages }}
          </q-card-section>
          <q-separator />
          
          <q-card-actions>
          
          <q-card-actions>
          <q-btn flat color="primary">
          <a :href="getPdfs.url" target="_blank" style="text-decoration: none;">view</a>
        </q-btn>
        <q-btn flat round icon="event" />
        
      </q-card-actions>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    
  </q-page>
</template>

<script>
import { defineComponent, onMounted, computed } from 'vue';
import {useRoute} from 'vue-router'
import { useStore} from 'vuex';

export default defineComponent({
  name: 'PageReader',
  setup(){
    const route = useRoute();
    const store = useStore();
    const getPdfs =  computed(() => {
      console.log(store.state.myStore.pdfs);
      return store.state.myStore.pdfs[route.params.id];
    });
    onMounted(() => {
      console.log("param",route.params.id)
      console.log("route",route)
    });
    return {
getPdfs
    }
  }

})
</script>
