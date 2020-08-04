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

export {
    insertDevices,
    readDevice,
    listenOnline
}