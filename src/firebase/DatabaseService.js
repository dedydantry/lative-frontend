import {Database} from './FirebaseConfig'

const insertDevices = (params, code)=>{
    Database.ref('devices/' + code).set({
        name:params.name,
        code:params.code,
        last_playlist:'',
        last_video:'',
        on_clear:0,
        on_reload:0,
        on_reset:0,
        on_turn_off:0,
        online:false,
        uid:null,
        app_id:params.app_id
    })
}

const readDevice = (code)=>{
    return new Promise((resolve, reject) => {
        return Database.ref('/devices/'+code).once('value')
        .then(function(snapshot) {
            if(snapshot.val()) {
                resolve(true)
            }else{
                resolve(false)
            }
        })
        .catch(err => reject(err))
    })
}

const listenOnline = (code, event)=>{
    return Database.ref('devices/' + code + '/online')
}

const listenReload = (code, event) => {
    Database.ref('/devices/' + code).once('value').then(function(snapshot) {
        let  reload = (snapshot.val() && snapshot.val().on_reload) || 0
        reload = reload !== null ? reload + 1 : 0
        Database.ref('devices/' + code).update({on_reload:reload})
    })
}

const listenTurnOf = (code) => {
    Database.ref('/devices/' + code).once('value').then(function(snapshot) {
        let  turnOf = (snapshot.val() && snapshot.val().on_turn_off) || 0
        turnOf = turnOf !== null ? turnOf + 1 : null
        Database.ref('devices/' + code).update({on_turn_off:turnOf})
    })
}

const listenClear = (code) => {
    Database.ref('/devices/' + code).once('value').then(function(snapshot) {
        let  clear = (snapshot.val() && snapshot.val().on_clear) || 0
        clear = clear !== null ? clear + 1 : null
        Database.ref('devices/' + code).update({on_clear:clear})
    })
}

const listenReset = (code) => {
    Database.ref('/devices/' + code).once('value').then(function(snapshot) {
        let  resets = (snapshot.val() && snapshot.val().on_reset) || 0
        resets = resets !== null ? resets + 1 : 0
        Database.ref('devices/' + code).update({on_reset:resets})
    })
}

export {
    insertDevices,
    readDevice,
    listenOnline,
    listenReload,
    listenTurnOf,
    listenClear,
    listenReset
}