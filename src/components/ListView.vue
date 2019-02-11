<template>
  <div>
    <v-toolbar flat color="white">
      <!-- search field -->
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>

      <v-spacer></v-spacer>

      <v-btn v-show="selected.length > 0" color="error darken-2">
        <v-icon>delete</v-icon>
      </v-btn>

      <!-- edit dialog -->
      <v-dialog v-model="dialog" max-width="500">
        <v-btn v-if="showNewItemButton" slot="activator" color="secondary" fab>
          <v-icon>add</v-icon>
        </v-btn>

        <component :is="editComponent"></component>
      </v-dialog>
    </v-toolbar>

    <!-- table header -->
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :search="search"
      :select-all="showSelect"
      id="items-table-header"
    >
      <template slot="items" slot-scope="props">
        <tr v-if="allowInlineEdit" :active="props.selected" @click="selectItem(props.item)">
          <td v-for="header in headers" :key="header.value">
            <v-edit-dialog
              :return-value.sync="props.item.name"
              lazy
              large
              @save="$emit('save')"
              @cancel="$emit('cancel')"
              @open="$emit('open')"
              @close="$emit('close')"
            >
              {{ props.item[header.value] }}
              <v-text-field
                slot="input"
                v-model="props.item[header.value]"
                label="Edit"
                single-line
                counter
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td v-if="!showSelect">
            <v-checkbox v-model="props.selected" hide-details></v-checkbox>
          </td>
          <td v-if="showRowEdit || showRowDelete" class="justify-center layout px-0">
            <v-icon v-show="showRowEdit" small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon v-show="showRowDelete" small @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </tr>

        <tr v-else :active="props.selected" @click="selectItem(props.item)">
          <td v-if="showSelect">
            <v-checkbox v-model="props.selected" secondary></v-checkbox>
          </td>
          <td v-for="header in headers" :key="header.value">{{ props.item[header.value] }}</td>
          <td v-if="showRowEdit || showRowDelete" class="justify-center layout px-0">
            <v-icon v-show="showRowEdit" small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon v-show="showRowDelete" small @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </tr>
      </template>
      <v-alert
        slot="no-results"
        :value="true"
        color="error"
        icon="warning"
      >Your search for "{{ search }}" found no results.</v-alert>
    </v-data-table>
  </div>
</template>


<script>
import EditProject from "./project/EditProject";
import { Store } from "vuex";
import { EventBus } from "../main";

export default {
  props: {
    showSelect: Boolean,
    showRowEdit: Boolean,
    showRowDelete: Boolean,
    showNewItemButton: Boolean,
    allowInlineEdit: Boolean,
    items: Array,
    headers: Array,
    editForm: Object
  },

  components: {
    EditProject
  },

  data() {
    return {
      dialog: false,
      search: "",
      selected: [],
      editedIndex: -1,
      editedItem: {},
      editComponent: EditProject,
      selectedItemId: -1
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    initialize() {
      // todo:  wire these to api
      console.log(this.items);
      this.items = [this.props.items];
    },

    selectItem(item) {
      this.selectedItemId = item.id;
      console.log(item.id);
      EventBus.$emit("project-selected", item.id);
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      // delete item
      console.log(item);
    }
  },

  beforeMount() {
    if (this.$props.editForm === "edit-project") {
      this.editComponent = EditProject;
    }
  }
};
</script>


<style>
.column {
  /* overrides column header stacking error */
  display: table-cell !important;
}

table.v-table thead tr {
  /* background-color: #e8e8e8; */
}

.right {
  right: 0px;
  position: absolute;
  padding: 9px;
}

/* to fix transparency of dialog - bug: https://github.com/vuetifyjs/vuetify/issues/5127 */
div.v-dialog--active {
  background-color: #ffffff;
}
</style>