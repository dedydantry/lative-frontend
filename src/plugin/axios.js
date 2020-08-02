'use strict'

import Vue from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'

const getToken = () => {
    let cookies = Cookies.get('vuex')
    if(cookies){
        cookies = JSON.parse(cookies)

        if(typeof cookies.auth != undefined){
            return cookies.auth.token
        }
        return ''
    }
}

const token = getToken()

axios.defaults.headers.common['Authorization'] = 'Bearer '+token
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
    baseURL: process.env.VUE_APP_API_HOST || process.env.VUE_APP_API_HOST || "http://localhost:8000",
    timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    }
)

// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        // Do something with response data
        response = typeof response.data != undefined ? response.data : response
        return response
       
    },
  
    function (error) {
        // handling error response from API
        if (error.response.status == 404) {
            window.location.replace('/error-404')
        }
        return Promise.reject(error)
    }
)

Plugin.install = function (Vue) {
    Vue.axios = _axios
    window.axios = _axios
    Object.defineProperties(Vue.prototype, {
        axios: {
            get () {
                return _axios
            }
        },
        $axios: {
            get () {
                return _axios
            }
        }
    })
}

Vue.use(Plugin)

export default Plugin
