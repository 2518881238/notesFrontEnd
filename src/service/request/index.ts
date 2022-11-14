// index.ts
import axios, { AxiosResponse } from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type {
    RequestConfig,
    RequestInterceptors,
    CancelRequestSource,
} from './types'


class Request {
    // axios 实例
    instance: AxiosInstance

    //请求列表
    requestUrlList?: string[]

    //拦截器对象
    interceptorsObj?: RequestInterceptors<AxiosResponse>

    //取消请求的集合，请求是push,请求完毕或者取消该请求时pop
    cancelRequestSourceList?: CancelRequestSource[]

    constructor(config: RequestConfig) {
        this.requestUrlList = []
        this.cancelRequestSourceList = []
        this.instance = axios.create(config)
        this.interceptorsObj = config.interceptors

        // 拦截器执行顺序 接口请求 -> 实例请求 -> 全局请求 -> 实例响应 -> 全局响应 -> 接口响应
        this.instance.interceptors.request.use(
            (res: AxiosRequestConfig) => res,
            (err: any) => err
        )

        // 使用实例拦截器
        this.instance.interceptors.request.use(
            this.interceptorsObj?.requestInterceptors,
            this.interceptorsObj?.requestInterceptorsCatch
        )
        this.instance.interceptors.response.use(
            this.interceptorsObj?.responseInterceptors,
            this.interceptorsObj?.responseInterceptorsCatch
        )

        // 全局响应拦截器保证最后执行
        this.instance.interceptors.response.use(
            // 因为我们接口的数据都在res.data下，所以直接返回res.data
            (res: AxiosResponse) => {
                return res.data
            },
            (err: any) => err
        )
    }

    request<T>(config: RequestConfig<T>) {
        return new Promise((resolve, reject) => {
            // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
            if (config.interceptors?.requestInterceptors) {
                config = config.interceptors.requestInterceptors(config)
            }

            const url = config.url

            if(url){
                this.requestUrlList?.push(url)

                //在axios0.22起，对CancelToken已经弃用，需要改成  AbortController 文档：https://axios-http.com/docs/cancellation
                const controller = new AbortController()
                config.signal = controller.signal
                this.cancelRequestSourceList?.push({
                    [url]: controller.abort,
                })
            }

            this.instance.request<any, T>(config).then((res) => {

                // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
                if (config.interceptors?.responseInterceptors) {
                    res = config.interceptors.responseInterceptors(res)
                }
                resolve(res)

            }).catch((err: any) => {

                reject(err)

            }).finally(() => {

                url && this.delUrl(url)

            })
        })
    }

    // 取消请求
    cancelRequest(url: string | string[]) {
        if (typeof url === 'string') {
            // 取消单个请求
            const sourceIndex = this.getSourceIndex(url)
            sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][url]()
        } else {
            // 存在多个需要取消请求的地址
            url.forEach(u => {
                const sourceIndex = this.getSourceIndex(u)
                sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][u]()
            })
        }
    }

    // 取消全部请求
    cancelAllRequest() {
        this.cancelRequestSourceList?.forEach(source => {
            const key = Object.keys(source)[0]
            source[key]()
        })
    }

    /**
     * @description: 获取指定 url 在 cancelRequestSourceList 中的索引
     * @param {string} url
     * @returns {number} 索引位置
     */
    private getSourceIndex(url: string): number {
        return this.cancelRequestSourceList?.findIndex(
            (item: CancelRequestSource) => {
                return Object.keys(item)[0] === url
            },
        ) as number
    }

    /**
     * @description: 删除 requestUrlList 和 cancelRequestSourceList
     * @param {string} url
     * @returns {*}
     */
    private delUrl(url: string) {
        const urlIndex = this.requestUrlList?.findIndex(u => u === url)
        const sourceIndex = this.getSourceIndex(url)
        // 删除url和cancel方法
        urlIndex !== -1 && this.requestUrlList?.splice(urlIndex as number, 1)
        sourceIndex !== -1 &&
        this.cancelRequestSourceList?.splice(sourceIndex as number, 1)
    }
}



export default Request
