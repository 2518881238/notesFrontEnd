import * as React from "react";
import "@/css/Login.less"
import {Input, Form, Button, Checkbox} from 'antd';

type tabItem = {
    name: string,
    index: number,
    isShow: boolean
}

type tabbType = {
    tab: number,
    tabs: Array<tabItem>
}

type formType = {
    userName: string,
    passWord: string
}

type stateType = {
    tabb: tabbType,
    form: formType
}

class Login extends React.Component<any, stateType> {
    constructor(props: any) {
        super(props);

        const tabs = [
            {name: '登录', index: 0, isShow: true},
            {name: '注册', index: 1, isShow: true}
        ]

        this.state = {
            tabb: {
                tab: 0,
                tabs
            },
            form: {
                userName: '',
                passWord: ''
            }
        }
    }


    handleSubmit() {

    }

    onFinish(values: any) {
        console.log('Success:', values);
    };

    onFinishFailed(errorInfo: any) {
        console.log('Failed:', errorInfo);
    };

    onChange(key: string) {
        let keyStr = key === 'userName' ? this.state.form.userName : this.state.form.passWord
        this.setState({
            form: Object.assign({}, this.state.form, {[key]: keyStr})
        });
    }

    changeTabs = (idx: number) => {
        this.setState({
            tabb: Object.assign({}, this.state.tabb, {tab: idx})
        });

    }

    RenderTabs(tabs: Array<tabItem>, tab: number, changeTabs: Function) {
        return tabs.map((item, idx) => {
            if (!item.isShow) {
                return null;
            }
            return (
                <li
                    key={item.index}
                    className={tab === idx ? 'loLi active' : 'loLi'}
                    onClick={() => {
                        changeTabs(idx)
                    }}>
                    <span>{item.name}</span>
                </li>
            )
        })
    }

    loginTsx() {
        return (
            <Form name="basic"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  initialValues={{remember: true}}
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                  autoComplete="off"
                  className="ruleForm"
            >
                <Form.Item label="用户名：" name="userName"
                           rules={[{required: true, message: 'Please input your username!'}]}>
                    <Input type="text" value={this.state.form.userName} onChange={this.onChange.bind(this, 'userName')}
                           autoComplete="off"/>
                </Form.Item>
                <Form.Item label="密码：" name="passWord"
                           rules={[{required: true, message: 'Please input your username!'}]}>
                    <Input type="password" value={this.state.form.passWord}
                           onChange={this.onChange.bind(this, 'passWord')} autoComplete="off"/>
                </Form.Item>
                <Form.Item>

                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        )
    }

    registerJsx() {

        return (
            <Form name="basic"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  initialValues={{remember: true}}
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                  autoComplete="off"
                  className="ruleForm"
            >
                <Form.Item label="用户名：" name="userName"
                           rules={[{required: true, message: 'Please input your username!'}]}>
                    <Input type="text" value={this.state.form.userName} onChange={this.onChange.bind(this, 'userName')}
                           autoComplete="off"/>
                </Form.Item>
                <Form.Item label="密码：" name="passWord"
                           rules={[{required: true, message: 'Please input your username!'}]}>
                    <Input type="password" value={this.state.form.passWord}
                           onChange={this.onChange.bind(this, 'passWord')} autoComplete="off"/>
                </Form.Item>
                <Form.Item label="确认密码：" name="passWord"
                           rules={[{required: true, message: 'Please input your username!'}]}>
                    <Input type="password" value={this.state.form.passWord}
                           onChange={this.onChange.bind(this, 'passWord')} autoComplete="off"/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>
                        提交
                    </Button>
                </Form.Item>
            </Form>
        )

    }


    render() {
        const {tabs, tab} = this.state.tabb;
        return (
            <div className="login">
                <div className="log">
                    <div className="log-mid">
                        <div className="mid-con">
                            <div className="left">
                                <span>由中国科学技术大学学生 Linux 用户协会 (USTC LUG) 提供的代码托管服务。</span>
                                <span>自 2019 年 12 月 29 日起，此服务仅限科大校内用户注册，已有的用户不受影响。</span>
                                <span>如果发现需要反馈的问题，可以发送邮件至 lug AT ustc.edu.cn</span>
                            </div>

                            <div className="right">
                                <ul className="lo-tab">
                                    {this.RenderTabs(tabs, tab, this.changeTabs)}
                                </ul>
                                <div>
                                    {this.state.tabb.tab === 0 ? this.loginTsx.call(this) : this.registerJsx.call(this)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login

