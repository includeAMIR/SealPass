import React, { Component } from 'react'
import "../styles/home_component_style.css"
import List from '../components/list'
import Cards from '../components/cards'
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom'
import add from '../assets/images/add.svg'
import axios from 'axios'
import generator from 'generate-password'
import Modal from 'react-modal'

export default class home_component extends Component {
    constructor() {
        super();
        this.state = {
            passwords: [],
            cards: [],
            link: "",
            email: "",
            password: "",
            modal: false,
            cvc: '',
            expiry: '',
            focus: '',
            name: '',
            number: '',
            modalll: true
        }
    }
    headers = {
        'Access-Control-Allow-Origin': '*',        
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    getPassword = () => {
        axios.get(`/user/password`)
        .then(res => {
            axios.get(`/user/card`)
            .then(resp => {console.log(resp.data)
                this.setState({cards: resp.data, passwords: res.data})
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    componentDidMount() {
        this.getPassword()
    }
    addNewPassword = () =>  {
        console.log(this.state.passwords)
    }
    check = (e) => {
        e.preventDefault()
        this.savePassword()
    }
    savePassword = () => {
        axios.post(`/user/password`, {site: this.state.link, email: this.state.email, password: this.state.password})
        .then(res => {
            console.log(res)
            this.setState({modal: false})
            this.getPassword()
        })
        .catch (err => {
            console.log(err)
        })
    }
    onFieldChange = (e) => this.setState({[e.target.name]: e.target.value});
    openModal = () => {
        this.setState({modal: true})
    }
    closeModal = () => {
        this.setState({modal: false})
    }
    generatePassword = () => {
        var password = generator.generate({
            length: Math.random() * 24 + 8,
            numbers: true,
            symbols: true,
            lowercase: true,
            uppercase: true
        });
        this.setState({password: password})
    }
    render() {

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
          }
        let { link, email, password, passwords, modal, cards } = this.state
        return (
            <div className="home_container">
                <div className="addButton" onClick={this.openModal}><img src={add} alt="add" className = "add"/></div>
                <div className="control_panel">
                    <div>
                        <h2>My Seal</h2>
                    </div>
                    <div className="sousMenu">
                        <input text="text" placeholder="Search" className="searchbar"/>
                        <NavLink exact to="/home" className = "main_nav" activeClassName="main_nav_active"><span className="grid_view"></span></NavLink>                        
                        <NavLink exact to="/home/list" className = "main_nav" activeClassName="main_nav_active"><span className="list_view" ></span></NavLink>
                    </div>
                </div>
                    <Router>
                        <Switch>
                            <Route  path="/home" render={(props) => <Cards {...props} passwords={passwords} cards={cards}/>} />
                            <Route  path="/home/list" render={(props) => <List {...props} passwords={passwords} />} />
                        </Switch>
                    </Router>

                    <Modal isOpen={modal} style={customStyles}>
                        <h2>Add Password</h2>
                        <form onSubmit={this.check}>
                            <input type="text" name="link" placeholder="website link" value={link} onChange={this.onFieldChange}/>
                            <input type="text" name="email" placeholder="email or username" value={email} onChange={this.onFieldChange}/>
                            <input type="text" name="password" placeholder="password" value={password} onChange={this.onFieldChange}/>
                            <input type="button" value="generate password" onClick={this.generatePassword}/>
                            <button>save</button>
                            <input type="button" value="fermer" onClick={this.closeModal}/>
                        </form>
                    </Modal>
                    
            </div>
        )
    }
}
