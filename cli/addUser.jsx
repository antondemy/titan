import React, { Component } from 'react'
import ReactDom from 'react-dom'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
export default class AddUser extends Component {
    state = {
        role: null
    }
    onOk = () => {
        fetch('/srv/user', {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                email: this.state.email,
                fullName: this.state.fullName,
                password: this.state.password,
                role: this.state.role
            })
        }).then((response) => {
            if (!response.ok) {
                console.log(response.statusText)
            }
        })
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
                label='Cancel'
                primary={true}
                style={buttonStyle}
                onClick={() => {
                    this.props.close()
                }}
            />,
            <RaisedButton
                label='OK'
                primary={true}
                style={buttonStyle}
                onClick={() => {
                    this.onOk()
                    this.props.loadUsers()
                    this.props.close()
                }}
            />
        ]
        return (   
            <Dialog
                modal={true}
                open={this.props.open}
                actions={actions}
                title='Add user'
                contentStyle={dialogStyle}
            >
                <TextField
                    floatingLabelText='Email address'
                    fullWidth={true}
                    autoFocus
                    onChange={(event, value) => {
                        this.setState({
                            email: value
                        })
                    }}
                />
                <TextField
                    floatingLabelText='Full name'
                    fullWidth={true}
                    onChange={(event, value) => {
                        this.setState({
                            fullName: value
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
                <SelectField
                    floatingLabelText='Role'
                    fullWidth={true}
                    value={this.state.role}
                    onChange={(event, index, value) => {
                        this.setState({
                            role: value
                        })
                    }}
                >
                    <MenuItem value='Student' primaryText='Student'/>
                    <MenuItem value='Teacher' primaryText='Teacher'/>
                    <MenuItem value='Administrator' primaryText='Administrator'/>
                </SelectField>
            </Dialog>
        )
    } 
}

