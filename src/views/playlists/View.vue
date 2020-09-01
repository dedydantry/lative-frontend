<template>
  <div id="profile-page">
    <!-- COL AREA -->
    <div
      v-if="playlist"
      class="vx-row"
    >
      <!-- COL 1 -->
      <div
        class="vx-col w-full lg:w-1/4"
      >
        <vx-card
          title="Playlist Info"
          class="mt-base"
        >
          <div class="user-bio">
            <p>{{ playlist.name }}</p>
          </div>

          <div class="mt-5">
            <h6>Start:</h6>
            <p class="text-sm">
              {{ new Date(playlist.start_date) | date }}
            </p>
          </div>

          <div class="mt-5">
            <h6>Finish:</h6>
            <p class="text-sm">
              {{ new Date(playlist.end_date) | date }}
            </p>
          </div>

          <div class="mt-5 mb-5">
            <h6>Status:</h6>
            <p class="mt-1">
              <vs-chip
                :color="playlist.status ? 'success' : 'dark'"
                class="product-order-status"
              >
                {{ playlist.status ? 'Enable' : 'Disable' }}
              </vs-chip>
            </p>
          </div>
        </vx-card>
      </div>

      <div class="vx-col w-full lg:w-1/2">
        <vx-card
          class="mt-base"
          title="Playlist Video"
        >
          <ul class="page-suggestions-list">
            <li
              v-for="(item, index) in playlist.video"
              :key="index"
              class="page-suggestion flex items-center mb-4"
            >
              <div class="leading-tight">
                <p
                  class="font-medium"
                  title="View video"
                >
                  <a
                    href="javascript:;"
                    @click="viewVideo(item)"
                  >
                    {{ item.name | capitalize }}
                  </a>
                </p>
              </div>
              <div class="ml-auto">
                <div class="flex">
                  <feather-icon
                    icon="FilmIcon"
                    svg-classes="h-4 w-4"
                    class="mr-2 cursor-pointer"
                  />
                </div>
                <!-- <span class="flex bg-primary rounded p-2 text-white"><feather-icon icon="UserPlusIcon" svgClasses="w-4 h-4"></feather-icon></span> -->
              </div>
            </li>
          </ul>
        </vx-card>
        <vx-card
          class="mt-base"
          title="Playlist Tag"
        >
          <ul class="page-suggestions-list">
            <li
              v-for="(item, index) in playlist.tag"
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
      <div class="vx-col w-full lg:w-1/4">
        <vx-card
          title="Devices"
          class="mt-base"
        >
          <ul class="page-suggestions-list">
            <li
              v-for="(item, index) in device"
              :key="index"
              class="page-suggestion flex items-center mb-4"
            >
              <div class="leading-tight">
                <p class="font-medium">
                  {{ item.name | capitalize }}
                </p>
                <span class="text-xs">
                  {{ item.code | capitalize }}
                </span>
              </div>
              <div class="ml-auto">
                <div class="flex">
                  <feather-icon
                    icon="FlagIcon"
                    svg-classes="h-4 w-4"
                    class="mr-2 cursor-pointer"
                    @click="$router.push('/devices/' + item.code)"
                  />
                </div>
              </div>
            </li>
          </ul>
        </vx-card>
      </div>
    </div>
    <ViewPopup 
      :show="toggleVideoPopup" 
      :title="videoTitle"
      :player-options="playerOptions" 
      @close="toggleVideoPopup = false"
    />
  </div>
</template>

<script>
import ViewPopup from '@/components/VideoPopup'
export default {
  components:{
    ViewPopup
  },

  data(){
    return{
      playlist:null,
      device:[],
      videoTitle:'',
      playerOptions:null,
      toggleVideoPopup:false
    }
  },

  mounted() {
    this.fetchPlaylist()
  },

  methods: {
    async fetchPlaylist(){
      try {
        const playlistID = this.$route.params.id
        if(!playlistID) return this.$router.push('/error-404')

        let playlist = await this.$axios.get('/api/playlist/'+playlistID)
        if(playlist.status){
          this.playlist = playlist.data.playlist
          this.device = playlist.data.device
        }
      } catch (error) {
        console.log(error)
      }
    },

    viewVideo(item){
      this.playerOptions = {
        muted: true,
        language: 'en',
        sources : [{
          type: "video/mp4",
          src: item.link
        }]
      }

      this.videoTitle = item.name

      return this.toggleVideoPopup = true
    }
  },

}

</script>