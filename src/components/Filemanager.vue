<template>
  <div class="demo-alignment">
    <vs-popup
      class="holamundo"
      title="File Manager"
      :active.sync="popupActivo"
    >
      <div class="file-manager">
        <div class="">
          <div class="file-manager-icon text-center">
            <div class="centerx">
              <vs-upload
                :action="action"
                :headers="header"
                file-name="video"
                accept="video/mp4,video/ogv,video/webm"
                @on-success="successUpload"
              />
            </div>
            <div class="mt-5">
              <ul
                v-if="videos.length"
                class="file-manager-list flex flex-wrap"
              >
                <li
                  v-for="(item, index) in videos"
                  :key="index"
                  :title="item.name"
                  class="file-manager-item bg-white rounded flex flex-col flex-wrap justify-between border border-solid border-grey-light cursor-pointer"
                  @contextmenu="onRightClick($event)"
                  @click="onChoseFile(item)"
                >
                  <div class="file-icons flex justify-center items-center p-1">
                    <vs-icon
                      icon-pack="feather"
                      icon="icon-film"
                      size="medium"
                      color="grey"
                    />
                  </div>
                  <div
                    class="file-names p-1"
                  >
                    <p
                      class="text-left"
                    >
                      {{ item.name.slice(0, 10) }}
                    </p>
                  </div>
                </li>
              </ul>
              <div
                v-else
                class="text-center"
              >
                <h6>No Video Found</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </vs-popup>
  </div>
</template>
<script>
export default {
  props:{
    show:{
      type:Boolean,
      default:false
    }
  },
  
  data(){
    return{
      action:process.env.VUE_APP_API_HOST +'/api/video',
      videos:[]
    }
  },

  computed:{
    header(){
      return{
        Authorization:'Bearer '+this.$store.state.auth.token
      }
    },

    popupActivo:{
      get(){
        return this.show
      },
      set(){
        this.$emit('close')
        return false
      }
    }
  },

  mounted(){
    this.fetchVideo()
  },

  methods:{
    successUpload(data){
      try {
        data = data.target.response
        let response = JSON.parse(data)
        if(response.status){
          this.videos.splice(0, 0, response.data)
          return this.$vs.notify({
            title:'Success',
            text:'Video has been uploaded',
            color:'success',
            position:'top-center'
          })
        }
        return this.$vs.notify({
          title:'Warning',
          text:'Error: '+response.data,
          color:'danger',
          position:'top-center'
        })
      } catch (error) {
        this.$vs.notify({
          title:'Warning',
          text:'Error: '+error.message,
          color:'danger',
          position:'top-center'
        })
        throw error
      }
    },

    async fetchVideo(){
      try {
        let video = await this.$axios.get('/api/video')
        if(video.status){
          this.videos = video.data
        }
      } catch (error) {
        throw error
      }
    },

    onChoseFile(arg){
      this.$emit('addVideo', arg)
    }
  }
}
</script>