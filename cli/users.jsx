import React, { Component } from 'react'
import ReactDom from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'
import Header from './header.jsx'
import AddUser from './addUser.jsx'
class Page extends Component {
    state = {
        openAddUser: false
    }
    selectedId = null
    componentDidMount() {
        this.loadUsers()
    }
    loadUsers = () => {
        fetch('/srv/user', {
            credentials: 'same-origin'
        }).then((response) => {
            return response.json()
        }).then((data) => {
            this.setState({
                users: data
            })
        })
    }
    onRowSelection = (selected) => {
        if (selected.length === 0) {
            this.selectedId = null
        } else {
            this.selectedId = this.state.users[selected]._id
        }
    }
    onBlockUser = () => {
        if (this.selectedId !== null) {
            fetch('/srv/user/block/' + this.selectedId, {
                credentials: 'same-origin'
            }).then((response) => {
                if (!response.ok) {
                    console.log(response.statusText)
                }
                this.loadUsers()
            })
        }
    }
    render() {
        let rows = []
        if (this.state.users !== undefined) {
            for (let i = 0; i < this.state.users.length; i++) {
                rows.push(
                    <TableRow key={i}>
                        <TableRowColumn>{this.state.users[i].email}</TableRowColumn>
                        <TableRowColumn>{this.state.users[i].fullName}</TableRowColumn>
                        <TableRowColumn>{this.state.users[i].status}</TableRowColumn>
                        <TableRowColumn>{this.state.users[i].role}</TableRowColumn>
                    </TableRow>
                )
            }
        }
        let buttonStyle = {
            margin: 15
        }
        let overlayStyle = {
            paddingLeft: 15,
            paddingRight: 15,
            color: 'white'
        }
        return (   
            <MuiThemeProvider>
            <div>
            <Header
                title='Users'
            />
            <Table onRowSelection={this.onRowSelection}>
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                >
                    <TableRow>
                        <TableHeaderColumn>Email</TableHeaderColumn>
                        <TableHeaderColumn>Full Name</TableHeaderColumn>
                        <TableHeaderColumn>Status</TableHeaderColumn>
                        <TableHeaderColumn>Role</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                    deselectOnClickaway={false}
                >
                    {rows}
                </TableBody>
            </Table>
            <RaisedButton
                primary={true}
                style={buttonStyle}
                overlayStyle={overlayStyle}
                onClick={() => {
                    this.setState({
                        openAddUser: true
                    })
                }}
            >
                Add user
            </RaisedButton>
            <AddUser
                open={this.state.openAddUser}
                close={() => {
                    this.setState({
                        openAddUser: false
                    })
                }}
                loadUsers={this.loadUsers}
            />
            <RaisedButton
                primary={true}
                style={buttonStyle}
                overlayStyle={overlayStyle}
                onClick={this.onBlockUser}
            >
                Block user
            </RaisedButton>
            </div>
            </MuiThemeProvider>
        )
    } 
}
ReactDom.render(<Page/>, document.getElementById('root'))

