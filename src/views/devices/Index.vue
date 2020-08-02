<template>
  <div>
    <div class="row">
      <div class="w-full flex mb-3">
        <div class="w-1/6 p-2 bg-gray-400">
          <!-- ADD NEW -->
          <div
            class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary"
            @click="$router.push('/devices/create')"
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
        <div class="w-1/6 p-2 bg-gray-400">
          <v-select
            v-model="orderType"
            :options="['card','list']"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
          />
        </div>
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="orderType == 'card'"
        class="vx-row"
      >
        <div
          v-for="(item, index) in devices"
          :key="index"
          class="vx-col w-full sm:w-1/2 lg:w-1/4 mb-base"
        >
          <DeviceCard
            :device="item"
            :index="index"
            @delete="onDelete"
          />
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-if="orderType == 'list'"
        class="vx-row"
      >
        <DeviceList
          :devices="devices"
          @delete="onDelete"
        />
      </div>
    </transition>
  </div>
</template>
<script>
import vSelect from 'vue-select'
import DeviceCard from '@/components/devices/DeviceCard'
import DeviceList from '@/components/devices/DeviceList'
export default {
  components:{
    'v-select': vSelect,
    DeviceCard,
    DeviceList
  },

  data(){
    return{
      orderType:'card',
      devices:[]
    }
  },

  mounted(){
    this.fetchDevice()
  },

  methods:{
    async fetchDevice(){
      try {
        let device = await this.$axios.get('/api/device')
        if(device.status){
          this.devices = device.data
        }
      } catch (error) {
        throw error
      }
    },

    onDelete(code, index){
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Sure to delete this device ?.',
        accept:async()=>{
          try {
            this.$vs.loading()
            let deleted = await this.$axios.delete(`/api/device/${code}`)
            this.$vs.loading.close()
            if(deleted.status){
              this.$vs.notify({
                title:'Success',
                text:'Device has been deleted',
                color:'success',
                position:'top-center'
              })
              return this.devices.splice(index,1)
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
    }
  }
}
</script>