import React, {Component, Fragment} from 'react'
import './App.less'
import { BrowserRouter, Route ,Routes,Navigate} from 'react-router-dom';
import Header from "@/pages/Header";
import Home from "@/pages/Home";
import Footer from "@/pages/Footer"
import ByteMd from "@/pages/ByteMd"

class App extends Component{
    render(){
        return (
            <Fragment>
                <BrowserRouter>
                    <div className="content-box">
                        <Header/>
                        <Routes>
                            <Route path='/' element={<ByteMd/>}/>
                        </Routes>
                        <Footer/>
                    </div>
                </BrowserRouter>
            </Fragment>
        )
    }
}

export default App