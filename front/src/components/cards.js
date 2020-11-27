import React, { Component } from 'react'
import PasswordCard from '../components/password_card_component'
import Card from '../components/cards_component'
import Loader from './loader_component'
import add from '../assets/images/add.svg'
import Modalll from 'react-modal'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import axios from 'axios'

export default class cards extends Component {
    constructor(props){
        super(props);
        this.state = {
            showLoading: true,
            gradient:[],
            cvc: '',
            expiry: '',
            focus: '',
            name: '',
            number: '',
            modalll: false
        }
    }
    
    componentDidMount() {
        setTimeout(() => {
           this.setState({showLoading: false}) 
        }, 3000);
    }
    onFieldChange = (e) => this.setState({[e.target.name]: e.target.value});
    callParent2() {
        console.log("todo")
    }
    saveCard = () => {
        let id = localStorage.getItem('userId')
        axios.post(`/user/card`, {name: this.state.name, number: this.state.number, expiry: this.state.expiry, cvc: this.state.cvc, userId: id})
        .then(res => {
            console.log(res)
            this.setState({modalll: false})
        })
        .catch (err => {
            console.log(err)
        })
    }
    openMod = () => this.setState({modalll: true})
    closeMod = () => this.setState({modalll: false})
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
        const { passwords, cards } = this.props;
        return (
            <div>
                {this.state.showLoading && <div className="loaderWrapper"><Loader /><h3>Chargement</h3></div>}
                {!this.state.showLoading && 
                     <div>
                        <div className="title_span"><h4 className="title_text">Passwords</h4></div>
                        <div className="passwords_card_view">
                            {
                                passwords.map(password => <PasswordCard password={password} key={password._id} callParent2={this.callParent2} />)
                            }
                        </div>
                        <div className="title_span"><h4 className="title_text">Cards</h4></div>
                        <div className="passwords_card_view">
                            {
                                cards.map(card => <Card card={card} key={card._id} callParent2={this.callParent2}/>)
                            }
                            <div className="card"><div className="content2 addDiv" onClick={this.openMod}><div className="lecercle"><img src={add} alt="add" className = "add"/></div></div></div>
                        </div>
                     </div>  
                }  
                <Modalll isOpen={this.state.modalll} style={customStyles}>
                    <div id="PaymentForm">
                        <Cards
                        cvc={this.state.cvc}
                        expiry={this.state.expiry}
                        focus={this.state.focus}
                        name={this.state.name}
                        number={this.state.number}
                        />
                        <form onSubmit={this.saveCard}>
                            <input
                            type="text"
                            name="number"
                            placeholder="Card Number"
                            onChange={this.onFieldChange }
                            />
                            <input
                            type="text"
                            name="expiry"
                            placeholder="expiry"
                            onChange={this.onFieldChange }
                            />
                            <input
                            type="text"
                            name="name"
                            placeholder="name"
                            onChange={this.onFieldChange }
                            />
                            <input
                            type="tel"
                            name="cvc"
                            placeholder="cvc"
                            onChange={this.onFieldChange }
                            />
                            <button>save card</button>
                            <input type="button" value="fermer" onClick={this.closeMod} />
                        </form>
                    </div>
                </Modalll>         
            </div>
        )
    }
}
