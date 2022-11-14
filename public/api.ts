const devApi = {
    baseUrl:'http://47.94.228.189:16001'
}

const proApi = {
    baseUrl:'http://47.94.228.189:16001/'
}

const envApi = process.env.NODE_ENV === 'development' ? devApi : proApi
export {envApi}
