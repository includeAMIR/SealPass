import React, { Component } from 'react'
import Modall from 'react-modal'
import ax from 'axios'

export default class password_card_component extends Component {
    constructor(props){
        super(props);
        this.state = {
            modall: false,
            siteU: props.password.site,
            emailU: props.password.email,
            passwordU: props.password.password,
            id: props.password._id
        }
    }
    updatePassword = () => {
        this.setState({modall: true})
    }
    onFieldChange = (e) => this.setState({[e.target.name]: e.target.value});
    close = () => {this.setState({modall: false})}
    updatePass = () => {
        ax.put(`/user/password`, {site: this.state.siteU, email: this.state.emailU, password: this.state.passwordU, id: this.state.id})
        .then(res => {
            console.log(res)
            this.close()
            this.props.callParent2();
        })
        .catch(err => {
            this.close()
            console.log(err)
        })
    }
    deletePass = () => {
        ax.post(`/user/password/delete`, {id: this.state.id})
        .then(res => {
            console.log(res)
            this.close()
            this.props.callParent2();
        })
        .catch(err => {
            console.log(err)
        })
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
          };
        const { password } = this.props;
        const { siteU, emailU, passwordU } = this.state;
        return (
            <div className="card">
                <div className="content" onClick={this.updatePassword}>
                    <div className="content_image_wrapper">
                    </div>
                    <div className="content_text">
                        <h4>{ password.site }</h4>
                        <h5>{ password.email }</h5>
                    </div>
                </div>
                <Modall isOpen={this.state.modall} style={customStyles}>
                    <h2>Update Password</h2>
                    <form>
                        <input type="text" name="siteU" value={siteU} placeholder="site" onChange={this.onFieldChange}/>
                        <input type="text" name="emailU" value={emailU} placeholder="email" onChange={this.onFieldChange}/>
                        <input type="text" name="passwordU" value={passwordU} placeholder="password" onChange={this.onFieldChange}/>
                        <input type="button" value="update" onClick={this.updatePass}/>
                        <input type="button" value="delete" onClick={this.deletePass}/>
                        <input type="button" value="fermer" onClick={this.close}/>
                    </form>
                </Modall>
            </div>
        )
    }
}
