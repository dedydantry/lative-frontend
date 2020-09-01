<template>
  <div>
    <vx-card>
      <form @submit.prevent="onSubmit">
        <div class="vx-row">
          <div class="vx-col w-full mb-5">
            <vs-input
              v-model="name"
              class="w-full"
              label-placeholder="Playlist name"
            />
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col sm:w-1/2 w-full">
            <flat-pickr
              v-model="fromDate"
              :disabled="playlistID ? true : false"
              :config="configFromdateTimePicker"
              placeholder="Start Date"
              class="w-full"
              @on-change="onToChangeDate"
            />
          </div>
          <div class="vx-col sm:w-1/2 w-full">
            <flat-pickr
              v-model="toDate"
              :config="configTodateTimePicker"
              placeholder="Finish Date"
              class="w-full"
              @on-change="onToChangeDate"
            />
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full mt-2">
            <label
              for=""
              class="text-xs"
            >
              Set Playslist to device By device CODE or device TAG
            </label>
            <v-select
              v-model="tag"
              multiple
              push-tags
              label="name"
              placeholder="Device Tag"
              :close-on-select="false"
              :options="optionsTag"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            /><br>
          </div>
        </div>
        <div class="row">
          <div class="vx-col">
            <div class="mb-4">
              <label class="text-xs">
                Playlist Status
              </label>
              <vs-switch
                v-model="status"
                color="success"
              >
                <span slot="on">
                  Active
                </span>
                <span slot="off">
                  Inactive
                </span>
              </vs-switch>
            </div>
            <div class="mb-4">
              <div class="border border-solid border-grey-light p-2 mt-3">
                <vs-button
                  color="dark"
                  type="border"
                  icon-pack="feather"
                  icon="icon-film"
                  icon-after
                  size="small"
                  @click="toogleFileManager = true"
                >
                  Add Video
                </vs-button>
                <vs-list v-if="resources.length">
                  <vs-list-header
                    title="Resources"
                    color="dark"
                  />
                  <draggable
                    :list="resources"
                    group="people"
                    class="p-2 cursor-move"
                  >
                    <vs-list-item
                      v-for="(listItem, index) in resources"
                      :key="index"
                      :title="listItem.name"
                      :subtitle="listItem.email"
                    >
                      <vs-avatar
                        slot="avatar"
                        icon-pack="feather"
                        icon="icon-film"
                        size="small"
                      />
                      <feather-icon
                        icon="TrashIcon"
                        svg-classes="w-5 h-5 hover:text-danger stroke-current"
                        class="ml-2"
                        @click="removeSource(listItem, index)"
                      />
                    </vs-list-item>
                  </draggable>
                </vs-list>
                <div
                  v-else
                  class="mt-2"
                >
                  <h6>
                    No Video selected
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="vx-row mt-5">
          <div class="vx-col w-full text-right">
            <vs-button
              class="mr-3 mb-2"
              button="submit"
            >
              Submit
            </vs-button>
            <vs-button
              color="warning"
              type="border"
              class="mb-2"
            >
              Reset
            </vs-button>
          </div>
        </div>
      </form>
    </vx-card>
    <Filemanager
      :show="toogleFileManager"
      @close="toogleFileManager = false"
      @addVideo="addVideo"
    />
  </div>
</template>
<script>
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import draggable from 'vuedraggable'
import Filemanager from '@/components/Filemanager'
import 'flatpickr/dist/flatpickr.css'
import { addDays } from 'date-fns'
export default {
  components: {
    'v-select': vSelect,
    flatPickr,
    draggable,
    Filemanager
  },

  data(){
    return{
      fromDate:null,
      toDate:null,
      configTodateTimePicker: {
        minDate: addDays(new Date(), 2),
      },
      name:'',
      tag:[],
      description:'',
      autocomplete:'',
      status:true,
      optionsTag: [],
      toogleFileManager:false,
      resources: [],

      // edit
      playlistID:null
    }
  },
  computed:{
    addr(){
      if(this.autocomplete){
        return this.autocomplete.place.formatted_address
      }
      return null
    },

    configFromdateTimePicker(){
      if(this.playlistID) return {
        minDate: this.fromDate,
        // maxDate: null
      }
      return {
        minDate: addDays(new Date(), 1),
        maxDate: null
      }
    }
  },
  mounted(){
    this.fetchTag()
    this.fetchPlaylistById()
  },
  methods:{
    async fetchTag(){
      try {
        let tag = await this.$axios.get('/api/tag?s=p')
        if(tag.status){
          this.optionsTag = tag.data
        }
      } catch (error) {
        throw error
      }
    },
    changeAdress(place){
      if (!place) return
      let val = document.getElementById('gmaps')
      this.address.full_address = val.value
      this.address.latLng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      }
    },

    onToChangeDate(){

    },

    addVideo(arg){
      this.resources.push(arg)
      return this.toogleFileManager = false
    },
    removeSource(arg, index){
      return this.resources.splice(index, 1)
    },

    onSubmit(){
      let bodyParams = {
        name:this.name,
        start:this.fromDate,
        end:this.toDate,
        tag:this.tag.map(x => x.id),
        video:this.resources.map(x => x.id),
        status:this.status
      }

      return this.postPlaylist(bodyParams)
    },

    async postPlaylist(params){
      try {
        this.$vs.loading()
        let post
        if(this.playlistID){
          post = await this.$axios.put(`/api/playlist/${this.playlistID}`, params)
        }else{
          post = await this.$axios.post('/api/playlist', params)
        }
        this.$vs.loading.close()
        if(post.status){
          this.$vs.notify({
            title:'Success',
            text:'Playlist has been saved',
            color:'success',
            position:'top-center'
          })
          return setTimeout(() => {
            return this.$router.push('/playlists')
          }, 1000)
        }
        return this.$vs.notify({
          title:'Warning',
          text:'Error: '+post.data,
          color:'danger',
          position:'top-center'
        })
      } catch (error) {
        this.$vs.loading.close()
        this.$vs.notify({
          title:'Warning',
          text:'Error: '+error.message,
          color:'danger',
          position:'top-center'
        })
        throw error
      }
    },

    async fetchPlaylistById(){
      try {
        let playlistID = this.$route.params.id ? this.$route.params.id : null
        if(!playlistID) return
        this.playlistID = playlistID

        let playlist = await this.$axios.get(`/api/playlist/${playlistID}/edit`)
        if(playlist.status){
          playlist = playlist.data
          this.name = playlist.name,
          this.fromDate = playlist.start_date
          this.toDate = playlist.end_date
          this.status = playlist.status
          this.tag = playlist.tag
          this.resources = playlist.video
        }
      } catch (error) {
        throw error
      }
    }
  }
}
</script>