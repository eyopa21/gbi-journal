<template>
  <q-page class="flex flex-center">
    <div class="row" v-if="getPdfs.length">
      <div class="col-12" style="width: 100%">
        <q-card v-for="pdfs in getPdfs" :key="pdfs" class="q-ma-lg">
          <iframe
            :src="pdfs.url"
            class="full-width"
            style="height: 250px; border: none"
            
          ></iframe>

          <q-card-section>
            <div class="text-h6">Title: {{ pdfs.title }}</div>
            <div class="text-subtitle2">Author: {{ pdfs.pdfInfo.Author }}</div>
          </q-card-section>
      

          <q-card-section class="q-pt-none">
            Description: {{ lorem }}
          </q-card-section>
          <q-card-section class="q-pt-none">
            Number of pages: {{ pdfs.pdfPages }}
          </q-card-section>
          <q-separator />

          <q-card-actions>
            <q-card-actions>
              <q-btn flat color="primary">
                <a
                  :href="pdfs.url"
                  target="_blank"
                  style="text-decoration: none"
                 
                  >view</a
                >
              </q-btn>
              <q-btn flat round icon="event" />
              
              
            </q-card-actions>
          </q-card-actions>
        </q-card>
      </div>
     
    </div>
    <div v-else>
      <div class="q-pa-md">
        <q-carousel
          v-model="slide"
          transition-prev="scale"
          transition-next="scale"
          swipeable
          animated
          control-color="white"
          navigation
          padding
          arrows
          height="300px"
          class="bg-primary text-white shadow-1 rounded-borders"
        >
          <template v-slot:navigation-icon="{ active, btnProps, onClick }">
            <q-btn
              v-if="active"
              size="lg"
              icon="home"
              color="yellow"
              flat
              round
              dense
              @click="onClick"
            />
            <q-btn
              v-else
              size="sm"
              :icon="btnProps.icon"
              color="white"
              flat
              round
              dense
              @click="onClick"
            />
          </template>

          <q-carousel-slide name="style" class="column no-wrap flex-center">
            <q-icon name="style" size="56px" />
            <div class="q-mt-md text-center">
              Developed By Bahirdar universtity students
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="tv" class="column no-wrap flex-center">
            <q-icon name="live_tv" size="56px" />
            <div class="q-mt-md text-center">
              Software engineering department
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="layers" class="column no-wrap flex-center">
            <q-icon name="layers" size="56px" />
            <div class="q-mt-md text-center">
              Eyob Nigussie
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="map" class="column no-wrap flex-center">
            <q-icon name="terrain" size="56px" />
            <div class="q-mt-md text-center">
              BDU1103482
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, computed, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "PageIndex",
  setup() {
    const store = useStore();
    const getPdfs = computed(() => {
      console.log(store.state.myStore.pdfs);
      return store.state.myStore.pdfs;
    });
    onMounted(() => {
      if (store.state.myStore.pdfs.length) {
        console.log("not empty", store.state.myStore.pdfs);
      } else {
        console.log("empty state");
      }
    });

    return {
      getPdfs,
      slide: ref("style"),
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.",
    };
  },
});
</script>
<style lang="sass" scoped>
</style>
