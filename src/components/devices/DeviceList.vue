<template>
  <div
    id="data-list-list-view"
    class="data-list-container w-full"
  >
    <vs-table
      ref="table"
      :data="devices"
    >
      <template slot="thead">
        <vs-th sort-key="name">
          Name
        </vs-th>
        <vs-th sort-key="category">
          Code
        </vs-th>
        <vs-th sort-key="popularity">
          Place
        </vs-th>
        <vs-th sort-key="order_status">
          Address
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
                {{ tr.code }}
              </p>
            </vs-td>

            <vs-td>
              <p class="product-category">
                {{ tr.address.places }}
              </p>
            </vs-td>


            <vs-td>
              <p class="product-category">
                {{ tr.address.address }}
              </p>
            </vs-td>

            <vs-td class="whitespace-no-wrap">
              <feather-icon
                icon="EditIcon"
                svg-classes="w-5 h-5 hover:text-primary stroke-current"
                @click="$router.push('/devices/edit/'+tr.code)"
              />
              <feather-icon
                icon="TrashIcon"
                svg-classes="w-5 h-5 hover:text-danger stroke-current"
                class="ml-2"
                @click="remove(tr.code, indextr)"
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
  props:{
    devices:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods: {
    remove(code,index){
      return this.$emit('delete', code, index)
    }
  }
}
</script>