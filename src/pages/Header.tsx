import * as React from "react";
import "@/css/Header.less"
import {Link} from "react-router-dom"

type TabItem = {
    name:string,
    index:string,
    href:string,
}

type StateType = {
    tab:number,
    tabs:Array<TabItem>
};

class Header extends React.Component <any,StateType>{
    constructor(props:any){
        super(props);

        const liTab =[
            {name:"首页",index:"0",href:"/home"},
            {name:"问答",index:"1",href:"/home"},
            {name:"专栏",index:"2",href:"/home"},
            {name:"资讯",index:"3",href:"/home"},
            {name:"课程",index:"4",href:"/home"},
            {name:"活动",index:"5",href:"/home"},
            {name:"发现",index:"6",href:"/home"}
        ]
        this.state={
            tab:0,
            tabs:liTab
        }
    }

    HitTab(idx:number,href:string){
        this.setState(Object.assign({}, this.state, { tab: idx }));
        this.props.history.push(href);
    }
    
    RenderLi(liTab:Array<TabItem>,tab:number,hitTab:Function){
        return liTab.map((item, idx) => {
            return(
                <li
                    key={item.index}
                    className ={ tab === idx ? 'liTab active' : 'liTab'}
                    onClick={()=>{hitTab(idx,item.href)}}>
                    <span>{item.name}</span>
                </li>
            )
        })
    }

    render() {
        const {tabs,tab} = this.state;
        return(
            <div className="head">
                <div className="head-mid">
                    <div className="logo">
                        <span className="logo-font">知秋</span>
                    </div>
                    <ul className="ul-tab">
                        {this.RenderLi(tabs,tab,this.HitTab)}
                    </ul>
                    <div className="login">
                        <span><Link to='/simditor'>写博文</Link></span>
                        <span><Link to='/Login'>登录</Link></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header
