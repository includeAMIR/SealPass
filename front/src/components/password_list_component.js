import React, { Component } from 'react'

export default class password_list_component extends Component {
    render() {
        const { password } = this.props;
        return (           
            <div className="list_block">
                <h4>{ password.site }</h4>
                <h5>{ password.email }</h5>
            </div>               
        )
    }
}
