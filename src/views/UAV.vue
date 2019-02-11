<template>
  <div class="uavs">
    <v-toolbar flat color="secondary white--text">
      <v-toolbar-title>UAVS</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New {{ pageName }}</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.name" :label=pageName></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.inventory" label="Inventory"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="sensors"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>

  </div>

</template>


<script>
import { saveNewAsset, updateAsset, removeAsset } from '@/api'

export default {

  data() {
    return {
      pageName: "UAV",
      headers: [
        {
          text: "NAME",
          align: "left",
          sortable: true,
          value: "name"
        },
        {
          text: "DESCRIPTION",
          value: "description",
          align: "left",
          sortable: true
        },
        {
          text: "INVENTORY",
          value: "inventory",
          align: "left",
          sortable: true
        }
      ],
      dialog: false,
      editedIndex: -1,
      editedItem: {
        name: '',
        description: ''
      }
    }
  },
  computed: {
    sensors () { return this.$store.state.uavs.uavs },
  
    formTitle () {
      return this.editedIndex === -1 ? 'New UAV' : 'Edit UAV'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  methods: {
    editItem (item) {
      this.editedIndex = this.$store.state.uavs.uavs.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      confirm('Are you sure you want to delete this item?')
      removeAsset('uav', item.id).catch(err => {
        console.log(err.response.status)
        return
      })
      .then(this.$store.dispatch('INIT_DATA'))
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      this.editedItem['user_id'] = this.$store.state.user.user.id
      if (this.editedIndex > -1) {
        updateAsset('uav', this.editedItem.id, this.editedItem)
        .catch(err => {
          console.log(err)
          return
        })
        .then(this.$store.dispatch('INIT_DATA'))
      } else {
        // create new
        saveNewAsset('uav', this.editedItem)
        .catch(err => {
          console.log(err)
          return
        })
        .then(this.$store.dispatch('INIT_DATA'))
      }
      this.close()
    }
  }
}
</script>