<template>
<div>
  <!-- date picker -->
  <span class="grey--text">{{date + ' ' + time}}</span>
  <v-dialog
    ref="dateDialog"
    v-model="modal"
    :return-value.sync="date"
    persistent
    lazy
    full-width
    width="290px"
  >
    <v-text-field
      slot="activator"
      v-model="date"
      label="Choose date"
      prepend-icon="event"
      readonly
    ></v-text-field>
    <v-date-picker v-model="date" scrollable>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
      <v-btn flat color="primary" @click="$refs.dateDialog.save(date); updateCurrentItem()">OK</v-btn>
      <!-- <v-btn flat color="primary" @click="updateDateTime()">OK</v-btn> -->
    </v-date-picker>
  </v-dialog>

  <!-- time picker -->
  <v-dialog
    ref="timeDialog"
    v-model="modal2"
    :return-value.sync="time"
    persistent
    lazy
    full-width
    width="290px"
  >
    <v-text-field
      slot="activator"
      v-model="time"
      label="Choose time"
      prepend-icon="access_time"
      readonly
    ></v-text-field>
    <v-time-picker
      v-if="modal2"
      v-model="time"
      full-width
    >
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
      <v-btn flat color="primary" @click="$refs.timeDialog.save(time); updateCurrentItem()">OK</v-btn>
    </v-time-picker>


    <v-text-field v-model="time"></v-text-field>

  </v-dialog>
  </div>
</template>

  
<script>
import { EventBus } from '../main' 

const moment = require('moment')

export default {
  props: {
    currentPicker: String,
  },
  data: () => ({
    dateTime: null,
    date: new Date().toISOString().substr(0, 10),
    time: "",
    modal: false,
    modal2: false,
  }),

  methods: {
    updateCurrentItem() {
      EventBus.$emit('update-date-time', { 
        // which picker
        picker: this.$props.currentPicker,
        // actual datetime 
        date: this.date,
        time: this.time
      })
    }
  }
}
</script>
