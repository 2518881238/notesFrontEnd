import * as React from "react";
import "@/css/Footer.less"

class Footer extends React.Component{
    render() {
        return(
            <div className="foot">
                <div className="foot-mid">
                    <span className="text"><span>关于我们</span> <span>联系方式：123456789</span> <span>帮助</span></span>
                </div>
            </div>
        )
    }
}
export default Footer
