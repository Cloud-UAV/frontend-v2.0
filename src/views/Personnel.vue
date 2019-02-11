<template>
  <v-card>
    <v-card-title class="secondary white--text headline">
      Personnel
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New Person</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.first_name" label="First Name"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.last_name" label="Last Name"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.phone_number" label="Phone"></v-text-field>
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
    </v-card-title>
    
    <v-layout justify-space-between pa-3>
      <v-flex xs5>
        <v-treeview
          :active.sync="active"
          :items="personnel"
          :open.sync="open"
          activatable
          active-class="primary--text"
          class="grey lighten-5"
          open-on-click
          transition
        > 
          <v-icon
            slot="prepend"
            slot-scope="{ item, active }"
            :color="active ? 'primary' : ''"
          >mdi-account</v-icon>
        </v-treeview>
      </v-flex>
      <v-flex
        d-flex
        text-xs-center
      >
        <v-scroll-y-transition mode="out-in">
          <div
            v-if="!selected"
            class="title grey--text text--lighten-1 font-weight-light"
            style="align-self: center;"
          >
            Select a Person *Left
          </div>
          <v-card
            v-else
            :key="selected.id"
            class="pt-4 mx-auto"
            flat
            max-width="400"
          >
            <v-card-text>
              <v-avatar v-if="avatar" size="88">
                <v-img
                  :src="`https://avataaars.io/${avatar}`"
                  class="mb-4"
                ></v-img>
              </v-avatar>
              <h3 class="headline mb-2">
                {{ selected.firstName }}
              </h3>
              <div class="blue--text mb-2">{{ selected.email }}</div>
              <div class="blue--text subheading font-weight-bold">{{ selected.firstName }}</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-layout
              tag="v-card-text"
              text-xs-left
              wrap
            >
              <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Name:</v-flex>
              <v-flex>{{ selected.first_name + " " + selected.last_name}}</v-flex>
              <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Phone:</v-flex>
              <v-flex>{{ selected.phone_number }}</v-flex>
            </v-layout>
          </v-card>
        </v-scroll-y-transition>
      </v-flex>
    </v-layout>
  </v-card>
</template>


<script>
  import { saveNewAsset, linkUser } from '@/api'

  // todo:  add a new person - then link in db /api/personnel route - update visual
  // send them an email invite? 
  // unlink from account?
  // see missions? 

  const avatars = [
    '?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban',
    '?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun',
    '?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong',
    '?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair',
    '?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly'
  ]

  export default {
    data: () => ({
      active: [],
      avatar: null,
      dialog: false,
      open: [],
      selectedPerson: [],
      isLoading: false,
      tree: [],
      types: [],
      editedIndex: -1,
      editedItem: {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        avatar_path: ''
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Person' : 'Edit Person'
      },
      personnel () { 
        let people = this.$store.state.personnel.personnel
        people.map(x => {
          x.name = x.first_name + ' ' + x.last_name
          return x
        })
        return [
          {
            name: 'Personnel',
            children: people
          }
        ]
      },

      selected () {
        if (!this.active.length) return undefined
        const id = this.active[0]
        return this.personnel[0].children.find(person => person.id === id)
      }
    },

    watch: { 
      selected: 'randomAvatar'
    },

    methods: { 
      randomAvatar () {
        this.avatar = avatars[Math.floor(Math.random() * avatars.length)]
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        saveNewAsset('user', this.editedItem)      
        .then(resp => {
          linkUser(this.$store.state.user.user.id, resp.data.id)
          this.$store.commit('setPerson', resp.data)
        })
        this.dialog = false
      }
    }
  }
</script>