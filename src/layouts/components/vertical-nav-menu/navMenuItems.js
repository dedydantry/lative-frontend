/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
    {
        url: "/",
        name: "Dashboard",
        slug: "/",
        icon: "HomeIcon",
    },
    
    {
        header: 'Main',
        icon: 'FileIcon',
        i18n: 'Main',
        items: [
            {
                url: "/devices",
                name: "Devices",
                slug: "devices",
                icon: "MonitorIcon",
            },
            {
                url: "/playlists",
                name: "Playlists",
                slug: "playlists",
                icon: "ListIcon",
            }
        ]
    },

    {
        header: 'Setting',
        icon: 'SettingIcon',
        i18n: 'Setting',
        items: [
            {
                url: "/users",
                name: "Users",
                slug: "users",
                icon: "UserIcon",
            }
        ]
    }
]
