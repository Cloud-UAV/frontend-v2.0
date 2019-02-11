<template>
  <v-card>
    <v-card-title>
      <!--<span class="headline">{{ this.formTitle }}</span>-->
      Title
    </v-card-title>
    
    <v-card-text>
      <!--<v-text-field v-model="editedItem.name" label="Name"></v-text-field>-->
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="secondary" flat >Cancel</v-btn>
      <v-btn color="secondary" flat @click="close">Save</v-btn>
    </v-card-actions>
  </v-card>    
</template>


<script>
export default {
    
}
</script>
