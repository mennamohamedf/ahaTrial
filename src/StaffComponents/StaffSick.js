import React, { Component } from 'react';
import axios from "axios";
import {Button} from 'react-bootstrap';
import Navbar from '../NavbarHR.js';

axios.defaults.baseURL=" https://ahabackend.herokuapp.com/"
export default class StaffSick extends Component {
    constructor(props){
        super(props);
        this.state = {
            requests: [],
            reqid:''};
        this.handleChange = this.handleChange.bind(this);
        this.acceptreq = this.acceptreq.bind(this);
        this.rejectreq = this.rejectreq.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]:value});
    }
    acceptreq(event){
        const inputData = {
            reqID: this.state.reqid
        }
        axios.post('/AcceptSickLeaveHR', inputData, {headers: {
            'x-auth-token': localStorage.getItem('savedToken')
        }}).then(response =>{
            console.log(response.data);
            //maybe a pop up message with response.data
        }).catch(err =>{
            console.log(err);
        });
        event.preventDefault();
    };
    rejectreq(event){
        const inputData = {
            reqID: this.state.reqid
        }
        axios.post('/RejectSickLeaveHR', inputData, {headers: {
            'x-auth-token': localStorage.getItem('savedToken')
        }}).then(response =>{
            console.log(response.data);
            //maybe a pop up message with response.data
        }).catch(err =>{
            console.log(err);
        });
        event.preventDefault();
    };

   componentDidMount= ()=>{
       axios.get('/viewStaffRequestsHRsick', {headers: {
        'x-auth-token': localStorage.getItem('savedToken')
    }}).then(response =>{
        this.setState({requests: response.data});
    }).catch(err =>{
        console.log(err);
    })
   }
    render() {
        return (
            <div>
            <Navbar />
            <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/Home">Home</a></li>
            <li className="breadcrumb-item"><a href="/Staff">Staff</a></li>
            <li className="breadcrumb-item"><a href="/Staff/HRstaff">HRstaff</a></li>
            <li className="breadcrumb-item"><a href="/Staff/HRstaff/Attendance">AttendanceHR</a></li>
            <li className="breadcrumb-item"><a href="/Staff/HRstaff/Attendance/StaffLeaves">Leaves</a></li>
            <li className="breadcrumb-item active" aria-current="page">SickLeaves</li>
          </ol>
        </nav>
            <div>
                <table id="requeststable">
                <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Staff ID</th>
                        <th>Date</th>
                        <th>Month</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.requests.map((item =>
                        <tr>
                        <td>{item.req_id}</td>
                        <td>{item.id}</td>
                        <td>{item.date}</td>
                        <td>{item.month}</td>
                        <td>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
                </table>  
            </div>
            <div>
                <label>
                <input name="reqid" placeholder="Request ID..." type="text" reqid={this.state.reqid} onChange={this.handleChange}/>
                </label>
                <Button onClick={this.acceptreq}>Accept</Button> 
                <Button onClick={this.rejectreq}>Reject</Button>               
            </div>
            </div>
        )
    }
}
