<template>
  <v-card>
    <v-toolbar card color="primary">
      <v-icon>star</v-icon>
      <v-toolbar-title>Missions</v-toolbar-title>
    </v-toolbar>
    <v-layout>
      <v-flex>
        <v-card-text>
          <v-treeview
            v-model="tree"
            :load-children="fetch"
            :items="items"
            activatable
            active-class="secondary white--text"
            selected-color="info"
            open-on-click
            selectable
            expand-icon="mdi-chevron-down"
            on-icon="star"  
            off-icon="star_border"
            indeterminate-icon="star_half"
          >
          </v-treeview>
        </v-card-text>
      </v-flex>

      <v-divider vertical></v-divider>

      <v-flex xs12 md6>
        <div slot="header" v-for="(mission, m) in currentProject.missions" :key="m">
          <span class="title"> {{ mission.name }}</span> 
            - 
          <span class="subheading">{{ mission.description }}</span>
        </div>
        <v-card>
          <v-card-text>mission date:{{ ' ' + mission.start }}</v-card-text>
          <v-card-text class="subheading">
            <v-chip color="primary" text-color="white">
              <v-icon color="white">mdi-quadcopter</v-icon>{{ getUav(mission.uav_id).name }}
            </v-chip>
          </v-card-text>
          <v-card-text class="subheading secondary white--text">Personnel Roles </v-card-text>
          <v-list v-for="missionRole in missionRoles" v-if="missionRole.missionId == mission.id" v-bind:key="missionRole.mission_id">
            <v-list-tile>
              <v-list-action><v-checkbox></v-checkbox></v-list-action> 
              <span class="secondary--text" >{{ missionRole.person.first_name + ' ' + missionRole.person.last_name}}</span>&nbsp;-&nbsp;<span class="info--text">{{ missionRole.role.name }}</span>
              </v-list-tile>
              <v-divider></v-divider>  
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>
