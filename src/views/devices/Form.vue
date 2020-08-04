<template>
  <div>
    <vx-card>
      <form @submit.prevent="onSubmit">
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              v-model="name"
              class="w-full"
              label-placeholder="Device Name"
            />
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              v-model="place"
              class="w-full"
              label-placeholder="Places"
            />
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full">
            <v-select
              v-model="tag"
              multiple
              taggable
              push-tags
              class="mt-6"
              label="name"
              placeholder="Device Tag"
              :close-on-select="false"
              :options="optionsTag"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            /><br>
          </div>
          <div class="vx-col w-full mb-2">
            <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary is-label-placeholder">
              <gmap-autocomplete
                id="gmaps"
                :options="{fields: ['geometry']}"
                :component-restrictions="{country: 'id'}"
                :value="autocomplete"
                class="vs-inputx vs-input--input normal"
                @place_changed="changeAdress"
              />
            </div>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full mb-2 mt-4">
            <vs-textarea
              v-model="description"
              label="Description"
            />
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full">
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
  </div>
</template>
<script>
import {insertDevices} from '@/firebase/DatabaseService'
import vSelect from 'vue-select'
export default {
  components: {
    'v-select': vSelect,
  },

  data(){
    return{
      name:'',
      place:'',
      tag:[],
      description:'',
      address:{},
      autocomplete:'',
      optionsTag: [],

      // edited
      deviceCode:null
    }
  },
  computed:{
    addr(){
      if(this.autocomplete){
        return this.autocomplete.place.formatted_address
      }
      return null
    }
  },

  mounted(){
    this.fetchTag()
    this.fetchDeviceByCode()
  },

  methods:{
    changeAdress(place){
      if (!place) return
      let val = document.getElementById('gmaps')
      this.address.full_address = val.value
      this.address.lat = place.geometry.location.lat()
      this.address.lng = place.geometry.location.lng()
    },

    onSubmit(){
      let body = {
        name:this.name,
        description:this.description,
        places:this.place,
        tag:this.tag,
        address:this.address
      }

      return this.postDevice(body)
    },

    async fetchTag(){
      try {
        let tag = await this.$axios.get('/api/tag')
        if(tag.status){
          this.optionsTag = tag.data
        }
      } catch (error) {
        throw error
      }
    },

    async postDevice(params){
      try {
        let post 
        this.$vs.loading()
        if(this.deviceCode){
          // update
          post = await this.$axios.put(`/api/device/${this.deviceCode}`, params)
        }else{
          // created
          post = await this.$axios.post(`/api/device`, params)
        }
        this.$vs.loading.close()
        if(post.status){
          // save data to firebase 
          if(!this.deviceCode){
            post = post.data
            insertDevices(post.data, post.data.code)
          }
          this.$vs.notify({
            title:'Success',
            text:'Update success',
            color:'success',
            position:'top-center'
          })
          return setTimeout(() => {
            return this.$router.push('/devices')
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
      }
    },

    // get device if edit
    async fetchDeviceByCode(){
      try {
        const deviceCode = this.$route.params.code ? this.$route.params.code : null
        if(!deviceCode) return
        this.deviceCode = deviceCode
        let device = await this.$axios.get('/api/device/' + deviceCode + '/edit')
        if(device.status){
          device = device.data
          this.name = device.name
          this.place = device.places
          this.description = device.description
          this.tag = device.tag
          this.autocomplete = device.full_address
          this.address.full_address = device.full_address
          this.address.lat = device.lat
          this.address.lng = device.lng
        }
      } catch (error) {
        throw error
      }
    }
  }
}
</script>