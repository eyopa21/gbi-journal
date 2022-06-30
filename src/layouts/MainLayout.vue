<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title v-if="!$route.fullPath.includes('search')">
          Gbi-journal
        </q-toolbar-title>
        <q-toolbar-title v-else>
          <q-input
            rounded
            style="margin-top: 20px"
            bg-color="white"
            bottom-slots
            v-model="text"
            :label="text ? '' : 'Enter the keyword here...'"
            dense
          >
            <template v-slot:append>
              <q-icon
                style="padding: 5px"
                v-if="text !== ''"
                name="close"
                @click="text = ''"
                class="cursor-pointer"
              />
            </template>
          </q-input>
        </q-toolbar-title>

        <q-btn v-if="$route.fullPath.includes('search')">
          <q-icon style="margin: 10px" rounded size="30px" name="search"
        /></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <div>
          <q-chip
            style="width: 70%"
            color="primary"
            text-color="white"
            icon="event"
          >
            PDF Categories
          </q-chip>
        </div>
        <div class="q-pt-xl">
          <q-btn-dropdown
            split
            to="/about"
            color="teal"
            rounded
            label="Select Your Department"
            style="width: 99%"
            dense
          >
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section v-ripple @click="SW">
                  Soeftware enginerrig
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section v-ripple @click="CS"> CS </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section v-ripple @click="elec"> Electrical Engineering </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section v-ripple @click="mech"> Mechanincal </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section v-ripple @click="food"> Food </q-item-section>
              </q-item>

            </q-list>
          </q-btn-dropdown>
        </div>
      </q-list>
    </q-drawer>

    <q-footer>
      <q-tabs
        v-model="tab"
        dense
        no-caps
        inline-label
        class="bg-purple text-white shadow-2"
      >
        <q-route-tab to="/about" name="mails" icon="person" label="About" />
        <q-route-tab to="/" name="alarms" icon="home" label="Home" />
        
        <q-route-tab to="/search" name="search" icon="search" label="Search" />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const store = useStore();
    const leftDrawerOpen = ref(false);
    const getPdfs = computed(() => {
      console.log(store.state.myStore.pdfs);

      return store.state.myStore.pdfs;
    });

    return {
      getPdfs,

      leftDrawerOpen,

      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      CS() {
        store.dispatch("myStore/addData", "Computer Science");
      },
      SW() {
        store.dispatch("myStore/addData", "Software Engineering");
      },
      elec() {
        store.dispatch("myStore/addData", "Electrical Engineering")
      },
      mech(){
        store.dispatch("myStore/addData", "Mechanical")
      },
      food(){
        store.dispatch("myStore/addData", "Food")
      },
      tab: ref("mails"),
      text: ref(""),
    };
  },
});
</script>

