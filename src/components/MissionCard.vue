<template>
  <v-card flat>
    <v-card-text v-if="selected.id">
      <h3 class="headline mb-2">{{ selected.name }} <span class="subheading grey--text lighten-3">id: ({{ selected.id }})</span></h3>
      <div class="subeading">{{ selected.description }}</div>
      <div class="subeading">start: {{ selected.start }}</div>
      <div class="subeading">end: {{ selected.end }}</div>
      <div>
        <v-expansion-panel>
          <v-expansion-panel-content v-for="person in selectedMissionPersonnel" :key="person.id">
            <div slot="header">{{ person.person.first_name + ' ' + person.person.last_name }}</div>
            <v-card>
              <v-card-text v-for="role in person.roles" :key="role.id">{{ role.name }}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </div>
    </v-card-text>
  </v-card>
</template>


<script>
export default {
  props: {
    selected: Object,
    selectedMissionPersonnel: Object
  }
}
</script>

