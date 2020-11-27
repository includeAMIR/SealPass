import React, { Component } from 'react'

export default class notfound_component extends Component {
    render() {
        const mystyle = {
            display: "flex",
            justifyContent: "center",
        }
        return (
            <div style={mystyle}>
                <h1>NOT FOUND 404</h1>
            </div>
        )
    }
}
