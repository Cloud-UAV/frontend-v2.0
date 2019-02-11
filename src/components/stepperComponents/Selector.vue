<template>
  <v-container fluid>
    <v-combobox
          v-model="select"
          :items="items"
          :label="'Select ' + lbl" 
          multiple
          chips
        >
        <template slot="selection" slot-scope="data">
            <v-chip
                :selected="data.selected"
                :disabled="data.disabled"
                :key="JSON.stringify(data.item)"
                class="v-chip--select-multi"
                @input="data.parent.selectItem(data.item)"
                close
                >
                <v-avatar class="secondary white--text" v-text="data.item.slice(0, 1).toUpperCase()"></v-avatar>
                {{ data.item }}
            </v-chip>
        </template>
    </v-combobox>
    <!-- todo:  add new Personnel dialog -->
    <v-btn class="secondary" fab>
        <v-icon>add</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
  export default {
    props: ['lbl', 'items'],
    data () {
      return {
        select: [],
      }
    }
  }
</script>