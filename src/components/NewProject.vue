<template>
  <!-- <v-layout row justify-center> -->
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-transition">
      <v-btn slot="activator" color="secondary" fab dark>
        <v-icon>add</v-icon>
      </v-btn>
      <v-card>
        <!-- top toolbar -->
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Create New Project</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <!-- Details/Instruction section -->
        <v-list>
          <v-subheader>Project Details</v-subheader>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Instruction</v-list-tile-title>
              <v-list-tile-sub-title>I am instruction text</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <!-- buttons -->
        <v-btn color="secondary" @click="step++" v-show="step < 8">Continue</v-btn>
        <v-btn color="secondary" @click="step--" v-show="step > 1">Back</v-btn>
        <v-btn @click.native="dialog = false" flat>Cancel</v-btn>

        <!--stepper-->
        <v-stepper v-model="step" class="mt-2" non-linear>
          <v-stepper-header>
            <!-- todo: add alert messages for incomplete steps https://vuetifyjs.com/en/components/steppers#introduction -->
            
            <!-- PROJECT - Assign Peronnel; Describe; Upload Project Files -->
            <v-stepper-step step="1" :complete="step > 1" editable>Project</v-stepper-step>

            <!-- MISSION - Assign Personnel; Assign Drone; Choose Sensor(s) -->
            <v-stepper-step step="2" :complete="step > 2" editable>Mission</v-stepper-step>

            <!-- REVIEW - Share with people via email -->
            <v-stepper-step step="3">Review</v-stepper-step>
          </v-stepper-header>

          <!-- step 1 - PROJECT -->
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card class="mb-5 scroll" flat>
                <v-form v-model="valid">
                  <v-layout>
                    <v-flex pa-5 xs12 md4>
                      <span class="underline">DETAILS</span>
                      <ProjectDetails />
                    </v-flex>

                    <v-flex pa-5 mf4>
                      <span class="underline">PERSONNEL</span>
                      <ListView />
                    </v-flex>

                  </v-layout>
                </v-form>
              </v-card>
            </v-stepper-content>

            <!-- step 2 - MISSION -->
            <v-stepper-content step="2">
              <v-layout>
                <v-card class="mb-5" flat>

                  <!-- <span class="underline">UAV</span> -->
                  <Selector 
                    v-bind:lbl=selector.UAV.label 
                    v-bind:items=selector.UAV.items 
                  />
                </v-card>

                <v-card class="mb-5" flat>
                  <!-- <span class="underline">MISSION PERSONNEL</span> -->
                  <Selector 
                    :lbl=selector.Personnel.label 
                    v-bind:items=selector.Personnel.items 
                  />
                </v-card>

                <v-card class="mb-5" flat>
                  <!-- <span class="underline">SENSOR</span> -->
                  <Selector 
                    v-bind:lbl=selector.Sensor.label 
                    v-bind:items=selector.Sensor.items 
                  />

                </v-card>
              </v-layout>
            </v-stepper-content>

            <!-- step 3 - REVIEW -->
            <v-stepper-content step="3">
              <h2>ATTACH FILES</h2>
              <v-card class="mb-5" flat>
                <div v-if="!file">
                  <v-btn @change="onFileChange" class="secondary">
                    <input id="fileBtn" type="file">
                    Upload
                  </v-btn>
                </div>
                <div v-else>
                  <!-- <img :src="__imageFile__" /> file image -->
                  <v-btn @click="removeFile">Remove File</v-btn>
                </div>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card>
    </v-dialog>
  <!-- </v-layout> -->
</template>

<script>
// import DatePicker from "./stepperComponents/DatePicker"
import Selector from "./stepperComponents/Selector"
import ListView from "./ListView"
import ProjectDetails from "./stepperComponents/ProjectDetails"


export default {
  components: {
    // DatePicker,
    Selector,
    ListView,
    ProjectDetails
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      step: 0,
      menu: false,
      file: "",
      selector: {
        UAV: {
          label: "UAV",
          items: ["UAV1", "UAV2"]
        },
        Personnel: {
          label: "Mission Personnel",
          items: ["Person1", "Person2"]
        },
        Sensor: {
          label: "Sensor",
          items: ["Sensor1", "Sensor2"]
        }
      }
    };
  },
  methods: {
    onFileChange(e) {
      console.log("onFileChange");
      // var files = e.target.files || e.dataTransfer.files;
      // if (!files.length)
      //   return;
    }
    // createImage(file) {
    //   var image = new Image();
    //   var reader = new FileReader();
    //   var vm = this;

    //   reader.onload = (e) => {
    //     vm.image = e.target.result;
    //   };
    //   reader.readAsDataURL(file);
    // },
    // removeImage: function (e) {
    //   this.image = '';
    // }
  }
};
</script>


<style>
.scroll {
  overflow-y: auto;
}

#fileBtn {
  position: absolute;
  opacity: 0;
  z-index: 3;
}

.underline {
  border-bottom: 2px solid #00243D;
}
</style>