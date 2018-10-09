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
import AddCourse from './addCourse.jsx'
class Page extends Component {
    state = {
        openAddCourse: false
    }
    selectedId = null
    componentDidMount() {
        this.loadCourses()
    }
    loadCourses = () => {
        fetch('/srv/course', {
            credentials: 'same-origin'
        }).then((response) => {
            return response.json()
        }).then((data) => {
            this.setState({
                courses: data
            })
        })
    }
    onRowSelection = (selected) => {
        if (selected.length === 0) {
            this.selectedId = null
        } else {
            this.selectedId = this.state.courses[selected]._id
        }
    }
    render() {
        let rows = []
        if (this.state.courses !== undefined) {
            for (let i = 0; i < this.state.courses.length; i++) {
                rows.push(
                    <TableRow key={i}>
                        <TableRowColumn>{this.state.courses[i].title}</TableRowColumn>
                        <TableRowColumn>{this.state.courses[i].language}</TableRowColumn>
                        <TableRowColumn>{this.state.courses[i].startDate.substring(0, 10)}</TableRowColumn>
                        <TableRowColumn>{this.state.courses[i].finishDate.substring(0, 10)}</TableRowColumn>
                        <TableRowColumn>{this.state.courses[i].credits}</TableRowColumn>
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
                title='Courses'
            />
            <Table onRowSelection={this.onRowSelection}>
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                >
                    <TableRow>
                        <TableHeaderColumn>Title</TableHeaderColumn>
                        <TableHeaderColumn>Language</TableHeaderColumn>
                        <TableHeaderColumn>Start date</TableHeaderColumn>
                        <TableHeaderColumn>Finish date</TableHeaderColumn>
                        <TableHeaderColumn>Credits</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {rows}
                </TableBody>
            </Table>
            <RaisedButton
                primary={true}
                style={buttonStyle}
                overlayStyle={overlayStyle}
                onClick={() => {
                    this.setState({
                        openAddCourse: true
                    })
                }}
            >
                Add course
            </RaisedButton>
            <AddCourse
                open={this.state.openAddCourse}
                close={() => {
                    this.setState({
                        openAddCourse: false
                    })
                }}
                loadCourses={this.loadCourses}
            />
            </div>
            </MuiThemeProvider>
        )
    } 
}
ReactDom.render(<Page/>, document.getElementById('root'))

