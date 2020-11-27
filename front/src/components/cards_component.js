import React, { Component } from 'react'

export default class cards_component extends Component {
    render() {
        const { card } = this.props;
        return (
            <div className="card">
                <div className="content2" onClick={this.updatePassword}>
                    <div className="content_image_wrapper2">
                    </div>
                    <div className="content_text">
                        <h4>{ card.name }</h4>
                        <h5>{ card.number }</h5>
                        <h6 className="expCard">{ card.expiry }</h6>
                    </div>
                </div>
            </div>
        )
    }
}
