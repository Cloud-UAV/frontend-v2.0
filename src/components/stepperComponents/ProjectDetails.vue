<template>
  <v-card flat>
    <v-text-field v-model="projTitle" :rules="nameRules" label="Title" required></v-text-field>
    <v-textarea
      v-model="projDescription"
      solo
      name="input-7-4"
      label="Description"
    ></v-textarea>
    <DatePicker/>
  </v-card>
</template>


<script>
import DatePicker from "./DatePicker"

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
    }
  }
}
</script>