import React, { Component } from 'react'
import ReactDom from 'react-dom'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
export default class AddUser extends Component {
    state = {
    }
    onOk = () => {
        fetch('/srv/course', {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                title: this.state.title,
                language: this.state.language,
                startDate: this.state.startDate,
                finishDate: this.state.finishDate,
                credits: this.state.credits
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
                    this.props.loadCourses()
                    this.props.close()
                }}
            />
        ]
        return (   
            <Dialog
                modal={true}
                open={this.props.open}
                actions={actions}
                title='Add course'
                contentStyle={dialogStyle}
            >
                <TextField
                    floatingLabelText='Title'
                    fullWidth={true}
                    autoFocus
                    onChange={(event, value) => {
                        this.setState({
                            title: value
                        })
                    }}
                />
                <SelectField
                    floatingLabelText='Language of instruction'
                    fullWidth={true}
                    value={this.state.language}
                    onChange={(event, index, value) => {
                        this.setState({
                            language: value
                        })
                    }}
                >
                    <MenuItem value='English' primaryText='English'/>
                    <MenuItem value='Finnish' primaryText='Finnish'/>
                    <MenuItem value='Swedish' primaryText='Swedish'/>
                </SelectField>
                <DatePicker
                    floatingLabelText='Start date'
                    fullWidth={true}
                    onChange={(event, value) => {
                        this.setState({
                            startDate: value
                        })
                    }}
                />
                <DatePicker
                    floatingLabelText='Finish date'
                    fullWidth={true}
                    onChange={(event, value) => {
                        this.setState({
                            finishDate: value
                        })
                    }}
                />
                <TextField
                    floatingLabelText='Credits'
                    fullWidth={true}
                    onChange={(event, value) => {
                        this.setState({
                            credits: value
                        })
                    }}
                />
            </Dialog>
        )
    } 
}

