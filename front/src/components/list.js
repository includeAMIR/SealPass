import React, { Component } from 'react'
import Listview from '../components/password_list_component'

export default class list extends Component {
    render() {
        const { passwords } = this.props;
        return (
            <div>
                <div className="title_span"><h4 className="title_text">Passwords</h4></div>
                <div className="passwords_card_view">
                    {
                        passwords.map(password => <Listview password={password} key={password.id} />)
                    }
                </div>
                <div className="title_span"><h4 className="title_text">Cards</h4></div>
                <div className="passwords_card_view">
                    {
                        passwords.map(password => <Listview password={password} key={password.id} />)
                    }
                </div>
            </div>
        )
    }
}
