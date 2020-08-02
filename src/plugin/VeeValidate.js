import Vue from 'vue'
import * as VeeValidate from 'vee-validate'

VeeValidate.Validator.extend('arrays', {
    getMessage: field => 'The ' + field + ' is required',
    validate:( value) => {
        return value.length
    }
})


Vue.use(VeeValidate)