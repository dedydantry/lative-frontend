import {FireStore} from './FirebaseConfig'

const insert = (colName, id, params) => {
    return new Promise((resolve, reject) => {
        FireStore.collection(colName).doc(id).set(params)
        .then(docReff => {
            resolve(docReff)
        })
        .catch(error => {
            reject(error)
        })
    })
}

const readID = (colName, id) => {
    return new Promise((resolve, reject) => {
        FireStore.collection(colName).doc(id).get()
        .then(doc => {
            if (doc.exists) {
               resolve({
                   status:true,
                   data:doc.data()
               })
            } else {
                resolve({
                   status:false,
                   data:'No such document'
               })
            }

        }).catch(err =>{
            reject(err)
        })
    })
}

const getDeviceStatus = (status, app) => {
    return new Promise((resolve, reject) => {
        FireStore.collection('devices')
        .where("online", '==', status)
        .where("app_id", '==', app)
        .get()
        .then(querySnapshot => {
            let result = []
            querySnapshot.forEach(doc => {
                result.push(doc.data())
            })
            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
    })
}


const listen = (path, event) => {
    FireStore.ref(path).on('value', event)
}

export{
    insert,
    listen,
    readID,
    getDeviceStatus
}