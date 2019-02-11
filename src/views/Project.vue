
<template>
  <div>
    <!-- new project button -->
    <v-containter>
      <v-layout align-center justify-center>
        <NewProject/>
      </v-layout>
    </v-containter>

    <v-expansion-panel>
      <v-expansion-panel-content>
        <div slot="header">
          <em>Select Project</em>
        </div>

        <v-container grid-list-sm class="pa-1 ma-1">
          <v-layout row wrap>
            <!-- change view toolbar -->
            <v-toolbar color="white" dense flat>
              <v-spacer></v-spacer>
              <v-toolbar-items class="hidden-sm-and-down">
                <v-btn @click="changeView('grid')" :class="{ primary: viewType.grid }" flat>
                  <v-icon>view_module</v-icon>
                </v-btn>
                <v-btn @click="changeView('list')" :class="{ primary: viewType.list }" flat>
                  <v-icon>view_list</v-icon>
                </v-btn>
                <v-btn @click="changeView('tree')" :class="{ primary: viewType.tree }" flat>
                  <v-icon>vertical_split</v-icon>
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
          </v-layout>

          <!-- project detail view -->
          <v-layout row wrap v-if="viewType.projectDetail"></v-layout>

          <!-- grid view -->
          <v-layout row wrap v-if="viewType.grid">
            <v-flex xs12 sm6 md4 lg3 v-for="project in projects" :key="project.title">
              <v-card class="text-xs-center ma-3">
                <v-card-text>
                  <div class="headline title">{{ project.name }}</div>
                  <div class="subheading">{{ project.description }}</div>
                  <div class="caption grey--text">{{ project.start }}</div>
                </v-card-text>

                <v-chip color="secondary" text-color="white">ongoing</v-chip>

                <!-- view/edit button -->
                <v-btn class="ma-2" color="success" @click="getProjectDetails(project.id)">
                  <!-- TODO:  PROJECT DETAILS VIEW -->
                  <v-icon>edit</v-icon>
                </v-btn>

                <v-dialog v-model="deleteDialog" persistent max-width="250">
                  <v-btn class="ma-2" slot="activator" color="warning">
                    <v-icon>delete</v-icon>
                  </v-btn>
                  <v-card>
                    <v-card-text>Are you sure you want to delete this project?</v-card-text>
                    <v-btn color="secondary" @click="deleteDialog = false">Delete</v-btn>
                    <v-btn color="secondary" @click="deleteDialog = false">Cancel</v-btn>
                  </v-card>
                </v-dialog>
              </v-card>
            </v-flex>
          </v-layout>

          <!-- list view -->
          <v-layout row wrap v-if="viewType.list">
            <v-flex>
              <ListView :headers="listViewHeaders" :items="projects" editForm="edit-project"/>
            </v-flex>
          </v-layout>

          <!-- tree view -->
          <v-layout row wrap v-if="viewType.tree">
            <v-flex>Tree view</v-flex>
          </v-layout>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <!-- project Info -->
    <v-container fluid class="ma-0 pa-0">
      <v-layout row wrap>
        <v-flex d-flex xs12 md12 lg9>
          <v-card>
            <v-card-title primary class="title">
              {{ currentProject.name }}
              <v-spacer></v-spacer>
              <v-card-actions right>
                <v-btn flat>
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-btn flat color="error darken-3">
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card-title>
            <v-card-text>
              <div class="subheading pa-1">{{ currentProject.description }}</div>
              <div
                class="caption grey--text pa-3"
              >{{ currentProject.start }} to {{ currentProject.end }}</div>

              <!-- missions -->
              <div class="heading">
                <v-card>
                  <v-toolbar class="accent">
                    <v-toolbar-title>Missions</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <NewMission/>
                    <v-menu offset-y>
                      <v-btn slot="activator" flat fab>
                        <v-icon>more_vert</v-icon>
                      </v-btn>
                      <v-list>
                        <v-list-tile
                          v-show="selectedMission.id != undefined"
                          @click="deleteMission"
                        >
                          <v-list-tile-title>Delete Mission</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile v-show="selectedMission.id != undefined" @click="editMission">
                          <v-list-tile-title>Edit Mission</v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                  </v-toolbar>
                  <v-layout>
                    <v-flex>
                      <v-card-text>
                        <v-list v-if="projectMissions != undefined && projectMissions.length > 0">
                          <v-list-tile
                            v-for="mission in projectMissions"
                            :key="mission.name"
                            @click="selectedMission = mission"
                            :class="{'accent': selectedMission.id == mission.id }"
                          >
                            <v-list-tile-action>
                              <v-icon
                                :class="{'secondary--text': selectedMission.id == mission.id}"
                              >star</v-icon>
                            </v-list-tile-action>

                            <v-list-tile-content>
                              <v-list-tile-title v-text="mission.name"></v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                      </v-card-text>
                    </v-flex>
                    <v-divider vertical></v-divider>
                    <v-flex d-flex xs12 md8 pa-3>
                      <MissionCard
                        :selected="selectedMission"
                        :selectedMissionPersonnel="selectedMission.personnel"
                      />
                    </v-flex>
                  </v-layout>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn class="white--text" color="success darken-1" depressed>Save
                      <v-icon right>mdi-content-save</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 md3>
          <v-layout row wrap>
            <!-- uavs -->
            <!-- todo:  make draggable to mission -->
            <v-flex d-flex>
              <v-layout row wrap>
                <v-flex d-flex xs12>
                  <AssetTree showControls/>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import NewProject from "@/components/NewProject";
import NewMission from "@/components/NewMission";
import ListView from "@/components/ListView";
import EditProject from "@/components/project/EditProject";
import AssetTree from "@/components/AssetTree";
import MissionCard from "@/components/MissionCard";

import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import { EventBus } from "../main";
import { saveNewAsset, updateAsset, removeAsset } from "@/api";

export default {
  components: {
    NewProject,
    NewMission,
    ListView,
    EditProject,
    AssetTree,
    MissionCard
  },

  data() {
    return {
      calAttrs: [
        {
          key: "today",
          projectDateRange: [],
          missionDates: [
            new Date(),
            new Date(2018, 11, 12),
            { start: new Date(), end: new Date(2018, 11, 19) }
          ],
          highlight: {
            backgroundColor: "#ff8080"
            // Other properties are available too, like `height` & `borderRadius`
          }
        }
      ],
      currentProject: {},
      selectedMission: {},
      deleteDialog: false,
      editDialog: false,
      viewType: {
        grid: false,
        list: true,
        tree: false,
        projectDetail: false
      },
      listViewHeaders: [
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
          text: "START",
          value: "start",
          align: "left",
          sortable: false
        },
        {
          text: "END",
          value: "end",
          align: "left",
          sortable: false
        }
      ]
    };
  },

  computed: {
    ...mapGetters(["getMissionsByProjectId"]),

    projects() {
      return this.$store.state.projects.projects;
    },

    uavs() {
      return this.$store.state.uavs.uavs;
    },

    sensors() {
      return this.$store.state.sensors.sensors;
    },

    personnel() {
      return this.$store.state.personnel.personnel;
    },

    roles() {
      return this.$store.state.roles.roles;
    },

    missions() {
      return this.$store.state.missions.missions;
    },

    projectMissions() {
      return this.$store.getters.getMissionsByProjectId(this.currentProject.id);
    },

    currentProjectId() {
      return this.$store.state.projects.selectedProjectId;
    }
  },

  methods: {
    getMissionPersonnel(mission) {
      try {
        const idMap = this.currentProject.missions.find(
          m => m.id === mission.id
        );
        const personnelIds = idMap.personnel;
        const personnel = personnelIds.map(person => ({
          person: this.$store.getters.getPerson(person.id),
          roles: person.role_ids.map(id => this.$store.getters.getRole(id))
        }));
        return personnel;
      } catch (err) {
        console.log(err);
        return [];
      }
    },

    editMission() {
      this.$store.commit("setEditMission", this.selectedMission);
    },

    changeView(view) {
      for (const v in this.viewType) {
        if (view === v) {
          this.viewType[v] = true;
        } else {
          this.viewType[v] = false;
        }
      }
    },

    cancelProject() {
      console.log("cancelProject");
    },

    openProject() {
      console.log("openProject");
    },

    closeProject() {
      console.log("closeProject");
    },

    deleteMission() {
      confirm("Are you sure you want to delete this mission?");
      removeAsset("test_mission", this.selectedMission.id)
        .then(resp => {
          if (resp.status === 204) {
            this.$store.commit("removeMission", this.selectedMission);
          }
        })
        .catch(err => {
          console.log(err.response);
          return;
        });
      this.selectedMission = {};
    }
  },

  watch: {
    currentProjectId() {
      this.currentProject = this.$store.getters.getProjectById(
        this.$store.state.projects.selectedProjectId
      );
    },
    selectedMission() {
      this.selectedMission.personnel = this.getMissionPersonnel(
        this.selectedMission
      );
    }
  },

  beforeMount() {
    if (this.$store.state.projects.selectedProjectId != -1) {
      this.currentProject = this.$store.getters.getProjectById(
        this.$store.state.projects.selectedProjectId
      );
    }
    EventBus.$on("project-selected", projectId => {
      this.$store.commit("setSelectedProjectId", projectId);
    });
  }
};
</script>
