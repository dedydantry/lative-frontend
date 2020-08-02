// Google Maps
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapAutocomplete from 'vue2-google-maps/dist/components/autocomplete'
Vue.component('gmap-autocomplete', GmapAutocomplete)
Vue.use(VueGoogleMaps, {
  load: {
    // Add your API key here
    key: process.env.VUE_APP_GOOGLE_MAP_KEY,
    libraries: 'places' // This is required if you use the Auto complete plug-in
  }
})