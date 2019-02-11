<template>
  <div class="dashboard">
    <v-container fluid class="my-5">

        <v-layout row wrap>
          <v-flex class="ma-3" xs12 md6 lg3>
            <v-card class="pa-5">
              <v-card-title class="headline">Projects</v-card-title>
            </v-card>
          </v-flex>

          <v-flex class="ma-3" xs12 md6 lg3>
            <v-card class="pa-5">
              <v-card-title class="headline">Missions</v-card-title>
                <vc-calendar :attributes='calAttrs'></vc-calendar>
            </v-card>
          </v-flex>

          <v-flex class="ma-3" xs12 md6 lg3>
            <v-card class="pa-5">
              <v-card-title class="headline">Personnel</v-card-title>
            </v-card>
          </v-flex>

          <v-flex class="ma-3" xs12 md6 lg3>
            <v-card class="pa-5">
              <v-card-title class="headline">UAV's</v-card-title>
            </v-card>
          </v-flex>

          <v-flex class="ma-3" xs12 md6 lg3>
            <v-card class="pa-5">
              <v-card-title class="headline">Sensors</v-card-title>
            </v-card>
          </v-flex>

        </v-layout>
    </v-container>

  </div>

</template>

<script>
// This is going to be the project dates with mission dates calendar info that populates the calendar.  
// The calendar will serve like a roadmap for the project
let projectDates = [
  {
    title: '',
    description: '',
    projectDateRange: [{start: new Date(), end: new Date()}],
    missionDates: [{start: new Date(), end: new Date()}, new Date()]
  }
]

import AssetTree from '@/components/AssetTree'

export default {
  components: {
    AssetTree
  },
  data() {
    return {
      calAttrs: [
        {
          key: 'today',
          projectDateRange: [],
          missionDates: [new Date(), new Date(2018, 11, 12), {start: new Date(), end: new Date(2018, 11, 19)}],
          highlight: {
            backgroundColor: '#ff8080',
            // Other properties are available too, like `height` & `borderRadius`
          },
        }
      ],
    };
  },
}
</script>
