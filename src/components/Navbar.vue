<template>
  <nav>
    <!-- toolbar -->
    <v-toolbar class="accent" flat app>
      <v-toolbar-side-icon class="blue-grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="blue-grey--text headline">
        <span>{{ $route.name }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="blue-grey">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- side drawer -->
    <v-navigation-drawer v-model="drawer" app class="primary">
      <v-img src="./img/CloudUAV-dark-bg.png" :width="180" class="ma-3"></v-img>
      <v-list class="accent--text" two-line>
        <v-list-tile active-class="secondary--text" v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-action>
            <v-icon class="accent--text">{{ link.icon }}</v-icon>
          </v-list-action>
          <v-list-tile-content>
            <v-list-tile-title class="mx-3">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>  
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>


<script>
export default {
  name: 'Navbar',
  data() {
    return {
      drawer: true,
      links: [
          { icon: 'dashboard', text: 'Dashboard', route: '/' },
          { icon: 'assignment', text: 'Projects', route: '/project' },
          { icon: 'people', text: 'Personnel', route: '/personnel' },
          { icon: 'mdi-radar', text: 'Sensors', route: '/sensor' },
          { icon: 'assignment_ind', text: 'Roles', route: '/role' },
          { icon: 'folder_special', text: 'Missions', route: '/mission' },
          { icon: 'mdi-quadcopter', text: 'UAV', route: '/uav' },
          { icon: 'map', text: 'Map', route: '/map' }
      ]
    }
  }
}
</script>