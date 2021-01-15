import React, { Component } from 'react';
import axios from "axios";
import Navbar from '../NavbarHR.js';

axios.defaults.baseURL=" https://ahabackend.herokuapp.com/"
export default class UpdateCourse extends Component {
    constructor(props){
        super(props);
        this.state = {
            faculty: '',
            id: '',
            namec: '',
            slots: ''};
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]:value});
    }

    handleSubmit(event){
        console.log(this.state.namec);
        const inputData = {
            facultyname: this.state.faculty,
            courseid: this.state.id,
            coursename: this.state.namec,
            NoOfSlots: this.state.slots
        }
        axios.post('/updatecourse', inputData, {headers: {
            'x-auth-token': localStorage.getItem('savedToken')
        }}).then(response =>{
            console.log(response.data);
            //maybe a pop up message with response.data
        }).catch(err =>{
            console.log(err);
        });
        event.preventDefault();
    };
    render() {
        return (
            <div>
              <Navbar />
             <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="Home">Home</a></li>
              <li className="breadcrumb-item"><a href="Home/Faculties">Faculties</a></li>
              <li className="breadcrumb-item"><a href="Home/Faculties/Departments">Departments</a></li>
              <li className="breadcrumb-item"><a href="Home/Faculties/Departments/Courses">Courses</a></li>
              <li className="breadcrumb-item active" aria-current="page">UpdateCourse</li>
            </ol>
          </nav>
            <h1>Update Course</h1>
            <form onSubmit = {this.handleSubmit}>
            <div class="row">
                <label>
                    <input name="faculty" placeholder="Faculty Name..." type="text" faculty={this.state.faculty} onChange={this.handleChange}/>
                </label>
                <label>
                    <input name="id" placeholder="Course ID..." type="text" id={this.state.id} onChange={this.handleChange}/>
                </label>
            </div>
            <div class="row">
                <label>
                    <input name="namec" placeholder="New Course Name..." type="text" namec={this.state.namec} onChange={this.handleChange}/>
                </label>
                <label>
                    <input name="slots" placeholder="New Number Of Slots..." type="text" slots={this.state.slots} onChange={this.handleChange}/>
                </label>
            </div>
            <input type="submit" id="submit" value="Submit" />
            </form>
        </div>
        )
    }
}
