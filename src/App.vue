<template>
  <v-app id="app">
    <Navbar />
    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar
  },
  
  beforeCreate() {
    this.$store.dispatch('INIT_DATA')
  },

  created() {
    // this.$store.dispatch('LOAD_ALL_PROJECT_DETAILS')
  }
}
</script>
