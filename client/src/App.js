import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import UserProfile from "./pages/UserProfile/UserProfile";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import {getToken} from "./utils/cookies";
// import './pages/Home/style.css'
import './pages/Login/style.css'
import './pages/UserProfile/style.css'
import './pages/PageNotFound/style.css'
import './components/Header/style.css'
import './components/Modal/style.css'
import './pages/Home/style.css'

function App() {
    const [isSigned, setIsSigned] = useState(false)
    const [status, setStatus] = useState(!!getToken());

    console.log('\n\n\n process.env.REACT_APP_SERVER_PORT', process.env.REACT_APP_SERVER_PORT)
    return (
        <div className="App">
            <BrowserRouter>
                <Header status={status} setStatus={setStatus}/>
                <Route path='/' exact render={() => <Home/>}/>
                <Route path='/login' exact render={() => (!status) ?
                    <Login changeSigned={setIsSigned} isSigned={isSigned} setStatus={setStatus}/> : <PageNotFound/>}/>
                <Route path='/signup' exact render={() => (!status) ? <Signup/> : <PageNotFound/>}/>
                <Route path='/userProfile' exact
                       render={() => (status) ? <UserProfile isSigned={isSigned} setStatus={setStatus}/> :
                           <PageNotFound/>}/>
            </BrowserRouter>
        </div>
    );
}

export default App;
