<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div 
          slot="no-body" 
          class="full-page-bg-color"
        >
          <div class="vx-row no-gutter">
            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
              <img 
                src="@/assets/images/pages/register.jpg" 
                alt="register" 
                class="mx-auto"
              >
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg">
              <div class="px-8 pt-8 register-tabs-container">
                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">
                    Create Account
                  </h4>
                </div>
                <form @submit.prevent="onSubmit">
                  <div class="clearfix mb-3 pb-2">
                    <vs-select 
                      v-model="country" 
                      class="w-full" 
                      placeholder="Country"
                      data-vv-validate-on="blur"
                      name="country"
                    >
                      <vs-select-item 
                        v-for="(item,index) in arrCountry" 
                        :key="index" 
                        :value="item.name" 
                        :text="item.name"
                      />
                    </vs-select>
                    <span class="text-danger text-sm">
                      {{ errors.first('country') }}
                    </span>

                    <vs-input
                      v-model="name"
                      v-validate="'required|min:3'"
                      data-vv-validate-on="blur"
                      label-placeholder="Name"
                      name="name"
                      placeholder="Name"
                      class="w-full"
                    />
                    <span class="text-danger text-sm">
                      {{ errors.first('name') }}
                    </span>

                    <vs-input
                      v-model="email"
                      v-validate="'required|email'"
                      data-vv-validate-on="blur"
                      name="email"
                      type="email"
                      label-placeholder="Email"
                      placeholder="Email"
                      class="w-full mt-6"
                    />
                    <span class="text-danger text-sm">
                      {{ errors.first('email') }}
                    </span>

                    <vs-input
                      v-model="phone"
                      v-validate="'required'"
                      data-vv-validate-on="blur"
                      name="phone"
                      type="text"
                      label-placeholder="Phone"
                      placeholder="Phone"
                      class="w-full mt-6"
                    />
                    <span class="text-danger text-sm">
                      {{ errors.first('phone') }}
                    </span>

                    <vs-input
                      ref="password"
                      v-model="password"
                      v-validate="'required|min:6|max:10'"
                      type="password"
                      data-vv-validate-on="blur"
                      name="password"
                      label-placeholder="Password"
                      placeholder="Password"
                      class="w-full mt-6"
                    />
                    <span class="text-danger text-sm">
                      {{ errors.first('password') }}
                    </span>

                    <vs-input
                      v-model="confirm_password"
                      v-validate="'min:6|max:10|confirmed:password'"
                      type="password"
                      data-vv-validate-on="blur"
                      data-vv-as="password"
                      name="confirm_password"
                      label-placeholder="Confirm Password"
                      placeholder="Confirm Password"
                      class="w-full mt-6"
                    />
                    <span class="text-danger text-sm">
                      {{ errors.first('confirm_password') }}
                    </span>

                    <vs-checkbox 
                      v-model="isTermsConditionAccepted" 
                      class="mt-6"
                    >
                      I accept the terms & conditions.
                    </vs-checkbox>
                    <vs-button 
                      type="border" 
                      to="/login" 
                      class="mt-6"
                    >
                      Login
                    </vs-button>
                    <vs-button 
                      :disabled="!validateForm" 
                      class="float-right mt-6" 
                      button="submit"
                    >
                      Register
                    </vs-button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      arrCountry:[
        {id:1,name:'Indonesia'},
        {id:2,name:'Thailand'},
      ],
      name: '',
      email: '',
      password: '',
      phone:'',
      confirm_password: '',
      isTermsConditionAccepted: true,
      country:''
    }
  },

  computed: {
    validateForm () {
      return !this.errors.any() && this.name !== '' 
        && this.email !== '' && this.password !== '' 
        && this.confirm_password !== '' && this.phone !== ''
        && this.country !== '' && this.isTermsConditionAccepted === true
    }
  },

  created(){
    this.fetchCountry()
  },

  methods: {
    onSubmit(){
      this.$validator.validateAll().then(result => {
        if (result) {
          return this.postSignup()
        } 
      })
    },

    async fetchCountry(){
      try {
        let country = await this.$axios.get('https://restcountries.eu/rest/v2/all')
        this.arrCountry = country
      } catch (error) {
        throw error
      }
    },

    async postSignup(){
      try {
        this.$vs.loading()
        let signup = await this.$axios.post('/signup', {
          name:this.name,
          email:this.email,
          password:this.password,
          password_confirmation:this.confirm_password,
          phone:this.phone,
          country:this.country
        })
        this.$vs.loading.close()
        if(signup.status){
          return this.$router.push(`/auth-info?email=${this.email}`)
        }
        return this.$vs.notify({
          title:'Warning',
          text:'Error:'+post.data,
          color:'danger'
        })
      } catch (error) {
        this.$vs.loading.close()
        this.$vs.notify({
          title:'Warning',
          text:'Error:'+error.message,
          color:'danger'
        })
        throw error
      }
    }
  }
}
</script>
