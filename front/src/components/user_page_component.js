import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom'
import '../styles/user_page_component_style.css'
import logo from '../assets/images/Logo_user_interface.png'
import user_profil from '../assets/images/user.jpg'

import Home from './home_component'
import Passwords from './passwords_component'
import Cards from './cards_component'
import Cloud from './cloud_component'
import settings from './settings_component'

export default class user_page_component extends Component {
    render() {
        return (
            <div>
                <header className = "topbar">
                    <div className="wrapper">
                        <a href = "#" className = "topbar-logo"><img src={logo} alt="Logo" className = "logo"/></a>
                        <div className = "topbar_menu">
                            <nav className = "topbar_nav">
                                <a href = "#" >About</a>
                                <a href = "#" >Help</a>
                                <a href = "#" >Contact</a>
                            </nav>
                            <img src={user_profil} alt = "user profil photo" className = "user_profil_photo"/>
                        </div>
                    </div>
                </header>
                <Router>
                    <div className = "container">
                        <div className="sidebar">
                            <ul>
                                <li><NavLink exact to="/home" className = "main_nav" activeClassName="main_nav_active">Home</NavLink></li>
                                <li><NavLink exact to="/passwords" className = "main_nav" activeClassName="main_nav_active">Passwords</NavLink></li>
                                <li><NavLink exact to="/cards" className = "main_nav" activeClassName="main_nav_active">Cards</NavLink></li>
                                <li><NavLink exact to="/cloud" className = "main_nav" activeClassName="main_nav_active">Cloud</NavLink></li>
                                <li><NavLink exact to="/settings" className = "main_nav" activeClassName="main_nav_active">Settings</NavLink></li>
                            </ul>
                        </div>
                        <div className = "main" >
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route path="/home" component={Home}/>
                                <Route path="/passwords" component={Passwords}/>
                                <Route path="/cards" component={Cards}/>
                                <Route path="/cloud" component={Cloud}/>
                                <Route path="/settings" component={settings}/>
                            </Switch>    
                        </div>
                    </div>
                </Router>
            </div>
        )
    }
}
