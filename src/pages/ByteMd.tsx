import 'bytemd/dist/index.css'
// 编辑 / 视图
import { Editor, Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight-ssr';
import mediumZoom from "@bytemd/plugin-medium-zoom";
import gemoji from "@bytemd/plugin-gemoji";
// 引入中文包
import zhHans from "bytemd/lib/locales/zh_Hans.json";

// 引入基础css
import 'bytemd/dist/index.min.css';
// 引入高亮css
import "highlight.js/styles/vs.css";

import * as React from "react";

import {axiosRequest} from "@/service";


const plugins = [gfm(), gemoji(), highlight(), mediumZoom()]

type StateType = {
    value:string
}

class ByteMd extends React.Component<any,StateType>{
    constructor(props:any) {
        super(props);
        this.state = {
            value:''
        }
    }

    uploadImg(file:File[]):Promise<any>{
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("file",file[0])

            const config = {
                url:'/test/upload',
                method:'post',
                formData
            }
            axiosRequest(config).then(res => {
                console.log('====',res)
                resolve(res)
                // resolve([{ res.data.url, alt }])
            }).catch(err => {
                reject('')
                console.error('this is a error',err)
            })
        })
    }

    render(){
        return (
            <Editor
                // 语言
                locale={zhHans}
                // 内部的值
                value={this.state.value}
                plugins={plugins}
                onChange={(v:string) => {
                    this.setState(Object.assign({},this.state,{value:v}))
                }}
                uploadImages={this.uploadImg}
            />
        )
    }
}

export default ByteMd