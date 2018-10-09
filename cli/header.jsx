import React, { Component } from 'react'
import ReactDom from 'react-dom'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import CurrentUser from './currentUser.jsx'
export default class Header extends Component {
    state = {
    }
    render() {
        let rightStyle = {
            marginTop: 0,
            marginRight: 0
        }
        return (
            <div>
            <AppBar
                title={this.props.title}
                onLeftIconButtonClick={() => {
                    this.setState({
                        drawerOpen: true
                    })
                }}
                iconElementRight={<CurrentUser/>}
                iconStyleRight={rightStyle}
            />
            <Drawer
                docked={false}
                width={200}
                open={this.state.drawerOpen}
                onRequestChange={(open) => {
                    this.setState({
                        drawerOpen: open
                    })
                }}
            >
                <MenuItem
                    href="/users"
                    primaryText="Users"
                />
                <MenuItem
                    href="/courses"
                    primaryText="Courses"
                />
                <MenuItem
                    href="/assignments"
                    primaryText="Assignments"
                />
                <MenuItem
                    primaryText="Sign out"
                    onClick={() => {
                        fetch('/srv/auth/signOut', {
                            method: 'post',
                            credentials: 'same-origin'
                        }).then((response) => {
                            window.location.href = '/'
                        })
                    }}
                />
            </Drawer>
            </div>
        )
    } 
}

