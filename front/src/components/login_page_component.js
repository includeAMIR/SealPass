//composant 'Login'

import React, { Component } from 'react';//Importation de React
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';//Importation du 'Router' de react pour gérer les routes
import '../styles/login_page_component_style.css';//Importation de la feuille de style
import logo from '../assets/images/logo.png';//importation du Logo sealPass
import Sign_in from './sign_in_component';//Importation du composant 'sign_in' (composant de connection)
import Sign_up from './sign_up_component';//Importation du composant 'sign_up' (composant d'inscription)

//Exportation du Composant 'Login'
export default class login_page_component extends Component {
    render() {
        return (
            <div>
                <div className = "red_line"></div>
                <div className = "login_block">
                    {/* logo de l'application */}
                    <img src={logo} alt="Logo" className = "logo1"/>
                    {/* le router permet de charger un composant entre 'sign_in' et 'sign_up, par rapport a la demande de l'uilisateur */}
                    <Router>
                        {/* le composant 'switch charge les composant par rapport aux routes */}
                        <Switch>
                            {/* les différentes route du composant 'Login */}
                            <Route exact path="/" component={Sign_in}/>
                            <Route exact path="/sign_up" component={Sign_up}/>
                        </Switch>
                    </Router>
                </div>
            </div>
        )
    }
}
