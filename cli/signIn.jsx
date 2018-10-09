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
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
class Page extends Component {
    state = {
        error: null
    }
    render() {
        let dialogStyle = {
            width: 400
        }
        let buttonStyle = {
            margin: 15
        }
        let actions = [
            <RaisedButton
                label='Sign in'
                primary={true}
                style={buttonStyle}
                onClick={() => {
                    fetch('/srv/auth/signIn', {
                        method: 'post',
                        credentials: 'same-origin',
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify({
                            email: this.state.email,
                            password: this.state.password
                        })
                    }).then((response) => {
                        if (response.ok) {
                            window.location.href = '/'
                        } else {
                            this.setState({
                                error:
                                    <div style={{ color: 'red' }}>
                                        <br/>
                                        <br/>
                                        <br/>
                                        Incorrect email address or password!
                                    </div>
                            })
                        }
                    })
                }}
            />
        ]
        return (   
            <MuiThemeProvider>
            <Dialog
                modal={true}
                open={true}
                actions={actions}
                title='Sign in to Titan'
                contentStyle={dialogStyle}
            >
                <TextField
                    floatingLabelText='Email address'
                    fullWidth={true}
                    onChange={(event, value) => {
                        this.setState({
                            email: value
                        })
                    }}
                />
                <TextField
                    floatingLabelText='Password'
                    fullWidth={true}
                    type='password'
                    onChange={(event, value) => {
                        this.setState({
                            password: value
                        })
                    }}
                />
                {this.state.error}
            </Dialog>
            </MuiThemeProvider>
        )
    } 
}
ReactDom.render(<Page/>, document.getElementById('root'))

