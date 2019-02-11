<template>
  <div>
    <v-card>
      <v-toolbar v-if="showControls">
        <v-toolbar-title>Assets</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu offset-y>
          <v-btn slot="activator" flat fab><v-icon>more_vert</v-icon></v-btn>
          <v-list>
            <v-list-tile @click="alert('New Asset')">
              <v-list-tile-title> New </v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="alert('Editing')">
              <v-list-tile-title> Edit Selected </v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="alert('Delete Asset')">
              <v-list-tile-title> Remove </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar>
      <v-treeview
        v-model="tree"
        :items="items"
        activatable
        active-class="secondary white--text"
        item-key="name"
        open-on-click
        class="pa-3"
        :selectable="selectable"
      >
      <template slot="prepend" slot-scope="{ item, leaf }">
        <v-icon>
          {{ icons[item.name] }}
        </v-icon>
      </template>
      </v-treeview>
    </v-card>
  </div>
</template>


<script>
export default {
  props: {
    showControls: Boolean,
    selectable: Boolean
  },
  data () {
    return {
      assets: {},
      icons: {
        roles: 'assignment_ind',
        sensors: 'mdi-radar',
        personnel: 'people',
        uavs: 'mdi-quadcopter'
      },
      tree: []
    }
  },

  computed: {
    items () {
      return [
        {
          name: 'uavs',
          children: this.$store.state.uavs.uavs
        },
        {
          name: 'sensors',
          children: this.$store.state.sensors.sensors
        },
        {
          name: 'personnel',
          children: personnelName(this.$store.state.personnel.personnel)
        },
        {
          name: 'roles',
          children: this.$store.state.roles.roles
        }
      ]
    }
  },

  methods: {
    alert: (txt) => {
      alert(this.tree)
    }
  }
}

// helpers
function personnelName (personnel) {
  personnel.map(person => person.name = person.first_name + ' ' + person.last_name)
  return personnel
} 
</script>