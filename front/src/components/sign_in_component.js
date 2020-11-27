//Composant 'Sign_In' pour la connection

import React, { Component } from 'react';//import de React
import { Link, Redirect } from 'react-router-dom';//import du composant 'Link' pour gérer les liens des différentes routes
import Loader from './loader_component';
import Modal from 'react-modal';
import axios from 'axios';


//Exportation du composant 'Sign_in_component'
export default class sign_in_component extends Component {
    state = {
        emailLogin: '',
        passwordLogin: '',
        showLoadingLogin: false,
        modalLogin: false,
        modalMessageLogin: ''
    };
    onFieldChange = (e) => this.setState({[e.target.name]: e.target.value});
    connectUser = (e) => {
        e.preventDefault();
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.emailLogin))) {
            this.setState({modalMessageLogin: "Veuillez entrer une adresse email valide"})
            this.setState({modalLogin: true})
        } else if(this.state.passwordLogin === ''){
            this.setState({modalMessageLogin: "tous les champs sont obligatoires"})
            this.setState({modalLogin: true})
        } else {
            this.setState({showLoadingLogin: true})
            setTimeout(() => {
                axios.post(`/user/login`, {email: this.state.emailLogin, password: this.state.passwordLogin})
                .then (res => {
                    this.setState({showLoadingLogin: false})
                    if(res.data.status === "true") {
                        console.log(res.data)
                        localStorage.setItem('sealpass_token', res.data.token)
                        this.setState({nav: true})
                        this.props.history.push('/home')
                    } else {
                        this.setState({modalMessageLogin: res.data.message})
                        this.setState({modalLogin: true})
                    }
                })
                .catch (err => {
                    console.log(err)
                })
            }, 1000)
        }
    }

    render() {
        const { emailLogin, passwordLogin, modalMessageLogin } = this.state;
        const customStyles = {
            content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)'
            },
            overlay : {
                backgroundColor : 'rgba(45, 52, 54, 0.5)'
            }
          };
        return (
            // structure du composant
            <div className = "sign_up_block">
                <Modal isOpen={this.state.modalLogin} shouldCloseOnOverlayClick={false} style={customStyles}>
                    <h3>Message d'erreur</h3>
                    <p>{modalMessageLogin}</p>
                    <button onClick={() => this.setState({modalLogin: false})}>fermer</button>
                </Modal>
                <div className = "title_block">
                    <h3 className="sign_up_title">Sign In</h3>
                </div>
                {/* formulaire de connection */}
                <form onSubmit={this.connectUser}>
                    <div className = "input_block">
                        <div className = "login_input"><input type="email" placeholder="Email" className = "inp" name="emailLogin" value={emailLogin} onChange={this.onFieldChange}/></div>
                        <div className = "login_input"><input type="password" placeholder="Password" className = "inp" name="passwordLogin" value={passwordLogin} onChange={this.onFieldChange}/></div>
                        <div className = "login_button_block">{!this.state.showLoadingLogin && <button type="submit" className = "login_button">Login</button>}{this.state.showLoadingLogin && <Loader />}</div>
                    </div>
                </form>
                {/* le lien vers la route pour acceder au composant sign_up */}
                <div className="text_panel">
                    <h5 className = "text_sign_up"> D'ont have an account ? <Link to="/sign_up" style = {{ textDecoration: 'none' }} ><span className ="red_text_sign_up">Sign up</span></Link></h5>
                </div>
            </div>
        )
    }
}
