import React, { Component } from 'react'
import ReactDom from 'react-dom'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
export default class AddAssignment extends Component {
    state = {
    }
    componentDidMount() {
        fetch('/srv/course', {
            credentials: 'same-origin'
        }).then((response) => {
            return response.json()
        }).then((data) => {
            this.setState({
                courses: data
            })
        })
        fetch('/srv/user/byRole/Teacher', {
            credentials: 'same-origin'
        }).then((response) => {
            return response.json()
        }).then((data) => {
            this.setState({
                teachers: data
            })
        })
    }
    onOk = () => {
        fetch('/srv/assignment', {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                course: this.state.course,
                title: this.state.title,
                teacher: this.state.teacher,
                returnBy: this.state.returnBy,
                points: this.state.points
            })
        }).then((response) => {
            if (!response.ok) {
                console.log(response.statusText)
            }
        })
    }
    render() {
        let courses = []
        if (this.state.courses !== undefined) {
            for (let i = 0; i < this.state.courses.length; i++) {
                courses.push(
                    <MenuItem key={i} value={this.state.courses[i].title} primaryText={this.state.courses[i].title}/>
                )
            }
        }
        let teachers = []
        if (this.state.teachers !== undefined) {
            for (let i = 0; i < this.state.teachers.length; i++) {
                teachers.push(
                    <MenuItem key={i} value={this.state.teachers[i].fullName} primaryText={this.state.teachers[i].fullName}/>
                )
            }
        }
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
                    this.props.loadAssignments()
                    this.props.close()
                }}
            />
        ]
        return (
            <Dialog
                modal={true}
                open={this.props.open}
                actions={actions}
                title='Add assignment'
                contentStyle={dialogStyle}
            >
                <SelectField
                    floatingLabelText='Course'
                    fullWidth={true}
                    value={this.state.courseText}
                    onChange={(event, index, value) => {
                        this.setState({
                            course: this.state.courses[index]._id,
                            courseText: this.state.courses[index].title
                        })
                    }}
                >
                    {courses}
                </SelectField>
                <TextField
                    floatingLabelText='Title'
                    fullWidth={true}
                    onChange={(event, value) => {
                        this.setState({
                            title: value
                        })
                    }}
                />
                <SelectField
                    floatingLabelText='Teacher'
                    fullWidth={true}
                    value={this.state.teacherText}
                    onChange={(event, index, value) => {
                        this.setState({
                            teacher: this.state.teachers[index]._id,
                            teacherText: this.state.teachers[index].fullName
                        })
                    }}
                >
                    {teachers}
                </SelectField>
                <DatePicker
                    floatingLabelText='Return by'
                    fullWidth={true}
                    onChange={(event, value) => {
                        this.setState({
                            returnBy: value
                        })
                    }}
                />
                <TextField
                    floatingLabelText='Points'
                    fullWidth={true}
                    onChange={(event, value) => {
                        this.setState({
                            points: value
                        })
                    }}
                />
            </Dialog>
        )
    } 
}

