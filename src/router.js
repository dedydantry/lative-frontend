import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'

Vue.use(Router)

import Main from './layouts/main/Main.vue'
import Home from './views/Home.vue'
import Page2 from './views/Page2.vue'

import FullPage from '@/layouts/full-page/FullPage.vue'
import Login from '@/views/pages/Login.vue'
import Register from '@/views/pages/Register.vue'
import AuthAlert from '@/views/pages/AuthAlert.vue'

//Errors
import Error404 from '@/views/pages/errors/Error404.vue'
import Error500 from '@/views/pages/errors/Error500.vue'
import ErrorAuthorized from '@/views/pages/errors/ErrorAuthorized.vue'

//device
import DeviceIndex from '@/views/devices/Index'
import DeviceForm from '@/views/devices/Form'
import DeviceView from '@/views/devices/View'

//Playlists
import PlaylistIndex from '@/views/playlists/Index'
import PlaylistForm from '@/views/playlists/Form'

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [
		{
			path: '',
			component: Main,
			children: [
				{
					path: '/',
					name: 'Dahsboard',
					component: Home,
					meta:{
							auth:true
					}
				},
				{
					path: '/devices',
					name: 'devices',
					component: DeviceIndex,
					meta:{
						breadcrumb: [
							{ title: 'Dashboard', url: '/' },
							{ title: 'Devices List', active: true }
						],
						auth:true
					}
				},
				{
					path: '/devices/create',
					name: 'devicesCreate',
					component: DeviceForm,
					meta:{
						breadcrumb: [
							{ title: 'Dashboard', url: '/' },
							{ title: 'Devices', url:'/devices'},
							{ title: 'Devices Form', active: true }
						],
						auth:true
					}
				},
				{
					path: '/devices/edit/:code',
					name: 'devicesEdit',
					component: DeviceForm,
					meta:{
						breadcrumb: [
							{ title: 'Dashboard', url: '/' },
							{ title: 'Devices', url:'/devices'},
							{ title: 'Devices Form', active: true }
						],
						auth:true
					}
				},
				{
					path: '/devices/:code',
					name: 'devicesView',
					component: DeviceView,
					meta:{
						breadcrumb: [
							{ title: 'Dashboard', url: '/' },
							{ title: 'Devices', url:'/devices'},
							{ title: 'Devices Detail', active: true }
						],
						auth:true
					}
				},
				{
					path: '/playlists',
					name: 'devicesIndex',
					component: PlaylistIndex,
					meta:{
						breadcrumb: [
							{ title: 'Dashboard', url: '/' },
							{ title: 'Playlist List', active: true }
						],
						auth:true
					}
				},
				{
					path: '/playlists/create',
					name: 'devicesCreate',
					component: PlaylistForm,
					meta:{
						breadcrumb: [
							{ title: 'Dashboard', url: '/' },
							{ title: 'Playlist List', active: true },
							{ title: 'Playlist Form', active: true }
						],
						auth:true
					}
				},
				{
					path: '/playlists/edit/:id',
					name: 'devicesEdit',
					component: PlaylistForm,
					meta:{
						breadcrumb: [
							{ title: 'Dashboard', url: '/' },
							{ title: 'Playlist List', active: true },
							{ title: 'Playlist Form', active: true }
						],
						auth:true
					}
				},
			],
		},
		// =============================================================================
		// FULL PAGE LAYOUTS
		// =============================================================================
		{
			path: '',
			component: FullPage,
			children: [
				{
					path: '/login',
					name: 'page-login',
					component: Login,
					meta:{
							auth:false
					}
				},
				{
					path: '/register',
					name: 'page-register',
					component: Register,
					meta:{
							auth:false
					}
				},
				{
					path: '/auth-info',
					name: 'AuthAlert',
					component: AuthAlert,
					meta:{
						auth:false
					}
				},
				{
					path: '/error-404',
					name: 'page-error-404',
					component: Error404
				},
			]
		},
		// Redirect to 404 page, if no match found
		{
			path: '*',
			redirect: '/error-404'
		}
    ],
})
router.beforeEach((to, from, next) => {
    const isLoggedin = store.state.auth.token
    // check if meta auth false and status is logged in redirect to home
    if (to.matched.some(record => record.meta.auth === false)) {
        if(isLoggedin){
            return router.push('/')
        }
        // check if meta auth true and status is logged in true
    }else if(to.matched.some(record => record.meta.auth === true)){
        if(!isLoggedin){
            return router.push('/login')
        }
    }

    return next()
})

router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none"
    }
})

export default router
