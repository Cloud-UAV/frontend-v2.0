<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" fullscreen>
      <v-btn flat slot="activator" color="grey darken-4" dark>
        <v-icon>add</v-icon>
      </v-btn>

      <v-card>
        <v-card-title class="headline secondary white--text" primary-title>{{ dialogTitle }}</v-card-title>

        <v-card-text>
          <v-text-field v-model="mission.name" label="Name"></v-text-field>
          <v-textarea v-model="mission.description" label="Description"></v-textarea>
          <div>
            <!-- <v-card-text>Mission Dates</v-card-text> -->
            <!-- <DatePicker/> -->
            <strong>Mission START</strong>
            <DateTimePicker currentPicker="missionStartDateTime" />
            <strong>Mission END</strong>
            <DateTimePicker currentPicker="missionEndDateTime" />
          </div>

          <v-select :items="uavs" item-text="name" label="UAV"></v-select>

          <!-- sensors -->
          <v-btn @click="addNewSensor">Add Mission Sensor</v-btn>
          <div :key="sensor.name" v-for="(sensor, index) in sensorRow">
            <v-layout>
              <v-flex xs12 md6>
                <v-select 
                  :items="sensors"  
                  item-text="name" 
                  item-value="id" 
                  label="Sensors"
                  @change="selectSensor"
                ></v-select>
              </v-flex>
              <v-btn flat @click="removeMissionSensor(index)"><v-icon>close</v-icon></v-btn>
            </v-layout>
          </div>

          <v-btn @click="addNewPersonnel">Add Mission Personnel</v-btn>

          <div :key="person.name" v-for="(person, index) in personnelRow">
            <v-layout>
              <v-flex xs12 md6>
                <v-select 
                  :items="personnel"
                  item-text="name"
                  item-value="id" 
                  label="Person"

                  @change="selectPerson($event, index)"
                ></v-select>
              </v-flex>

              <v-flex xs12 md6>
                <v-select 
                  :items="roles"
                  multiple
                  chips
                  item-text="name"
                  item-value="id"
                  label="Role"
                  @change="selectRole($event, index)"
                ></v-select>
              </v-flex>
              <v-btn flat @click="removePerson(index)"><v-icon>close</v-icon></v-btn>
            </v-layout>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="warning" @click="close">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
// import DatePicker from "./stepperComponents/DatePicker";
import DateTimePicker from "./DateTimePicker";
import uavs from '../store/modules/uavs';
import { EventBus } from '../main'
import { saveNewAsset, updateAsset, removeAsset } from '@/api'


const emptyMission = {
  name: "",
  description: "",
  start: "",
  end: "",
  uav_id: "",
  project: "",
  personnel: [], // [{id: 0, role_ids: [1, 2, 3]}, ...]
  sensors: [],
  project: 1
} 

export default {
  components: {
    // DatePicker
    DateTimePicker
  },

  data() {
    return {
      dialog: false,
      dialogTitle: "Create New Mission",
      mission: emptyMission,
      personnelRow: [
        {
          name: "",
          role: ""
        }
      ],
      sensorRow: [
        {
          name: "",
          description: ""
        }
      ]
    };
  },

  computed: {
    personnel() {
      let personnel = this.$store.state.personnel.personnel
      personnel.forEach(person => {
        person['name'] = person.first_name + " " + person.last_name
      })
      return personnel
    },
    roles() {
      return this.$store.state.roles.roles;
    },
    sensors() {
      return this.$store.state.sensors.sensors
    },
    uavs() {
      return this.$store.state.uavs.uavs;
    },
    editMission() {
      return this.$store.state.missions.editMission
    }
  },

  watch: {
    editMission() {
    /*  
      {
        "name": "",
        "description": "",
        "start": "",
        "end": "",
        "uav_id": "",
        "project": "",
        "personnel": [
            {
                "id": 1, "role_ids": [1, 2, 3]
            }
        ],
        "sensors": [{"id": 1}],
        "project": 1
      }
    */
      console.log(this.editMission)
      let tmpMission = this.editMission
      if ('name' in this.mission) {
        this.dialog = true
        let roleIds = []
        tmpMission['personnel'] = this.mission.personnel.map(person => {
          return {id: person.id, role_ids: person.roles.map(role => {
             return role.id
          })}
        })
        this.mission = tmpMission
        console.log(this.mission)
      }
    }
  },

  methods: {
    // adds a new personnel row
    addNewPersonnel() {
      this.personnelRow.push({name: "", role: ""});
    },

    // adds a new sensor row
    addNewSensor(sensor) {
      this.sensorRow.push({name: ""})
    },

    // pushes sensor data to mission object
    selectSensor(sensorId) {
      this.mission.sensors.push({id: sensorId})
    },

    // pushes personnel data to mission object
    selectPerson(personId, idx) {
      var exists = function(element) {
        return element.id === personId
      }
      if (!this.mission.personnel.some(exists))
        this.mission.personnel[idx] = {id: personId}
    },

    // pushes role data to mission.personnel object
    selectRole(roleIds, idx) {
      this.mission.personnel[idx]["role_ids"] = roleIds
    },

    // removes personnel row
    removePerson(index) {
      this.personnelRow.splice(index, 1)
    },

    // removes mission sensor row
    removeMissionSensor(index) {
      this.sensorRow.splice(index, 1)
    },

    selectDateTime(date) {
      this.date1 = null
    },

    close() {
      this.mission = emptyMission
      this.dialog = false
      this.$store.commit('clearEditMission')
    },

    save() {
      // new mission
      let resp = saveNewAsset('test_mission', this.mission).then(resp => {
        this.$store.dispatch('INIT_DATA')
      })
      .catch(err => {
        console.log(err)
      })
      this.close()
    }
  },

  beforeMount() {
    EventBus.$on('update-date-time', dt => {
      let time = dt.time
      if (time === "") {
        time = "00:00:00"
      }
      let s = dt.date + " " + time
      var bits = s.split(/\D/);
      var date = new Date(bits[0], --bits[1], bits[2], bits[3], bits[4]);
      if (dt.picker === "missionStartDateTime") {
        this.mission.start = date.toISOString().substr(0, 19)
      } else if (dt.picker === "missionEndDateTime") {
        this.mission.end = date.toISOString().substr(0, 19)
      }
    })
  }
};
</script>
