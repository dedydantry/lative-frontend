<template>
  <div id="profile-page">
    <div
      v-if="device"
      class="profile-header"
    >
      <div class="relative">
        <div class="cover-container rounded-t-lg">
          <GmapMap
            :center="{lat:parseFloat(device.lat), lng:parseFloat(device.lng)}"
            :zoom="7"
            map-type-id="terrain"
            style="width: 100%; height: 400px"
          >
            <GmapMarker
              :position="{lat:parseFloat(device.lat), lng:parseFloat(device.lng)}"
              :clickable="true"
              :draggable="true"
            />
          </GmapMap>
        </div>
      </div>
      <div class="flex items-center justify-end flex-wrap profile-header-nav p-6">
        <div
          class="w-full flex-grow sm:flex sm:items-center sm:w-auto"
        >
          <div class="text-sm sm:flex-grow">
            <ul class="sm:flex justify-around mt-8 w-full md:mt-0 md:m-auto md:w-3/4">
              <li class="p-2 sm:p-0">
                <vs-button
                  :color="deviceStatus ? 'success' : 'dark'"
                  type="border"
                  icon-pack="feather"
                  icon="icon-check"
                  class="w-full"
                >
                  {{ deviceStatus ? 'ONLINE' : 'OFFLINE' }}
                </vs-button>
              </li>
              <li class="p-2 sm:p-0">
                <vs-button
                  color="primary"
                  type="border"
                  icon-pack="feather"
                  icon="icon-toggle-left"
                  class="w-full"
                >
                  Enabled
                </vs-button>
              </li>
              <li class="p-2 sm:p-0">
                <vs-button
                  color="danger"
                  type="border"
                  icon-pack="feather"
                  icon="icon-refresh-ccw"
                  class="w-full"
                  @click="onResetDevice()"
                >
                  Reset
                </vs-button>
              </li>
              <li class="p-2 sm:p-0">
                <vs-button
                  color="success"
                  type="border"
                  icon-pack="feather"
                  icon="icon-trash"
                  class="w-full"
                  @click="onClearDevice()"
                >
                  Clean
                </vs-button>
              </li>
              <li class="p-2 sm:p-0">
                <vs-button
                  color="danger"
                  type="border"
                  icon-pack="feather"
                  icon="icon-power"
                  class="w-full"
                  @click="onTurnofDevice()"
                >
                  Turn Off
                </vs-button>
              </li>
              <li class="p-2 sm:p-0">
                <vs-button
                  color="warning"
                  type="border"
                  icon-pack="feather"
                  icon="icon-refresh-cw"
                  class="w-full"
                  @click="onReloadDevice()"
                >
                  Reload
                </vs-button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- COL AREA -->
    <div
      v-if="device"
      class="vx-row"
    >
      <!-- COL 1 -->
      <div
        class="vx-col w-full lg:w-1/4"
      >
        <vx-card
          :title="device.name"
          class="mt-base"
        >
          <div class="user-bio">
            <p>{{ device.full_address }}</p>
          </div>

          <div class="mt-5">
            <h6>Registered:</h6>
            <p class="text-sm">
              {{ new Date(device.created_at) | date }}
            </p>
            <p class="text-sm bold">
              Author : {{ device.author }}
            </p>
          </div>

          <div class="mt-5">
            <h6>CODE:</h6>
            <p>{{ device.code }}</p>
          </div>

          <div class="mt-5">
            <h6>Lat:</h6>
            <p>{{ device.lat }}</p>
          </div>

          <div class="mt-5">
            <h6>Lng:</h6>
            <p>{{ device.lng }}</p>
          </div>
        </vx-card>
        <vx-card
          title="Device Tag"
          class="mt-base"
        >
          <ul class="page-suggestions-list">
            <li
              v-for="(item, index) in device.tag"
              :key="index"
              class="page-suggestion flex items-center mb-4"
            >
              <div class="leading-tight">
                <p class="font-medium">
                  {{ item.name | capitalize }}
                </p>
              </div>
              <div class="ml-auto">
                <div class="flex">
                  <feather-icon
                    icon="TagIcon"
                    svg-classes="h-4 w-4"
                    class="mr-2 cursor-pointer"
                  />
                </div>
                <!-- <span class="flex bg-primary rounded p-2 text-white"><feather-icon icon="UserPlusIcon" svgClasses="w-4 h-4"></feather-icon></span> -->
              </div>
            </li>
          </ul>
        </vx-card>
      </div>

      <div class="vx-col w-full lg:w-1/2">
        <vx-card
          class="mt-base"
          title="Playlist"
        >
          <vs-list-header
            icon-pack="feather"
            icon="icon-check"
            title="Active"
            color="success"
          />
          <vs-list-item
            v-for="(item ,index) in device.playlist_active"
            :key="index"
            icon-pack="feather"
            icon="icon-flag"
            :title="item.name"
            :subtitle="`${formatDate(item.start_date)} - ${formatDate(item.end_date)}`"
          >
            <feather-icon
              icon="EyeIcon"
              svg-classes="h-4 w-4"
              class="mr-2 cursor-pointer"
              @click="$router.push('/playlists/' + item.id)"
            />
          </vs-list-item>

          <vs-list-header
            icon-pack="feather"
            icon="icon-alert-octagon"
            title="Inactive"
            color="danger"
          />
          <vs-list-item
            v-for="(item ,index) in device.playlist_inactive"
            :key="index"
            icon-pack="feather"
            icon="icon-flag"
            :title="item.name"
            :subtitle="`${formatDate(item.start_date)} - ${formatDate(item.end_date)}`"
          >
            <feather-icon
              icon="EyeIcon"
              svg-classes="h-4 w-4"
              class="mr-2 cursor-pointer"
            />
          </vs-list-item>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  readDevice, 
  insertDevices, 
  listenOnline, 
  listenReload,
  listenTurnOf,
  listenClear,
  listenReset
} from '@/firebase/DatabaseService'
export default {
  data(){
    return{
      device:null,
      firstRender:true,
      deviceStatus:false
    }
  },

  mounted() {
    this.fetchDeviceByCode()
  },

  methods: {
    async fetchDeviceByCode(){
      try {
        this.$vs.loading()
        const deviceCode = this.$route.params.code ? this.$route.params.code : null
        if(!deviceCode) return
        this.deviceCode = deviceCode
        let device = await this.$axios.get('/api/device/' + deviceCode)
        if(device.status){
          this.device = device.data
          this.checkDeviceOnFirebase(device.data)
          this.onlineEvent(device.data.code)
        }
        this.$vs.loading.close()
      } catch (error) {
        this.$vs.loading.close()
        throw error
      }
    },
    
    formatDate(params){
      if(!params) return ''
      params = params.split(' ')
      return this.$options.filters.date(new Date(params[0]))
    },

    async checkDeviceOnFirebase(params){
      try {
        let check = await readDevice(params.code)
        if(!check){
          insertDevices(params, params.code)
        }
      } catch (error) {
        throw error
      }
    },

    onlineEvent(code){
      let listener = listenOnline(code)
      listener.on('value', (snapshot) => {
        return this.deviceStatus = snapshot.val() ? true : false
      })
    },

    onReloadDevice(){
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Sure to reload this device ?',
        accept:()=>{
          listenReload(this.device.code)
        }
      })
    },

    onTurnofDevice(){
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Sure to Turn off this device ?',
        accept:()=>{
          listenTurnOf(this.device.code)
        }
      })
    },

    onClearDevice(){
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Sure to clear this device ?',
        accept:()=>{
          listenClear(this.device.code)
        }
      })
    },

    onResetDevice(){
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Sure to reset this device ?',
        accept:()=>{
          listenReset(this.device.code)
        }
      })
    }
  }

}

</script>


<style lang="scss">
@import "@/assets/scss/vuexy/pages/profile.scss";
</style>
