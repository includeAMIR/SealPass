import React, { Component } from 'react';//import de React
import { Link } from 'react-router-dom';//import du composant 'Link' pour gérer les liens des différentes routes
import Loading from './loader_component';
import Modal from 'react-modal';
import axios from 'axios';

//Exportation du composant 'Sign_up_component'
export default class sign_upsign_up_component extends Component {
    state = {
        email: '',
        password: '',
        password_confirm: '',
        modalMessage: '',
        modal: false,
        btnstyle: "login_button",
        showLoading: false,
        desableButton: false
    }

     strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
     mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    onFieldChange = (e) => this.setState({[e.target.name]: e.target.value})
    check = (e) => {

        e.preventDefault();
        this.setState({showLoading: true})
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))){
            console.log("le format de votre email est incorect")
            this.setState({modalMessage: "le format de votre email est incorect"})
            this.setState({modal: true})
        } else {
            if (!this.mediumRegex.test(this.state.password)){
                console.log("le mot de passe ne respecte pas la convention")
                this.setState({modalMessage: "le mot de passe ne respecte pas la convention"})
                this.setState({modal: true})
            }else if(this.state.password !== this.state.password_confirm){
                console.log("les deux mots de passe ne sont pas identique")
                this.setState({modalMessage: "les deux mots de passe ne sont pas identique"})
                this.setState({modal: true})
            } else {
                this.subscribe()
            }
        }
    }
    subscribe = () => {
        
        // setTimeout(() => {this.setState({showLoading: false})}, 3000)
        axios.post(`/user/getmail`, {email: this.state.email})
        .then(res => {
            if(res.data === this.state.email){
                this.setState({modalMessage: "cet utilisateur existe déja"})
                // this.setState({showLoading: !this.state.showLoading})
                setTimeout(() => {
                    this.setState({showLoading: false}) 
                    this.setState({modal: true})
                }, 3000)
            } else {
                setTimeout(() => {this.setState({showLoading: false})}, 3000)
                console.log("on peut maintenant inscrire l'utilisateur...")
                axios.post(`/user/`, {fullname: this.state.name, email: this.state.email, password: this.state.password})
                .then(res => {
                    console.log(res.data)
                    this.props.history.push('/home')
                })
                .catch (err => {
                    console.log(err)
                }) 
            }
        })
        .catch(err => {
            console.log(err)
        })
        // console.log("on peut maintenant inscrire l'utilisateur...")
        // axios.post(`http://localhost:8080/user/`, {fullname: this.state.name, email: this.state.email, password: this.state.password})
        //     .then(res => {
        //         console.log(res.data)
        //     })
        //     .catch (err => {
        //         console.log(err)
        //     }) 
    }
    render() {
        const { modalMessage } = this.state
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
                <div className = "sign_up_title_block">
                    <h3 className="sign_up_title">Sign Up</h3>
                </div>
                <Modal isOpen={this.state.modal} shouldCloseOnOverlayClick={false} style={customStyles}>
                    <h3>Message d'erreur</h3>
                    <p>{modalMessage}</p>
                    <button onClick={() => this.setState({modal: false})}>fermer</button>
                </Modal>
                {/* formulaire d'inscription */}
                <form onSubmit={this.check}>
                    <div className = "input_block">
                        <div className = "sign_up_input"><input type="text" placeholder="Complet Name" className = "sign_up_inp2" name="name" onChange={this.onFieldChange}/></div>
                        <div className = "sign_up_input"><input type="text" placeholder="Email" className = "sign_up_inp2" name="email" onChange={this.onFieldChange}/></div>
                        <div className = "sign_up_input"><input type="password" placeholder="Password" className = "sign_up_inp2" name="password" onChange={this.onFieldChange}/></div>
                        <div className = "sign_up_input"><input type="password" placeholder="Confirm Password" className = "sign_up_inp2" name="password_confirm" onChange={this.onFieldChange}/></div>
                        <div className = "sign_up_button_block2">{!this.state.showLoading && <button type="submit" className = {this.state.btnstyle} disabled={this.state.desableButton}>signup</button>}{this.state.showLoading && <Loading />}</div>
                        {/* <div className = "sign_up_button_block2"><button type="submit" className = "login_button">{this.state.showLoading && <Loading />}{!this.state.showLoading && "signup"}</button></div> */}
                    </div>
                </form>
                {/* le lien vers la route pour acceder au composant sign_in */}
                <div className="text_panel"><h5 className = "text_sign_up">Already have an account ? <Link to="/" className="link" style = {{ textDecoration: 'none' }} ><span className = "red_text_sign_up">Sign In</span></Link></h5></div>
            </div>
        )
    }
}
