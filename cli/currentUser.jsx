import React, { Component } from 'react'
import ReactDom from 'react-dom'
export default class CurrentUser extends Component {
    state = {
    }
    componentDidMount() {
        fetch('/srv/auth/currentUser', {
            credentials: 'same-origin'
        }).then((response) => {
            return response.json()
        }).then((data) => {
            this.setState({
                userFullName: data.fullName
            })
        })
    }
    render() {
        let style = {
            color: 'white',
            fontSize: 24,
            height: '64px',
            lineHeight: '64px'
        }
        return (
            <div style={style}>
            {this.state.userFullName}
            </div>
        )
    } 
}

