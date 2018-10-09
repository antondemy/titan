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
import AddAssignment from './addAssignment.jsx'
class Page extends Component {
    state = {
        openAddAssignment: false
    }
    selectedId = null
    componentDidMount() {
        this.loadAssignments()
    }
    loadAssignments = () => {
        fetch('/srv/assignment', {
            credentials: 'same-origin'
        }).then((response) => {
            return response.json()
        }).then((data) => {
            this.setState({
                assignments: data
            })
        })
    }
    onRowSelection = (selected) => {
        if (selected.length === 0) {
            this.selectedId = null
        } else {
            this.selectedId = this.state.assignments[selected]._id
        }
    }
    render() {
        let rows = []
        if (this.state.assignments !== undefined) {
            for (let i = 0; i < this.state.assignments.length; i++) {
                rows.push(
                    <TableRow key={i}>
                        <TableRowColumn>{this.state.assignments[i].course}</TableRowColumn>
                        <TableRowColumn>{this.state.assignments[i].title}</TableRowColumn>
                        <TableRowColumn>{this.state.assignments[i].teacher}</TableRowColumn>
                        <TableRowColumn>{this.state.assignments[i].returnBy.substring(0, 10)}</TableRowColumn>
                        <TableRowColumn>{this.state.assignments[i].points}</TableRowColumn>
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
                title='Assignments'
            />
            <Table onRowSelection={this.onRowSelection}>
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                >
                    <TableRow>
                        <TableHeaderColumn>Course</TableHeaderColumn>
                        <TableHeaderColumn>Title</TableHeaderColumn>
                        <TableHeaderColumn>Teacher</TableHeaderColumn>
                        <TableHeaderColumn>Return by</TableHeaderColumn>
                        <TableHeaderColumn>Points</TableHeaderColumn>
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
                        openAddAssignment: true
                    })
                }}
            >
                Add assignment
            </RaisedButton>
            <AddAssignment
                open={this.state.openAddAssignment}
                close={() => {
                    this.setState({
                        openAddAssignment: false
                    })
                }}
                loadAssignments={this.loadAssignments}
            />
            </div>
            </MuiThemeProvider>
        )
    } 
}
ReactDom.render(<Page/>, document.getElementById('root'))

