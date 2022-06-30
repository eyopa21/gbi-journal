<template>
  <q-page class="flex flex-center">
    <q-card class="my-card bg-grey-4 text-dark">
      <div class="q-pa-md">
        <div class="q-gutter-y-md column" style="width: 400px">
          <q-form
            action="backend/index.js"
            mehtod="post"
            @submit="onSubmit"
            class="q-gutter-md"
            enctype="multipart/form-data"
          >
            <q-card-section>
            <q-select standout="bg-teal text-white" v-model="addForm.category" :options="options" label="Custom standout" />
              <q-input
                class="q-ma-sm"
                borderd
                color="blue"
                filled
                v-model="addForm.title"
                label="Title"
              >
                <template v-if="addForm.title" v-slot:append>
                  <q-icon
                    name="cancel"
                    @click.stop="addForm.title = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
              <q-input
                class="q-ma-sm"
                color="blue"
                filled
                v-model="addForm.description"
                label="Description"
              >
                <template v-if="addForm.description" v-slot:append>
                  <q-icon
                    name="cancel"
                    @click.stop="addForm.description = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
              
              <q-input
                v-model="addForm.file.theFile"
                @update:model-value="
                  (val) => {
                    file = val[0];
                  }
                "
                filled
                accept="application/pdf"
                type="file"
                hint="Native file"
                name="file"
                id="file"
              />
              <div class="q-pa-md" style="max-width: 300px">
                <q-input
                  class="q-ma-sm"
                  v-model="text"
                  filled
                  type="textarea"
                />
              </div>
            </q-card-section>

            <q-card-actions>
              <div>
                <q-btn label="Submit" type="submit" color="primary" /></div
            ></q-card-actions>
          </q-form>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import {useQuasar} from 'quasar';

export default defineComponent({
  name: "PageCreatePost",
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const file = ref(null);
    const addForm = ref({
      title: "",
      description: "",
      category: "",
      file: {
        theFile: null,
        name: "",
        base64: "",
        extenstion: "",
        metaInfo: ""
      },
    });
    return {
      
      options: [
        'Software Engineering', 'Computer Science', 'Electrical Engineering', 'Mechanical', 'Food'
      ],


      text: ref(""),
      //file,

      addForm,
      async onSubmit() {
        if (addForm.value.file.theFile) {
         
          //console.log(addForm.value.file.theFile[0].type);
          if (addForm.value.file.theFile[0].type == "application/pdf") {
            console.log("good");
             var reader = new FileReader();
            reader.readAsDataURL(addForm.value.file.theFile[0]);
            reader.onload = function () {
              console.log(reader.result.split(",")[0]);
              addForm.value.file.metaInfo = reader.result.split(",")[0];
              console.log(addForm.value.file.metaInfo);
              addForm.value.file.base64 = reader.result.split(",")[1];
              store.dispatch("myStore/postRequest", addForm.value);
            };
          }else{
            console.log("you gotta choose pdf files only");
            $q.notify({
          message: 'You gotta choose pdf files only',
          progress: true,
          color: 'red-4',
          position: "right",
          icon: 'announcement'

         
        })
          }
        
           
          
        } else {
          console.log("please select a file");
          $q.notify({
          message: 'Please select a file to upload',
          progress: true,
          color: 'red-4',
          position: "right",
          icon: 'announcement'

         
        })
        }

        //console.log(addForm.value);
        //store.dispatch('myStore/addData', addForm.value)
        //store.dispatch("myStore/postRequest", addForm.value);
        //console.log(addForm.value);
      },

      showError() {
        if (addForm.value.file.theFile) {
          console.log("hereee");
          console.log(addForm.value.file.theFile[0].type);
          if (addForm.value.file.theFile[0].type == "image/jpeg") {
            console.log("good");
          }
        }
      },

     
    };
  },
});
</script>
