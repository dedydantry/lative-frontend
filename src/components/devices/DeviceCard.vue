<template>
  <div>
    <vx-card>
      <div slot="no-body">
        <img
          src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/content-img-1.228da091.jpg"
          alt="content-img"
          class="responsive card-img-top"
        >
      </div>
      <h5 class="mb-2">
        {{ device.name }}
      </h5>
      <p class="text-grey text-xs">
        {{ device.address.places }}, {{ device.address.address }}, {{ device.address.city }}
      </p>
      <p class="text-grey">
        {{ device.code }}
      </p>
      <div class="flex justify-between flex-wrap">
        <vs-button
          class="mt-4 mr-2 shadow-lg"
          type="gradient"
          color="#7367F0"
          gradient-color-secondary="#CE9FFC"
          size="small"
          :to="'/devices/'+device.code"
        >
          View
        </vs-button>
        <div class="mt-4">
          <feather-icon
            icon="EditIcon"
            class="cursor-pointer"
            svg-classes="w-5 h-5 hover:text-primary stroke-current"
            @click="$router.push('/devices/edit/'+device.code)"
          />
          <feather-icon
            icon="TrashIcon"
            class="ml-2 cursor-pointer"
            svg-classes="w-5 h-5 hover:text-danger stroke-current"
            @click="remove(device.code, index)"
          />
        </div>
      </div>
    </vx-card>
  </div>
</template>
<script>
export default {
  props:{
    device:{
      type:Object,
      default(){
        return {
          name:'No Name',
          places:'No Places',
          code:'No code'
        }
      }
    },

    index:{
      type:Number,
      default:null
    }
  },

  methods:{
    remove(code,index){
      return this.$emit('delete', code, index)
    }
  }
}
</script>