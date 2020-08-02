<template>
  <div 
    id="page-login" 
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div 
          slot="no-body" 
          class="full-page-bg-color"
        >
          <div class="p-8">
            <vs-alert class="text-center">
              Please check your email, we have sent an email to activate your account
            </vs-alert>
            <div class="mt-2 w-full flex items-center justify-center">
              <vs-button
                color="primary"
                type="filled"
                to="/login"
              >
                Back To Login
              </vs-button>
              <vs-button
                color="warning"
                type="filled"
                class="ml-1"
                @click="postResend()"
              >
                Resend Email
              </vs-button>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      email:''
    }
  },

  mounted(){
    this.checkEmail()
  },

  methods:{
    checkEmail(){
      const urlParams = this.$route.query
      if(typeof urlParams.email != undefined){
        const email = urlParams.email
        return this.email = email
      }

      return this.$router.push('/login')
    },

    async postResend(){
      try {
        this.$vs.loading()
        let resend = await this.$axios.post('/resend-code-activate', {
          email:this.email
        })
        this.$vs.loading.close()
        if(resend.status){
          return this.$vs.notify({
            title:'Success',
            text:'Please check your email, We have been sent an email activate',
            color:'success',
            position:'top-center'
          })
        }
        return this.$vs.notify({
          title:'Warning',
          text:'Error:'+resend.data,
          color:'danger'
        })
      } catch (error) {
        this.$vs.loading.close()
        return this.$vs.notify({
          title:'danger',
          text:'Error:'+error.message,
          color:'danger'
        })
        throw error
      }
    }
  }
}
</script>
