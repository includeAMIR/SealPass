import React, { Component } from 'react'
import Loader from '../assets/images/loader.svg'
import "../styles/loader.css"

export default class loader_component extends Component {
    render() {
        return (
            <div className="loaderBlock">
                <img src={Loader} alt="loader" className = "loader"/>
            </div>
        )
    }
}
