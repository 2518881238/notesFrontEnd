import * as React from "react";
import "@/css/Home.less"

type TabItem = {
    name:string,
    index:string,
    href:string,
}

type LeftLi = {
    tab:number,
    tabs:Array<TabItem>
}

type StateType = {
    leftLi:LeftLi,
    imgList:Array<string>
};

class Home extends React.Component<any,StateType>{
    constructor(props:any){
        super(props);

        const tabs1 =[
            {
                name:"技术社区",
                elem:[
                    {name:"CSDN",index:"0",href:"https://www.csdn.net/"},
                    {name:"简书",index:"1",href:"https://www.jianshu.com/"},
                    {name:"SegmentFault",index:"2",href:"https://segmentfault.com/"}
                ],
                index:"0"
            },{
                name:"技术分类",
                elem:[
                    {name:"CSDN",index:"0",href:"https://www.csdn.net/"},
                    {name:"简书",index:"1",href:"https://www.jianshu.com/"},
                    {name:"SegmentFault",index:"2",href:"https://segmentfault.com/"}
                ],
                index:"1"
            },{
                name:"技术网站",
                elem:[
                    {name:"CSDN",index:"0",href:"https://www.csdn.net/"},
                    {name:"简书",index:"1",href:"https://www.jianshu.com/"},
                    {name:"SegmentFault",index:"2",href:"https://segmentfault.com/"}
                ],
                index:"2"
            }
        ]
        const tabs =[
            {name:"CSDN",index:"0",href:"https://www.csdn.net/"},
            {name:"简书",index:"1",href:"https://www.jianshu.com/"},
            {name:"SegmentFault",index:"2",href:"https://segmentfault.com/"},
            {name:"CSDN",index:"0",href:"https://www.csdn.net/"},
            {name:"简书",index:"1",href:"https://www.jianshu.com/"},
            {name:"SegmentFault",index:"2",href:"https://segmentfault.com/"},
            {name:"CSDN",index:"0",href:"https://www.csdn.net/"},
            {name:"简书",index:"1",href:"https://www.jianshu.com/"},
            {name:"SegmentFault",index:"2",href:"https://segmentfault.com/"},
            {name:"CSDN",index:"0",href:"https://www.csdn.net/"},
            {name:"简书",index:"1",href:"https://www.jianshu.com/"},
            {name:"SegmentFault",index:"2",href:"https://segmentfault.com/"},
            {name:"CSDN",index:"0",href:"https://www.csdn.net/"},
            {name:"简书",index:"1",href:"https://www.jianshu.com/"},
            {name:"SegmentFault",index:"2",href:"https://segmentfault.com/"},
            {name:"CSDN",index:"0",href:"https://www.csdn.net/"},
            {name:"简书",index:"1",href:"https://www.jianshu.com/"},
            {name:"SegmentFault",index:"2",href:"https://segmentfault.com/"}
        ]

        this.state={
            leftLi:{
                tab:0,
                tabs
            },
            imgList:[
                require("../images/1.jpg"),
                require("../images/2.jpg"),
                require("../images/3.jpg"),
                require("../images/4.jpg"),
                require("../images/5.jpg"),
            ]
        }
    }
    changeLis=(idx:number)=>{
        this.setState({
            leftLi: Object.assign({}, this.state.leftLi, { tab: idx })
        });
    }

    renderLi(tabs:Array<TabItem>,tab:number,changeLis:Function){
        return tabs.map((item, idx) => {
            return(
                <li key={item.index} className={ tab === idx ? 'leftLi active' : 'leftLi' } onClick={()=>{changeLis(idx)}}>
                    <span>{item.name}</span>
                </li>)
        })
    }

    render() {
        const {tabs,tab} = this.state.leftLi;
        const imgList = this.state.imgList;
        return(
            <div className="main-home">
                <div className="home-mid">
                    <ul className="home-left">
                        {this.renderLi(tabs,tab,this.changeLis)}
                    </ul>
                    <ul className="home-ul">
                        <li className="exchange">

                        </li>
                        <li className="home-li">
                            <div className="li-img">
                                <img src={require("../images/demo.jpg")} alt=""/>
                            </div>
                            <div className="li-text">
                                <span className="li-tit">我的程序跑了60多小时，就是为了让你看一眼JDK的BUG导致的内存泄漏。</span>
                                <span className="li-con">
                这次的文章从JDK的J.U.C包下的ConcurrentLinkedQueue队列的一个BUG讲起。jetty框架里面的线程池用到了这个队列，导致了内存泄漏。这次的文章从JDK的J.U.C包下的ConcurrentLinkedQueue队列的一个BUG讲起。jetty框架里面的线程池用到了这个队列，导致了内存泄漏。这次的文章从JDK的J.U.C包下的ConcurrentLinkedQueue队列的一个BUG讲起。jetty框架里面的线程池用到了这个队列，导致了内存泄漏。
              </span>
                            </div>
                        </li>
                        <li className="home-li">
                            <div className="li-img">
                                <img src={require("../images/demo.jpg")} alt=""/>
                            </div>
                            <div className="li-text">
                                <span className="li-tit">我的程序跑了60多小时，就是为了让你看一眼JDK的BUG导致的内存泄漏。</span>
                                <span className="li-con">
                这次的文章从JDK的J.U.C包下的ConcurrentLinkedQueue队列的一个BUG讲起。jetty框架里面的线程池用到了这个队列，导致了内存泄漏。这次的文章从JDK的J.U.C包下的ConcurrentLinkedQueue队列的一个BUG讲起。jetty框架里面的线程池用到了这个队列，导致了内存泄漏。这次的文章从JDK的J.U.C包下的ConcurrentLinkedQueue队列的一个BUG讲起。jetty框架里面的线程池用到了这个队列，导致了内存泄漏。
              </span>
                            </div>
                        </li>
                        <li className="home-li">
                            <div className="li-img">
                                <img src={require("../images/demo.jpg")} alt=""/>
                            </div>
                            <div className="li-text">
                                <span className="li-tit">我的程序跑了60多小时，就是为了让你看一眼JDK的BUG导致的内存泄漏。</span>
                                <span className="li-con">
                这次的文章从JDK的J.U.C包下的ConcurrentLinkedQueue队列的一个BUG讲起。jetty框架里面的线程池用到了这个队列，导致了内存泄漏。这次的文章从JDK的J.U.C包下的ConcurrentLinkedQueue队列的一个BUG讲起。jetty框架里面的线程池用到了这个队列，导致了内存泄漏。这次的文章从JDK的J.U.C包下的ConcurrentLinkedQueue队列的一个BUG讲起。jetty框架里面的线程池用到了这个队列，导致了内存泄漏。
              </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default Home
