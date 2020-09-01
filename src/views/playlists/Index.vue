<template>
  <div
    id="data-list-list-view"
    class="data-list-container w-full"
  >
    <div class="row">
      <div class="w-full flex mb-3">
        <div class="w-1/6 p-2 bg-gray-400">
          <!-- ADD NEW -->
          <div
            class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary"
            @click="$router.push('/playlists/create')"
          >
            <feather-icon
              icon="PlusIcon"
              svg-classes="h-4 w-4"
            />
            <span class="ml-2 text-base text-primary">
              Add New
            </span>
          </div>
        </div>
      </div>
    </div>
    <vs-table
      ref="table"
      :data="playlists"
    >
      <template slot="thead">
        <vs-th sort-key="name">
          Name
        </vs-th>
        <vs-th sort-key="category">
          Start
        </vs-th>
        <vs-th sort-key="popularity">
          Finish
        </vs-th>
        <vs-th sort-key="order_status">
          Video
        </vs-th>
        <vs-th sort-key="price">
          Tag
        </vs-th>
        <vs-th sort-key="price">
          Status
        </vs-th>
        <vs-th>Action</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
          <vs-tr
            v-for="(tr, indextr) in data"
            :key="indextr"
            :data="tr"
          >
            <vs-td>
              <p class="product-name font-medium truncate">
                {{ tr.name }}
              </p>
            </vs-td>

            <vs-td>
              <p class="product-category">
                {{ new Date(tr.start_date) | date }}
              </p>
            </vs-td>

            <vs-td>
              <p class="product-category">
                {{ new Date(tr.end_date) | date }}
              </p>
            </vs-td>

            <vs-td>
              <p class="product-category">
                {{ tr.video.length }}
              </p>
            </vs-td>

            <vs-td>
              <p class="product-category">
                {{ tr.tag.length }}
              </p>
            </vs-td>

            <vs-td>
              <a
                href="javascript:;"
                @click="onEnable(tr, indextr)"
              >
                <vs-chip
                  :color="tr.status ? 'success' : 'dark'"
                  class="product-order-status"
                >
                  {{ tr.status ? 'Enable' : 'Disable' }}
                </vs-chip>
              </a>
            </vs-td>

            <vs-td class="whitespace-no-wrap">
              <feather-icon
                icon="EyeIcon"
                color="primary"
                svg-classes="w-5 h-5 hover:text-primary stroke-current"
                @click="$router.push('/playlists/' + tr.id)"
              />
              <feather-icon
                icon="EditIcon"
                svg-classes="w-5 h-5 hover:text-primary stroke-current"
                class="ml-2"
                @click="$router.push('/playlists/edit/' + tr.id)"
              />
              <feather-icon
                icon="TrashIcon"
                svg-classes="w-5 h-5 hover:text-danger stroke-current"
                class="ml-2"
                @click="onDelete(tr.id,indextr)"
              />
            </vs-td>
          </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </div>
</template>

<script>

export default {
  data () {
    return {
      selected: [],
      playlists:[],
    }
  },

  mounted(){
    this.fetchPlaylist()
  },
 
  methods: {
    async fetchPlaylist(){
      try {
        let playlist = await this.$axios.get('/api/playlist')
        if(playlist.status){
          this.playlists = playlist.data
        }
      } catch (error) {
        throw error
      }
    },

    onDelete(id, index){
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Sure to delete this playlist ?.',
        accept:async()=>{
          try {
            this.$vs.loading()
            let deleted = await this.$axios.delete(`/api/playlist/${id}`)
            this.$vs.loading.close()
            if(deleted.status){
              this.$vs.notify({
                title:'Success',
                text:'Playlist has been deleted',
                color:'success',
                position:'top-center'
              })
              return this.playlists.splice(index,1)
            }
            this.$vs.notify({
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
        }
      })
    },

    onEnable(item, index){
      this.$vs.dialog({
        type:'confirm',
        color: 'warning',
        title: `Confirm`,
        text: `Sure to ${item.status ? 'Disable' : 'Inable'} this playlist ?`,
        accept:async()=>{
          try {
            this.$vs.loading()
            let change = await this.$axios.put(`/api/playlist/${item.id}/set-status`)
            this.$vs.loading.close()
            if(change.status){
              this.playlists[index].status = item.status ? false : true
              return this.$vs.notify({
                title:'Success',
                text:'Playlist has been changed',
                color:'success',
                position:'top-center'
              })
            }
            this.$vs.notify({
              title:'Success',
              text:'Error: '+ playlist.data,
              color:'dannger',
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
        }
      })
    }
  }
}
</script>