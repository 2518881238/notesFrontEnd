import Request from './request'
import { AxiosResponse } from 'axios'
import type { RequestConfig } from './request/types'
import {envApi} from "../../public/api";

export interface IResponse<T> {
    statusCode: number
    desc: string
    result: T
}

// 重写返回类型
interface IRequestConfig<T, R> extends RequestConfig<IResponse<R>> {
    data?: T
}

const request = new Request({
    baseURL: envApi.baseUrl,
    timeout: 1000 * 60 * 5,
    interceptors: {
        // 请求拦截器
        requestInterceptors: config => config,
        // 响应拦截器
        responseInterceptors: (result: AxiosResponse) => {
            return result
        },
    },
})

//发起请求
export const axiosRequest = <D = any, T = any>(config: IRequestConfig<D, T>) => {
    const { method = 'GET' } = config
    if (method === 'get' || method === 'GET') {
        config.params = config.data
    }
    return request.request<IResponse<T>>(config)
}

// 取消请求
export const cancelRequest = (url: string | string[]) => {
    return request.cancelRequest(url)
}
// 取消全部请求
export const cancelAllRequest = () => {
    return request.cancelAllRequest()
}