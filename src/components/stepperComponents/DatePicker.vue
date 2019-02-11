<template>
  <div>
    <v-menu offset-y>
      <v-btn 
        slot="activator"  
        flat 
        color="primary"
        class="accent"
      ><v-icon>event</v-icon>{{ selectedDate.start.toDateString() + ' - ' + selectedDate.end.toDateString() }}</v-btn>
      <v-list >
        <vc-date-picker 
          is-double-paned 
          mode="range" 
          v-model="selectedDate" 
          show-caps 
          is-inline="true" 
        ></vc-date-picker>
      </v-list>
    </v-menu>

  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: {
        start: new Date(),
        end: new Date()
      }
    }
  }
}
</script>